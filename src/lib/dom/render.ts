import { bind } from 'hyperhtml';
export function render(container: Element, element: Element) {
  return bind(container)`${element}`;
}
