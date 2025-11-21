// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  const DynamicBreadcrumbs = class extends LitElement {

    static properties = {
      category: { type: String, attribute: "category" },
      type: { type: String, attribute: "type" },
      queryParams: { type: String, attribute: "query-params" },
    };

    constructor() {
      super();
      this.category = '';
      this.type = '';
      this.queryParams = '';
    }

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }
    connectedCallback() {
      super.connectedCallback();
      this.queryParams = new URLSearchParams(window.location.search).get('directTo') || '';
    }

    render() {
      return html`
          <nav class="govuk-breadcrumbs govuk-!-margin-top-0 govuk-!-margin-bottom-5" aria-label="Breadcrumb">
            <ol class="govuk-breadcrumbs__list">
                <li class="govuk-breadcrumbs__list-item">
                    <a class="govuk-breadcrumbs__link govuk-!-margin-0" href="/knowledge-hub">Home</a>
                </li>
                ${this.queryParams ? html`
                  ${ this.type === 'prompt' ? html`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/knowledge-hub/prompts">Prompts</a>
                    </li>
                    `: html`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/knowledge-hub/tools">Tools</a>
                    </li>
                  `}` : html`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/knowledge-hub#common-tasks-with-ai">What are you looking to do with AI?</a>
                    </li>
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/knowledge-hub/capability/${this.category.toLowerCase().replace(/ /g, '-')}">${this.category}</a>
                        </li>
                    `}
            </ol>
        </nav>
      `;
    }

  }

  customElements.define("dynamic-breadcrumbs", DynamicBreadcrumbs);

})();
