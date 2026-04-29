# TechNova — Módulo Front End

Es una plataforma empresarial de servicios tecnológicos donde los usuarios pueden explorar, gestionar y guardar como favoritos distintos servicios digitales.

**Enlace del proyecto:** [juandiegoaguilar.github.io/modulo-front-end-poli](https://juandiegoaguilar.github.io/modulo-front-end-poli/)

## Funcionalidades

Dentro de TechNova, los usuarios pueden:

- **Explorar servicios** — catálogo con búsqueda de texto y filtros por categoría.
- **Detalle de servicio** — vista individual con información completa del servicio.
- **Agregar servicio** — opción para añadir nuevos servicios al catálogo mediante un formulario.
- **Favoritos** — marcar/desmarcar servicios y verlos en la página de favoritos.
- **Contacto** — formulario de contacto con validación.


## Inicio rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 20
- npm ≥ 10

### Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/JuanDiegoAguilar/modulo-front-end-poli.git
cd modulo-front-end-poli

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm start
```

## Estructura del proyecto

```
modulo-front-end-poli/
├── src/
│   ├── index.html                  
│   ├── main.ts                     
│   ├── styles.css                  
│   └── app/
│       ├── app.ts                  # Componente raíz (navbar + enrutador + footer)
│       ├── app.routes.ts           # Definición de rutas
│       ├── app.config.ts           # Configuración de la aplicación
│       │
│       ├── core/                   
│       │   ├── models/             
│       │   ├── data/               # Catálogo por defecto, categorías y colores
│       │   └── services/
│       │       ├── storage.service.ts       # Servicio para persistencia en localStorage
│       │       └── services-store.service.ts
│       │
│       ├── shared/                 # Componentes reutilizables
│       │
│       └── pages/
│           ├── inicio/             
│           ├── nosotros/           
│           ├── servicios/
│           ├── favoritos/         
│           └── contacto/           
│
├── .github/workflows/deploy.yml   # CI/CD → GitHub Pages
├── .postcssrc.json                 
├── angular.json
└── package.json
```

---

## Despliegue en GitHub Pages

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) hace build y deploy automáticamente en cada push a `main`.

### Probar el build de Pages localmente

```bash
npm run build -- --base-href "/modulo-front-end-poli/"
npx http-server dist/technova/browser -p 8080
# Abre http://localhost:8080/modulo-front-end-poli/
```

> ⚠️ En **Git Bash sobre Windows** el argumento `/modulo-front-end-poli/` se interpreta como ruta absoluta de Windows. Usa **PowerShell**, **cmd** o antepón `MSYS_NO_PATHCONV=1`. En el CI (Ubuntu) no ocurre.

### Cómo funciona el workflow

1. `npm ci` + `npm run build -- --base-href "/<repo>/"` — el `base-href` es obligatorio porque Pages sirve desde una subruta.
2. Copia `index.html` → `404.html` para que el router de Angular funcione al refrescar en rutas como `/servicios` o `/contacto`.
