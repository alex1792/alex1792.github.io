(function () {
  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".photo-card")
  );
  var filters = Array.prototype.slice.call(
    document.querySelectorAll(".filter-button")
  );
  var count = document.getElementById("visible-count");
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxMeta = document.getElementById("lightbox-meta");
  var closeButton = lightbox
    ? lightbox.querySelector(".lightbox-close")
    : null;

  cards.forEach(function (card) {
    var button = card.querySelector(".photo-open");
    var image = card.querySelector("img");

    if (!button || !image) return;

    function showPlaceholder() {
      button.classList.add("is-placeholder");
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("tabindex", "-1");
    }

    function showPhoto() {
      button.classList.remove("is-placeholder");
      button.removeAttribute("aria-disabled");
      button.removeAttribute("tabindex");
    }

    image.addEventListener("error", showPlaceholder);
    image.addEventListener("load", showPhoto);

    if (image.complete) {
      if (image.naturalWidth === 0) {
        showPlaceholder();
      } else {
        showPhoto();
      }
    }

    button.addEventListener("click", function () {
      if (
        !lightbox ||
        !lightboxImage ||
        !lightboxTitle ||
        !lightboxMeta ||
        !image.complete ||
        image.naturalWidth === 0
      ) {
        return;
      }

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = button.dataset.title || "";
      lightboxMeta.textContent = button.dataset.meta || "";
      lightbox.showModal();
      document.body.classList.add("has-open-lightbox");
    });
  });

  filters.forEach(function (filterButton) {
    filterButton.addEventListener("click", function () {
      var selected = filterButton.dataset.filter;
      var visible = 0;

      filters.forEach(function (button) {
        var active = button === filterButton;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      cards.forEach(function (card) {
        var show =
          selected === "all" || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (count) count.textContent = String(visible);
    });
  });

  if (filters.length) {
    filters.forEach(function (button, index) {
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    });
  }

  function closeLightbox() {
    if (lightbox && lightbox.open) lightbox.close();
  }

  if (closeButton) closeButton.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener("close", function () {
      document.body.classList.remove("has-open-lightbox");
      if (lightboxImage) lightboxImage.src = "";
    });
  }
})();
