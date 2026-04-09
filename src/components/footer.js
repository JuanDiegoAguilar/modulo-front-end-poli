import { NAV_LINKS } from "/src/data/nav-links.js";
import { getServices } from "/src/js/utils/store.js";

(function () {
  const CONTACT_LINKS = [
    { label: "info@technova.co", href: "mailto:info@technova.co" },
    { label: "+57 300 123 4567", href: "tel:+573001234567" },
    { label: "Medellín, Colombia", href: "#" },
    { label: "Formulario", href: "/pages/contacto/" },
  ];

  function getServiceLinks() {
    const services = getServices();

    if (!services || !services.length) {
      return [];
    }

    // Solo se mostrarán 4 servicios aleatoriamente para no saturar el footer con la cantidad almacenada.
    return services
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((s) => ({ label: s.title, href: "#" + s.id }));
  }

  function createLinks(links) {
    return links.map(function (link) {
      const a = document.createElement("a");
      a.href = link.href;
      a.className =
        "block py-1 text-sm text-gray-dove no-underline transition-colors duration-300 hover:text-gray-cod";

      if (link.href === "#") {
        a.className += " pointer-events-none";
      }

      a.textContent = link.label;
      return a;
    });
  }

  function createColumn(title, links) {
    const div = document.createElement("div");

    const h4 = document.createElement("h4");
    h4.className =
      "mb-4 text-[0.8rem] font-semibold uppercase tracking-wider text-gray-dove";
    h4.textContent = title;
    div.appendChild(h4);

    createLinks(links).forEach(function (a) {
      div.appendChild(a);
    });

    return div;
  }

  class AppFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const footer = document.createElement("footer");
      footer.className = "border-t border-gray-cararra bg-white";

      const container = document.createElement("div");
      container.className = "mx-auto max-w-[1200px] px-8 pb-8 pt-16";

      const grid = document.createElement("div");
      grid.className =
        "mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]";

      const brandDiv = document.createElement("div");

      const logoLink = document.createElement("a");
      logoLink.href = "/";
      logoLink.className =
        "mb-3 block font-title text-[1.4rem] tracking-tight text-gray-cod no-underline";
      logoLink.innerHTML = 'Tech<span class="text-blue-600">Nova</span>';

      const description = document.createElement("p");
      description.className =
        "max-w-[280px] text-[0.88rem] leading-relaxed text-gray-dove";
      description.textContent =
        "Plataforma integral de servicios tecnológicos para empresas que buscan innovar y crecer.";

      brandDiv.appendChild(logoLink);
      brandDiv.appendChild(description);

      grid.appendChild(brandDiv);
      grid.appendChild(createColumn("Plataforma", NAV_LINKS));
      grid.appendChild(createColumn("Servicios", getServiceLinks()));
      grid.appendChild(createColumn("Contacto", CONTACT_LINKS));

      container.appendChild(grid);
      footer.appendChild(container);

      this.replaceChildren(footer);
    }
  }

  customElements.define("app-footer", AppFooter);
})();
