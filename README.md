# 🎧 CS 1.6 AI Chat - Proyecto Integrador 3

![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-VGUI_Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-API_Resilient-8E44AD?style=for-the-badge&logo=googlegemini&logoColor=white)
![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

> **Aplicación web interactiva de tipo Single Page Application (SPA)** que recrea la interfaz táctica VGUI y el sistema de comunicaciones por radio del clásico videojuego **Counter-Strike 1.6**, alimentada por la API de Google Gemini.

🌐 **Demo en Vivo:** [https://proyecto-m3-nico-galeano-njwz12dwh-anonymous-f6c1.vercel.app/](https://proyecto-m3-nico-galeano-njwz12dwh-anonymous-f6c1.vercel.app/)

---

## 🎯 Características Principales

| Característica | Descripción |
| :--- | :--- |
| **📱 Diseño Responsive Mobile-First** | Transición fluida entre barra superior móvil y menú flotante clásico de CS 1.6 en la esquina inferior izquierda para tablets y escritorio. |
| **🔊 Inmersión Sonora Táctica** | Integración de audios originales (`gamestartup.mp3`, `com_go.wav`, `roger.wav`) con desencadenantes automáticos por interacciones del usuario y comandos de radio. |
| **⚡ Backend Serverless Resiliente** | Función serverless en Vercel que oculta la `GEMINI_API_KEY` e implementa un algoritmo de **Fallback multimodelo** en cascada para sortear picos de saturación (503/429). |
| **🎭 Personalidades por Facción** | Prompts de sistema optimizados para simular respuestas breves y tácticas de las unidades **GIGN**, **Phoenix Faction** y **Guerrilla Warfare**. |
| **💾 Persistencia e Aislamiento de Datos** | Almacenamiento local del historial de mensajes de manera independiente por cada personaje mediante `localStorage`. |
| **🛡️ Protección Anti-Spam** | Bloqueo automático de controles e inyección de datos durante el tiempo de espera de la API. |
| **🧪 Pruebas Unitarias** | Cobertura de funciones utilitarias y lógica del chat con **Vitest**. |

---

## 🤖 Documentación de la Inteligencia Artificial (Gemini API)

El motor conversacional está impulsado por la API REST de **Google Gemini** a través de una arquitectura backend Serverless.

### 1. Sistema de Prompts y Personalidades Tácticas
Cada facción cuenta con instrucciones de sistema (**System Instructions**) diseñadas para forzar el comportamiento táctico característico del juego:

* **GIGN (Counter-Terrorists):** Protocolar, disciplinado y estratégico. Utiliza terminología de fuerzas especiales, comandos breves y modismos en francés/inglés (*"Secteur sécurisé"*, *"Affirmative"*).
* **Phoenix Faction (Terrorists):** Agresivo, pragmático y enfocado en la ejecución directa de objetivos tácticos (*"Rushear B"*, *"Plantar la C4"*).
* **Guerrilla Warfare (Terrorists):** Hostil, cauteloso y desconfiado. Mantiene comunicaciones al mínimo para evitar intercepciones de radio.

**Restricciones Operativas del Prompt:**
* **Concisión de Radio:** Respuestas estrictamente limitadas a un máximo de 30 palabras para simular la inmediatez de los comandos de voz de CS 1.6.
* **Inmersión Ininterrumpida:** Prohibición absoluta de romper el personaje o hacer menciones fuera del universo táctico del juego.

### 2. Algoritmo de Fallback y Resiliencia Serverless
Para prevenir caídas del servicio ante picos de demanda o limitaciones de cuotas de API (errores HTTP `503` o `429`), la Serverless Function (`/api/functions.js`) implementa un patrón de **Inferencia en Cascada**:

1. **Consulta Primaria:** Intento de comunicación con el modelo optimizado de alta velocidad (`gemini-2.5-flash` / `gemini-1.5-flash`).
2. **Cascada de Modelos:** Si la API devuelve un error de saturación, el servidor captura el fallo e intenta inmediatamente con modelos secundarios de respaldo dentro de la misma petición.
3. **Manejo Elegante de Errores:** En caso de indisponibilidad total de la red de IA, la respuesta se formatea como un mensaje táctico simulado (*"[Error de Radio]: Canal saturado..."*), manteniendo la estabilidad de la app.

### 3. Gestión de Contexto Conversacional
* **Estructura Multi-turn:** Envío serializado de la conversación usando el estándar `{ role: 'user' | 'model', parts: [{ text }] }`.
* **Aislamiento por Personaje:** Cada flujo de chat se almacena bajo claves independientes (`cs_chat_history_[characterId]`), evitando la contaminación de contexto al alternar entre facciones.

---

## 🛠️ Stack Tecnológico

* **Frontend:** HTML5 semántico, CSS3 Vanilla (Variables CSS, Flexbox, CSS Grid, Media Queries), JavaScript Vanilla (ES Modules).
* **Backend / Serverless:** Node.js, Vercel Serverless Functions (`/api/functions.js`).
* **Inteligencia Artificial:** Google Gemini REST API.
* **Testing:** Vitest.

---

## ⚙️ Instalación y Configuración Local

### 1. Clonar el repositorio

```bash
git clone [https://github.com/nicoogaleano/proyectoM3_NicoGaleano.git](https://github.com/nicoogaleano/proyectoM3_NicoGaleano.git)
cd proyectoM3_NicoGaleano
2. Instalar dependencias
Bash
npm install
3. Configurar variables de entorno
Crea un archivo .env.local en la raíz de tu proyecto e ingresa tu clave de API de Google AI Studio:

Fragmento de código
GEMINI_API_KEY=tu_clave_de_api_aqui
4. Ejecutar en entorno local
Bash
npm run dev
# o si usas Vercel CLI
vercel dev
🧪 Ejecución de Pruebas Unitarias
Para correr la suite de pruebas configurada con Vitest:

Bash
npm run test
🚀 Despliegue en Vercel
Importa tu repositorio de GitHub en el panel de Vercel.

En la sección Environment Variables, añade la clave:

Key: GEMINI_API_KEY

Value: (tu clave secreta de Google AI Studio)

Presiona Deploy.

👤 Autor
Desarrollado por Nico Galeano como parte del Proyecto Integrador 3.