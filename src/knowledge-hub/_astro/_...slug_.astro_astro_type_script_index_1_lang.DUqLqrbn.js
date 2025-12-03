import{i as a,x as r}from"./lit-element.CBixG2jI.js";class e extends a{static properties={category:{type:String,attribute:"category"},type:{type:String,attribute:"type"},queryParams:{type:String,attribute:"query-params"}};constructor(){super(),this.category="",this.type="",this.queryParams="",console.log("DynamicBreadcrumbs constructor",this.category,this.type,this.queryParams)}createRenderRoot(){return this.innerHTML="",this}connectedCallback(){super.connectedCallback(),this.queryParams=new URLSearchParams(window.location.search).get("directTo")||""}render(){return r`
          <nav class="govuk-breadcrumbs govuk-!-margin-top-0 govuk-!-margin-bottom-5" aria-label="Breadcrumb">
            <ol class="govuk-breadcrumbs__list">
                <li class="govuk-breadcrumbs__list-item">
                    <a class="govuk-breadcrumbs__link govuk-!-margin-0" href="/">Home</a>
                </li>
                ${this.queryParams?r`
                  ${this.type==="prompt"?r`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/prompts">Prompts</a>
                    </li>
                    `:r`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/tools">Tools</a>
                    </li>
                  `}`:r`
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/#common-tasks-with-ai">What are you looking to do with AI?</a>
                    </li>
                    <li class="govuk-breadcrumbs__list-item">
                        <a class="govuk-breadcrumbs__link" href="/capability/${this.category.toLowerCase().replace(/ /g,"-")}">${this.category}</a>
                        </li>
                    `}
            </ol>
        </nav>
      `}}customElements.define("dynamic-breadcrumbs",e);
