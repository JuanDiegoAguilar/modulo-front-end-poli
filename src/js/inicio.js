import { getServices } from "/src/js/utils/store.js";

(function () {
  function createServiceCard(service) {
    var card = document.createElement("div");
    card.className =
      "group relative cursor-pointer overflow-hidden rounded-[20px] border border-gray-cararra bg-white p-7 transition-all duration-300 ease hover:-translate-y-1 hover:border-gray-cod hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]";
    card.setAttribute("data-service-id", service.id || "");
    card.style.cursor = "pointer";

    card.addEventListener("click", function () {
      window.location.href = "/pages/servicios/?id=" + (service.id || "");
    });

    var arrow = document.createElement("div");
    arrow.className =
      "absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-cararra text-[0.85rem] text-gray-dusty transition-all duration-300 ease group-hover:border-gray-cod group-hover:bg-gray-cod group-hover:text-white";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    var iconWrap = document.createElement("div");
    iconWrap.className = `mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-2xl ${service.color || ""}`;
    iconWrap.textContent = service.emoji || "";

    var title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold";
    title.textContent = service.title || "";

    var desc = document.createElement("p");
    desc.className =
      "mb-5 text-[0.9rem] leading-relaxed text-gray-dove line-clamp-3";
    desc.textContent = service.description || "";

    var tag = document.createElement("span");
    tag.className =
      "inline-block rounded-md bg-gray-pampas px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wide text-gray-dove";
    tag.textContent = service.category || "";

    card.appendChild(arrow);
    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tag);

    return card;
  }

  function showMessageEmptyServices(container) {
    container.replaceChildren();

    var p = document.createElement("p");
    p.className =
      "col-span-full py-7 text-center text-gray-dove text-3xl italic font-light";
    p.textContent = "No hay servicios disponibles.";

    container.appendChild(p);
  }

  function initServices() {
    var container = document.getElementById("services-grid");

    if (!container) return;

    // Tomaremos aleatoriamente 6 servicios para mostrar en la página de inicio.
    var randomServices = getServices()
      ?.sort(() => Math.random() - 0.5)
      .slice(0, 6);

    if (!randomServices || !randomServices.length) {
      showMessageEmptyServices(container);
      return;
    }

    for (var i = 0; i < randomServices.length; i++) {
      container.appendChild(createServiceCard(randomServices[i]));
    }
  }

  initServices();
})();
