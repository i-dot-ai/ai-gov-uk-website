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
            <h2 class="govuk-heading-s govuk-!-font-weight-regular kh-sticky-sidebar__nav-title">Contents</h2>
            <ul class="govuk-list govuk-list--spaced govuk-!-margin-bottom-0 kh-sticky-sidebar__nav-list">
              ${this.headings.map((heading) => html`
                <li class="kh-sticky-sidebar__list-item--dashed govuk-!-padding-right-5 govuk-!-padding-left-6"><a href="#${heading.id}">${heading.content}</a></li>
              `)}
            </ul>
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
      if (this.headings.length === 0) {
        document.querySelectorAll('#content h3').forEach((heading) => {
          this.headings.push({
            id: heading.id,
            content: heading.textContent,
          });
        });
      }
    }

  }

  customElements.define("on-this-page", OnThisPage);

})();
