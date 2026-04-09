import { SERVICES } from "/src/data/default-services.js";

const STORAGE_KEY = "technova_services";
const FAVORITES_KEY = "technova_favorites";

/**
 * Lee y parsea los servicios almacenados en localStorage.
 * @returns {Array|null} Lista de servicios o null si no existe o hay error.
 */
function loadFromStorage() {
  try {
    const services = localStorage.getItem(STORAGE_KEY);

    return services ? JSON.parse(services) : null;
  } catch {
    return null;
  }
}

/**
 * Guarda los servicios en localStorage.
 * @param {Array} services
 */
function saveToStorage(services) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch {}
}

/**
 * Inicializa el store cargando los servicios desde localStorage.
 * Si no hay servicios guardados, carga los servicios por defecto.
 * @returns {Array}
 */
function initStore() {
  const storedServices = loadFromStorage();

  // Si no hay servicios almacenados, iniciamos con los servicios por defecto para mostrar información.
  if (!storedServices) {
    saveToStorage(SERVICES);

    return SERVICES;
  }

  return storedServices;
}

/**
 * Retorna los servicios guardados en el localStorage.
 * @returns {Array}
 */
export function getServices() {
  return initStore();
}

/**
 * Agrega un nuevo servicio.
 * @param {Object} service
 * @returns {Array} Lista actualizada de servicios.
 */
export function addService(service) {
  const services = getServices();
  services.push(service);
  saveToStorage(services);

  return services;
}

/**
 * Elimina un servicio del localStorage por su id.
 * @param {string} id
 * @returns {Array} Lista actualizada de servicios.
 */
export function deleteService(id) {
  const services = getServices().filter((service) => service.id !== id);
  saveToStorage(services);

  return services;
}

/**
 * Retorna los servicios marcados como favoritos.
 * @returns {Array}
 */
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);

    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
}

/**
 * Agrega o quita un servicio de favoritos según su estado actual.
 * @param {string} id
 * @returns {Array} Lista actualizada de servicios favoritos.
 */
export function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {}

  return favorites;
}
