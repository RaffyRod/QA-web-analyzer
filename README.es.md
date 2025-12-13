# QA Web Analyzer

Herramienta web profesional para analizar la accesibilidad de páginas web, verificando elementos como imágenes, enlaces, botones, inputs y elementos con roles ARIA. Construida con TypeScript siguiendo las mejores prácticas de desarrollo.

## 🎯 Características

- ✅ **Análisis Configurable**: Selecciona qué elementos y atributos quieres analizar
- ✅ **Análisis de Imágenes**: Verifica atributos `alt` text
- ✅ **Análisis de Enlaces**: Verifica `aria-label`, `aria-labelledby`, `title`
- ✅ **Análisis de Botones**: Verifica `aria-label`, `aria-labelledby`, `aria-describedby`
- ✅ **Análisis de Inputs**: Verifica `aria-label`, `aria-labelledby`, elementos `<label>`
- ✅ **Análisis de Roles ARIA**: Verifica elementos con atributos `role`
- ✅ **Reporte Detallado**: Muestra el código HTML de cada elemento analizado
- ✅ **Filtros Inteligentes**: Filtra elementos con o sin atributos de accesibilidad
- ✅ **Resumen Estadístico**: Vista general de los problemas encontrados
- ✅ **Exportar como Imagen**: Exporta el reporte completo como imagen PNG
- ✅ **Interfaz Moderna**: Diseño responsive y fácil de usar
- ✅ **TypeScript**: Código tipado y mantenible
- ✅ **Soporte Multi-idioma**: Inglés y Español

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- pnpm (gestor de paquetes)

## 🚀 Inicio Rápido

### Configuración con un Solo Comando (Recomendado)

Simplemente ejecuta el script de configuración. Automáticamente:
- Instalará las dependencias (solo la primera vez)
- Compilará el proyecto TypeScript
- Iniciará el servidor

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**O usando el script npm/pnpm:**
```bash
pnpm run
```

### Configuración Manual

Si prefieres ejecutar los comandos manualmente:

1. Instala las dependencias usando pnpm:

```bash
pnpm install
```

2. Compila el proyecto TypeScript:

```bash
pnpm build
```

3. Inicia el servidor:

```bash
pnpm start
```

### Modo Desarrollo

Inicia el servidor en modo desarrollo (con auto-reload):

```bash
pnpm dev
```

3. El servidor buscará automáticamente un puerto disponible (comenzando desde 3000). Verás en la consola el puerto asignado, por ejemplo:
   ```
   QA Web Analyzer server running on http://localhost:3000
   ```
   Abre tu navegador en la URL mostrada en la consola.

4. **Configura las opciones de análisis**: Selecciona qué elementos y atributos quieres verificar:
   - **Elements to Check**: Imágenes, Enlaces, Botones, Inputs, Elementos con Role
   - **Attributes to Check**: Alt Text, aria-label, aria-labelledby, aria-describedby, labels, title

5. **Ingresa la URL** que deseas analizar (puede ser localhost o cualquier URL pública)

6. Haz clic en **"Analyze"** y espera los resultados

7. **Revisa el reporte**: 
   - Cada elemento muestra su código HTML completo
   - Los elementos con problemas se marcan con badges rojos
   - Usa los filtros para mostrar solo elementos con o sin atributos de accesibilidad

8. **Exporta el reporte**: 
   - Haz clic en el botón "📥 Export Report as Image" en la parte superior del reporte
   - El reporte se descargará como una imagen PNG con un nombre descriptivo que incluye la URL analizada y la fecha

## 📊 Ejemplos de URLs

- `http://localhost:3000`
- `http://localhost:8080`
- `https://example.com`
- `https://www.google.com`

## 🏗️ Estructura del Proyecto

```
qa-web-analyzer/
├── src/
│   ├── types/           # Definiciones de tipos TypeScript
│   ├── services/        # Servicios de negocio
│   ├── utils/           # Utilidades
│   └── server.ts        # Servidor Express
├── public/              # Archivos estáticos del frontend
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── dist/                # Código compilado (generado)
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tecnologías

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Playwright (para análisis de páginas)

- **Frontend**:
  - HTML5
  - CSS3 (con variables CSS)
  - JavaScript (ES6+)
  - html2canvas (para exportación de imágenes)

## 📝 Scripts Disponibles

- `pnpm build` - Compila el proyecto TypeScript
- `pnpm start` - Inicia el servidor en modo producción
- `pnpm dev` - Inicia el servidor en modo desarrollo con auto-reload
- `pnpm type-check` - Verifica tipos sin compilar

## 🎨 Mejores Prácticas Implementadas

- ✅ **TypeScript Strict Mode**: Código completamente tipado
- ✅ **Clean Code**: Separación de responsabilidades, funciones pequeñas y descriptivas
- ✅ **SOLID Principles**: Servicios separados, responsabilidades únicas
- ✅ **Accesibilidad**: La herramienta misma sigue buenas prácticas de accesibilidad
- ✅ **Error Handling**: Manejo robusto de errores
- ✅ **Code Organization**: Estructura modular y escalable
- ✅ **Internacionalización**: Soporte multi-idioma

## 🔍 Reglas de Accesibilidad Verificadas

La herramienta verifica las siguientes reglas basadas en WCAG 2.1 y mejores prácticas:

- **Imágenes**: Todas las imágenes deben tener atributo `alt` descriptivo
- **Enlaces**: Enlaces deben tener texto descriptivo o `aria-label`
- **Botones**: Botones deben tener texto visible o `aria-label`
- **Inputs**: Inputs deben tener `<label>` asociado o `aria-label`
- **Roles ARIA**: Elementos con `role` deben tener `aria-label` o `aria-labelledby`

## 🌐 Soporte de Idiomas

La aplicación soporta múltiples idiomas. Puedes cambiar entre Inglés y Español usando el selector de idioma en la interfaz.

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las mejores prácticas de TypeScript y mantener el código limpio y bien documentado.

---

## 📖 README in English

[View README in English](./README.md)

