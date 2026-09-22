// src/chat.js

// 1. Obtener la clave de historial según la facción activa
function getHistoryKey() {
    const character = localStorage.getItem('selectedCharacter') || 'gign';
    return `cs_chat_history_${character}`;
}

// 2. Cargar historial desde localStorage o generar mensaje inicial
function loadMessages() {
    const key = getHistoryKey();
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error al parsear el historial:', e);
        }
    }

    const character = localStorage.getItem('selectedCharacter') || 'gign';
    const welcomeTexts = {
        'gign': 'Secteur sécurisé. ¿Cuáles son tus órdenes, soldado?',
        'phoenix': '¡Afirmativo! ¿Vamos a rushear B o qué?',
        'guerrilla': 'Posición tomada. Habla rápido antes de que vengan.'
    };

    return [{
        role: 'model',
        parts: [{ text: welcomeTexts[character] || 'Transmisión iniciada.' }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
}

// 3. Guardar mensajes en localStorage
function saveMessages(messages) {
    const key = getHistoryKey();
    localStorage.setItem(key, JSON.stringify(messages));
}

// 4. Inicializar el chat
window.initChat = function() {
    const messages = loadMessages();
    renderMessages(messages);
};

// 5. Función única para renderizar los mensajes en el DOM
function renderMessages(messages) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = '';

    messages.forEach(msg => {
        const isUser = msg.role === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'ai'}`;

        const textContent = msg.parts?.[0]?.text || '';
        const time = msg.timestamp || '';

        msgDiv.innerHTML = `
            <span class="sender-name">${isUser ? 'Comandante (Tú)' : 'Canal Radio'}</span>
            <div class="message-text">${escapeHTML(textContent)}</div>
            ${time ? `<span style="font-size: 0.65rem; color: #888; display: block; text-align: right; margin-top: 4px;">${time}</span>` : ''}
        `;
        container.appendChild(msgDiv);
    });

    scrollToBottom();
}

// 6. Enviar mensaje a la Serverless Function
window.handleSendMessage = async function(event) {
    event.preventDefault();

    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    let messages = loadMessages();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Agregar mensaje del usuario
    const userMsg = { role: 'user', parts: [{ text }], timestamp: timeStr };
    messages.push(userMsg);

    input.value = '';
    saveMessages(messages);
    renderMessages(messages);
    showTypingIndicator(true);

    try {
        const characterId = localStorage.getItem('selectedCharacter') || 'gign';

        const formattedMessages = messages.map(m => ({
            role: m.role,
            parts: m.parts
        }));

        const response = await fetch('/api/functions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                characterId: characterId,
                messages: formattedMessages
            })
        });

        // Parseo seguro de JSON (evita crasheo si el servidor responde HTML en errores 503)
        let data = {};
        try {
            data = await response.json();
        } catch (jsonError) {
            // Si no devolvió JSON
        }

        if (!response.ok) {
            if (response.status === 503) {
                throw new Error('Canal de radio saturado por alta demanda. Reintenta en un momento.');
            }
            throw new Error(data.error || `Error (${response.status}): Fallo en la comunicación.`);
        }

        // Agregar respuesta recibida
        const aiMsg = {
            role: 'model',
            parts: [{ text: data.reply }],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        messages.push(aiMsg);

    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        messages.push({
            role: 'model',
            parts: [{ text: `[Error de Radio]: ${error.message}` }],
            timestamp: timeStr
        });
    } finally {
        showTypingIndicator(false);
        saveMessages(messages);
        renderMessages(messages);
    }
};

// 7. Borrar historial
window.clearChatHistory = function() {
    // Reproducir el sonido "Roger That"
    const soundRoger = new Audio('assets/roger.wav'); // Usa 'assets/roger.wav' si lo mueves a esa carpeta
    soundRoger.volume = 0.8;
    soundRoger.play().catch(err => console.log("Error reproduciendo roger.wav:", err));

    const key = getHistoryKey();
    localStorage.removeItem(key);
    window.initChat();
};

function showTypingIndicator(show) {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.style.display = show ? 'block' : 'none';
    }
}

function scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}