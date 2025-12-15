# 🔍 QA Web Analyzer

> **Herramienta profesional de análisis de accesibilidad** para páginas web. Construida con TypeScript siguiendo las mejores prácticas.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)

---

## ⚡ Ejecución Rápida (TL;DR)

**¿Quieres ejecutarlo ahora?** Usa un solo comando para iniciar ambos servidores:

```bash
# Instalar dependencias y compilar (solo la primera vez)
pnpm install && pnpm build && cd frontend && npm install && cd ..

# Iniciar backend y frontend en una sola terminal
pnpm start:all
```

¡Luego abre **http://localhost:5173** en tu navegador! 🚀

> 📖 Para instrucciones detalladas, consulta la sección [Inicio Rápido](#-inicio-rápido---ejecutar-localmente) a continuación.

---

## 🎯 ¿Qué es esto?

QA Web Analyzer es una **herramienta web** que analiza páginas web en busca de **problemas de accesibilidad** según los **estándares WCAG 2.2 AA**. Verifica imágenes, enlaces, botones, inputs y elementos ARIA para asegurar que cumplan con los requisitos de accesibilidad.

### ✨ Características Principales

- 🔎 **Análisis Completo**: Verifica imágenes, enlaces, botones, inputs y roles ARIA
- 🎛️ **Opciones Configurables**: Selecciona exactamente qué quieres analizar
- 📊 **Reportes Detallados**: Ve código HTML, capturas de pantalla y atributos faltantes
- 🎨 **15+ Temas Visuales**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk y más
- 📄 **Exportación PDF Profesional**: Genera reportes elegantes con opciones personalizables (Design 12: Highlight Rows + Design 13: Icon Badges)
- 🎛️ **Modal de Exportación**: Selecciona qué elementos y estados incluir en los reportes PDF
- 🌍 **Multi-idioma**: Soporte para inglés y español
- 🎯 **Filtrado Inteligente**: Filtra por atributos faltantes o presentes
- 📸 **Retroalimentación Visual**: Capturas de pantalla de elementos problemáticos
- 📱 **Totalmente Responsive**: Optimizado para smartphones, tablets y desktop
- 🎭 **Modal de Información WCAG**: Guía de referencia rápida para estándares de accesibilidad con reglas detalladas para imágenes y `aria-label` según WCAG 2.2 AA

## 🚀 Inicio Rápido - Ejecutar Localmente

### ⚡ Configuración Rápida (Recomendado)

**Opción 1: Iniciar Ambos Servidores con Un Solo Comando (Más Fácil)**

```bash
# Primera vez: Instalar dependencias y compilar
pnpm install && pnpm build && cd frontend && npm install && cd ..

# Luego iniciar ambos servidores en una terminal
pnpm start:all
```

Esto iniciará:

- ✅ Servidor backend (API Express)
- ✅ Servidor frontend dev (Vite)

¡Ambos servidores se ejecutan en la misma terminal con salida coloreada! 🎨

---

**Opción 2: Usando el script de inicio (solo backend)**

```bash
# Windows
node start.js

# O usar el archivo batch
start.bat

# Unix/Linux/Mac
./start.sh
```

Este script hará:

- ✅ Instalar dependencias automáticamente si es necesario
- ✅ Compilar el backend TypeScript
- ✅ Iniciar el servidor backend

Luego en una **terminal separada**, inicia el frontend:

```bash
cd frontend
npm run dev
```

---

### 📋 Configuración Manual (Paso a Paso)

**Paso 1: Instalar Dependencias del Backend**

```bash
pnpm install
```

**Paso 2: Instalar Dependencias del Frontend**

```bash
cd frontend
npm install
cd ..
```

**Paso 3: Compilar TypeScript del Backend**

```bash
pnpm build
```

**Paso 4: Iniciar la Aplicación**

Necesitas **dos terminales** ejecutándose simultáneamente:

**Terminal 1 - Servidor Backend:**

```bash
pnpm start
```

**Terminal 2 - Servidor Frontend Dev:**

```bash
cd frontend
npm run dev
```

---

### 🌐 Acceder a la Aplicación

Una vez que ambos servidores estén ejecutándose:

| Servicio               | URL                   | Descripción                         |
| ---------------------- | --------------------- | ----------------------------------- |
| **Frontend (App Vue)** | http://localhost:5173 | Interfaz principal de la aplicación |
| **Backend API**        | http://localhost:3000 | Servidor API Express                |

> 💡 **Nota**: El frontend automáticamente hace proxy de las peticiones API al backend, así que solo necesitas abrir http://localhost:5173 en tu navegador.

---

### ✅ Verificar Instalación

Después de iniciar, deberías ver:

**Terminal Backend:**

```
✅ QA Web Analyzer server running on http://localhost:3000
```

**Terminal Frontend:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

¡Abre **http://localhost:5173** en tu navegador! 🎉

## 📖 Cómo Usar

### Guía Paso a Paso

| Paso                    | Descripción                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| 1. Ingresa URL          | Ingresa la URL a analizar (ej: `http://localhost:3000`)                                    |
| 2. Selecciona Elementos | Elige qué elementos verificar: ☑ Imágenes ☑ Enlaces ☑ Botones ☑ Inputs ☑ Roles             |
| 3. Selecciona Atributos | Elige qué atributos verificar: ☑ Alt Text ☑ aria-label ☑ Focus States etc.                 |
| 4. Analizar             | Haz clic en el botón "Analizar" para iniciar el análisis                                   |
| 5. Revisar Reporte      | Examina los resultados: • Tarjetas de resumen • Análisis detallado • Capturas de problemas |
| 6. Filtrar y Exportar   | Usa filtros para mostrar atributos faltantes/presentes y exporta como PDF                  |
| 7. Exportar PDF         | Haz clic en "Exportar PDF" → Selecciona elementos/estados a incluir → Genera reporte       |

### 🎛️ Opciones de Configuración

#### Elementos a Verificar

- 🖼️ **Imágenes**: Analiza elementos `<img>`
- 🔗 **Enlaces**: Analiza elementos `<a>`
- 🔘 **Botones**: Analiza elementos `<button>`
- 📝 **Inputs**: Analiza `<input>`, `<textarea>`, `<select>`
- 🎭 **Roles**: Analiza elementos con atributo `role`

#### Atributos a Verificar

- **Alt Text**: Para imágenes (requisito WCAG 2.2 AA)
- **aria-label**: Nombre accesible (para imágenes: solo requerido si no hay `alt`)
- **aria-labelledby**: Referencia a etiqueta (para imágenes: solo requerido si no hay `alt`)
- **aria-describedby**: Descripción adicional
- **aria-hidden**: Detección de mal uso
- **aria-expanded**: Para elementos expandibles
- **aria-controls**: Relaciones de control
- **aria-current**: Indicador de elemento actual
- **aria-required**: Inputs requeridos
- **aria-invalid**: Estado inválido
- **tabindex**: Detección de anti-patrones
- **lang**: Especificación de idioma
- **Labels**: Elementos `<label>` para inputs
- **Title**: Atributo title
- **Focus States**: Cumplimiento WCAG 2.2 AA
- **href**: Validación de destino de enlaces (solo valida si está seleccionado)

#### Controles de Selección

- **Botones de Radio**: Usa "All" o "None" para seleccionar/deseleccionar rápidamente todos los elementos o atributos
- **Filtros de Sección**: Activa/desactiva la visibilidad de secciones de resultados (Imágenes, Enlaces, Botones, etc.)
- **Filtros de Estado**: Muestra solo atributos faltantes, solo presentes, o ambos

## 📊 Ejemplo de Análisis

**Entrada:** `https://example.com`

**Salida:**

| Métrica                   | Valor | Estado |
| ------------------------- | ----- | ------ |
| Total Imágenes            | 15    | -      |
| Imágenes sin Alt          | 3     | ❌     |
| Total Enlaces             | 42    | -      |
| Enlaces sin Accesibilidad | 5     | ❌     |
| Total Botones             | 8     | -      |
| Botones sin Accesibilidad | 2     | ❌     |

## 🏗️ Estructura del Proyecto

```
qa-web-analyzer/
│
├── 📁 src/                    # Código fuente TypeScript
│   ├── 📁 types/             # Definiciones de tipos
│   ├── 📁 services/          # Lógica de negocio
│   │   └── analyzer.service.ts
│   ├── 📁 utils/             # Utilidades
│   │   └── port-finder.util.ts
│   └── server.ts             # Servidor Express
│
├── 📁 frontend/               # Aplicación Frontend Vue 3
│   ├── 📁 src/
│   │   ├── 📁 components/    # Componentes Vue
│   │   │   ├── Header/       # Header con idioma y tema
│   │   │   ├── AnalysisForm/ # Formulario y opciones de análisis
│   │   │   ├── Results/      # Visualización de resultados
│   │   │   ├── ExportModal.vue # Modal de exportación PDF
│   │   │   └── WcagInfoModal.vue # Modal de información WCAG
│   │   ├── 📁 stores/        # Stores Pinia (gestión de estado)
│   │   │   ├── analysis.ts  # Gestión de estado de análisis
│   │   │   ├── theme.ts      # Gestión de temas
│   │   │   └── language.ts   # Gestión de i18n
│   │   ├── 📁 utils/         # Funciones utilitarias
│   │   │   ├── export.ts    # Lógica de exportación PDF
│   │   │   ├── html.ts      # Utilidades HTML
│   │   │   └── themes.ts    # Utilidades de temas
│   │   ├── 📁 assets/        # Assets estáticos (importaciones CSS)
│   │   │   └── main.css     # Punto de entrada CSS principal
│   │   ├── App.vue           # Componente raíz
│   │   └── main.ts           # Punto de entrada de la aplicación
│   ├── 📁 public/            # Assets públicos (archivos estáticos de Vite)
│   │   └── favicon.svg       # Favicon de la aplicación
│   ├── 📁 tests/             # Pruebas unitarias del frontend
│   │   ├── stores/          # Pruebas de stores
│   │   └── utils/           # Pruebas de utilidades
│   ├── vite.config.ts        # Configuración de Vite
│   ├── vitest.config.ts      # Configuración de pruebas Vitest
│   ├── tsconfig.json         # Configuración TypeScript
│   └── package.json          # Dependencias del frontend
│
├── 📁 public/                 # Directorio público compartido (servido por Express)
│   ├── index.html            # HTML legacy (fallback)
│   ├── 📁 css/               # Arquitectura CSS modular (compartida)
│   │   ├── variables.css    # Variables CSS y colores de tema
│   │   ├── base.css         # Estilos base y reset
│   │   ├── layout.css       # Componentes de layout
│   │   ├── components.css   # Componentes UI (botones, inputs)
│   │   ├── options.css      # Estilos de opciones de análisis
│   │   ├── modal.css        # Estilos de modales
│   │   ├── results.css      # Estilos de visualización de resultados
│   │   └── responsive.css   # Reglas de diseño responsive
│   ├── 📁 js/                # Módulos JavaScript legacy
│   │   ├── app.js           # Lógica principal de la aplicación
│   │   ├── export.js        # Funcionalidad de exportación PDF
│   │   ├── themes.js        # Gestión de temas
│   │   └── i18n.js          # Internacionalización
│   ├── 📁 assets/            # Salida de build de Vite (auto-generado)
│   └── favicon.svg           # Favicon de la aplicación
│
├── 📁 dist/                  # JavaScript compilado del backend (auto-generado)
│
├── 📁 tests/                  # Pruebas unitarias del backend
│   ├── services/            # Pruebas de servicios
│   └── utils/               # Pruebas de utilidades
│
├── 📄 package.json           # Dependencias y scripts del backend
├── 📄 tsconfig.json          # Configuración TypeScript del backend
├── 📄 vitest.config.ts       # Configuración de pruebas del backend
├── 📄 .gitignore            # Reglas de Git ignore
├── 📄 .prettierrc.json      # Configuración de Prettier
├── 📄 .lintstagedrc.json     # Configuración de lint-staged
├── 📄 .env.example          # Plantilla de variables de entorno
├── 📄 start.js              # Script de inicio (auto-instalación y build)
├── 📄 start.bat              # Script de inicio para Windows
├── 📄 start.sh               # Script de inicio para Unix
├── 📄 README.md             # Este archivo (en inglés)
└── 📄 README.es.md          # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - JavaScript con tipos
- **Playwright** - Automatización de navegador para análisis

### Frontend

- **Vue 3** - Framework JavaScript progresivo con Composition API
- **TypeScript** - Código frontend con tipos
- **Vite** - Herramienta de construcción de próxima generación con HMR
- **Pinia** - Gestión de estado para Vue
- **HTML5** - Estructura
- **CSS3** - Estilos modulares con variables CSS, neomorfismo y diseño responsive
- **Lazy Loading** - Code splitting y carga asíncrona de componentes
- **jsPDF** - Generación de PDF con renderizado personalizado de tablas
- **Modal de Exportación** - Componente Vue con adaptación de tema (Design 10: Dark Mode Style)

## 📝 Scripts Disponibles

### 🚀 Comandos Rápidos para Ejecutar Localmente

**⭐ Iniciar Ambos Servidores en Una Terminal (Recomendado):**

```bash
pnpm start:all
```

**O iniciarlos por separado:**

**Servidor Backend:**

```bash
pnpm start
```

**Servidor Frontend Dev (en una terminal separada):**

```bash
cd frontend
npm run dev
```

---

### Scripts del Backend

| Comando             | Descripción                                  |
| ------------------- | -------------------------------------------- |
| `pnpm install`      | 📦 Instalar dependencias                     |
| `pnpm build`        | 🔨 Compilar TypeScript a JavaScript          |
| `pnpm start`        | ▶️ Iniciar servidor de producción            |
| `pnpm start:all`    | 🚀 **Iniciar backend + frontend** ⭐         |
| `pnpm dev`          | 🔄 Iniciar con auto-recarga                  |
| `pnpm dev:all`      | 🔄 Iniciar backend + frontend (watch)        |
| `pnpm type-check`   | ✅ Verificar tipos sin compilar              |
| `pnpm format`       | 🎨 Formatear todos los archivos con Prettier |
| `pnpm format:check` | 🔍 Verificar formato del código              |
| `pnpm lint`         | ✅ Verificar formato y tipos                 |

### Scripts del Frontend

| Comando                          | Descripción                           |
| -------------------------------- | ------------------------------------- |
| `cd frontend && npm install`     | 📦 Instalar dependencias del frontend |
| `cd frontend && npm run dev`     | 🚀 **Iniciar servidor Vite dev** ⭐   |
| `cd frontend && npm run build`   | 🔨 Compilar para producción           |
| `cd frontend && npm run preview` | 👀 Vista previa de la compilación     |

## 🎨 Características en Detalle

### 🔍 Verificaciones de Accesibilidad

La herramienta verifica el cumplimiento de los **estándares WCAG 2.2 AA**:

| Elemento        | Verificaciones                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Imágenes** | Atributo `alt` (preferido), `aria-label`, o `aria-labelledby` (WCAG 2.2 AA). Si hay `alt`, `aria-label` no es requerido.          |
| 🔗 **Enlaces**  | `aria-label`, `aria-labelledby`, `title`, contenido de texto, validación de `href` (solo si el checkbox `href` está seleccionado) |
| 🔘 **Botones**  | `aria-label`, `aria-labelledby`, `aria-describedby`, texto                                                                        |
| 📝 **Inputs**   | `aria-label`, `aria-labelledby`, `<label>`, `aria-required`                                                                       |
| 🎭 **Roles**    | `aria-label`, `aria-labelledby` para roles personalizados                                                                         |
| 🎯 **Todos**    | Estados de foco, anti-patrones `tabindex`, atributo `lang`                                                                        |

### 📊 Características del Reporte

- ✅ **Tarjetas de Resumen**: Vista rápida con estado codificado por colores
- 📸 **Capturas de Pantalla**: Resaltado visual de elementos problemáticos
- 💻 **Código HTML**: Fragmentos de código expandibles para cada elemento
- 🔍 **Filtros Inteligentes**: Mostrar solo atributos faltantes o presentes
- 📄 **Exportación PDF**: Reportes profesionales con modal de selección personalizable
  - Selecciona qué elementos incluir (Imágenes, Enlaces, Botones, Inputs, Roles)
  - Elige tipos de estado (Aprobado, Fallido)
  - Opciones adicionales (Resumen, Capturas, Código HTML)
  - Pre-seleccionado basado en tus opciones de análisis
  - Diseño de tablas: Highlight Rows con Icon Badges (Design 12 + Design 13)
  - **Orden Inteligente**: Elementos aprobados primero, luego los fallidos
- 🎨 **15+ Temas**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk, Minimal, Ocean, Sunset, Forest, Monochrome, High Contrast, Rose, Amber, Teal
- 🌍 **i18n**: Soporte para inglés y español
- 📱 **Responsive**: Totalmente optimizado para móvil, tablet y desktop

### 🎨 Temas Visuales

La aplicación incluye 15+ temas cuidadosamente diseñados:

- **Light Mode** - Limpio y brillante
- **Dark Mode** - Cómodo para la vista
- **Flat Design** - Sombras mínimas, aspecto moderno
- **Material Design** - Principios de Material Design de Google
- **Glassmorphism** - Efecto de vidrio esmerilado
- **Cyberpunk** - Estética neón futurista
- **Minimal** - Interfaz ultra-limpia
- **Ocean** - Tema azul océano
- **Sunset** - Tonos cálidos naranja/rosa
- **Forest** - Tema verde natural
- **Monochrome** - Blanco y negro
- **High Contrast** - Enfocado en accesibilidad
- **Rose** - Tema rosa suave
- **Amber** - Tema amarillo dorado
- **Teal** - Esquema de colores cian/teal

### 📱 Diseño Responsive

La aplicación es totalmente responsive con enfoque mobile-first:

- **Smartphones** (hasta 480px): Layout vertical optimizado
- **Smartphones Landscape** (481px - 767px): Optimización horizontal
- **Tablets** (768px - 1024px): Layout balanceado
- **Tablets Landscape** (1025px - 1279px): Espaciado mejorado
- **Desktop** (1280px+): Layout completo con todas las funciones

Características:

- Objetivos táctiles (mínimo 44x44px)
- Escalado de tipografía optimizado
- Layouts de grid flexibles
- Diálogos modales responsive
- Scrolling suave en móvil

## 🌐 Soporte de Idiomas

Cambia de idioma usando el selector en la interfaz:

- 🇺🇸 **English** - [View English README](./README.md)
- 🇪🇸 **Español** (predeterminado)

## 🧪 Testing

El proyecto incluye tests unitarios completos para el código del backend y frontend.

### Estructura de Tests

- **Tests Backend** (`tests/`): Tests unitarios para servicios y utilidades
  - `services/analyzer.service.test.ts` - Tests del servicio analizador
  - `utils/port-finder.test.ts` - Tests de utilidad de búsqueda de puertos
- **Tests Frontend** (`frontend/tests/`): Tests unitarios para componentes Vue y stores
  - `stores/analysis.test.ts` - Tests del store de análisis
  - `stores/language.test.ts` - Tests del store de idioma/i18n
  - `stores/theme.test.ts` - Tests del store de temas
  - `utils/html.test.ts` - Tests de utilidades HTML
  - `utils/export.test.ts` - Tests de utilidades de exportación PDF

### Ejecutar Tests

**Backend:**

```bash
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch
npm run test:ui       # Modo UI
npm run test:coverage # Reporte de cobertura
```

**Frontend:**

```bash
cd frontend
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch
npm run test:ui       # Modo UI
npm run test:coverage # Reporte de cobertura
```

### Cobertura de Tests

Los tests cubren:

- ✅ Funciones de utilidad (port-finder, html)
- ✅ Métodos de servicio (analyzer.service)
- ✅ Stores de Pinia (analysis, language, theme)
- ✅ Utilidades de exportación

### Características de Cumplimiento WCAG 2.2 AA

El analizador sigue estrictamente los estándares WCAG 2.2 AA:

- **Imágenes**: Deben tener texto alternativo mediante `alt` (preferido), `aria-label`, o `aria-labelledby`. Si hay `alt`, `aria-label` no es requerido.
- **Enlaces**: La validación de `href` es opcional y solo se realiza si el checkbox `href` está seleccionado en "Atributos a Verificar".
- **Validación Inteligente**: Los atributos solo se validan si están explícitamente seleccionados, previniendo falsos negativos.
- **Reportes PDF**: Los elementos se ordenan con elementos "Aprobados" primero, seguidos de "Fallidos" para mejor legibilidad.

## 📋 Requisitos Previos

- **Node.js** v18 o superior
- **pnpm** gestor de paquetes

Instalar pnpm:

```bash
npm install -g pnpm
```

## 🔧 Desarrollo

### Modo Desarrollo

```bash
pnpm dev
```

Inicia el servidor con auto-recarga en cambios de archivos.

### Verificación de Tipos

```bash
pnpm type-check
```

Valida TypeScript sin compilar.

### Formateo de Código

```bash
# Formatear todos los archivos
pnpm format

# Verificar formato sin modificar archivos
pnpm format:check
```

### Herramientas de Calidad de Código

Este proyecto utiliza herramientas automatizadas de calidad de código:

- **Prettier** - Formateador de código para estilo consistente
- **lint-staged** - Ejecuta linters en archivos staged
- **Husky** - Git hooks para verificaciones pre-commit

#### Hook Pre-commit

Antes de cada commit, se ejecutan automáticamente las siguientes verificaciones:

- ✅ Formateo de código con Prettier
- ✅ Verificación de tipos TypeScript

Esto asegura calidad y consistencia del código. Si las verificaciones fallan, el commit se bloquea.

## 🎯 Mejores Prácticas

Este proyecto sigue:

- ✅ **Modo Estricto TypeScript** - Código completamente tipado
- ✅ **Código Limpio** - Separación de responsabilidades
- ✅ **Principios SOLID** - Responsabilidad única, diseño modular
- ✅ **Accesibilidad Primero** - La herramienta misma es accesible
- ✅ **Manejo de Errores** - Gestión robusta de errores
- ✅ **Organización de Código** - Estructura escalable con CSS modular
- ✅ **Internacionalización** - Listo para múltiples idiomas
- ✅ **Formateo de Código** - Prettier para estilo consistente
- ✅ **Hooks Pre-commit** - Verificaciones automatizadas con Husky
- ✅ **Diseño Responsive** - Enfoque mobile-first
- ✅ **Arquitectura Modular** - CSS y JS organizados por funcionalidad

## 📄 Licencia

ISC

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Haz fork del repositorio
2. Crea una rama de funcionalidad
3. Sigue las mejores prácticas de TypeScript
4. Mantén el código limpio y documentado
5. Envía un pull request

## 📞 Soporte

Para problemas o preguntas, por favor abre un issue en GitHub.

## 📜 Créditos y Atribución

Este proyecto fue desarrollado y mantenido por **Raffy Rodriguez** (2025).

### Agradecimientos

Este proyecto utiliza las siguientes bibliotecas y herramientas de código abierto:

- **Playwright** - Automatización y pruebas de navegador
- **Express** - Framework web para Node.js
- **TypeScript** - JavaScript con tipos
- **jsPDF** - Biblioteca de generación de PDF
- **Prettier** - Formateador de código
- **Husky** - Git hooks
- **lint-staged** - Ejecutar linters en archivos staged

Para una lista completa de dependencias, ver `package.json`.

Construido con tecnologías web modernas y mejores prácticas, siguiendo los estándares de accesibilidad WCAG 2.2 AA.

---

**Hecho con ❤️ para mejor accesibilidad web**

[⬆ Volver arriba](#-qa-web-analyzer)
