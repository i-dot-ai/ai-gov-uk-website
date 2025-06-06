// @ts-check

(async () => {

  let LitElement, html, css, unsafeHTML;

  if (typeof(window) === "undefined") {
    ({ LitElement, html, css } = await import("lit"));
    ({ unsafeHTML } = await import("lit/directives/unsafe-html.js"));
  } else {
    ({ LitElement, html, css } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
    ({ unsafeHTML } = await import("https://unpkg.com/lit-html@2.0.0/directives/unsafe-html.js"));
  }


  const BlogCarousel = class extends LitElement {
    
    static properties = {
      title: {},
      items: {type: Array},
    };

    constructor() {
      super();
      this.id = crypto.randomUUID();
    }

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    async firstUpdated() {
      await import ("https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4");
      new Splide( `#carousel-${this.id}`, {
        focus: 'center',
        gap: '0.125rem',
        padding: '6rem',
        type: 'loop',
        breakpoints: {
          640: {
            padding: '2.5rem',
          }
        }
      } ).mount();
      this.querySelectorAll('[role="tabpanel"]').forEach((item) => {
        item.removeAttribute("role");
      });
    }

    render() {

      const startHeadingLevel = this.items?.find((item) => item.includes('<h3')) ? '2' : '3';
      return html`
        <section class="iai-blog-carousel splide" aria-labelledby="carousel-heading-${this.id}" id="carousel-${this.id}">
          ${startHeadingLevel === '2' ? html`
            <h2 class="iai-blog-carousel__heading" id="carousel-heading-${this.id}">${this.title}</h2>
          ` : html`
            <h3 class="iai-blog-carousel__heading" id="carousel-heading-${this.id}">${this.title}</h3>
          `}
          <div class="splide__track">
            <ul class="splide__list">
              ${this.items?.map(
                (item) => html`
                  <li class="splide__slide">
                    <div class="splide__slide-inner">${unsafeHTML(item)}</div>
                  </li>
                `
              )}
            </ul>
          </div>
        </section>
      `;
    }

  }

  customElements.define("blog-carousel", BlogCarousel);

})();
