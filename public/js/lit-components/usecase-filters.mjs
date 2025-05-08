// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  const UsecaseFilters = class extends LitElement {
    
    static properties = {
      organisationName: { type: Array, state: true },
      organisationType: {type: Array, state: true },
      userGroup: { type: Array, state: true },
      useCaseType: { type: Array, state: true },
      typeOfTechnology: { type: Array, state: true },
      phase: { type: Array, state: true },
      impact: { type: Array, state: true },
    };

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    constructor() {
      super();
      // initialise properties
      Object.keys(UsecaseFilters.properties).forEach((property) => {
        this[property] = [];
      });
    }

    connectedCallback() {
      super.connectedCallback();
      // get options to filter from each use case
      Object.keys(UsecaseFilters.properties).forEach((property) => {
        const elements = document.querySelectorAll(`[data-category="${property}"]`);
        elements.forEach((element) => {
          if (!this[property].includes(element.textContent)) {
            this[property].push(element.textContent);
          }
        });
      });
    }

    firstUpdated() {
      // listen for URL changes
      const getQueryParams = () => {
        Object.keys(UsecaseFilters.properties).forEach((property) => {
          const value = new URL(window.location.href).searchParams.get(property);
          if (value) {
            this.querySelector(`#${property}`).value = value || "";
          }
        });
        this.#applyFilters();
      };
      window.addEventListener('popstate', getQueryParams);
      getQueryParams();
    }

    render() {
      return html`
        ${Object.keys(UsecaseFilters.properties).map((property) => html`
          <div class="govuk-form-group">
            <label class="govuk-label" for="${property}" style="text-transform: capitalize;">${property.replace(/([A-Z])/g, ' $1').trim()}</label>            
            <select @change=${this.#applyFilters} class="govuk-select" id="${property}">
              <option value="">All</option>
              ${this[property].map((value) => html`
                <option value="${value}">${value}</option>
              `)}
            </select>
          </div>
        `)}
      `;
    }

    #applyFilters() {

      const url = new URL(window.location.href);
      Object.keys(UsecaseFilters.properties).map((property) => {
        let value = this.querySelector(`#${property}`).value;
        url.searchParams.set(property, value);
      });
      window.history.pushState({}, '', url);

      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('[data-category="use-case"]');
      const filteredCountElement = document.querySelector("#filtered-count");
      let filteredCount = 0;

      // show/hide cards based on selected filters
      cards.forEach((card) => {

        let cardIsVisible = true;
        Object.keys(UsecaseFilters.properties).map((property) => {
          let value = this.querySelector(`#${property}`).value;
          if (value && card.querySelector(`[data-category="${property}"]`)?.textContent !== value) {
            cardIsVisible = false;
          }
        });

        if (cardIsVisible) {
          card.style.display = "block";
          filteredCount++;
        } else {
          card.style.display = "none";
        }

      });

      // show how many cards are visible
      if (!filteredCountElement) {
        return;
      }
      if (filteredCount === cards.length) {
        filteredCountElement.textContent = "all";
      } else {
        filteredCountElement.textContent = filteredCount.toString();
      }

    }

  }

  customElements.define("usecase-filters", UsecaseFilters);

})();
