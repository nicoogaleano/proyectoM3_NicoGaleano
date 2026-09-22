// src/utils.js

// 1. Escapar HTML para prevenir inyecciones
export function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// 2. Formatear la hora
export function formatTimestamp(date = new Date()) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
// 3. Mapear el ID del personaje con su nombre público
export function getCharacterTitle(characterId) {
    const titles = {
        'gign': 'Canal de Radio: GIGN (CT)',
        'phoenix': 'Canal de Radio: Phoenix Faction (T)',
        'guerrilla': 'Canal de Radio: Guerrilla Warfare (T)'
    };
    return titles[characterId] || 'Canal de Radio';
}

// 4. Formatear el historial para el contrato de la API de Gemini
export function formatMessagesForApi(messages) {
    if (!Array.isArray(messages)) return [];
    return messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.parts?.[0]?.text || '' }]
    }));
} 

