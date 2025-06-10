// @ts-check


/**
 * @type {CustomElementConstructor}
 */
const CopyButton = class extends HTMLElement {


  connectedCallback() {

    this.innerHTML = `
      <style>
        .copy-button {
          background-color: transparent;
          border: 1px solid var(--iai-pink);
          box-shadow: 0 2px var(--iai-pink);
          color: var(--iai-pink);
          font-size: 14px;
          padding: 6px 10px;
        }
        .copy-button:hover {
          background-color: var(--iai-pink);
          color: white;
        }
      </style>
      <button class="copy-button govuk-button govuk-!-margin-0" @click="${this.#copyToClipboard}">
        ${this.innerHTML}
      </button>
    `;

    this.querySelector('button')?.addEventListener('click', () => {
      this.#copyToClipboard(); // need `this` to be the whole component
    });
    
  }


  #copyToClipboard() {

    const contentElement = document.querySelector(`#${this.getAttribute('copy')}`);

    /**
     * Copies the content inside the <markdown-converter> to the clipboard
     * @param {ClipboardEvent} evt 
     */
    const listener = (evt) => {
      evt.clipboardData?.setData("text/html", contentElement?.innerHTML.trim() || '');
      evt.clipboardData?.setData("text/plain", contentElement?.textContent?.trim() || '');
      evt.preventDefault();
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);

  }


}

customElements.define("copy-button", CopyButton);
