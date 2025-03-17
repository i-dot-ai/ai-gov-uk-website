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
      organisation: { type: Array, state: true },
      phase: { type: Array, state: true },
    };

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    constructor() {
      super();
      this.organisation = [];
      this.phase = [];
    }

    connectedCallback() {
      super.connectedCallback();
      // get options to filter from each use case
      Object.keys(UsecaseFilters.properties).forEach((property) => {
        const elements = document.querySelectorAll(`[data-category="${property}"]`);
        elements.forEach((element) => {
          this[property].push(element.textContent);
        });
      });
    }

    render() {
      return html`
        ${Object.keys(UsecaseFilters.properties).map((property) => html`
          <div class="govuk-form-group">
            <label class="govuk-label" for="${property}" style="text-transform: capitalize;">${property}</label>            
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
