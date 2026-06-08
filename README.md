# Generador de Gráficos

Herramienta interactiva para generar gráficos de métricas (NPS, CES, ISN, funnels, barras y composición).

## 🚀 Características

- **Tipos de gráficos**: NPS línea, CES, ISN, Línea simple, Funnel, Composición, Barras, Avance
- **Edición en tiempo real**: Actualiza los gráficos mientras escribes
- **Persistencia local**: Los datos se guardan en tu navegador (localStorage)
- **Descarga**: Exporta gráficos como PNG
- **Sin dependencias**: Funciona como archivo HTML estático

## 📋 Tipos de gráficos soportados

| Tipo | Descripción |
|------|-------------|
| **NPS línea** | Evolución del NPS con tarjetas KPI y distribución |
| **CES** | Customer Effort Score con línea de evolución |
| **ISN** | Index de Satisfacción Neta |
| **Línea simple** | Gráfico de línea con meta configurable |
| **Funnel** | Embudo de conversión con pasos ajustables |
| **Composición** | Gráfico apilado de segmentos |
| **Barras** | Barras horizontales porcentuales |
| **Avance** | Barra de progreso apilada |

## 🔧 Cómo usar

### Opción 1: Archivo local
Descarga `generador-graficos-v1.html` y abre en tu navegador:
```bash
open generador-graficos-v1.html
```

### Opción 2: Hospedaje web
Hospeda el archivo en cualquier servidor HTTP (GitHub Pages, Vercel, Netlify, etc.)

## 💾 Persistencia de datos

- Los datos se guardan automáticamente en `localStorage` del navegador
- Usa el botón "↺ Restablecer ejemplos" para volver a los datos de muestra
- Los datos **no** se envían a ningún servidor

## 🎨 Personalización

Todos los datos y títulos son editables directamente en la interfaz:

1. Selecciona el tipo de gráfico
2. Edita el título y las tarjetas KPI
3. Agrega/modifica puntos de datos
4. Actualiza el gráfico
5. Descarga como PNG

## 📦 Detalles técnicos

- **Framework**: Chart.js 4.4.1
- **Tamaño**: Archivo único (~80 KB)
- **Navegadores**: Chrome, Firefox, Safari, Edge (todos los modernos)
- **Accesibilidad**: WCAG 2.1 Level AA

## 📝 Cambios v1.4

- Versión despersonalizada sin logos ni datos reales
- Datos de ejemplo genéricos
- Datos viven solo en el navegador del usuario
- Apta para hospedaje público

## 📄 Licencia

Libre para usar y modificar.
