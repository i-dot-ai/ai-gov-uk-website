import{i as o,x as i}from"./lit-element.CBixG2jI.js";class s extends o{createRenderRoot(){return this.innerHTML="",this.baseGoogleFormURL="https://docs.google.com/forms/d/e/1FAIpQLSf3DRMLYPKH-bzxqsqXvYFYmV052srpNUSOrcaLl5jyKUxxuA/viewform?usp=pp_url&entry.1713974245=No",this.pageURLID="entry.1049646843",this.pageURL=window.location.href,this.fullURL=`${this.baseGoogleFormURL}&${this.pageURLID}=${this.pageURL}`,this}connectedCallback(){super.connectedCallback()}render(){return i`
            <div class="kh-send-feedback govuk-!-margin-top-6 govuk-!-margin-bottom-2" id="kh-send-feedback">
                <h2 class="govuk-heading-m govuk-!-display-inline-block govuk-!-margin-right-2">Did this page help you?</h2>
                <ul class="govuk-list govuk-!-display-inline">
                    <li class="govuk-!-display-inline-block">
                        <button class="govuk-button govuk-!-margin-right-2" aria-controls="kh-send-feedback-thank-you" @click=${this.#i}>Yes</button>
                    </li>
                    <li class="govuk-!-display-inline-block">
                        <button class="govuk-button" id="kh-send-feedback-no" aria-controls="kh-send-feedback-fill-out-form" @click=${this.#s}>No</button>
                    </li>
                </ul>
            </div>
            <div class="govuk-!-margin-top-6 govuk-!-margin-bottom-2 hidden" id="kh-send-feedback-fill-out-form" hidden>
            <h2 class="govuk-heading-m">Help us improve the Knowledge Hub</h2>
                <p class="govuk-body">To help us improve the Knowledge Hub, we’d like to know more about your visit today. 
                <a href="${this.fullURL}" target="_blank" rel="noopener noreferrer" class="govuk-link">Please fill in this form (opens in a new tab)</a>.</p>
            </div>
            <div class="govuk-!-margin-top-6 govuk-!-margin-bottom-2 hidden" id="kh-send-feedback-thank-you" hidden>
                <h2 class="govuk-heading-m">Thank you for your feedback</h2>
            </div>
        `}#e(e){e?.classList.add("hidden"),e?.setAttribute("hidden","")}#o(e){e?.classList.remove("hidden"),e?.removeAttribute("hidden")}#i(){this.#e(this.querySelector(".kh-send-feedback")),this.#o(this.querySelector("#kh-send-feedback-thank-you")),posthog.capture("kh_send_feedback_yes_button_clicked")}#s(){this.#e(this.querySelector(".kh-send-feedback")),this.#o(this.querySelector("#kh-send-feedback-fill-out-form")),posthog.capture("kh_send_feedback_no_button_clicked")}}customElements.define("send-feedback",s);
