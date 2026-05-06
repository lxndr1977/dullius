import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

const swiperRegistry = new Map<string, Swiper>();
const lightboxRegistry = new Map<string, ReturnType<typeof GLightbox>>();

export function initGalleries() {
  document.querySelectorAll<HTMLElement>("[data-gallery-id]").forEach((el) => {
    const id = el.getAttribute("data-gallery-id");
    if (!id) return;

    if (swiperRegistry.has(id)) return;

    const swiperEl = document.getElementById(`${id}-swiper`);
    if (!swiperEl || swiperEl.classList.contains("swiper-initialized")) return;

    const cols = Math.max(1, Number(el.getAttribute("data-gallery-cols")) || 3);

    const swiper = new Swiper(`#${id}-swiper`, {
      modules: [Navigation, Pagination, Autoplay, A11y],
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        768: { slidesPerView: Math.min(2, cols), spaceBetween: 20 },
        1024: { slidesPerView: cols, spaceBetween: 24 },
      },
      loop: true,
      grabCursor: true,
      autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: `#${id}-pagination`, clickable: true },
      navigation: { prevEl: `#${id}-prev`, nextEl: `#${id}-next` },
      a11y: { prevSlideMessage: "Foto anterior", nextSlideMessage: "Próxima foto" },
    });

    swiperRegistry.set(id, swiper);
  });
}

export function initLightboxes() {
  document.querySelectorAll<HTMLElement>("[data-gallery-id]").forEach((swiperEl) => {
    const gid = swiperEl.getAttribute("data-gallery-id");
    if (!gid || lightboxRegistry.has(gid)) return;

    const originalLinks = Array.from(
      swiperEl.querySelectorAll<HTMLAnchorElement>(
        ".swiper-slide:not(.swiper-slide-duplicate) .glightbox"
      )
    );
    if (originalLinks.length === 0) return;

    const elements = originalLinks.map((a) => ({
      href: a.getAttribute("href") ?? "",
      type: "image" as const,
      description: a.getAttribute("data-description") ?? undefined,
    }));

    const lb = GLightbox({ elements: elements as unknown as [], touchNavigation: true, loop: true });
    lightboxRegistry.set(gid, lb);

    swiperEl.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>(".glightbox");
      if (!target) return;
      e.preventDefault();
      const clickedHref = target.getAttribute("href");
      const index = elements.findIndex((el) => el.href === clickedHref);
      lb.openAt(index !== -1 ? index : 0);

      const swiper = swiperRegistry.get(gid);
      if (swiper) {
        swiper.autoplay.stop();
        lb.on("close", () => swiper.autoplay.start());
      }
    });
  });
}

export function destroyGalleries() {
  swiperRegistry.forEach((s) => s.destroy(true, true));
  swiperRegistry.clear();
  lightboxRegistry.forEach((lb) => lb.destroy());
  lightboxRegistry.clear();
}

