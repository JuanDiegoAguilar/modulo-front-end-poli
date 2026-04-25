(function () {
  const BASE_BUTTON_CLASS =
    "inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium no-underline transition-all duration-300 cursor-pointer";

  const TYPES = {
    primary: `${BASE_BUTTON_CLASS} bg-gray-cod text-white hover:opacity-[0.85]`,
    secondary: `${BASE_BUTTON_CLASS} border border-gray-cararra bg-white text-gray-cod hover:bg-gray-pampas`,
    basic: `${BASE_BUTTON_CLASS}`,
  };

  class AppButton extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const href = this.getAttribute("href");
      const type = this.getAttribute("type") || "primary";
      const customClass = this.getAttribute("custom-class") || "";
      const className = `${TYPES[type] ?? TYPES.primary} ${customClass}`.trim();

      const isLink = href !== null;
      /** @type {HTMLElement} */
      let element;

      if (isLink) {
        element = document.createElement("a");
        element.href = href;
      } else {
        element = document.createElement("button");
        element.type = "button";
      }

      element.innerHTML = this.innerHTML;
      element.className = className;

      this.replaceChildren(element);
    }
  }

  customElements.define("app-button", AppButton);
})();
