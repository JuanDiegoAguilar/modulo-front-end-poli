(function () {
  class AppModal extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.style.display = "none";

      const overlay = document.createElement("div");
      overlay.className =
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm";

      const panel = document.createElement("div");
      panel.className =
        "relative w-full max-w-lg max-h-[90vh] rounded-2xl bg-white shadow-xl flex flex-col";

      this._header = document.createElement("div");
      this._header.className =
        "flex items-center justify-between px-6 py-4 border-b border-gray-cararra flex-shrink-0";

      const title = this.getAttribute("title") || "";
      this._title = document.createElement("h2");
      this._title.className =
        "font-title text-[1.6rem] text-gray-cod leading-tight";
      this._title.textContent = title;

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.innerHTML = `✕`;
      closeBtn.className =
        "flex size-8 items-center justify-center rounded-full text-gray-dusty hover:bg-gray-pampas hover:text-gray-cod transition-colors cursor-pointer flex-shrink-0";
      closeBtn.addEventListener("click", () => this.close());

      this._header.appendChild(this._title);
      this._header.appendChild(closeBtn);

      this._body = document.createElement("div");
      this._body.className = "p-6 flex flex-col gap-4 overflow-y-auto";
      [...this.childNodes].forEach((node) => this._body.appendChild(node));

      this._footer = document.createElement("div");
      this._footer.className =
        "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-cararra flex-shrink-0";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.textContent = "Cancelar";
      cancelBtn.className =
        "inline-flex items-center rounded-lg border border-gray-cararra bg-white px-5 py-2 text-sm font-medium text-gray-cod hover:bg-gray-pampas transition-all duration-300 cursor-pointer";
      cancelBtn.addEventListener("click", () => this.close());

      const submitText = this.getAttribute("submit-text") || "Guardar";
      const submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className =
        "inline-flex items-center rounded-lg bg-gray-cod px-5 py-2 text-sm font-medium text-white hover:opacity-85 transition-all duration-300 cursor-pointer";
      submitBtn.textContent = submitText;

      submitBtn.addEventListener("click", () => {
        const form = this._body.querySelector("form");

        if (form) {
          form.requestSubmit();
        }
      });

      this._footer.appendChild(cancelBtn);
      this._footer.appendChild(submitBtn);

      panel.appendChild(this._header);
      panel.appendChild(this._body);
      panel.appendChild(this._footer);
      overlay.appendChild(panel);

      this._overlay = overlay;
      this.appendChild(overlay);
    }

    open() {
      this.style.display = "";
      document.body.style.overflow = "hidden";

      this.dispatchEvent(new CustomEvent("modal-open", { bubbles: true }));
    }

    close() {
      this.style.display = "none";
      document.body.style.overflow = "";

      this.dispatchEvent(new CustomEvent("modal-close", { bubbles: true }));
    }
  }

  customElements.define("app-modal", AppModal);
})();
