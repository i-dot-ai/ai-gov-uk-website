// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  const ProjectQuote = class extends LitElement {
    
    static properties = {
      quote: String,
      by: String,
      link: String,
    };

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    render() {
      return html`
        <blockquote class="border-l-4 pl-4 lg:border-l-8 lg:pl-8 lg:py-4 govuk-!-margin-top-7 govuk-!-margin-bottom-7">
          <p class="text-xl">“${this.quote}”</p>
          <footer class="mt-2 text-sm">
          ${this.link ? html`
            <a class="link" href="${this.link}">${this.by}</a>
          ` : html`
            <p>${this.by}</p>
          `}
          </footer>
        </blockquote>
      `;
    }

  }

  customElements.define("project-quote", ProjectQuote);

})();
