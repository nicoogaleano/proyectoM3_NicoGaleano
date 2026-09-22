# CS 1.6 AI Chat - Proyecto Integrador 3

Aplicación web interactiva de tipo Single Page Application (SPA) que simula un canal de radio táctico del videojuego Counter-Strike 1.6 alimentado por la API de Google Gemini.

## 🚀 Características

- **Arquitectura SPA**: Navegación fluida sin recargas de página mediante la History API.
- **Serverless Backend**: Función Serverless en Vercel que protege la API Key de Gemini.
- **Personalidades Tácticas**: Prompts del sistema personalizados para distintas facciones (GIGN, Phoenix Faction, Guerrilla Warfare).
- **Persistencia Local**: Guardado de conversaciones por facción utilizando `localStorage`.
- **Diseño Temático**: Estética retro inspirada en la interfaz clásica de Counter-Strike 1.6.
- **Pruebas Unitarias**: Suite de tests configurada con Vitest para funciones utilitarias.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla (ES Modules).
- **Backend / Serverless**: Node.js, Vercel Serverless Functions.
- **IA**: Google Gemini REST API (`gemini-1.5-flash`).
- **Testing**: Vitest.

## ⚙️ Instalación Local

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
   cd tu-repositorio