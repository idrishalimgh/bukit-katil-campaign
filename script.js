/* Small progressive enhancement only; the page remains readable without JavaScript. */
(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("#current-year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      const label = menuButton.querySelector(".sr-only");
      if (label) label.textContent = "Buka menu navigasi";
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      const label = menuButton.querySelector(".sr-only");
      if (label) label.textContent = isOpen ? "Buka menu navigasi" : "Tutup menu navigasi";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 681px)").matches) closeMenu();
    });
  }
})();

/* Fungsi carousel poster program */
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".program-track");
  const slides = carousel.querySelectorAll(".program-slide");
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const counter = carousel.querySelector(".carousel-counter");

  if (!track || slides.length === 0 || !prevButton || !nextButton || !counter) {
    return;
  }

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + slides.length) % slides.length;

    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;

    updateCarousel();
  });

  updateCarousel();
});
