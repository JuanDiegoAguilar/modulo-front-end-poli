// Inyección de variables personalizadas de Tailwind para no repetir en cada página.
const tailwindCustomStyle = document.createElement("style");
tailwindCustomStyle.setAttribute("type", "text/tailwindcss");
tailwindCustomStyle.textContent = `
  @theme {
    --color-gray-pampas: #f5f3f0;
    --color-gray-cararra: #e5e5e0;
    --color-gray-cod: #1a1a1a;
    --color-gray-dove: #6b6b6b;
    --color-gray-dusty: #9B9B9B;
    --color-blue-royal: #2563eb;

    --font-primary: "DM Sans", sans-serif;
    --font-title: "Instrument Serif", serif;
  }

  @layer components {
    .page-container {
      @apply mx-auto max-w-[1200px] px-8 pb-25 pt-22;
    }

    .icon-black {
      filter: brightness(0);
    }
  }
`;

document.head.prepend(tailwindCustomStyle);

// Importación de componentes globales.
import "./components/button.js";
import "./components/navbar.js";
import "./components/footer.js";
import "./components/modal.js";
