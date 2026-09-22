Markdown
# 🎧 CS 1.6 AI Chat - Proyecto Integrador 3

![Vercel Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-VGUI_Theme-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-API_Resilient-8E44AD?style=for-the-badge&logo=googlegemini&logoColor=white)
![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

> **Aplicación web interactiva de tipo Single Page Application (SPA)** que recrea la interfaz táctica VGUI y el sistema de comunicaciones por radio del clásico videojuego **Counter-Strike 1.6**, alimentada por la API de Google Gemini.

---

## 🎯 Características Principales

| Característica | Descripción |
| :--- | :--- |
| **📱 Diseño Responsive Mobile-First** | Transición fluida entre barra superior móvil y menú flotante clásico de CS 1.6 en la esquina inferior izquierda para tablets y escritorio ($\ge 768\text{px}$). |
| **🔊 Inmersión Sonora Táctica** | Integración de audios originales (`gamestartup.mp3`, `com_go.wav`, `roger.wav`) con desencadenantes automáticos por interacciones del usuario y comandos de radio. |
| **⚡ Backend Serverless Resiliente** | Función serverless en Vercel que oculta la `GEMINI_API_KEY` e implementa un algoritmo de **Fallback multimodelo** en cascada para sortear picos de saturación (503/429). |
| **🎭 Personalidades por Facción** | Prompts de sistema optimizados para simular respuestas breves y tácticas de las unidades **GIGN**, **Phoenix Faction** y **Guerrilla Warfare**. |
| **💾 Persistencia de Datos** | Almacenamiento local del historial de mensajes por cada facción mediante `localStorage`. |
| **🧪 Pruebas Unitarias** | Cobertura de funciones utilitarias y lógica del chat con **Vitest**. |

---

## 🛠️ Stack Tecnológico

* **Frontend:** HTML5 semántico, CSS3 Vanilla (Variables CSS, Flexbox, CSS Grid y Media Queries), JavaScript Vanilla (ES Modules).
* **Backend / Serverless:** Node.js, Vercel Serverless Functions (`/api/functions.js`).
* **Inteligencia Artificial:** Google Gemini REST API (con sistema de degradación elegante pasando por `gemini-3.5-flash`, `gemini-3.6-flash` y familia de modelos `2.5`).
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
# o si usas un servidor local plano como Live Server / Vercel CLI
vercel dev
🧪 Ejecución de Pruebas Unitarias
Para correr la suite de pruebas configurada con Vitest:

Bash
npm run test
🚀 Despliegue en Vercel
Importa tu repositorio de GitHub en el panel de Vercel.

En la sección Environment Variables, añade la clave:

GEMINI_API_KEY: (tu clave secreta)

Presiona Deploy.

👤 Autor
Desarrollado por Nico Galeano como parte del Proyecto Integrador 3.


