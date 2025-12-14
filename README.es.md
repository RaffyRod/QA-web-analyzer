# 🔍 QA Web Analyzer

> **Herramienta profesional de análisis de accesibilidad** para páginas web. Construida con TypeScript siguiendo las mejores prácticas.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)

## 🎯 ¿Qué es esto?

QA Web Analyzer es una **herramienta web** que analiza páginas web en busca de **problemas de accesibilidad** según los **estándares WCAG 2.2 AA**. Verifica imágenes, enlaces, botones, inputs y elementos ARIA para asegurar que cumplan con los requisitos de accesibilidad.

### ✨ Características Principales

- 🔎 **Análisis Completo**: Verifica imágenes, enlaces, botones, inputs y roles ARIA
- 🎛️ **Opciones Configurables**: Selecciona exactamente qué quieres analizar
- 📊 **Reportes Detallados**: Ve código HTML, capturas de pantalla y atributos faltantes
- 🎨 **15+ Temas Visuales**: Light, Dark, Flat, Material, Glassmorphism, Cyberpunk y más
- 📄 **Exportación PDF Profesional**: Genera reportes elegantes con diseño neomórfico
- 🌍 **Multi-idioma**: Soporte para inglés y español
- 🎯 **Filtrado Inteligente**: Filtra por atributos faltantes o presentes
- 📸 **Retroalimentación Visual**: Capturas de pantalla de elementos problemáticos
- 📱 **Totalmente Responsive**: Optimizado para smartphones, tablets y desktop
- 🎭 **Modal de Información WCAG**: Guía de referencia rápida para estándares de accesibilidad

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Compilar TypeScript
pnpm build

# 3. Iniciar servidor
pnpm start
```

### 📍 Acceder a la Aplicación

Después de iniciar, verás:

```
QA Web Analyzer server running on http://localhost:3000
```

¡Abre esa URL en tu navegador! 🌐

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

### 🎛️ Opciones de Configuración

#### Elementos a Verificar

- 🖼️ **Imágenes**: Analiza elementos `<img>`
- 🔗 **Enlaces**: Analiza elementos `<a>`
- 🔘 **Botones**: Analiza elementos `<button>`
- 📝 **Inputs**: Analiza `<input>`, `<textarea>`, `<select>`
- 🎭 **Roles**: Analiza elementos con atributo `role`

#### Atributos a Verificar

- **Alt Text**: Para imágenes
- **aria-label**: Nombre accesible
- **aria-labelledby**: Referencia a etiqueta
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
├── 📁 public/                 # Archivos frontend
│   ├── index.html            # HTML principal
│   ├── favicon.svg           # Icono de la aplicación
│   │
│   ├── 📁 css/               # Arquitectura CSS modular
│   │   ├── main.css          # Hoja de estilos principal (importa todo)
│   │   ├── variables.css     # Variables CSS y reset
│   │   ├── base.css          # Estilos base
│   │   ├── layout.css        # Componentes de layout
│   │   ├── components.css    # Componentes UI (botones, inputs)
│   │   ├── options.css        # Estilos de sección de opciones
│   │   ├── modal.css         # Modal de información WCAG
│   │   ├── results.css       # Resultados y filtros
│   │   └── responsive.css    # Diseño responsive (mobile-first)
│   │
│   └── 📁 js/                # Módulos JavaScript
│       ├── app.js            # Lógica principal de la aplicación
│       ├── export.js         # Funcionalidad de exportación PDF
│       ├── themes.js         # Gestión de temas (15+ temas)
│       └── i18n.js           # Internacionalización
│
├── 📁 dist/                  # JavaScript compilado (auto-generado)
│
├── 📄 package.json           # Dependencias
├── 📄 tsconfig.json          # Configuración TypeScript
├── 📄 .gitignore            # Reglas de Git ignore
├── 📄 .prettierrc.json      # Configuración de Prettier
├── 📄 .lintstagedrc.json     # Configuración de lint-staged
├── 📄 README.md             # README en inglés
└── 📄 README.es.md          # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - JavaScript con tipos
- **Playwright** - Automatización de navegador para análisis

### Frontend

- **HTML5** - Estructura
- **CSS3** - Estilos modulares con variables CSS, neomorfismo y diseño responsive
- **JavaScript (ES6+)** - Interactividad
- **jsPDF** - Generación de PDF con renderizado personalizado de tablas

## 📝 Scripts Disponibles

| Comando             | Descripción                                  |
| ------------------- | -------------------------------------------- |
| `pnpm install`      | 📦 Instalar dependencias                     |
| `pnpm build`        | 🔨 Compilar TypeScript a JavaScript          |
| `pnpm start`        | ▶️ Iniciar servidor de producción            |
| `pnpm dev`          | 🔄 Iniciar con auto-recarga                  |
| `pnpm type-check`   | ✅ Verificar tipos sin compilar              |
| `pnpm format`       | 🎨 Formatear todos los archivos con Prettier |
| `pnpm format:check` | 🔍 Verificar formato del código              |
| `pnpm lint`         | ✅ Verificar formato y tipos                 |

## 🎨 Características en Detalle

### 🔍 Verificaciones de Accesibilidad

La herramienta verifica el cumplimiento de los **estándares WCAG 2.2 AA**:

| Elemento        | Verificaciones                                                                     |
| --------------- | ---------------------------------------------------------------------------------- |
| 🖼️ **Imágenes** | Atributo `alt` (detección de faltante/vacío)                                       |
| 🔗 **Enlaces**  | `aria-label`, `aria-labelledby`, `title`, contenido de texto, validación de `href` |
| 🔘 **Botones**  | `aria-label`, `aria-labelledby`, `aria-describedby`, texto                         |
| 📝 **Inputs**   | `aria-label`, `aria-labelledby`, `<label>`, `aria-required`                        |
| 🎭 **Roles**    | `aria-label`, `aria-labelledby` para roles personalizados                          |
| 🎯 **Todos**    | Estados de foco, anti-patrones `tabindex`, atributo `lang`                         |

### 📊 Características del Reporte

- ✅ **Tarjetas de Resumen**: Vista rápida con estado codificado por colores
- 📸 **Capturas de Pantalla**: Resaltado visual de elementos problemáticos
- 💻 **Código HTML**: Fragmentos de código expandibles para cada elemento
- 🔍 **Filtros Inteligentes**: Mostrar solo atributos faltantes o presentes
- 📄 **Exportación PDF**: Reportes profesionales con diseño neomórfico, tablas e imágenes
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
