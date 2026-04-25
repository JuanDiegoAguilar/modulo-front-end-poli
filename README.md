# Proyecto para entrega módulo Front End — TechNova

TechNova simula una plataforma empresarial de servicios tecnológicos donde los usuarios pueden explorar, gestionar y guardar como favoritos distintos servicios digitales.

> Esta versión está construida con **Angular 21** + **Tailwind CSS v4** + persistencia en `localStorage`. La versión anterior (HTML + JS + Web Components) queda archivada en [`legacy/`](./legacy) como referencia.

## Tecnologías

| Tecnología                                        | Uso                                              |
| ------------------------------------------------- | ------------------------------------------------ |
| [Angular](https://angular.dev/) 21 (standalone)   | Framework SPA, signals para estado, lazy routes  |
| [Reactive Forms](https://angular.dev/guide/forms) | Validación del formulario de contacto y modal    |
| [Tailwind CSS v4](https://tailwindcss.com/)       | Utilidades de estilos con tokens `@theme`        |
| `localStorage`                                    | Persistencia de servicios y favoritos            |
| Google Fonts                                      | Tipografías _DM Sans_ e _Instrument Serif_       |

## Cómo correr el proyecto

### Requisitos previos

- [Node.js](https://nodejs.org/) ≥ 20
- npm ≥ 10

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/JuanDiegoAguilar/modulo-front-end-poli.git
cd modulo-front-end-poli

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo (http://localhost:4200)
npm start

# Otros comandos disponibles
npm run build       # build de producción a dist/technova
npm run watch       # build de desarrollo con --watch
npm test            # tests con Vitest
```

## Estructura del proyecto

```
modulo-front-end-poli/
├── src/
│   ├── index.html                     # Inyecta Google Fonts y monta <app-root>
│   ├── main.ts                        # bootstrapApplication
│   ├── styles.css                     # @import "tailwindcss" + @theme con tokens del diseño
│   └── app/
│       ├── app.ts                     # Componente raíz (navbar + outlet + footer)
│       ├── app.routes.ts              # Rutas: /, /servicios(/:id), /favoritos, /contacto, /nosotros
│       ├── core/
│       │   ├── models/                # Interfaz Service
│       │   ├── data/                  # Catálogo por defecto, categorías, colores
│       │   └── services/              # StorageService + ServicesStore (signals)
│       ├── shared/                    # Componentes reutilizables
│       │   ├── button/                # <app-button> con variantes primary/secondary/ghost
│       │   ├── navbar/                # Sticky + hamburguesa móvil + RouterLinkActive
│       │   ├── footer/                # 4 columnas, responsive
│       │   ├── service-card/          # Card de servicio con favorito y "Ver más"
│       │   ├── testimonial-card/
│       │   ├── feature-card/          # variants light/dark
│       │   ├── stat/
│       │   ├── contact-info-card/
│       │   ├── empty-state/
│       │   └── modal/                 # Dialog con backdrop, esc to close, scroll lock
│       └── pages/
│           ├── inicio/                # Home: hero + destacados + banner + testimonios + CTA
│           ├── nosotros/              # Misión, visión, valores, banner confianza
│           ├── servicios/
│           │   ├── servicios.component.ts        # Grid + filtros + búsqueda con debounce
│           │   ├── service-detail/               # Ruta hija /servicios/:id
│           │   └── add-service-modal/            # Reactive Form + FormArray + custom validator
│           ├── favoritos/             # Listado + empty state + animación al borrar
│           └── contacto/              # Reactive Form con required + email + success view
├── postcss.config.json                # @tailwindcss/postcss para Tailwind v4
├── angular.json
├── package.json
└── legacy/                            # Versión anterior (HTML + JS + Web Components) como referencia
```

## Despliegue en GitHub Pages

El proyecto incluye un workflow de **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) que hace build y deploy automáticamente en cada push a `main`.

### Pasos para activarlo

1. **Habilita Pages en el repositorio**
   - Entra a `Settings` → `Pages`.
   - En _Build and deployment_ → _Source_, selecciona **GitHub Actions** (no "Deploy from a branch").

2. **Mergea la rama de Angular a `main`**
   ```bash
   git checkout main
   git merge feat/tranformarAngular
   git push origin main
   ```
   El push dispara el workflow.

3. **Verifica el deploy**
   - En la pestaña `Actions` verás el job `Deploy to GitHub Pages` corriendo (~1-2 min).
   - Cuando termine, el sitio queda disponible en:
     ```
     https://<tu-usuario>.github.io/<nombre-del-repo>/
     ```
     Para este proyecto: `https://juandiegoaguilar.github.io/modulo-front-end-poli/`

### Probar el build de Pages localmente (opcional)

```bash
npm run build -- --base-href "/modulo-front-end-poli/"
npx http-server dist/technova/browser -p 8080
# Abre http://localhost:8080/modulo-front-end-poli/
```

> ⚠️ En **Git Bash sobre Windows**, el argumento `/modulo-front-end-poli/` se convierte automáticamente a una ruta absoluta de Windows. Para evitarlo, usa **PowerShell** o **cmd** en lugar de Git Bash, o antepón `MSYS_NO_PATHCONV=1`. En CI (Ubuntu) no pasa.

### Cómo funciona el workflow

- Hace `npm ci` y `npm run build -- --base-href "/<nombre-del-repo>/"` (el `base-href` es necesario porque Pages sirve desde una subruta).
- Copia `index.html` como `404.html` para que el routing de Angular siga funcionando si el usuario refresca en `/servicios`, `/contacto`, etc. (GitHub Pages sirve `404.html` cuando una ruta no existe como archivo, y Angular toma el control desde ahí).
- Sube los archivos de `dist/technova/browser/` y los publica con `actions/deploy-pages@v4`.

## Notas técnicas

- **Persistencia**: el `ServicesStore` lee `technova_services` y `technova_favorites` de `localStorage` al inicializar. Los datos se mantienen entre sesiones.
- **Routing del detalle**: `/servicios/:id` usa una ruta hija. Si el id no existe (porque se borró el servicio), redirige automáticamente a `/servicios`.
- **Responsive design**: todas las páginas se adaptan a móvil (375px), tablet (768px) y desktop (1280px). El navbar usa hamburguesa por debajo de `md`.
- **Validación**: el formulario de contacto usa `Validators.required`, `Validators.email` y un validador custom `trimmedRequired`. El modal de creación añade un validador de grupo para garantizar que se seleccione al menos una modalidad.
