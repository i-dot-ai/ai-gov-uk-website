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
      organisations: { type: Array, state: true },
      phases: { type: Array, state: true },
    };

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    constructor() {
      super();
      this.organisations = [];
      this.phases = [];
    }

    connectedCallback() {
      super.connectedCallback();
      // get options to filter from each use case
      const organisations = document.querySelectorAll('[data-category="organisation"]');
      organisations.forEach((organisation) => {
        this.organisations.push(organisation.textContent);
      });
      const phases = document.querySelectorAll('[data-category="phase"]');
      phases.forEach((phase) => {
        this.phases.push(phase.textContent);
      });
    }

    render() {
      return html`
        <div class="govuk-form-group">
          <label class="govuk-label" for="organisation">Organisation</label>            
          <select @change=${this.#applyFilters} class="govuk-select" id="organisation">
            <option value="">All</option>
            ${this.organisations.map((organisation) => html`
              <option value="${organisation}">${organisation}</option>
            `)}
          </select>
        </div>
        <div class="govuk-form-group">
          <label class="govuk-label" for="phase">Phase</label>            
          <select @change=${this.#applyFilters} class="govuk-select" id="phase">
            <option value="">All</option>
            ${this.phases.map((phase) => html`
              <option value="${phase}">${phase}</option>
            `)}
          </select>
        </div>
      `;
    }

    #applyFilters() {
      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('[data-category="use-case"]');
      const organisation = this.querySelector("#organisation").value;
      const phase = this.querySelector("#phase").value;

      cards.forEach((card) => {
        card.style.display = "block";
      });

      if (organisation) {
        cards.forEach((card) => {
          console.log(card.querySelector('[data-category="organisation"]')?.textContent);
          if (card.querySelector('[data-category="organisation"]')?.textContent !== organisation) {
            card.style.display = "none";
          }
        });
      }

      if (phase) {
        cards.forEach((card) => {
          if (card.querySelector('[data-category="phase"]')?.textContent !== phase) {
            card.style.display = "none";
          }
        });
      }

    }

  }

  customElements.define("usecase-filters", UsecaseFilters);

})();
