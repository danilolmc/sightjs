import { hyper } from 'hyperhtml';
import { IRouterRenderer } from '@/lib/router/types.ts';

export class RouterRenderer implements IRouterRenderer {
  render(parentElement: Element, component: Element) {
    if (parentElement.tagName == 'N-OUTLET') {
      parentElement.insertAdjacentElement('afterend', component);
      parentElement.remove();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      hyper.bind(parentElement)`${component}`;
    }
  }
}
