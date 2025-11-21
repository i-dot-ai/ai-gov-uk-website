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
                <ul class="govuk-list govuk-!-display-inline">
                    <li class="govuk-!-display-inline-block"><button class="govuk-button govuk-!-margin-right-2" aria-controls="kh-send-feedback-thank-you" @click=${this.#handleYes}>Yes</button></li>
                    <li class="govuk-!-display-inline-block"><button class="govuk-button" id="kh-send-feedback-no" aria-expanded="false" aria-controls="kh-send-feedback-form" @click=${this.#handleNo}>No</button></li>
                </ul>

                <form class="govuk-!-margin-top-2 hidden" @input=${this.#handleChange} id="kh-send-feedback-form" hidden>
                    <label class="govuk-label" for="what-did-you-need">What did you need?</label>
                    <textarea class="govuk-textarea" id="what-did-you-need"></textarea>
                    <label class="govuk-label" for="what-was-missing-or-confusing">What was missing or confusing?</label>
                    <textarea class="govuk-textarea" id="what-was-missing-or-confusing"></textarea>
                    <a href="${this.fullURL}" 
                        class="govuk-button govuk-!-margin-right-2 kh-send-feedback-form-link">
                        Submit feedback on Google Forms
                    </a>
                    <button type="button" class="govuk-button govuk-button--secondary" @click=${this.#handleCancel}>Cancel</button>
                </form>

            </div>
            <div class="kh-send-feedback-thank-you govuk-!-margin-top-6 govuk-!-margin-bottom-2 hidden" id="kh-send-feedback-thank-you" hidden>
                <h2 class="govuk-heading-m">Thank you for your feedback</h2>
            </div>
        `;
    }

    #handleYes() {
        const sendFeedback = this.querySelector('.kh-send-feedback');
        sendFeedback.classList.add('hidden');
        sendFeedback.setAttribute('hidden', '');
        
        const sendFeedbackThankYou = this.querySelector('.kh-send-feedback-thank-you');
        sendFeedbackThankYou.classList.remove('hidden');
        sendFeedbackThankYou.removeAttribute('hidden');
    }
    #handleCancel() {
        const sendFeedbackForm = this.querySelector('#kh-send-feedback-form');
        sendFeedbackForm.classList.add('hidden');
        sendFeedbackForm.setAttribute('hidden', '');

        this.querySelector('#kh-send-feedback-no').setAttribute('aria-expanded', 'false');
    }

    #handleNo() {
        const sendFeedbackForm = this.querySelector('#kh-send-feedback-form');
        sendFeedbackForm.classList.remove('hidden');
        sendFeedbackForm.removeAttribute('hidden');

        this.querySelector('#kh-send-feedback-no').setAttribute('aria-expanded', 'true');
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