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
      governmentBody: {type: Array, state: true },
      userGroup: { type: Array, state: true },
      typeOfTechnology: { type: Array, state: true },
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
          // allow for multiple entries using /
          let itemsArray = element.textContent?.split(/[/;]+/);
          itemsArray?.forEach((item) => {
            let itemStr = item.trim().trimStart();
            if ( itemStr && !this[property].includes(itemStr) ) {
              this[property].push(itemStr);
            }
          });
        });

        if (property === 'governmentBody') {
          const requiredOrder = ['UK Government', 'Scottish Government', 'Welsh Government', 'Northern Ireland Executive', 'Local Government'];
          this['governmentBody'].sort((a, b) => {
            return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
          });
        } else if (property === 'typeOfTechnology') {
          const requiredOrder = ['Generative AI', 'Machine Learning', 'Data or Infrastructure'];
          this['typeOfTechnology'].sort((a, b) => {
            return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
          });
        } else if (property === 'userGroup') {
          const requiredOrder = ['General Public', 'Civil Servants', 'Wider Public Sector'];
          this['userGroup'].sort((a, b) => {
            return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
          });
        } else {
          this[property].sort();
        }
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
        <div class="govuk-grid-row" style="margin-bottom: -20px;">
          <div class="govuk-grid-column-full govuk-grid-column-one-half-from-large-desktop">
            <div class="govuk-form-group">
              <label class="govuk-label" for="search">Search</label>
              <input @keyup=${this.#applyFilters} class="govuk-input" id="search" name="search" type="text">
            </div>
          </div>
          ${Object.keys(UsecaseFilters.properties).map((property) => html`
            <div class="govuk-grid-column-full govuk-grid-column-one-quarter-from-large-desktop">
              <div class="govuk-form-group">
                <label class="govuk-label" for="${property}" style="text-transform: capitalize;">${property.replace(/([A-Z])/g, ' $1').trim()}</label>            
                <select @change=${this.#applyFilters} class="govuk-select" id="${property}">
                  <option value="">All</option>
                  ${this[property].map((value) => html`
                    <option value="${value}">${value}</option>
                  `)}
                </select>
              </div>
            </div>
          `)}
        </div>
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

      let search = this.querySelector('#search')?.value.trim().toLowerCase();

      // show/hide cards based on selected filters
      cards.forEach((card) => {

        let cardIsVisible = true;
        Object.keys(UsecaseFilters.properties).map((property) => {
          let value = this.querySelector(`#${property}`).value;
          if (value && !card.querySelector(`[data-category="${property}"]`)?.textContent?.includes(value)) {
            cardIsVisible = false;
          }
        });

        if (search && !card.textContent?.toLowerCase().includes(search)) {
          cardIsVisible = false;
        }

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
