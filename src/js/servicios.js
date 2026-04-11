import { CATEGORIES } from "/src/data/default-services.js";
import {
  getServices,
  getFavorites,
  toggleFavorite,
} from "/src/js/utils/store.js";
import { showServiceDetail } from "/src/js/servicio-detalle.js";
import { openAddServiceModal } from "/src/js/servicio-creacion.js";

(function () {
  let activeCategory = "all";
  let searchQuery = "";
  let searchTimeoutId = null;

  function showGrid() {
    const url = new URL(window.location);
    url.searchParams.delete("id");
    window.history.pushState({}, "", url);

    const gridView = document.getElementById("grid-view");
    const detailView = document.getElementById("detail-view");

    if (detailView) {
      detailView.className = "hidden";
      detailView.replaceChildren();
    }
    if (gridView) gridView.classList.remove("hidden");

    renderGrid();
  }

  function openDetailView(serviceId) {
    showServiceDetail(serviceId, showGrid);
  }

  function createAddCard() {
    const card = document.createElement("button");
    card.type = "button";
    card.className =
      "flex min-h-[350px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-cararra bg-transparent text-gray-dusty transition-all duration-300 hover:border-gray-cod hover:text-gray-cod cursor-pointer";

    const circle = document.createElement("div");
    circle.className =
      "flex size-[56px] items-center justify-center rounded-full border-2 border-dashed border-inherit text-2xl leading-none";
    circle.setAttribute("aria-hidden", "true");
    circle.textContent = "+";

    const label = document.createElement("span");
    label.className = "text-sm font-medium";
    label.textContent = "Agregar nuevo servicio";

    card.appendChild(circle);
    card.appendChild(label);

    card.addEventListener("click", () => openAddServiceModal(renderGrid));

    return card;
  }

  function getFavoriteBtnClass(isFavorite) {
    return (
      "flex size-[36px] items-center justify-center rounded-full border transition-all duration-200 cursor-pointer" +
      (isFavorite
        ? " border-red-200 bg-red-50 text-red-500"
        : " border-gray-cararra text-gray-dusty hover:border-red-200 hover:bg-red-50 hover:text-red-500")
    );
  }

  function getActionsToServiceCard(service, isFavorite) {
    const actions = document.createElement("div");
    actions.className = "flex items-center justify-between";

    const viewMore = document.createElement("button");
    viewMore.type = "button";
    viewMore.className =
      "inline-flex items-center gap-1 text-base font-semibold text-blue-royal transition-opacity hover:opacity-70 cursor-pointer";
    viewMore.innerHTML =
      'Ver más <span aria-hidden="true" class="leading-none">→</span>';

    viewMore.addEventListener("click", function () {
      openDetailView(service.id);
    });

    const favoriteBtn = document.createElement("button");
    favoriteBtn.type = "button";
    favoriteBtn.className = getFavoriteBtnClass(isFavorite);

    favoriteBtn.innerHTML = `<span class="text-base leading-none" aria-hidden="true">
        ${isFavorite ? "♥" : "♡"}
      </span>`;

    favoriteBtn.setAttribute("data-favorite", isFavorite ? "true" : "false");

    favoriteBtn.addEventListener("click", function () {
      const isNowFavorite = toggleFavorite(service.id).includes(service.id);

      favoriteBtn.setAttribute(
        "data-favorite",
        isNowFavorite ? "true" : "false",
      );
      favoriteBtn.className = getFavoriteBtnClass(isNowFavorite);
      favoriteBtn.querySelector("span").textContent = isNowFavorite ? "♥" : "♡";
    });

    actions.appendChild(viewMore);
    actions.appendChild(favoriteBtn);

    return actions;
  }

  function createServiceCard(service, isFavorite) {
    const card = document.createElement("div");
    card.className =
      "flex min-h-[350px] flex-col rounded-2xl border border-gray-cararra bg-white overflow-hidden transition-all duration-300 ease hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]";
    card.setAttribute("data-service-id", service.id);

    const iconArea = document.createElement("div");
    iconArea.className =
      "flex items-center justify-center bg-gray-pampas flex-shrink-0 py-8";
    iconArea.style.minHeight = "200px";

    const emojiSpan = document.createElement("span");
    emojiSpan.className = "text-5xl leading-none select-none";
    emojiSpan.textContent = service.emoji;
    iconArea.appendChild(emojiSpan);

    const content = document.createElement("div");
    content.className = "flex flex-1 flex-col p-6";

    const category = document.createElement("span");
    category.className =
      "mb-[.9em] text-[.7rem] font-semibold uppercase tracking-wider text-blue-royal";
    category.textContent = service.category || "";

    const title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold text-gray-cod";
    title.textContent = service.title || "";

    const description = document.createElement("p");
    description.className = "mb-5 flex-1 text-sm leading-relaxed line-clamp-3";
    description.textContent = service.description || "";

    const actions = getActionsToServiceCard(service, isFavorite);

    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(actions);

    card.appendChild(iconArea);
    card.appendChild(content);

    return card;
  }

  function getFilteredServices() {
    const services = getServices();

    return services.filter((service) => {
      const matchesCategory =
        activeCategory === "all" || service.category === activeCategory;

      const matchesSearch =
        !searchQuery ||
        service.title.toLowerCase().includes(searchQuery) ||
        service.description.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }

  function renderGrid() {
    const container = document.getElementById("services-grid");

    if (!container) return;

    const filteredServices = getFilteredServices();
    const favorites = getFavorites();

    // Limpiamos la vista para renderizar según el filtro aplicado.
    container.replaceChildren();

    if (!filteredServices.length) {
      const emptyText = document.createElement("p");
      emptyText.className =
        "col-span-full py-16 text-center text-gray-dusty text-lg italic";
      emptyText.textContent = "No se encontraron servicios.";

      const br = document.createElement("br");
      emptyText.appendChild(br);

      const btnAddService = document.createElement("app-button");
      btnAddService.textContent = "Agregar nuevo servicio";
      btnAddService.setAttribute("custom-class", "mt-3 cursor-pointer");

      btnAddService.addEventListener("click", () =>
        openAddServiceModal(renderGrid),
      );
      emptyText.appendChild(btnAddService);

      container.appendChild(emptyText);

      return;
    }

    filteredServices.forEach(function (service) {
      container.appendChild(
        createServiceCard(service, favorites.includes(service.id)),
      );
    });

    container.appendChild(createAddCard());
  }

  function initSearch() {
    const input = document.getElementById("services-search");

    if (!input) return;

    input.addEventListener("input", function () {
      clearTimeout(searchTimeoutId);

      // Utilizamos un timeout para evitar aplicar el filtro inmediatamente mientras se está escribiendo.
      searchTimeoutId = setTimeout(function () {
        searchQuery = input.value.trim().toLowerCase();
        applyFilters();
      }, 280);
    });
  }

  function applyFilters() {
    renderGrid();
  }

  function getTagClass(isActive) {
    const base =
      "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer border";

    return isActive
      ? `${base} bg-gray-cod text-white border-gray-cod`
      : `${base} bg-transparent text-gray-dove border-gray-cararra hover:border-gray-cod hover:text-gray-cod`;
  }

  function createFilterBtn(text, category) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.className = getTagClass(activeCategory === category);
    btn.setAttribute("data-category", category);

    btn.addEventListener("click", function () {
      activeCategory = category;

      const categoryFilters = document.querySelectorAll("[data-category]");

      categoryFilters.forEach(function (btn) {
        const cat = btn.dataset.category;

        btn.className = getTagClass(activeCategory === cat);
      });

      applyFilters();
    });

    return btn;
  }

  function initCategoryFilters() {
    const filterContainer = document.getElementById("category-filters");

    if (!filterContainer) return;

    filterContainer.appendChild(createFilterBtn("Todos", "all"));

    CATEGORIES.forEach(function (cat) {
      filterContainer.appendChild(createFilterBtn(cat, cat));
    });
  }

  function showSpecificView() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id");

    if (serviceId) {
      openDetailView(serviceId);
      return;
    }

    renderGrid();
  }

  function init() {
    initCategoryFilters();
    initSearch();

    showSpecificView();
  }

  // Evento para detectar navegación hacia el detalle de un servicio o volver a la vista principal sin necesidad de recargar la página.
  window.addEventListener("popstate", showSpecificView);

  init();
})();
