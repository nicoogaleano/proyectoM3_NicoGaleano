// tests/utils.test.js
import { describe, it, expect } from 'vitest';
import { escapeHTML, formatTimestamp, getCharacterTitle, formatMessagesForApi } from '../src/utils.js';

describe('Pruebas Unitarias - Módulo Utils', () => {
    
    it('1. Debe escapar caracteres HTML especiales correctamente', () => {
        const input = '<script>alert("hack")</script>';
        const expected = '&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;';
        expect(escapeHTML(input)).toBe(expected);
    });

    it('2. Debe retornar el nombre formateado de la facción elegida', () => {
        expect(getCharacterTitle('gign')).toBe('Canal de Radio: GIGN (CT)');
        expect(getCharacterTitle('phoenix')).toBe('Canal de Radio: Phoenix Faction (T)');
        expect(getCharacterTitle('invalid_id')).toBe('Canal de Radio');
    });

    it('3. Debe formatear mensajes correctamente para el payload de la API', () => {
        const rawMessages = [
            { role: 'user', parts: [{ text: 'Hola' }], timestamp: '12:00' },
            { role: 'model', parts: [{ text: 'Roger that' }], timestamp: '12:01' }
        ];

        const formatted = formatMessagesForApi(rawMessages);

        expect(formatted).toEqual([
            { role: 'user', parts: [{ text: 'Hola' }] },
            { role: 'model', parts: [{ text: 'Roger that' }] }
        ]);
    });

    it('4. Debe formatear la hora en formato HH:MM', () => {
        const testDate = new Date('2026-09-22T10:30:00');
        const formattedTime = formatTimestamp(testDate);
        expect(formattedTime).toMatch(/^\d{1,2}:\d{2}$/);
    });
});