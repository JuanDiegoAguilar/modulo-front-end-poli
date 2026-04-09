import { NAV_LINKS } from "/src/data/nav-links.js";

(function () {
  const BASE_LINK_CLASS =
    "rounded-lg px-4 py-2 text-sm font-medium no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gray-pampas hover:text-gray-cod";

  const ACTIVE_LINK_CLASS = "bg-gray-pampas text-gray-cod";
  const INACTIVE_LINK_CLASS = "text-gray-dove";

  class AppNavbar extends HTMLElement {
    connectedCallback() {
      const activeLink = (this.getAttribute("active") || "").toLowerCase();
      this.render(activeLink);
    }

    render(keyActiveLink) {
      const header = document.createElement("header");
      header.className =
        "sticky inset-x-0 top-0 z-2 border-b border-gray-cararra bg-[#FAFAF9D9]/85 backdrop-blur-xl";

      const navContainer = document.createElement("div");
      navContainer.className =
        "mx-auto flex h-18 max-w-[1200px] items-center justify-between px-8";

      const logo = document.createElement("a");
      logo.href = NAV_LINKS[0].href;
      logo.className =
        "font-title text-[1.6rem] tracking-tight text-gray-cod no-underline";
      logo.innerHTML = 'Tech<span class="text-blue-royal">Nova</span>';

      const nav = document.createElement("nav");
      nav.className = "flex items-center gap-2";

      NAV_LINKS.forEach(function (link) {
        const isActive = keyActiveLink === link.key;
        const a = document.createElement("a");
        a.href = link.href;
        a.className = `${BASE_LINK_CLASS} ${isActive ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS}`;
        a.textContent = link.label;

        nav.appendChild(a);
      });

      const contactEntry = NAV_LINKS.find(function (link) {
        return link.key === "contacto";
      });
      const navButton = document.createElement("app-button");
      navButton.setAttribute(
        "href",
        contactEntry ? contactEntry.href : "/pages/contacto/"
      );
      navButton.setAttribute("type", "primary");
      navButton.textContent = "Comenzar";
      nav.appendChild(navButton);

      navContainer.appendChild(logo);
      navContainer.appendChild(nav);
      header.appendChild(navContainer);

      this.replaceChildren(header);
    }
  }

  customElements.define("app-navbar", AppNavbar);
})();
