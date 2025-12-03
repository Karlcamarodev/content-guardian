# 🛡️ Content Guardian

Panel de moderación de contenido impulsado por IA, construido con **Next.js 14**, **TypeScript** y **Tailwind CSS**.  
Permite revisar, aprobar y marcar contenido de usuarios con una experiencia UI moderna, responsiva y lista para integrarse con APIs reales (incluyendo OpenAI).

---

## 🚀 Demo

- Deploy (Vercel): _pendiente de publicar_
- Panel de proyectos: https://vercel.com/karlcamarodevs-projects

> Este proyecto está pensado como **dashboard demo profesional** para tu portfolio Frontend/Fullstack.

---

## ✨ Características principales

- **Dashboard de moderación en tiempo real (demo)**
  - Métricas globales: _Total Reviews, Flagged Content, Accuracy Rate, Active Users, Response Time, System Status_.
  - Encabezado tipo SaaS con estado de sistema `Online`.

- **Cola de moderación con UX cuidada**
  - Listado de reseñas con:
    - **Nombre de usuario realista** + handle (ej: `@lucia_martinez`).
    - Contenido del mensaje.
    - Sentiment: `positive | negative | neutral`.
    - Estado: `approved | flagged | pending | rejected`.
    - Timestamp amigable tipo “Hace 2 minutos”.
  - Badges de estado y sentimiento con colores semánticos.

- **Acciones funcionales sobre cada ítem**
  - Botones totalmente operativos:
    - `Aprobar`
    - `Rechazar`
    - `Bandera` (flagged)
    - `Reseña` (volver a pendiente / review)
  - Actualización visual del estado + timestamp `"Actualizado hace un momento"`.
  - Toast de feedback global (“Aprobado correctamente”, etc.).

- **Paginación + Scroll infinito**
  - Data paginada desde un **mock API local** (`mockFetchReviews`).
  - `PAGE_SIZE = 8` elementos por página.
  - **IntersectionObserver** para cargar nuevas páginas al llegar al final del listado.
  - Botón adicional “Cargar más” como fallback manual.

- **Mock API local lista para sustituir por API real**
  - Simulación de latencia de red.
  - División de datos en páginas.
  - Fácil de cambiar por `fetch` a una API REST/GraphQL real o a un endpoint de Next.js (`/api/...`).

- **Botón “Generar contenido IA”**
  - Botón `Generar contenido IA` (desktop y mobile).
  - Inserta nuevos elementos en la lista con usuario `IA` y texto generado desde plantillas (`AI_TEMPLATES`).
  - Preparado para sustituir fácilmente por:
    - Llamadas a **OpenAI**.
    - Llamadas a tu propia API de moderación / clasificación.

- **UI/UX**
  - Diseño **full screen** con fondo en gradiente (`from-slate-900 via-purple-900 to-slate-900`).
  - Tarjetas con `glassmorphism` (bordes, blur y opacidad).
  - Layout totalmente **responsive** (móvil, tablet, desktop).
  - Tabs para secciones:
    - `Descripción general`
    - `Cola de moderación`
    - `Analítica`
  - Microcopys y textos orientados a producto real.

---

## 🧱 Stack técnico

- **Framework:** Next.js 14 (App Router, `app/page.tsx`)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estado:** React hooks (`useState`, `useEffect`, `useCallback`, `useRef`)
- **Lógica de datos:**
  - Tipos: `RecentItem`, `Sentiment`, `Status`, `ActionType`
  - Mock DB en memoria `ALL_CONTENT`
  - Mock API `mockFetchReviews(page, pageSize)`
  - Plantillas IA `AI_TEMPLATES`
- **UX:**
  - IntersectionObserver para scroll infinito.
  - Toast simple para feedback de acciones.

---

## 📁 Estructura básica del proyecto

```txt
content-guardian/
├─ app/
│  ├─ page.tsx        # Dashboard principal (toda la UI y lógica mock)
│  └─ layout.tsx      # Layout raíz de Next.js (si aplica)
├─ public/            # Assets públicos (favicons, etc.)
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ tsconfig.json
