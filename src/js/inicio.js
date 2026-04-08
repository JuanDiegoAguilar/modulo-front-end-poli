(function () {
  "use strict";

  var SERVICES_URL = "/src/data/services.json";

  var THEME_ICON_CLASSES = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-violet-50 text-violet-600",
  };

  function themeIconClass(iconTheme) {
    return THEME_ICON_CLASSES[iconTheme] || THEME_ICON_CLASSES.blue;
  }

  function createServiceCard(service) {
    var card = document.createElement("div");
    card.className =
      "group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#E5E5E0] bg-white p-7 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-[#9B9B9B] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]";
    card.setAttribute("data-service-id", service.id || "");

    var arrow = document.createElement("div");
    arrow.className =
      "absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E0] text-[0.85rem] text-[#9B9B9B] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-[#0D0D0D] group-hover:bg-[#0D0D0D] group-hover:text-white";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    var iconWrap = document.createElement("div");
    iconWrap.className =
      "mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-2xl " +
      themeIconClass(service.iconTheme);
    iconWrap.textContent = service.icon || "";

    var title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold";
    title.textContent = service.title || "";

    var desc = document.createElement("p");
    desc.className = "mb-5 text-[0.9rem] leading-relaxed text-[#6B6B6B]";
    desc.textContent = service.description || "";

    var tag = document.createElement("span");
    tag.className =
      "inline-block rounded-md bg-[#F5F5F0] px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wide text-[#9B9B9B]";
    tag.textContent = service.tag || "";

    card.appendChild(arrow);
    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tag);

    return card;
  }

  function showState(container, message) {
    container.replaceChildren();
    var p = document.createElement("p");
    p.className =
      "col-span-full py-7 text-center text-gray-dove text-3xl italic font-light";
    p.textContent = message;
    container.appendChild(p);
  }

  function renderServices(container, list) {
    container.replaceChildren();
    if (!list || !list.length) {
      showState(container, "No hay servicios disponibles.");
      return;
    }
    for (var i = 0; i < list.length; i++) {
      container.appendChild(createServiceCard(list[i]));
    }
  }

  function initServices() {
    var container = document.getElementById("services-grid");
    if (!container) return;

    showState(container, "Cargando servicios…");

    fetch(SERVICES_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("No se pudo cargar el catálogo");
        return res.json();
      })
      .then(function (data) {
        var services = data && data.services ? data.services : [];
        renderServices(container, services);
      })
      .catch(function () {
        showState(container, "No hay servicios disponibles.");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServices);
  } else {
    initServices();
  }
})();
