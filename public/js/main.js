// @ts-check

// Scroll animations
(function () {
  "use strict";

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();


// Carousel
(() => {

  // Carousel not required for now
  return;

  const carouselContainer = document.querySelector(".js-carousel-container");
  const carousel = document.querySelector("#heroCarousel");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const previousNextButtons = carouselContainer?.querySelectorAll("a[data-slide]");
  let animationStopped = false; 

  if (!carouselContainer || !carousel) {
    return;
  }

  // start carousel (if user doesn't prefer-reduced-motion)
  $("#heroCarousel").carousel();
  if (prefersReducedMotion.matches) {
    $("#heroCarousel").carousel("pause");
    animationStopped = true;
  }

  // pause carousel on escape key press (if carousel is in view)
  window.addEventListener("keydown", (evt) => {
    if (evt.key !== "Escape") {
      return;
    }
    const rect = carousel.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      $("#heroCarousel").carousel("pause");
      animationStopped = true;
    }
  });

  // pause carousel when it has focus
  carouselContainer.addEventListener("focusin", () => {
    $("#heroCarousel").carousel("pause");
  });
  carouselContainer.addEventListener("focusout", () => {
    if (!animationStopped) {
      $("#heroCarousel").carousel("cycle");
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
    const carouselItemsContainer = carouselContainer?.querySelector("#heroCarousel");
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