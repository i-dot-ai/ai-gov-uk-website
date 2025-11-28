// @ts-check

(async () => {

  let LitElement, html;

  if (typeof(window) === "undefined") {
    ({ LitElement, html } = await import("lit"));
  } else {
    ({ LitElement, html} = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
  }


  const IaiHeader = class extends LitElement {
    
    static properties = {
      productName: {type: String, attribute: "product-name"},
      navItems: {type: Array, attribute: "nav-items"},
      homeUrl: {type: String, attribute: "home-url"},
    };

    createRenderRoot() {
      this.innerHTML = "";
      console.log(this.productName);
      return this;
    }

    render() {
      return html`
        <header class="govuk-header govuk-header--full-width-border" data-module="govuk-header">
          <div class="govuk-header__container govuk-width-container">
            <div class="govuk-header__logo">
              <a href=${this.homeUrl || '/'} class="govuk-header__link govuk-header__link--homepage">
                <span style="font-weight: bold;">AI.GOV.UK</span>
                <span class="govuk-header__product-name">${this.productName}</span>
              </a>
            </div>
            ${this.navItems ? html`
              <div class="govuk-header__content">  
                <nav aria-label="Menu" class="govuk-header__navigation">
                  <button @click=${this.#toggleMenu} type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation" aria-expanded="false">
                    Menu
                  </button>
                  <ul id="navigation" class="govuk-header__navigation-list">
                    ${this.navItems.map((navItem) => html`
                      <li class="govuk-header__navigation-item">
                        <a class="govuk-header__link" href=${navItem.href}>
                          ${navItem.text}
                        </a>
                      </li>
                    `)}
                    ${this.productName === "Knowledge Hub" ? '' :
                      html` 
                        <li class="govuk-header__navigation-item govuk-header__navigation-item--search">
                          <a class="govuk-header__link" href="/search">
                            <span class="govuk-visually-hidden">Search</span>
                            <span class="govuk-header__search-text" aria-hidden="true">Search</span>
                            <svg viewBox="0 0 27 27" fill="none" aria-hidden="true" focusable="false" class="govuk-header__search-icon">
                              <circle cx="12.0161" cy="11.0161" r="8.51613" stroke="currentColor" stroke-width="3"></circle>
                              <line x1="17.8668" y1="17.3587" x2="26.4475" y2="25.9393" stroke="currentColor" stroke-width="3"></line>
                            </svg>
                          </a>
                        </li>
                      `}
                  </ul>
                </nav>
              </div>
            ` : ''}
          </div>
        </header>
      `;

    }

    #toggleMenu() {
      let button = this.querySelector('.govuk-js-header-toggle');
      let currentlyExpanded = button.getAttribute('aria-expanded') === "true";
      button.setAttribute('aria-expanded', currentlyExpanded ? 'false' : 'true');
    }

  }

  customElements.define("iai-header", IaiHeader);

})();
