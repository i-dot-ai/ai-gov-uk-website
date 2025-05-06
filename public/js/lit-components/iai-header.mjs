// @ts-check

import { LitElement, html } from 'lit';


const IaiHeader = class extends LitElement {
  
  static properties = {
    productName: {type: String, attribute: "product-name"},
    navItems: {type: Array, attribute: "nav-items"},
  };

  createRenderRoot() {
    this.innerHTML = "";
    return this;
  }

  render() {
    return html`
      <header class="govuk-header govuk-header--full-width-border" data-module="govuk-header">
        <div class="govuk-header__container govuk-width-container">
          <div class="govuk-header__logo">
            <a href="/" class="govuk-header__link govuk-header__link--homepage">
              <span style="font-weight: bold;">AI.GOV.UK</span>
              <span class="govuk-header__product-name">${this.productName}</span>
            </a>
          </div>
          ${this.navItems ? html`
            <div class="govuk-header__content">  
              <nav aria-label="Menu" class="govuk-header__navigation">
                <button type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation" aria-expanded="false" hidden="">
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
                </ul>
              </nav>
            </div>
          ` : ''}
        </div>
      </header>
    `;
  }

}

customElements.define("iai-header", IaiHeader);
