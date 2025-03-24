// @ts-check

const BackLink = class extends HTMLElement {

  connectedCallback() {
    let link = this.querySelector("a");
    if (!link) {
      return;
    }
    link.href = "javascript:history.back()";
  }

}

customElements.define("back-link", BackLink);
