(function () {
  var trips = window.GALLERY_TRIPS || [];
  var container = document.getElementById("gallery-trips");
  var toolbar = document.getElementById("gallery-toolbar");
  var count = document.getElementById("visible-count");
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxMeta = document.getElementById("lightbox-meta");
  var closeButton = lightbox
    ? lightbox.querySelector(".lightbox-close")
    : null;

  if (!container) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function photoPath(trip, photo, size) {
    return "assets/gallery/" + trip.id + "/" + photo.file + "-" + size + ".webp";
  }

  function openLightbox(src, alt, title, meta) {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxMeta) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = meta;
    lightbox.showModal();
    document.body.classList.add("has-open-lightbox");
  }

  function buildCard(trip, photo, eager) {
    var card = el("article", "photo-card");
    if (photo.shape) card.classList.add("photo-card--" + photo.shape);

    var thumb = photoPath(trip, photo, "thumb");
    var location = photo.location || trip.location;

    var button = el("button", "photo-open");
    button.type = "button";
    button.setAttribute("aria-label", "放大觀看 " + photo.title);

    var placeholder = el("span", "photo-placeholder");
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.appendChild(el("span", "", thumb));

    var image = el("img");
    image.src = thumb;
    image.alt = photo.alt || photo.title;
    image.loading = eager ? "eager" : "lazy";
    image.decoding = "async";

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

    button.addEventListener("click", function () {
      if (!image.complete || image.naturalWidth === 0) return;
      openLightbox(
        photoPath(trip, photo, "full"),
        image.alt,
        photo.title,
        location + " · " + trip.date
      );
    });

    button.appendChild(placeholder);
    button.appendChild(image);
    card.appendChild(button);

    var caption = el("div", "photo-caption");
    caption.appendChild(el("h3", "", photo.title));
    if (photo.location) caption.appendChild(el("p", "", photo.location));
    card.appendChild(caption);

    return card;
  }

  function buildTrip(trip, index) {
    var section = el("section", "trip");
    section.id = "trip-" + trip.id;
    section.dataset.trip = trip.id;
    section.setAttribute("aria-labelledby", section.id + "-title");

    var header = el("header", "trip-header");
    var title = el("h2", "trip-title", trip.title);
    title.id = section.id + "-title";
    header.appendChild(title);

    var meta = [trip.location, trip.date, trip.photos.length + " photos"];
    header.appendChild(el("p", "trip-meta", meta.join(" · ")));

    if (trip.summary) header.appendChild(el("p", "trip-summary", trip.summary));

    if (trip.album) {
      var album = el("a", "trip-album", "View full album →");
      album.href = trip.album;
      album.rel = "noopener noreferrer";
      header.appendChild(album);
    }

    var grid = el("div", "photo-grid");
    trip.photos.forEach(function (photo, photoIndex) {
      grid.appendChild(buildCard(trip, photo, index === 0 && photoIndex < 2));
    });

    section.appendChild(header);
    section.appendChild(grid);
    return section;
  }

  var sections = trips.map(function (trip, index) {
    var section = buildTrip(trip, index);
    container.appendChild(section);
    return section;
  });

  function setCount(selected) {
    if (!count) return;
    var visible = 0;
    trips.forEach(function (trip) {
      if (selected === "all" || trip.id === selected) {
        visible += trip.photos.length;
      }
    });
    count.textContent = String(visible);
  }

  setCount("all");

  if (toolbar) {
    var filters = [{ id: "all", title: "All" }].concat(trips);
    var buttons = filters.map(function (filter, index) {
      var button = el("button", "filter-button", filter.title);
      button.type = "button";
      button.dataset.filter = filter.id;
      button.classList.toggle("is-active", index === 0);
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      toolbar.appendChild(button);
      return button;
    });

    buttons.forEach(function (filterButton) {
      filterButton.addEventListener("click", function () {
        var selected = filterButton.dataset.filter;

        buttons.forEach(function (button) {
          var active = button === filterButton;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        sections.forEach(function (section) {
          section.hidden =
            selected !== "all" && section.dataset.trip !== selected;
        });

        setCount(selected);
      });
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
