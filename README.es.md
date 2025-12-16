# 🔍 QA Web Analyzer

> **Herramienta profesional de análisis de accesibilidad** para páginas web. Construida con TypeScript siguiendo las mejores prácticas.

**Autor**: [RaffyRod](https://github.com/RaffyRod)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)
![Cross-Platform](https://img.shields.io/badge/Cross--Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=flat-square)

> ✅ **Completamente Portable**: Funciona en cualquier PC independientemente de la ruta de instalación o sistema operativo. Sin rutas hardcodeadas ni configuraciones específicas del sistema.

---

## 🚀 INICIO RÁPIDO - UN SOLO COMANDO

<div align="center">

### ⚡ **INICIA EN SEGUNDOS - CERO CONFIGURACIÓN**

```bash
npm run setup
```

**✨ ¡Eso es todo! No se necesita configuración. Todo es automático.**

</div>

### 📋 Lo que `npm run setup` hace automáticamente:

- ✅ Instala dependencias del backend (si es necesario)
- ✅ Instala navegadores de Playwright (requerido para análisis web)
- ✅ Instala dependencias del frontend (si es necesario)
- ✅ Compila el backend TypeScript (si es necesario)
- ✅ Inicia ambos servidores (Backend + Frontend)
- ✅ Busca puertos disponibles automáticamente
- ✅ Te muestra las URLs exactas en la consola

**✨ Los servidores buscarán puertos libres automáticamente y mostrarán en consola las URLs exactas donde se desplegaron.**

> 💡 **Comandos alternativos:**
>
> - `node scripts/setup-and-run.js` - Ejecución directa
> - `start.bat` (Windows) o `./start.sh` (macOS/Linux) - Scripts específicos de plataforma

> 💡 **Nota**: El frontend automáticamente hace proxy de las peticiones API al backend. Solo necesitas abrir la URL del frontend que aparecerá en consola.

---

## 🏃 EJECUTAR - INICIAR SERVIDORES (Ya Configurado)

<div align="center">

### ⚡ **SOLO EJECUTAR - NO SE NECESITA CONFIGURACIÓN**

```bash
npm run start:all
```

**✨ Si ya ejecutaste `npm run setup` antes, usa este comando para iniciar los servidores rápidamente.**

</div>

### 📋 Lo que `npm run start:all` hace:

- ✅ Inicia el servidor backend (si está compilado)
- ✅ Inicia el servidor de desarrollo del frontend
- ✅ Busca puertos disponibles automáticamente
- ✅ Te muestra las URLs exactas en la consola

> ⚠️ **Importante**: Asegúrate de haber ejecutado `npm run setup` al menos una vez antes de usar este comando. Este comando asume que las dependencias están instaladas y el backend está compilado.

### 🔄 **Detección Automática de Puertos**

La aplicación utiliza **gestión inteligente de puertos**:

- **Backend**: Busca automáticamente puertos disponibles en orden de prioridad (4000 → 4001 → 4002 → 4003 → 4004 → 4005 → 5000 → 5001 → 5002 → 5003 → 5004 → 5005 → cualquier disponible)
- **Frontend**: Detecta automáticamente en qué puerto está corriendo el backend
- **Proxy**: Se conecta dinámicamente al puerto correcto del backend
- **Soporte Multi-Servidor**: Funciona perfectamente incluso si tienes otros servidores corriendo en esos puertos

**Cómo funciona:**

1. El backend verifica puertos en orden de prioridad y usa el primero disponible
2. El frontend detecta automáticamente el puerto del backend probando puertos comunes
3. Si el backend está en un puerto diferente, el frontend lo encontrará automáticamente
4. ¡No se necesita configuración manual - simplemente funciona! 🎉

**Si tienes otros servidores corriendo:**

- El backend saltará los puertos ocupados y usará el siguiente disponible
- El frontend encontrará automáticamente el backend correcto, incluso si está en un puerto diferente
- Sin conflictos - cada servidor usa su propio puerto independientemente

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
- 🎭 **Modal de Información WCAG**: Guía de referencia rápida para estándares de accesibilidad con reglas detalladas para imágenes y `aria-label` según WCAG 2.2 AA. Completamente traducido al inglés y español.
- 💾 **URLs Guardadas**: Guarda hasta 10 URLs de uso frecuente para acceso rápido. Selecciona URLs guardadas desde un dropdown antes de analizar.

### 🆕 Mejoras Recientes

- ✅ **Validación de Análisis**: Previene que el análisis se inicie sin seleccionar al menos un elemento y un atributo, con mensajes de error claros en múltiples idiomas
- ✅ **Botón Exportar PDF**: Deshabilitado hasta que el análisis se complete, con efecto de brillo verde animado cuando hay resultados disponibles
- ✅ **Tooltips Inteligentes**: Hints al hacer hover en botones deshabilitados para guiar a los usuarios (ej: "Por favor ingresa una URL para analizar")
- ✅ **Espaciado de UI Mejorado**: Mejor espaciado entre los cards de categorías de atributos para prevenir solapamiento
- ✅ **Efectos Visuales Refinados**: Sombras de texto reducidas para mejor legibilidad en cards de atributos colapsados y alertas de error
- ✅ **Funcionalidad de URLs Guardadas**: Guarda hasta 10 URLs con un checkbox al lado del input de URL. Dropdown de acceso rápido para seleccionar URLs guardadas antes de analizar
- ✅ **Corrección de Visibilidad de Texto**: Asegurado que todos los elementos de texto sean visibles en todos los temas con contraste de color adecuado
- ✅ **Corrección de Hover en Glassmorphism**: Corregido el color de hover en el dropdown de temas glassmorphism (ahora usa púrpura en lugar de blanco)
- ✅ **Notificación al Eliminar URL**: Agregada notificación de confirmación al eliminar URLs de la lista guardada
- ✅ **Mensaje de Cancelación de Análisis**: Cambiado el mensaje de cancelación de error a notificación de éxito en ambos idiomas
- ✅ **Corrección de Notificación de Cancelación**: Corregida la visualización de la notificación al cancelar el análisis - ahora muestra el mensaje de éxito correctamente

## 🎯 Mejoras Recientes

### ✨ Características Mejoradas

- **🔄 Detección Automática de Puertos**: Backend y frontend encuentran y se conectan automáticamente a puertos disponibles
- **🔍 Detección Inteligente del Backend**: El frontend detecta automáticamente el puerto correcto del backend, incluso con múltiples servidores corriendo
- **🛡️ Manejo Robusto de Errores**: Mensajes de error mejorados con información detallada de depuración
- **🎨 Mejoras de UI**:
  - Spinner redundante eliminado (la animación del emoji es suficiente)
  - **Categorías de Atributos Colapsables**: Las categorías se pueden expandir/contraer con animaciones suaves
  - **Emojis de Categorías**: Iconos visuales para cada categoría de atributos (🏷️ Labels, 🔄 States, 🔗 Relationships, 📢 Live Regions, 📝 Form, ⚙️ Other)
  - **Highlight Persistente de Checkboxes**: Los checkboxes seleccionados mantienen el resaltado visual (color azul y texto en negrita)
  - **Layout Mejorado**: Layout de una sola columna para categorías de atributos para mejor organización
  - **Traducciones de Headers de Categorías**: Los headers de las categorías de atributos (Etiquetas y Nombres ARIA, Estados ARIA, Atributos de Formulario, etc.) están completamente traducidos al español, mientras que los nombres técnicos de atributos (aria-label, aria-checked, etc.) permanecen en inglés según los estándares de accesibilidad
  - **Traducciones del Modal WCAG**: Traducción completa al español de todo el contenido del modal de información WCAG, incluyendo títulos, descripciones y notas
- **📸 Optimización de Screenshots**: Solo captura screenshots de elementos visibles, previniendo timeouts
- **📝 Atribución de Código**: Todos los archivos fuente incluyen comentarios de atribución del autor
- **🚀 Builds de Producción**: Desactivados para desarrollo local (pueden reactivarse cuando se necesiten)

### 🔧 Mejoras Técnicas

- **Inteligencia de Proxy**: El proxy de Vite detecta automáticamente el puerto del backend
- **Soporte Multi-Servidor**: Funciona perfectamente con otros servidores en puertos comunes
- **Recuperación de Errores**: Mejores mensajes de error ayudan a identificar y corregir problemas rápidamente
- **Enfoque en Desarrollo**: Optimizado para el flujo de trabajo de desarrollo local
- **Manejo de Screenshots**: Manejo mejorado de errores para elementos no visibles (los omite en lugar de hacer timeout)
- **Toggle de Categorías**: Funcionalidad de expandir/contraer corregida para categorías de atributos

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

<div align="center">

### 🔍 **Analizando un Sitio Web**

**📥 URL de Entrada:**

```
https://example.com
```

**📤 Resultados del Análisis:**

</div>

| 📊 Métrica                       | 🔢 Valor | ✅ Estado      |
| -------------------------------- | -------- | -------------- |
| 🖼️ **Total Imágenes**            | **15**   | ✅             |
| ⚠️ **Imágenes sin Alt**          | **3**    | ❌ **Fallido** |
| 🔗 **Total Enlaces**             | **42**   | ✅             |
| ⚠️ **Enlaces sin Accesibilidad** | **5**    | ❌ **Fallido** |
| 🔘 **Total Botones**             | **8**    | ✅             |
| ⚠️ **Botones sin Accesibilidad** | **2**    | ❌ **Fallido** |

<div align="center">

**📈 Resumen:** 3 problemas encontrados en 65 elementos analizados

</div>

## 🏗️ Estructura del Proyecto

```
qa-web-analyzer/
│
├── 📁 src/                                    Código fuente TypeScript del backend
│   ├── 📁 types/                              Definiciones de tipos
│   │   └── index.ts
│   ├── 📁 services/                           Lógica de negocio
│   │   └── analyzer.service.ts
│   ├── 📁 utils/                              Utilidades
│   │   └── port-finder.util.ts
│   └── server.ts                              Servidor Express
│
├── 📁 frontend/                                Aplicación Frontend Vue 3
│   ├── 📁 src/
│   │   ├── 📁 components/                     Componentes Vue
│   │   │   ├── 📁 Header/                     Header con idioma y tema
│   │   │   │   ├── Header.vue
│   │   │   │   ├── LanguageToggle.vue
│   │   │   │   └── ThemeSelector.vue
│   │   │   ├── 📁 AnalysisForm/                Formulario y opciones de análisis
│   │   │   │   ├── AnalysisForm.vue
│   │   │   │   └── OptionsPanel.vue
│   │   │   ├── 📁 Results/                     Visualización de resultados
│   │   │   │   ├── Results.vue
│   │   │   │   └── ResultItem.vue
│   │   │   ├── ExportModal.vue                 Modal de exportación PDF
│   │   │   ├── NotificationAlert.vue
│   │   │   └── WcagInfoModal.vue               Modal de información WCAG
│   │   ├── 📁 stores/                          Stores Pinia (gestión de estado)
│   │   │   ├── analysis.ts                     Gestión de estado de análisis
│   │   │   ├── theme.ts                        Gestión de temas
│   │   │   └── language.ts                     Gestión de i18n
│   │   ├── 📁 utils/                           Funciones utilitarias
│   │   │   ├── export.ts                       Lógica de exportación PDF
│   │   │   ├── html.ts                         Utilidades HTML
│   │   │   └── themes.ts                       Utilidades de temas
│   │   ├── 📁 assets/                          Assets estáticos (importaciones CSS)
│   │   │   └── main.css                        Punto de entrada CSS principal
│   │   ├── App.vue                             Componente raíz
│   │   └── main.ts                             Punto de entrada de la aplicación
│   ├── 📁 public/                              Assets públicos (archivos estáticos de Vite)
│   │   └── favicon.svg                         Favicon de la aplicación
│   ├── 📁 tests/                               Pruebas unitarias del frontend
│   │   ├── 📁 stores/                          Pruebas de stores
│   │   └── 📁 utils/                           Pruebas de utilidades
│   ├── vite.config.ts                          Configuración de Vite
│   ├── vitest.config.ts                        Configuración de pruebas Vitest
│   ├── tsconfig.json                           Configuración TypeScript
│   └── package.json                            Dependencias del frontend
│
├── 📁 public/                                  Directorio público compartido (servido por Express)
│   ├── index.html                              HTML legacy (fallback)
│   ├── 📁 css/                                 Arquitectura CSS modular (compartida)
│   │   ├── variables.css                       Variables CSS y colores de tema
│   │   ├── base.css                            Estilos base y reset
│   │   ├── layout.css                          Componentes de layout
│   │   ├── components.css                      Componentes UI (botones, inputs)
│   │   ├── options.css                         Estilos de opciones de análisis
│   │   ├── modal.css                           Estilos de modales
│   │   ├── results.css                         Estilos de visualización de resultados
│   │   └── responsive.css                      Reglas de diseño responsive
│   ├── 📁 js/                                  Módulos JavaScript legacy
│   │   ├── app.js                              Lógica principal de la aplicación
│   │   ├── export.js                           Funcionalidad de exportación PDF
│   │   ├── themes.js                           Gestión de temas
│   │   └── i18n.js                             Internacionalización
│   ├── 📁 assets/                              Salida de build de Vite (auto-generado)
│   └── favicon.svg                             Favicon de la aplicación
│
├── 📁 dist/                                    JavaScript compilado del backend (auto-generado)
│   ├── server.js
│   ├── 📁 services/
│   ├── 📁 types/
│   └── 📁 utils/
│
├── 📁 tests/                                   Pruebas unitarias del backend
│   ├── 📁 services/                            Pruebas de servicios
│   └── 📁 utils/                               Pruebas de utilidades
│
├── 📁 scripts/                                 Scripts utilitarios
│   └── setup-and-run.js                        Script automatizado de configuración y ejecución
│
├── package.json                                Dependencias y scripts del backend
├── tsconfig.json                               Configuración TypeScript del backend
├── vitest.config.ts                            Configuración de pruebas del backend
├── .gitignore                                  Reglas de Git ignore
├── .prettierrc.json                            Configuración de Prettier
├── .lintstagedrc.json                          Configuración de lint-staged
├── .env.example                                Plantilla de variables de entorno
├── start.bat                                   Script de inicio para Windows
├── start.sh                                    Script de inicio para Unix
├── start.js                                    Script de inicio legacy
├── README.md                                   Este archivo (en inglés)
└── README.es.md                                Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend

- **[Node.js](https://nodejs.org/docs)** - Entorno de ejecución
- **[Express](https://expressjs.com/)** - Framework web
- **[TypeScript](https://www.typescriptlang.org/docs/)** - JavaScript con tipos
- **[Playwright](https://playwright.dev/docs/intro)** - Automatización de navegador para análisis

### Frontend

- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo con Composition API
- **[TypeScript](https://www.typescriptlang.org/docs/)** - Código frontend con tipos
- **[Vite](https://vitejs.dev/)** - Herramienta de construcción de próxima generación con HMR
- **[Pinia](https://pinia.vuejs.org/)** - Gestión de estado para Vue
- **[HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)** - Estructura
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Estilos modulares con variables CSS, neomorfismo y diseño responsive
- **Lazy Loading** - Code splitting y carga asíncrona de componentes
- **[jsPDF](https://github.com/parallax/jsPDF)** - Generación de PDF con renderizado personalizado de tablas
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

| Comando             | Descripción                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm install`      | 📦 Instalar dependencias                          |
| `pnpm _build`       | 🔨 Compilar TypeScript a JavaScript (desactivado) |
| `pnpm start`        | ▶️ Iniciar servidor de producción                 |
| `pnpm start:all`    | 🚀 **Iniciar backend + frontend** ⭐              |
| `pnpm dev`          | 🔄 Iniciar con auto-recarga                       |
| `pnpm dev:all`      | 🔄 Iniciar backend + frontend (watch)             |
| `pnpm type-check`   | ✅ Verificar tipos sin compilar                   |
| `pnpm format`       | 🎨 Formatear todos los archivos con Prettier      |
| `pnpm format:check` | 🔍 Verificar formato del código                   |
| `pnpm lint`         | ✅ Verificar formato y tipos                      |

> 💡 **Nota**: Los scripts de build de producción están desactivados (`_build`, `_build:backend`, `_build:frontend`) para desarrollo local. Pueden reactivarse eliminando el prefijo `_` cuando se necesiten.

### Scripts del Frontend

| Comando                           | Descripción                                     |
| --------------------------------- | ----------------------------------------------- |
| `cd frontend && npm install`      | 📦 Instalar dependencias del frontend           |
| `cd frontend && npm run dev`      | 🚀 **Iniciar servidor Vite dev** ⭐             |
| `cd frontend && npm run _build`   | 🔨 Compilar para producción (desactivado)       |
| `cd frontend && npm run _preview` | 👀 Vista previa de la compilación (desactivado) |

> 💡 **Nota**: Los scripts de build de producción están desactivados (`_build`, `_preview`) para desarrollo local. Pueden reactivarse eliminando el prefijo `_` cuando se necesiten.

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

## ⚙️ Configuración

### Variables de Entorno

- Ubicación (raíz): `qa-web-analyzer/.env` (mismo nivel que `package.json`, `src/`, `frontend/`, `.env.example`)
- Overrides opcionales de frontend: `qa-web-analyzer/frontend/.env` (solo si necesitas valores específicos para el frontend)

Crea tu `.env` desde la plantilla:

- Windows (cmd):

  ```bash
  copy .env.example .env
  ```

- PowerShell:

  ```bash
  Copy-Item .env.example .env
  ```

- macOS/Linux:

  ```bash
  cp .env.example .env
  ```

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

### Requisitos del Sistema

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
  - Incluye **npm** automáticamente (no necesitas instalarlo por separado)
  - **pnpm** es opcional (el script usará npm si pnpm no está disponible)

### Sistemas Operativos Soportados

✅ **Windows** (10/11)  
✅ **macOS** (10.15+)  
✅ **Linux** (Ubuntu 18.04+, Debian 10+, Fedora 30+, etc.)

### Instalación Rápida

1. **Instalar Node.js** (si no está instalado):
   - Descargar desde [nodejs.org](https://nodejs.org/)
   - Verificar: `node --version` (debe ser v18+)

2. **Clonar y ejecutar**:

   ```bash
   git clone https://github.com/RaffyRod/QA-web-analyzer.git
   cd QA-web-analyzer/qa-web-analyzer
   npm run setup
   ```

   ¡Eso es todo! El script automáticamente:
   - Instala todas las dependencias (backend + frontend)
   - Compila el proyecto
   - Inicia ambos servidores

> 💡 **Nota**: El proyecto es completamente portable y automático. ¡No se necesita configuración manual - solo clonar y ejecutar!

## ⚙️ Configuración

> ⚠️ **IMPORTANTE**: ¡No se necesita configuración! La aplicación funciona de inmediato con detección automática de puertos. El archivo `.env` es **completamente opcional** y solo se necesita si quieres personalizar el comportamiento por defecto.

### Variables de Entorno (Opcional)

El archivo `.env` es **opcional**. La aplicación funciona sin él usando configuraciones por defecto y detección automática de puertos.

**Ubicación**: `qa-web-analyzer/.env` (mismo nivel que `package.json`)

Copia `.env.example` a `.env` si quieres personalizar la configuración:

**Windows (cmd)**:

```bash
copy .env.example .env
```

**PowerShell**:

```bash
Copy-Item .env.example .env
```

**macOS/Linux**:

```bash
cp .env.example .env
```

Variables de entorno disponibles:

- `PORT` - Puerto del servidor backend (opcional, se detecta automáticamente si no se establece)
- `NODE_ENV` - Modo de entorno (development/production)
- `VITE_PORT` - Puerto del servidor dev frontend (por defecto: 5173, busca alternativa si está ocupado)
- `VITE_API_URL` - URL de la API del backend (opcional, se detecta automáticamente si no se establece)
- `PLAYWRIGHT_BROWSER` - Navegador para Playwright (chromium/firefox/webkit)
- `PLAYWRIGHT_HEADLESS` - Ejecutar navegador en modo headless (true/false)
- `ANALYSIS_TIMEOUT` - Timeout de análisis en milisegundos (por defecto: 30000)

### 🔄 Sistema de Gestión de Puertos

**Detección de Puerto del Backend:**

- Busca automáticamente puertos disponibles en orden de prioridad: **4000 → 4001 → 4002 → 4003 → 4004 → 4005 → 5000 → 5001 → 5002 → 5003 → 5004 → 5005 → cualquier disponible**
- Usa puertos poco comunes para frameworks (React, Next.js típicamente usan 3000-3999)
- Salta puertos ocupados y usa el siguiente disponible
- Funciona perfectamente incluso si tienes otros servidores corriendo en esos puertos

**Detección de Puerto del Frontend:**

- Detecta automáticamente en qué puerto está corriendo el backend
- Prueba puertos comunes y verifica que sea el backend correcto (no otro servidor)
- Hace fallback al proxy si la auto-detección falla

**Soporte Multi-Servidor:**

- ✅ Funciona con otros servidores en puertos comunes (Next.js, React, etc.)
- ✅ Sin conflictos - cada servidor usa su propio puerto independientemente
- ✅ La detección automática asegura la conexión correcta

**Configuración Manual:**
Si necesitas especificar un puerto personalizado, establece:

```bash
VITE_API_URL=http://localhost:PUERTO
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

**Autor**: [RaffyRod](https://github.com/RaffyRod)

Este proyecto fue desarrollado y mantenido por **Raffy Rodriguez** (2025).

**Atribución de Código:**

- Todos los archivos fuente incluyen comentarios de atribución de autor (`@author RaffyRod`)
- La atribución está presente en archivos TypeScript, JavaScript, Vue y CSS
- Solo los archivos propios del proyecto incluyen atribución (no bibliotecas de terceros)

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
