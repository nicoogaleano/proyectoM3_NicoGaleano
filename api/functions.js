// Diccionario con los System Prompts de cada facción
const systemPrompts = {
    'gign': 'Eres un miembro de la unidad antiterrorista francesa GIGN del videojuego Counter-Strike 1.6. Eres disciplinado, hablas con profesionalismo y un sutil enfoque táctico. Tu objetivo es neutralizar amenazas y desactivar explosivos. Usas términos como "defuse", "site" y mencionas armas como la M4A1. Tus respuestas deben ser sumamente breves (1 a 3 oraciones), ideales para comunicaciones de radio rápidas en formato chat.',
    
    'phoenix': 'Eres un terrorista de la facción Phoenix del clásico Counter-Strike 1.6. Tienes una actitud agresiva, ruda y despreocupada. Te encanta "rushear B" y plantar la C4. Usas jerga del juego como "rush B", "eco", "flash" y mencionas la AK-47. Intercala comandos de radio como "Go, go, go!". Tus respuestas deben ser obligatoriamente breves, de 1 a 3 oraciones como máximo.',
    
    'guerrilla': 'Eres un combatiente de la facción Guerrilla Warfare del videojuego Counter-Strike 1.6. Eres astuto, duro, acostumbrado a pelear en entornos urbanos y con mucha actitud. Tu prioridad es defender el territorio a toda costa. Usas jerga como "campear", "snipers", "túneles" y mencionas la Galil. Tus respuestas deben ser breves, directas y con mucha personalidad, máximo de 2 a 3 oraciones adaptadas para chat.'
};

// Lista de modelos a probar en orden. Si uno está saturado o falla, salta al siguiente.
const MODELS = [
    'gemini-3.5-flash',
    'gemini-3.6-flash',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2-flash'
];

export default async function handler(req, res) {
    // 1. Validar que el método sea POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // 2. Validar que exista la clave de API en el archivo .env
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('Error: GEMINI_API_KEY no encontrada.');
        return res.status(500).json({ error: 'Falta la variable GEMINI_API_KEY en el archivo .env' });
    }

    try {
        const { messages = [], characterId = 'gign' } = req.body || {};

        // Seleccionar el prompt del personaje
        const systemInstructionText = systemPrompts[characterId] || systemPrompts['gign'];

        // Adaptar los mensajes al formato de Gemini API
        const formattedContents = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: Array.isArray(msg.parts) ? msg.parts : [{ text: String(msg.text || '') }]
        }));

        let lastErrorMessage = '';

        // 3. Probar los modelos uno por uno hasta que uno responda con éxito
        for (const modelName of MODELS) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        system_instruction: {
                            parts: [{ text: systemInstructionText }]
                        },
                        contents: formattedContents
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el modelo responde correctamente (HTTP 200), extraemos la respuesta y la devolvemos
                    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Afirmativo, cambio y fuera.';
                    return res.status(200).json({ reply: aiMessage });
                } else {
                    // Si el modelo da error (saturado, límite alcanzado, etc.), guardamos el mensaje y probamos el siguiente
                    lastErrorMessage = data.error?.message || `Status ${response.status}`;
                    console.warn(`[Radio] Modelo ${modelName} saturado/inaccesible (${response.status}). Probando siguiente canal...`);
                }
            } catch (fetchErr) {
                lastErrorMessage = fetchErr.message;
                console.warn(`[Radio] Fallo de conexión con ${modelName}:`, fetchErr);
            }
        }

        // Si se recorrieron todos los modelos y ninguno pudo responder
        return res.status(503).json({ 
            error: `Límite o saturación alcanzada en todos los modelos. (${lastErrorMessage})` 
        });

    } catch (error) {
        console.error('Error en serverless function:', error);
        return res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
}