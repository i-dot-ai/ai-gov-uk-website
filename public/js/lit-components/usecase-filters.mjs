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
      category: {type: Array, state: true },
      subcategory: {type: Array, state: true },
      organisation: { type: Array, state: true },
      governmentBody: {type: Array, state: true },
      verifiedByProfession: {type: Array, state: true },
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
        // Convert camelCase to kebab-case for data attributes
        const dataAttr = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        const cards = document.querySelectorAll('.kh-card');

        cards.forEach((card) => {
          const value = card.getAttribute(`data-${dataAttr}`);
          if (value) {
            let itemsArray = value.split(/[/;]+/);
            itemsArray?.forEach((item) => {
              let itemStr = item.trim().trimStart();
              if ( itemStr && !this[property].includes(itemStr) ) {
                this[property].push(itemStr);
                // temporarily add project management to category
                if (property === 'category') {
                  const profession = card.getAttribute(`data-profession`);
                  if (profession && !this['category'].includes(profession)) {
                    this['category'].push(profession);
                  }
                }
                // temporarily add Personal productivity to category
                if (property === 'subcategory') {
                  if (itemStr === 'Personal productivity' && !this['category'].includes(itemStr)) {
                    this['category'].push(itemStr);
                  }
                }
              }
            });
          }
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
          const select = this.querySelector(`#${property}`);

          if (value && select) {
            select.value = value;
          }
        });
        this.applyFilters();
      };
      window.addEventListener('popstate', getQueryParams);
      getQueryParams();
    }

    render() {

      const propertyToLabelMap ={
        category: "Task",
        subcategory: "Subtask",
        organisation: "Organisation",
        governmentBody: "Government body",
        verifiedByProfession: "Verified by function",
      }
      return html`
        <div class="govuk-grid-row">
          ${Object.keys(UsecaseFilters.properties).map((property) => {
            if (this[property].length > 0) {
              return html`
              <div class="govuk-grid-column-full govuk-grid-column-one-quarter-from-large-desktop">
                <div class="govuk-form-group">
                  <label class="govuk-label" for="${property}" style="text-transform: capitalize;">${propertyToLabelMap[property]}</label>            
                  <select @change=${() => this.applyFilters(property === 'category')} class="govuk-select" id="${property}" ?disabled=${property === 'subcategory'} style="width: 100%;">
                    <option value="">All</option>
                    ${this[property].map((value) => html`
                      <option value="${value}">${value}</option>
                    `)}
                  </select>
                </div>
              </div>
            `} else {
              return null;
            }})}
        </div>
      `;
    }

    
    applyFilters(isCategory = false) {

      const url = new URL(window.location.href);
      Object.keys(UsecaseFilters.properties).map((property) => {
        let value = this.querySelector(`#${property}`)?.value;
        url.searchParams.set(property, value);
      });
      window.history.pushState({}, '', url);

      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('.kh-card');
      const filteredCountElement = document.querySelector("#filtered-count");
      const activeFiltersElement = document.querySelector("#active-filters");
      let filteredCount = 0;

      const activeFilters = [];
      Object.keys(UsecaseFilters.properties).forEach((property) => {
        let value = (this.querySelector(`#${property}`))?.value;
        if (value) {
          // Convert camelCase to readable format (e.g., "typeOfTechnology" -> "Type of technology")
          const propertyName = property.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
          activeFilters.push(`${propertyName}: <strong>${value}</strong>`);
        }
      });

      const pageType = window.location.pathname.split('/').includes('prompts') ? 'prompts' : 'tools';
      const filters = activeFilters.join(', ').replace(/<strong>/g, '').replace(/<\/strong>/g, '').trim();

      posthog.capture('kh_filters_applied', {
        'filters': filters,
        'page_type': pageType
      });


      // show/hide cards based on selected filters
      cards.forEach((card) => {

        let cardIsVisible = true;
        Object.keys(UsecaseFilters.properties).map((property) => {
          let value = (this.querySelector(`#${property}`))?.value;
          if (value) {
            if (property === 'category' && value === 'Project management') {
              // temporarily add project management to category
              const profession = card.getAttribute(`data-profession`);
              if (!profession || !profession.trim().includes('Project management')) {
                cardIsVisible = false;
              }
            } else if (property === 'category' && value === 'Personal productivity') {
              // temporarily add Personal productivity to category
              const subcategory = card.getAttribute(`data-subcategory`);
              if (!subcategory || !subcategory.includes('Personal productivity')) {
                cardIsVisible = false;
              }
            } else {
              // Convert camelCase to kebab-case for data attributes
              const dataAttr = property.replace(/([A-Z])/g, '-$1').toLowerCase();
              const cardValue = card.getAttribute(`data-${dataAttr}`);
              
              if (!cardValue || !cardValue.includes(value)) {
                cardIsVisible = false;
              }
            }
          }
        });

        if (cardIsVisible) {
          card.classList.remove('hidden');
          filteredCount++;
        } else {
          card.classList.add('hidden');
        }

      });

      // Handle subcategory filter
      /** @type {HTMLSelectElement | null} */
      const subcategorySelect = document.querySelector('#subcategory');
      /** @type {HTMLSelectElement | null} */
      const categorySelect = document.querySelector('#category');

      if (subcategorySelect) {
        if (categorySelect?.value === '') {
          subcategorySelect.disabled = true;
          subcategorySelect.value = '';
        } else if (categorySelect?.value && categorySelect?.value !== 'All') {
          subcategorySelect.disabled = false;

          const newSubcategoryOptions = [];

          const visibleCards = Array.from(cards).filter((card) => {
            // temporarily add project management to category
            if (categorySelect.value === 'Project management') {
              const profession = card.getAttribute(`data-profession`);
              return profession && profession.trim().includes('Project management');
            } else if (categorySelect.value === 'Personal productivity') {
              // temporarily add Personal productivity to category
              const subcategory = card.getAttribute(`data-subcategory`);
              return subcategory && subcategory.includes('Personal productivity');
            } else {
              return card.getAttribute(`data-category`) === categorySelect.value;
            }
          });

          visibleCards.forEach((card) => {
            const value = card.getAttribute(`data-subcategory`);
            if (value && !newSubcategoryOptions.includes(value)) {
              newSubcategoryOptions.push(value);
          }});
          this['subcategory'] = newSubcategoryOptions;

          if (newSubcategoryOptions.length === 1) {
            subcategorySelect.value = '';
            subcategorySelect.disabled = true;
          }
        }
      }

      if (isCategory && subcategorySelect) {
        subcategorySelect.value = '';
      }


      // show how many cards are visible
      if (!filteredCountElement) {
        return;
      }
      if (filteredCount === cards.length) {
        filteredCountElement.textContent = "all";
      } else {
        filteredCountElement.textContent = filteredCount.toString();
      }

      // show active filters
      if (activeFiltersElement) {
        if (activeFilters.length > 0) {
          const filterText = activeFilters.join(', ');
          activeFiltersElement.innerHTML = ` filtered by ${filterText}`;
        } else {
          activeFiltersElement.innerHTML = '';
        }
      }

    }

  }

  customElements.define("usecase-filters", UsecaseFilters);

})();
