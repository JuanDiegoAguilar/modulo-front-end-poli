(function () {
  const form = document.getElementById("contactForm");
  const formView = document.getElementById("formView");
  const successView = document.getElementById("successView");

  if (!form || !formView || !successView) {
    return;
  }

  const servicioSelect = document.getElementById("servicio");
  if (servicioSelect) {
    fetch("/src/data/services.json")
      .then(function (res) {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los servicios");
        }
        return res.json();
      })
      .then(function (data) {
        const services = data.services || [];
        services.forEach(function (s) {
          const opt = document.createElement("option");
          opt.value = s.id;
          opt.textContent = s.title;
          servicioSelect.appendChild(opt);
        });
      })
      .catch(function () {
        console.error("Error al cargar los servicios");
      });
  }

  function clearErrors() {
    document.querySelectorAll(".form-group").forEach(function (g) {
      g.classList.remove("has-error");
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    clearErrors();

    if (!document.getElementById("nombre").value.trim()) {
      document.getElementById("grpNombre").classList.add("has-error");
      valid = false;
    }
    if (!document.getElementById("apellido").value.trim()) {
      document.getElementById("grpApellido").classList.add("has-error");
      valid = false;
    }
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById("grpEmail").classList.add("has-error");
      valid = false;
    }
    if (!document.getElementById("servicio").value) {
      document.getElementById("grpServicio").classList.add("has-error");
      valid = false;
    }
    if (!document.getElementById("mensaje").value.trim()) {
      document.getElementById("grpMensaje").classList.add("has-error");
      valid = false;
    }

    if (valid) {
      successView.classList.remove("animate-scale-in");
      void successView.offsetWidth;
      formView.classList.add("hidden");
      successView.classList.remove("hidden");
      successView.classList.add("animate-scale-in");
    }
  });

  const resetBtn = document.querySelector(".js-contact-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      clearErrors();
      successView.classList.remove("animate-scale-in");
      successView.classList.add("hidden");
      formView.classList.remove("hidden");
    });
  }
})();
