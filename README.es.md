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
- 🎨 **Interfaz Hermosa**: Diseño neomórfico moderno con soporte de temas
- 📄 **Exportación PDF**: Genera reportes profesionales en PDF
- 🌍 **Multi-idioma**: Soporte para inglés y español
- 🎯 **Filtrado Inteligente**: Filtra por atributos faltantes o presentes
- 📸 **Retroalimentación Visual**: Capturas de pantalla de elementos problemáticos

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

```
┌──────────────────────────────────────────┐
│  1. Ingresa URL a analizar                │
│     (ej: http://localhost:3000)          │
├──────────────────────────────────────────┤
│  2. Selecciona Elementos a Verificar      │
│     ☑ Imágenes  ☑ Enlaces  ☑ Botones      │
├──────────────────────────────────────────┤
│  3. Selecciona Atributos a Verificar     │
│     ☑ Alt Text  ☑ aria-label  etc.       │
├──────────────────────────────────────────┤
│  4. Haz clic en "Analizar"                │
├──────────────────────────────────────────┤
│  5. Revisa el Reporte                     │
│     • Tarjetas de resumen                 │
│     • Análisis detallado de elementos     │
│     • Capturas de problemas               │
├──────────────────────────────────────────┤
│  6. Filtra y Exporta                     │
│     • Filtra por faltantes/presentes      │
│     • Exporta como PDF                    │
└──────────────────────────────────────────┘
```

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

## 📊 Ejemplo de Análisis

```
Entrada: https://example.com

Salida:
┌──────────────────────────────────────┐
│ 📊 Resumen                            │
├──────────────────────────────────────┤
│ Total Imágenes: 15                    │
│ Imágenes sin Alt: 3 ❌                │
│ Total Enlaces: 42                      │
│ Enlaces sin Accesibilidad: 5 ❌      │
│ Total Botones: 8                       │
│ Botones sin Accesibilidad: 2 ❌       │
└──────────────────────────────────────┘
```

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
│   ├── styles.css            # Estilos
│   ├── app.js                # JavaScript principal
│   ├── i18n.js               # Traducciones
│   └── 📁 js/
│       ├── export.js         # Exportación PDF
│       └── themes.js         # Gestión de temas
│
├── 📁 dist/                  # JavaScript compilado (auto-generado)
│
├── 📄 package.json           # Dependencias
├── 📄 tsconfig.json          # Configuración TypeScript
├── 📄 .gitignore            # Reglas de Git ignore
├── 📄 README.md             # Este archivo
└── 📄 README.es.md          # README en español
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - JavaScript con tipos
- **Playwright** - Automatización de navegador para análisis

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos (con variables CSS y neomorfismo)
- **JavaScript (ES6+)** - Interactividad
- **jsPDF** - Generación de PDF

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm install` | 📦 Instalar dependencias |
| `pnpm build` | 🔨 Compilar TypeScript a JavaScript |
| `pnpm start` | ▶️ Iniciar servidor de producción |
| `pnpm dev` | 🔄 Iniciar con auto-recarga |
| `pnpm type-check` | ✅ Verificar tipos sin compilar |

## 🎨 Características en Detalle

### 🔍 Verificaciones de Accesibilidad

La herramienta verifica el cumplimiento de los **estándares WCAG 2.2 AA**:

| Elemento | Verificaciones |
|---------|----------------|
| 🖼️ **Imágenes** | Atributo `alt` (detección de faltante/vacío) |
| 🔗 **Enlaces** | `aria-label`, `aria-labelledby`, `title`, contenido de texto |
| 🔘 **Botones** | `aria-label`, `aria-labelledby`, `aria-describedby`, texto |
| 📝 **Inputs** | `aria-label`, `aria-labelledby`, `<label>`, `aria-required` |
| 🎭 **Roles** | `aria-label`, `aria-labelledby` para roles personalizados |
| 🎯 **Todos** | Estados de foco, anti-patrones `tabindex`, atributo `lang` |

### 📊 Características del Reporte

- ✅ **Tarjetas de Resumen**: Vista rápida con estado codificado por colores
- 📸 **Capturas de Pantalla**: Resaltado visual de elementos problemáticos
- 💻 **Código HTML**: Fragmentos de código expandibles para cada elemento
- 🔍 **Filtros Inteligentes**: Mostrar solo atributos faltantes o presentes
- 📄 **Exportación PDF**: Reportes profesionales con imágenes y detalles
- 🎨 **Temas**: Modos Light, Dark, Blue, Green, Purple
- 🌍 **i18n**: Soporte para inglés y español

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

## 🎯 Mejores Prácticas

Este proyecto sigue:

- ✅ **Modo Estricto TypeScript** - Código completamente tipado
- ✅ **Código Limpio** - Separación de responsabilidades
- ✅ **Principios SOLID** - Responsabilidad única, diseño modular
- ✅ **Accesibilidad Primero** - La herramienta misma es accesible
- ✅ **Manejo de Errores** - Gestión robusta de errores
- ✅ **Organización de Código** - Estructura escalable
- ✅ **Internacionalización** - Listo para múltiples idiomas

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

---

**Hecho con ❤️ para mejor accesibilidad web**

[⬆ Volver arriba](#-qa-web-analyzer)
