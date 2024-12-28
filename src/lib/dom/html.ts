import { hyper } from 'hyperhtml';
import '@/lib/dom/blocks/conditional/if';
import '@/lib/dom/blocks/conditional/else';
import '@/lib/dom/blocks/n-switch';

export function html(
  template: TemplateStringsArray,
  ...substitutions: unknown[]
): HTMLElement {
  const templateFinal = hyper(template, ...substitutions);
  return templateFinal;
}
