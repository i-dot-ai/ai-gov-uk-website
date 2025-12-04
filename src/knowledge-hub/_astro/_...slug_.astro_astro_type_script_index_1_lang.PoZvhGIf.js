import{i as e,x as s}from"./lit-element.CBixG2jI.js";class i extends e{static properties={headings:{type:Array,state:!0},sidebar:{type:Boolean,attribute:"sidebar"}};constructor(){super(),this.headings=[],this.sidebar=!1}createRenderRoot(){return this.innerHTML="",this}connectedCallback(){super.connectedCallback(),this.sidebar&&(this.className="kh-sticky-sidebar__nav"),this.updateHeadings()}render(){return s`
      ${this.headings.length?s`
        ${this.sidebar?s`
            <nav class="govuk-!-margin-bottom-6">
              <h2 class="govuk-heading-s govuk-!-font-weight-regular kh-sticky-sidebar__nav-title">Contents</h2>
                <ul class="govuk-list govuk-list--spaced govuk-!-margin-bottom-0 kh-sticky-sidebar__nav-list">
                  ${this.headings.map(t=>s`
                    <li class="kh-sticky-sidebar__list-item--dashed govuk-!-padding-right-5 govuk-!-padding-left-6"><a href="#${t.id}" class="analytics-on-this-page-link">${t.content}</a></li>
                  `)}
                </ul>
              </nav>`:s`
            <div class="govuk-!-padding-5 govuk-!-margin-bottom-6 govuk-!-margin-top-7" style="border: 1px solid #0b0c0c;">
              <h2 class="govuk-heading-s">On this page:</h2>
              <ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0">
                ${this.headings.map(t=>s`
                  <li class="govuk-!-padding-1"><a class="govuk-link" href="#${t.id}">${t.content}</a></li>
                `)}
              </ul>
            </div>
      `}`:""}
    `}updateHeadings(){this.headings=[],document.querySelectorAll("#content h2").forEach(t=>{this.headings.push({id:t.id,content:t.textContent})}),this.headings.length===0&&document.querySelectorAll("#content h3").forEach(t=>{this.headings.push({id:t.id,content:t.textContent})})}}customElements.define("on-this-page",i);
