# Generador de Gráficos

Herramienta interactiva para generar gráficos de métricas (NPS, CES, ISN, funnels, barras y composición), reescrita en **React + Vite + TypeScript** usando **shadcn/ui** y **Recharts**.

🔗 **En vivo:** https://hogox.github.io/charts-gen/

## 🚀 Características

- **8 tipos de gráficos**: NPS línea, CES, ISN, Línea simple, Funnel, Composición, Barras, Avance
- **Edición en tiempo real**: los gráficos se actualizan mientras escribes
- **Persistencia local**: los datos se guardan en tu navegador (localStorage) — nunca se envían a un servidor
- **Descarga PNG**: exporta cualquier gráfico como imagen
- **Accesible**: navegación por teclado y etiquetas ARIA

## 🛠️ Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) — componentes y `chart` (sobre [Recharts](https://recharts.org/))
- [Zustand](https://zustand-demo.pmnd.rs/) con `persist` para el estado
- [html-to-image](https://github.com/bubkoo/html-to-image) para la exportación PNG

## 💻 Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5183/charts-gen/)
npm run build      # build de producción a /dist
npm run preview    # previsualiza el build
```

## 📦 Estructura

```
src/
  components/
    charts/     # gráficos (Recharts + Tailwind)
    editors/    # editores del panel lateral
    layout/     # header, sidebar, panel de vista previa
    ui/         # componentes shadcn/ui
  store/        # estado Zustand (persistido en localStorage)
  lib/          # helpers (formato es-CL, funnel, defaults, colores)
  types/        # modelos de datos
legacy/         # versión original de archivo único (HTML + Chart.js)
```

## 🚢 Despliegue

Automático vía GitHub Actions a GitHub Pages en cada push a `main`
(ver [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## 📄 Licencia

Libre para usar y modificar.
