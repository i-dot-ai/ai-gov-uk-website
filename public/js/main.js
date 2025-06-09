// @ts-check

// Scroll animations
/*
window.addEventListener("load", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});
*/


// Carousel
(() => {

  const carouselContainer = document.querySelector(".js-carousel-container");
  const carousel = document.querySelector("#quote-carousel");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const previousNextButtons = carouselContainer?.querySelectorAll("a[data-slide]");
  let animationStopped = false; 

  if (!carouselContainer || !carousel) {
    return;
  }

  // start carousel (if user doesn't prefer-reduced-motion)
  $("#quote-carousel").carousel();
  if (prefersReducedMotion.matches) {
    $("#quote-carousel").carousel("pause");
    animationStopped = true;
  }

  // pause carousel on escape key press (if carousel is in view)
  window.addEventListener("keydown", (evt) => {
    if (evt.key !== "Escape") {
      return;
    }
    const rect = carousel.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      $("#quote-carousel").carousel("pause");
      animationStopped = true;
    }
  });

  // pause carousel when it has focus
  carouselContainer.addEventListener("focusin", () => {
    $("#quote-carousel").carousel("pause");
  });
  carouselContainer.addEventListener("focusout", () => {
    if (!animationStopped) {
      $("#quote-carousel").carousel("cycle");
    }
  });

  // move focus to next item after clicking arrows
  previousNextButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(() => {
        /** @type {HTMLElement | null} */
        const activeItem = carousel.querySelector(".carousel-item.active");
        activeItem?.focus();
      }, 1000);
    });
  });


  // to prevent the carousel height from jumping (e.g. if quotes are different line lengths)
  const setContainerHeight = () => {
    
    /** @type {NodeListOf<HTMLElement> | undefined} */
    const carouselItems = carouselContainer?.querySelectorAll(".carousel-item");
    /** @type {HTMLElement | null} */
    const carouselItemsContainer = carouselContainer?.querySelector("#quote-carousel");
    let maxHeight = 0;

    if (!carouselItemsContainer) {
      return;
    }
    
    // calculate max height
    carouselItems?.forEach((carouselItem) => {
      const originalDisplaySetting = carouselItem.style.display;
      carouselItemsContainer.style.height = "auto";
      carouselItem.style.display = "block";
      if (carouselItemsContainer.scrollHeight > maxHeight) {
        maxHeight = carouselItemsContainer.scrollHeight;
      }
      carouselItem.style.display = originalDisplaySetting;
    });

    // set max height for all items
    carouselItemsContainer.style.height = `${maxHeight}px`;

  };
  setContainerHeight();
  window.addEventListener("resize", setContainerHeight);
  

})();


class inpageLink extends HTMLElement {
  connectedCallback() {
    const offset = (document.querySelector('header')?.offsetHeight || 0) + 24;
    const link = this.querySelector('a');
    link?.addEventListener('click', (evt) => {
      evt.preventDefault();
      /** @type {HTMLElement | null} */
      const target = document.querySelector(link.getAttribute('href') || '');
      if (!target) {
        return;
      }
      const yLocation = target.offsetTop - offset;
      window.scrollTo(0, yLocation);
    });
  }
}
customElements.define('inpage-link', inpageLink);


/**
 * Remembers if the details were previous opened - useful if navigating back from a page linked to within
 */
class DetailsEnhanced extends HTMLElement {

  connectedCallback() {
    
    const id = `details-${this.querySelector("summary")?.textContent?.toLowerCase().replace(/[^a-z0-9_-]/g, '')}`;
    let detailsEl = this.querySelector("details");

    if (!id || !detailsEl) {
      return;
    }

    if (window.sessionStorage.getItem(id)) {
      detailsEl.setAttribute("open", "");
    }

    detailsEl.addEventListener("toggle", () => {
      if (detailsEl?.open) {
        window.sessionStorage.setItem(id, "open");
      } else {
        window.sessionStorage.removeItem(id);
      }
    });

  }

}
customElements.define('details-enhanced', DetailsEnhanced);