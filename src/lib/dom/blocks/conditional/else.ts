import { IfBlock } from '../conditional/if';

export class ElseBlock extends HTMLElement {
  relativeIfBlock: IfBlock | null = null;

  constructor() {
    super();
    this.setAttribute('hidden', '');
  }
  connectedCallback() {
    if (!this.relativeIfBlock) {
      this.remove();
      return;
    }

    this.replaceWith(...Array.from(this.childNodes));
  }
}
customElements.define('n-else', ElseBlock);
