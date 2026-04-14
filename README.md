# Proyecto para entrega módulo Front End - TechNova

TechNova simula una plataforma empresarial de servicios tecnológicos donde los usuarios pueden explorar, gestionar y guardar como favoritos distintos servicios digitales.

## Información importante

El proyecto utiliza **Web Components** (`customElements.define`) que es nativo de JS con el objetivo de encapsular y reutilizar elementos comunes en todas las páginas teniendo en cuenta que no se está utilizando ningún framework.

Adicionalmente, para que los componentes se compartan de forma global, se importan una única vez en `src/main.js` y quedan disponibles en cualquier página que lo incluya, esto mediante el uso de módulos (`<script type="module">`). Teniendo en cuenta lo anterior, es importante que el proyecto se ejecute desde un servidor local (ej. Live Server en VS Code) para evitar problemas al cargar los módulos.

## Paso a paso para ejecutar en un servidor local

La forma más sencilla es usar la extensión **Live Server** de VS Code.

### Paso a paso

**1. Abrir el proyecto en VS Code**

```bash
# Clonar el repositorio
git clone https://github.com/JuanDiegoAguilar/modulo-front-end-poli.git
```

Abrir VS Code y presionar en: `Archivo → Abrir carpeta…` y selecciona la raíz del proyecto.

**2. Instalar la extensión Live Server**

- Ir a la pestaña de **Extensiones**
- Buscar **Live Server** - [Link marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Hacer clic en **Instalar**

**3. Lanzar el servidor**

Con el proyecto abierto, hacer clic en el botón **Go Live** que aparece en la barra de estado inferior de VS Code (esquina inferior derecha).

> **Alternativa:** hacer clic derecho sobre `index.html` en el explorador de archivos y seleccionar _"Open with Live Server"_.

## Tecnologías utilizadas

| Tecnología                                        | Uso                                             |
| ------------------------------------------------- | ----------------------------------------------- |
| HTML5 / CSS3                                      | Estructura y estilos                            |
| JavaScript (ES Modules)                           | Lógica de renderizado e interacción del cliente |
| [Tailwind CSS v4](https://tailwindcss.com/) (CDN) | Utilidades de estilos                           |
| Web Components                                    | Componentes reutilizables                       |
| `localStorage`                                    | Persistencia de servicios y favoritos           |
| Google Fonts                                      | Tipografías _DM Sans_ e _Instrument Serif_      |

## Estructura del proyecto

```
modulo-front-end-poli/
├── index.html
├── tailwind.config.js
├── pages/
└── src/
    ├── main.js                 # Importa componentes y estilos globales de Tailwind
    ├── style.css               # Estilos base
    ├── components/             # Web Components reutilizables
    │   ├── navbar.js           # <app-navbar>
    │   ├── button.js           # <app-button>
    │   ├── footer.js           # <app-footer>
    │   └── modal.js            # <app-modal>
    ├── css/                    # Estilos específicos por página
    ├── js/                     # Lógica por página
    │   └── utils/
    │       └── store.js        # Almacenamiento con localStorage
    ├── data/
    │   ├── default-services.js # Datos de servicios por defecto
    │   └── nav-links.js        # Enlaces de navegación
    └── assets/                 # Íconos e imágenes
```
