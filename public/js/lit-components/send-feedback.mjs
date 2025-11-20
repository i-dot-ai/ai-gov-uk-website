// @ts-check

(async () => {

    let LitElement, html;
  
    if (typeof(window) === "undefined") {
      ({ LitElement, html } = await import("lit"));
    } else {
      ({ LitElement, html } = await import("https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"));
    }

  const SendFeedback = class extends LitElement {
    createRenderRoot() {
        this.innerHTML = "";
        this.showForm = false;
        this.baseGoogleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSf3DRMLYPKH-bzxqsqXvYFYmV052srpNUSOrcaLl5jyKUxxuA/viewform?usp=pp_url&entry.1713974245=No";
        this.pageURLID = "entry.1049646843";
        this.whatDidYouNeedID = "entry.1409682040";
        this.whatWasMissingOrConfusingID = "entry.964353285";
        this.pageURL = window.location.href;
        this.fullURL = `${this.baseGoogleFormURL}&${this.pageURLID}=${this.pageURL}`;
        return this;
      }

    connectedCallback() {
        super.connectedCallback();

    }

    render() {
        return html`
            <div class="kh-send-feedback govuk-!-margin-top-6 govuk-!-margin-bottom-2" id="kh-send-feedback">
                <h2 class="govuk-heading-m govuk-!-display-inline-block govuk-!-margin-right-2">Did this page help you?</h2>
                <button class="govuk-button govuk-!-margin-right-2" @click=${this.#handleYes}>Yes</button>
                <button class="govuk-button" @click=${this.#handleNo}>No</button>

                <form class="govuk-!-margin-top-2 hidden" @input=${this.#handleChange}>
                    <label class="govuk-label" for="what-did-you-need">What did you need?</label>
                    <textarea class="govuk-textarea" id="what-did-you-need"></textarea>
                    <label class="govuk-label" for="what-was-missing-or-confusing">What was missing or confusing?</label>
                    <textarea class="govuk-textarea" id="what-was-missing-or-confusing"></textarea>
                    <a href="${this.fullURL}" 
                        class="govuk-button govuk-!-margin-right-2 kh-send-feedback-form-link">
                        Submit feedback on Google Forms</a>
                    </a>
                    <button class="govuk-button govuk-button--secondary" @click=${this.#handleCancel}>Cancel</button>
                </form>
            </div>
            <div class="kh-send-feedback-thank-you govuk-!-margin-top-6 govuk-!-margin-bottom-2 hidden">
                <h2 class="govuk-heading-m">Thank you for your feedback</h2>
            </div>
        `;
    }

    #handleYes() {
        this.querySelector('.kh-send-feedback').classList.add('hidden');
        this.querySelector('.kh-send-feedback-thank-you').classList.remove('hidden');
    }
    #handleCancel() {
        this.querySelector('form').classList.add('hidden');
        this.querySelector('.kh-send-feedback').classList.remove('hidden');
        this.querySelector('.kh-send-feedback-thank-you').classList.add('hidden');
    }

    #handleNo() {
        this.querySelector('form').classList.remove('hidden');
    }
    #handleChange(e) {
        const target = e.target.id;

        if (target === 'what-did-you-need') {
            const oldLink = this.fullURL;
            // get the rest of the what-did-you-need part of the URL
            const whatDidYouNeedPart = oldLink.split(`&${this.whatDidYouNeedID}=`)[1];
            if (whatDidYouNeedPart) {
                // replace the what-did-you-need part of the URL with the new value
                this.fullURL = oldLink.replace(`&${this.whatDidYouNeedID}=${whatDidYouNeedPart}`, `&${this.whatDidYouNeedID}=${e.target.value}`);
            } else {
                // add the what-did-you-need part of the URL with the new value
                this.fullURL = oldLink + `&${this.whatDidYouNeedID}=${e.target.value}`;
            }
        } else if (target === 'what-was-missing-or-confusing') {
            const oldLink = this.fullURL;
            // get the rest of the what-was-missing-or-confusing part of the URL
            const whatWasMissingOrConfusingPart = oldLink.split(`&${this.whatWasMissingOrConfusingID}=`)[1];
            if (whatWasMissingOrConfusingPart) {
            // replace the what-was-missing-or-confusing part of the URL with the new value
                this.fullURL = oldLink.replace(`&${this.whatWasMissingOrConfusingID}=${whatWasMissingOrConfusingPart}`, `&${this.whatWasMissingOrConfusingID}=${e.target.value}`);
            } else {
                // add the what-was-missing-or-confusing part of the URL with the new value
                this.fullURL = oldLink + `&${this.whatWasMissingOrConfusingID}=${e.target.value}`;
            }
        }

        this.querySelector('.kh-send-feedback-form-link').href = this.fullURL;
    }
  
  }
  
  customElements.define("send-feedback", SendFeedback);

})();