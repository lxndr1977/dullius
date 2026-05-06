import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

// Singletons — vivem uma única vez graças ao ES module cache.
// Não importa quantos componentes importem este arquivo,
// esses Maps são sempre os mesmos.
const swiperRegistry = new Map<string, Swiper>();
const lightboxRegistry = new Map<string, ReturnType<typeof GLightbox>>();

export function initGalleries() {
  document
    .querySelectorAll<HTMLElement>("[data-gallery-id]")
    .forEach((el) => {
      const id = el.getAttribute("data-gallery-id");
      if (!id) return;

      // Destrói instâncias anteriores antes de recriar
      if (swiperRegistry.has(id)) {
        swiperRegistry.get(id)!.destroy(true, true);
        swiperRegistry.delete(id);
      }
      if (lightboxRegistry.has(id)) {
        lightboxRegistry.get(id)!.destroy();
        lightboxRegistry.delete(id);
      }

      const swiperEl = document.getElementById(`${id}-swiper`);
      if (!swiperEl) return;

      // Remove flag para permitir reinicialização limpa
      swiperEl.classList.remove("swiper-initialized");

      // Lê TODAS as configs do data-attr do elemento HTML.
      // Cada componente escreve os seus próprios valores —
      // o script só lê, nunca assume nada.
      const cols = Math.max(
        1,
        Number(swiperEl.getAttribute("data-gallery-cols")) || 1
      );
      const autoplayDelay =
        Number(swiperEl.getAttribute("data-autoplay-delay")) || 4000;
      const loop = swiperEl.getAttribute("data-loop") !== "false";
      const autoplay = swiperEl.getAttribute("data-autoplay") !== "false";
      const effect = (swiperEl.getAttribute("data-effect") || "slide") as
        | "slide"
        | "fade"
        | "cube"
        | "coverflow"
        | "flip";
      const spaceBetween = Number(swiperEl.getAttribute("data-space-between")) || 16;

      const swiper = new Swiper(`#${id}-swiper`, {
        modules: [Navigation, Pagination, Autoplay, A11y],
        slidesPerView: 1,
        spaceBetween,
        effect,
        breakpoints:
          cols > 1
            ? {
                768: { slidesPerView: Math.min(2, cols), spaceBetween: spaceBetween + 4 },
                1024: { slidesPerView: cols, spaceBetween: spaceBetween + 8 },
              }
            : undefined,
        loop,
        grabCursor: true,
        simulateTouch: true,
        allowTouchMove: true,
        threshold: 5,
        preventClicks: true,
        preventClicksPropagation: true,
        touchStartPreventDefault: true,
        ...(autoplay && {
          autoplay: {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
        }),
        pagination: {
          el: `#${id}-pagination`,
          clickable: true,
        },
        navigation: {
          prevEl: `#${id}-prev`,
          nextEl: `#${id}-next`,
        },
        a11y: {
          prevSlideMessage: "Foto anterior",
          nextSlideMessage: "Próxima foto",
        },
        watchSlidesProgress: true,
      });

      swiperRegistry.set(id, swiper);

      // GLightbox isolado por galeria — cada instância só enxerga suas fotos
      const lightbox = GLightbox({
        selector: `[data-gallery="${id}"]`,
        touchNavigation: true,
        loop: true,
      });

      lightboxRegistry.set(id, lightbox);
    });
}

export function destroyGalleries() {
  swiperRegistry.forEach((s) => s.destroy(true, true));
  swiperRegistry.clear();
  lightboxRegistry.forEach((lb) => lb.destroy());
  lightboxRegistry.clear();
}

// Listeners de View Transitions — registrados uma única vez
// graças ao ES module cache.
let listenersRegistered = false;

export function registerGalleryListeners() {
  if (listenersRegistered) return;
  listenersRegistered = true;

  document.addEventListener("astro:before-swap", destroyGalleries);
  document.addEventListener("astro:page-load", initGalleries);
}