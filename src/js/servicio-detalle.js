import {
  getServices,
  getFavorites,
  toggleFavorite,
  deleteService,
} from "/src/js/utils/store.js";

/**
 * @param {Object} service
 * @param {Function} onBack
 * @returns {HTMLElement}
 */
function createBreadcrumb(service, onBack) {
  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "flex items-center gap-2 text-sm text-gray-dove";

  const servicesPageLink = document.createElement("a");
  servicesPageLink.href = "/pages/servicios/";
  servicesPageLink.className =
    "hover:text-gray-cod transition-colors cursor-pointer";
  servicesPageLink.textContent = "Servicios";
  servicesPageLink.addEventListener("click", (e) => {
    e.preventDefault();
    onBack();
  });

  const separator = document.createElement("span");
  separator.textContent = "/";

  const serviceTitle = document.createElement("span");
  serviceTitle.className = "truncate";
  serviceTitle.textContent = service.title;

  breadcrumb.appendChild(servicesPageLink);
  breadcrumb.appendChild(separator);
  breadcrumb.appendChild(serviceTitle);

  return breadcrumb;
}

/**
 * @param {Object} service
 * @returns {HTMLElement}
 */
function createLeftColumn(service) {
  const leftCol = document.createElement("div");
  leftCol.className =
    "flex-shrink-0 flex flex-1 flex-col gap-4 rounded-2xl bg-[#FFEDD5] p-5 min-h-[400px] text-center";

  const category = document.createElement("span");
  category.className =
    "rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-royal w-max";
  category.textContent = service.category || "";

  const emojiWrap = document.createElement("div");
  emojiWrap.className = "flex flex-1 items-center justify-center";

  const emoji = document.createElement("span");
  emoji.className = "text-8xl leading-none select-none";
  emoji.textContent = service.emoji || "";

  emojiWrap.appendChild(emoji);
  leftCol.appendChild(category);
  leftCol.appendChild(emojiWrap);

  return leftCol;
}

/**
 * @param {HTMLDivElement} container
 * @param {Object} service
 */
function addServiceInformation(container, service) {
  const category = document.createElement("span");
  category.className =
    "text-xs font-semibold uppercase tracking-wider text-blue-royal";
  category.textContent = service.category || "";

  const title = document.createElement("h1");
  title.className = "font-title text-[2.6rem] leading-tight text-gray-cod";
  title.textContent = service.title || "";

  const description = document.createElement("p");
  description.className = "text-[1rem] leading-relaxed text-gray-dove";
  description.textContent = service.description || "";

  container.appendChild(category);
  container.appendChild(title);
  container.appendChild(description);
}

/**
 * @param {Object} service
 * @param {boolean} isFavorite
 * @param {Function} onBack
 * @returns {HTMLElement}
 */
function createRightColumn(service, isFavorite, onBack) {
  const rightCol = document.createElement("div");
  rightCol.className = "flex flex-1 flex-col gap-3";

  addServiceInformation(rightCol, service);

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-3 mt-2";

  const contactBtn = document.createElement("app-button");
  contactBtn.setAttribute("href", "/pages/contacto/");
  contactBtn.innerHTML = `Contactar <img src="/src/assets/icons/arrow.svg" alt="" aria-hidden="true" />`;
  contactBtn.setAttribute("type", "basic");
  contactBtn.setAttribute(
    "custom-class",
    "px-6 py-3 text-sm bg-blue-royal text-white hover:bg-blue-royal/90",
  );

  const getFavoriteClass = (active) =>
    "border px-6 py-3 text-sm " +
    (active
      ? "border-red-200 bg-red-50 text-red-500"
      : "border-gray-cararra text-gray-cod hover:border-red-200 hover:bg-red-50 hover:text-red-500");

  const getFavoriteText = (active) =>
    active ? "♥ En favoritos" : "♡ Agregar a favoritos";

  const favoriteBtn = document.createElement("app-button");
  favoriteBtn.setAttribute("type", "basic");
  favoriteBtn.setAttribute("custom-class", getFavoriteClass(isFavorite));
  favoriteBtn.textContent = getFavoriteText(isFavorite);

  favoriteBtn.addEventListener("click", () => {
    const isNowFavorite = toggleFavorite(service.id).includes(service.id);
    const btn = favoriteBtn.querySelector("button");

    btn.className = btn.className.replace(
      getFavoriteClass(!isNowFavorite),
      getFavoriteClass(isNowFavorite),
    );
    btn.textContent = getFavoriteText(isNowFavorite);
  });

  const deleteBtn = document.createElement("app-button");
  deleteBtn.setAttribute("type", "basic");
  deleteBtn.setAttribute(
    "custom-class",
    "border border-[#FECACA] px-6 py-3 text-sm text-red-500 hover:border-red-300 hover:bg-red-50",
  );
  deleteBtn.textContent = "🗑 Eliminar servicio";
  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm(
      "¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.",
    );

    if (confirmed) {
      deleteService(service.id);
      onBack();
    }
  });

  actions.appendChild(contactBtn);
  actions.appendChild(favoriteBtn);
  actions.appendChild(deleteBtn);

  rightCol.appendChild(actions);

  return rightCol;
}

/**
 * @param {Array} related
 * @param {Function} createCard
 * @returns {HTMLElement}
 */
function createRelatedServicesSection(relatedServices, onBack) {
  const section = document.createElement("section");
  section.className = "flex flex-col gap-8 mt-10";

  const title = document.createElement("h2");
  title.className = "text-3xl font-title text-gray-cod tracking-tight ";
  title.textContent = "Servicios relacionados";
  section.appendChild(title);

  if (!relatedServices.length) {
    const empty = document.createElement("p");
    empty.className = "text-gray-dove italic";
    empty.textContent = "No hay servicios relacionados disponibles.";

    section.appendChild(empty);

    return section;
  }

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  relatedServices.forEach((service) => {
    const card = document.createElement("div");
    card.className =
      "flex gap-4 rounded-lg border border-gray-cararra p-6 bg-white cursor-pointer hover:bg-gray-pampas transition-colors";

    card.addEventListener("click", () => showServiceDetail(service.id, onBack));

    const emojiWrap = document.createElement("div");
    emojiWrap.className = `flex size-[48px] items-center justify-center rounded-xl text-2xl ${service.color}`;

    const emoji = document.createElement("span");
    emoji.textContent = service.emoji || "";
    emojiWrap.appendChild(emoji);

    const info = document.createElement("div");
    info.className = "flex flex-col";

    const title = document.createElement("h3");
    title.className = "font-semibold text-gray-cod";
    title.textContent = service.title;

    const category = document.createElement("span");
    category.className = "text-xs tracking-wider text-gray-dusty";
    category.textContent = service.category;

    info.appendChild(title);
    info.appendChild(category);
    card.appendChild(emojiWrap);
    card.appendChild(info);

    grid.appendChild(card);
  });

  section.appendChild(grid);

  return section;
}

export function showServiceDetail(serviceId, onBack) {
  const services = getServices();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    onBack();
    return;
  }

  const url = new URL(window.location);
  url.searchParams.set("id", serviceId);
  window.history.pushState({ serviceId }, "", url);

  const gridView = document.getElementById("grid-view");
  const detailView = document.getElementById("detail-view");

  if (gridView) {
    gridView.classList.add("hidden");
  }

  if (!detailView) return;

  detailView.className = "flex flex-col gap-10";
  detailView.replaceChildren();

  const isFavorite = getFavorites().includes(serviceId);
  const container = document.createElement("div");
  container.className = "flex flex-col md:flex-row gap-16 items-start";
  container.appendChild(createLeftColumn(service));
  container.appendChild(createRightColumn(service, isFavorite, onBack));

  detailView.appendChild(createBreadcrumb(service, onBack));
  detailView.appendChild(container);

  // Los servicios relacionados son tres aleatorios de la misma categoría.
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  detailView.appendChild(createRelatedServicesSection(relatedServices, onBack));
}
