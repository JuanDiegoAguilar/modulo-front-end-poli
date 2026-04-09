(function () {
  function updateCount() {
    const remaining = document.querySelectorAll(
      ".fav-card:not(.removing)"
    ).length;
    const countNum = document.getElementById("countNum");
    if (countNum) {
      countNum.textContent = String(remaining);
    }

    if (remaining === 0) {
      document.getElementById("favGrid")?.classList.add("hidden");
      document.getElementById("emptyState")?.classList.remove("hidden");
      document.getElementById("favCounter")?.classList.add("hidden");
    }
  }

  function removeFav(button) {
    const card = button.closest(".fav-card");
    if (!card) {
      return;
    }
    card.classList.add("removing");

    setTimeout(function () {
      card.remove();
      updateCount();
    }, 300);
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
})();
