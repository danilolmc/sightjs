import { MissingNSwitchValueAttributeError } from '../errors/n-switch.errors';

const CASE_INFERENCE_ATTR_NAME = 'is';
const CASE_DEFAULT_ATTR_NAME = 'default';

export class DOMSwitchCase extends HTMLElement {}

export class DOMSwitch extends HTMLElement {
  private projectedContent = '';

  constructor() {
    super();
    this.projectedContent = this.innerHTML;
    this.innerHTML = '';
  }

  private handleInsert(newContent: HTMLElement) {
    this.innerHTML = '';

    while (newContent.firstChild) {
      this.append(newContent.firstChild);
      newContent.firstChild?.remove();
    }
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.innerHTML = this.projectedContent;
    const cases = Array.from(container.children);
    const missingValueAttribute = this.hasAttribute('value');

    if (!missingValueAttribute) {
      console.error(new MissingNSwitchValueAttributeError());
      this.remove();
      return;
    }

    requestAnimationFrame(() => {
      const switchValueAttribute = this.getAttribute('value');

      const isAllCaseComponents = cases.every((caseComponent) => {
        return caseComponent.tagName.toLowerCase() === 'n-case';
      });

      if (isAllCaseComponents) {
        const activeCase = cases.find((el) => {
          const caseValue = el.getAttribute(CASE_INFERENCE_ATTR_NAME);
          return caseValue == 'true' || caseValue == switchValueAttribute;
        }) as HTMLElement;

        const defaultCase = container.querySelector(
          `[${CASE_DEFAULT_ATTR_NAME}]`,
        ) as HTMLElement;

        if (activeCase) {
          this.handleInsert(activeCase);
        } else {
          if (defaultCase) {
            this.handleInsert(defaultCase);
          } else {
            this.remove();
          }
        }
      }
    });
  }
}

customElements.define('n-switch', DOMSwitch);
customElements.define('n-case', DOMSwitchCase);
