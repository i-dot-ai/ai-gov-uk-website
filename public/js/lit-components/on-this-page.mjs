// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  const OnThisPage = class extends LitElement {
    
    static properties = {
      headings: { type: Array, state: true }
    };

    // initialise properties
    constructor() {
      super();
      this.headings = [];
    }

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateHeadings();
    }

    render() {
      return html`
        ${this.headings.length ? html`
          <div class="govuk-!-padding-5 govuk-!-margin-bottom-6 govuk-!-margin-top-7" style="border: 1px solid #0b0c0c;">
            <h2 class="govuk-heading-s">On this page:</h2>
            <ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0">
              ${this.headings.map((heading) => html`
                <li class="govuk-!-padding-1"><a class="govuk-link" href="#${heading.id}">${heading.content}</a></li>
              `)}
            </ul>
          </div>
        ` : ''}
      `;
    }

    updateHeadings() {
      this.headings = [];
      document.querySelectorAll('#content h2').forEach((heading) => {
        this.headings.push({
          id: heading.id,
          content: heading.textContent,
        });
      });
    }

  }

  customElements.define("on-this-page", OnThisPage);

})();
