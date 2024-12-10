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
      } ).mount();
    }

    render() {
      return html`
        <section class="iai-blog-carousel splide" aria-labelledby="carousel-heading1" id="carousel-${this.id}">
          <h3 id="carousel-heading1">${this.title}</h3>
          <div class="splide__track">
            <ul class="splide__list">
              ${this.items.map(
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
