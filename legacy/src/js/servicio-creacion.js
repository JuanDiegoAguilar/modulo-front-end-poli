import { CATEGORIES, CATEGORY_COLORS } from "/src/data/default-services.js";
import { addService } from "/src/js/utils/store.js";

function initCategoryOptions() {
  const categorySelect = document.getElementById("category");

  if (!categorySelect || categorySelect.options.length > 1) return;

  CATEGORIES.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function toggleVisibilityAddIncludeServiceBtn(includesList, addIncludeBtn) {
  const count = includesList.querySelectorAll("input").length;
  addIncludeBtn.style.display = count >= 10 ? "none" : "block";
}

function insertIncludeService(includesList, addIncludeBtn) {
  const row = document.createElement("div");
  row.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 100;
  input.placeholder = "Describe el servicio incluido…";
  input.className =
    "flex-1 rounded-md border border-gray-cararra bg-white px-4 py-2 text-sm text-gray-cod placeholder:text-gray-dusty outline-none focus:border-gray-cod transition-colors";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "✕";
  removeBtn.className =
    "flex size-8 items-center justify-center rounded-full text-gray-dusty hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0";

  removeBtn.addEventListener("click", function () {
    row.remove();
    toggleVisibilityAddIncludeServiceBtn(includesList, addIncludeBtn);
  });

  row.appendChild(input);
  row.appendChild(removeBtn);
  includesList.appendChild(row);
  input.focus();
}

function getBasicServiceFromForm() {
  const name = document.getElementById("name").value;
  const emoji = document.getElementById("emoji").value;
  const description = document.getElementById("description").value;
  const time = document.getElementById("time").value;
  const category = document.getElementById("category").value;
  const technologies = document.getElementById("technologies").value;

  const includesList = document.getElementById("includes-list");
  const includes = Array.from(includesList.querySelectorAll("input"))
    .map((i) => i.value)
    .filter((text) => text.trim() !== "");

  return {
    id: "service-id-" + Date.now(),
    emoji: emoji,
    title: name,
    description: description,
    category: category,
    color: CATEGORY_COLORS[category] || "bg-gray-pampas",
    estimatedTime: time,
    technologies: technologies,
    includes: includes,
  };
}

export function openAddServiceModal(onSaved) {
  const modal = document.getElementById("service-modal");

  if (!modal) return;

  initCategoryOptions();
  modal.open();

  const form = document.getElementById("add-service-form");
  const includesList = document.getElementById("includes-list");
  const addIncludeBtn = document.getElementById("add-include");
  const modalityError = document.getElementById("modality-error");

  // Se limpia el formulario para evitar datos anteriores.
  form.reset();
  includesList.replaceChildren();

  const hasListener = form.getAttribute("events-listener-added");

  // Utilizamos una bandera para evitar multiples eventos.
  if (!hasListener) {
    addIncludeBtn.addEventListener("click", () => {
      insertIncludeService(includesList, addIncludeBtn);
      toggleVisibilityAddIncludeServiceBtn(includesList, addIncludeBtn);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      modalityError.classList.add("hidden");

      const isRemote = document.getElementById("remote").checked;
      const isHybrid = document.getElementById("hybrid").checked;

      if (!isRemote && !isHybrid) {
        modalityError.classList.remove("hidden");
        return;
      }

      const modality = [isRemote && "Remoto", isHybrid && "Híbrido"]
        .filter(Boolean)
        .join(" / ");

      addService({
        ...getBasicServiceFromForm(),
        modality: modality,
      });

      modal.close();

      if (onSaved) onSaved();
    });

    form.setAttribute("events-listener-added", "true");
  }
}
