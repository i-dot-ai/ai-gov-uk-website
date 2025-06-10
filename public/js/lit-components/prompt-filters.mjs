// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  /**
   * @type {CustomElementConstructor}
   */
  const PromptFilters = class extends LitElement {

    createRenderRoot() {
      this.innerHTML = "";
      return this;
    }

    constructor() {
      super();
      this.tags = [];
    }

    connectedCallback() {
      super.connectedCallback();
      
      // get tags from each prompt
      document.querySelectorAll('.js-prompt__tag').forEach((tag) => {
        if (!this.tags.includes(tag.textContent)) {
          this.tags.push(tag.textContent);
        }
      });

      this.tags.sort((a, b) => {
        return a > b ? 1 : -1;
      });

    }

    firstUpdated() {
      // listen for URL changes
      const getQueryParams = () => {
        this.querySelector('#search').value = new URL(window.location.href).searchParams.get('search');
        const selectedTags = new URL(window.location.href).searchParams.get('tags')?.split(',');
        selectedTags?.forEach((tag) => {
          let checkbox = this.querySelector(`[value="${tag}"]`);
          if (checkbox) {
            checkbox.checked = true;
          }
        });
        this.#applyFilters();
      };
      window.addEventListener('popstate', getQueryParams);
      getQueryParams();
    }

    render() {
      return html`
 
        <div class="govuk-form-group">
          <label class="govuk-label" for="search">Search</label>
          <input @keyup=${this.#applyFilters} class="govuk-input" id="search" name="search" type="text">
        </div>

        <div class="govuk-form-group govuk-!-margin-bottom-0">
          <fieldset class="govuk-fieldset">
            <legend class="govuk-fieldset__legend">Tags</legend>
            <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
              ${this.tags.map((tag) => html`
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" name="tags" id="tag-${tag}" type="checkbox" value="${tag}" @click=${this.#applyFilters}>
                  <label class="govuk-label govuk-checkboxes__label" for="tag-${tag}" style="font-size: 1rem;">${tag}</label>
                </div>
              `)}
            </div>
          </fieldset>
        </div>

      `;
    }

    #applyFilters() {

      const search = this.querySelector('#search')?.value.trim().toLowerCase();

      const selectedTags = [...this.querySelectorAll('[name="tags"]')]
        .filter((tag) => {
          return tag.checked;
        })
        .map((tag) => tag.value);

      const url = new URL(window.location.href);
      url.searchParams.set('search', search);
      url.searchParams.set('tags', selectedTags.toString());
      window.history.pushState({}, '', url);

      /** @type {NodeListOf<HTMLElement>} */
      const cards = document.querySelectorAll('.js-prompt');
      const filteredCountElement = document.querySelector("#filtered-count");
      let filteredCount = 0;

      // show/hide cards based on selected filters
      cards.forEach((card) => {

        let cardIsVisible = true;

        if (selectedTags.length) {
          const cardTags = [...card.querySelectorAll('.js-prompt__tag')].map((tag) => tag.textContent);
          cardIsVisible = cardTags.some((tag) => selectedTags.includes(tag));
        }

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

  customElements.define("prompt-filters", PromptFilters);

})();
