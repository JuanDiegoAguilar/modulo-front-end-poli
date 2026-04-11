import {
  getServices,
  getFavorites,
  toggleFavorite,
  setFavorites,
} from "/src/js/utils/store.js";

(function () {
  const CARD_CLASS =
    "fav-card group relative flex flex-col overflow-hidden rounded-2xl border border-gray-cararra bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] animate-fade-up hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] sm:flex-row";

  function pruneInvalidFavoriteIds() {
    const valid = new Set(getServices().map((s) => s.id));
    const favorites = getFavorites();
    const pruned = favorites.filter((id) => valid.has(id));

    if (pruned.length !== favorites.length) {
      setFavorites(pruned);
    }

    return pruned;
  }

  function updateCount(remaining) {
    const countNum = document.getElementById("countNum");
    if (countNum) {
      countNum.textContent = String(remaining);
    }

    const grid = document.getElementById("favGrid");
    const emptyState = document.getElementById("emptyState");
    const favCounter = document.getElementById("favCounter");

    if (remaining === 0) {
      grid?.setAttribute("hidden", "");
      emptyState?.classList.remove("hidden");
      favCounter?.classList.add("hidden");
    } else {
      grid?.removeAttribute("hidden");
      emptyState?.classList.add("hidden");
      favCounter?.classList.remove("hidden");
    }
  }

  function createFavCard(service) {
    const article = document.createElement("article");
    article.className = CARD_CLASS;
    article.dataset.id = service.id;

    const emojiCol = document.createElement("div");
    emojiCol.className = `relative flex min-h-[120px] w-full shrink-0 items-center justify-center text-5xl sm:min-h-[160px] sm:w-40 ${service.color || "bg-gray-pampas"}`;

    const emojiSpan = document.createElement("span");
    emojiSpan.className = "relative z-[1]";
    emojiSpan.textContent = service.emoji || "";
    emojiCol.appendChild(emojiSpan);

    const body = document.createElement("div");
    body.className = "flex flex-1 flex-col p-6";

    const category = document.createElement("p");
    category.className =
      "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-blue-royal";
    category.textContent = service.category || "";

    const title = document.createElement("h3");
    title.className =
      "mb-1.5 text-[17px] font-semibold tracking-tight text-gray-cod";
    title.textContent = service.title || "";

    const description = document.createElement("p");
    description.className = "flex-1 text-sm leading-relaxed text-gray-dove";
    description.textContent = service.description || "";

    const actions = document.createElement("div");
    actions.className = "mt-4 flex flex-wrap items-center gap-2";

    const detailBtn = document.createElement("app-button");
    detailBtn.setAttribute(
      "href",
      `/pages/servicios/?id=${encodeURIComponent(service.id)}`,
    );
    detailBtn.setAttribute("type", "primary");
    detailBtn.setAttribute(
      "custom-class",
      "px-4 py-2 text-[0.8125rem] font-semibold",
    );
    detailBtn.textContent = "Ver detalle →";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className =
      "js-fav-remove inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 bg-transparent px-3.5 py-2 text-[13px] font-semibold text-red-600 transition-colors duration-300 hover:bg-red-50";
    removeBtn.textContent = "✕ Quitar";

    actions.appendChild(detailBtn);
    actions.appendChild(removeBtn);

    body.appendChild(category);
    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(actions);

    article.appendChild(emojiCol);
    article.appendChild(body);

    return article;
  }

  function removeFav(button) {
    const card = button.closest(".fav-card");
    if (!card || !card.dataset.id) {
      return;
    }

    toggleFavorite(card.dataset.id);
    card.classList.add("removing");

    setTimeout(function () {
      card.remove();
      const remaining = document.querySelectorAll(
        ".fav-card:not(.removing)",
      ).length;
      updateCount(remaining);
    }, 300);
  }

  function render() {
    const grid = document.getElementById("favGrid");
    if (!grid) {
      return;
    }

    const favoriteIds = pruneInvalidFavoriteIds();
    const byId = Object.fromEntries(getServices().map((s) => [s.id, s]));
    const ordered = favoriteIds
      .map((id) => byId[id])
      .filter((service) => Boolean(service));

    grid.replaceChildren();

    ordered.forEach(function (service) {
      grid.appendChild(createFavCard(service));
    });

    updateCount(ordered.length);
  }

  const grid = document.getElementById("favGrid");
  if (!grid) {
    return;
  }

  grid.addEventListener("click", function (e) {
    const btn = e.target.closest(".js-fav-remove");
    if (btn) {
      removeFav(btn);
    }
  });

  render();
})();
