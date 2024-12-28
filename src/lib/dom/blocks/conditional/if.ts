import { ElseBlock } from '../conditional/else';

export class IfBlock extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  private removeElseBlock() {
    if (this.nextElementSibling?.tagName.toLowerCase() == 'n-else') {
      this.nextElementSibling.remove();
    }
  }

  private handleIfBlock() {
    this.replaceWith(...Array.from(this.childNodes));
  }

  render() {
    if (this.nextElementSibling?.tagName.toLowerCase() == 'n-else') {
      (this.nextElementSibling as ElseBlock).relativeIfBlock = this;
    }

    const attributeValue = this.getAttribute('condition');

    if (attributeValue == 'true') {
      this.removeElseBlock();
      this.handleIfBlock();
    } else if (attributeValue == 'false') {
      this.remove();
    } else {
      this.removeElseBlock();
      this.remove();
    }
  }
}

customElements.define('n-if', IfBlock);
