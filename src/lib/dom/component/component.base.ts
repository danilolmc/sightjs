import { render } from '@/lib/dom/render.ts';
import { PropsHandler } from '@/lib/dom/component/handlers/props.ts';
import { RefHandler } from '@/lib/dom/component/handlers/ref.ts';
import { OnDestroyHandler } from '@/lib/dom/component/handlers/lifecycle/onDestroy.ts';
import { OnMountHandler } from '@/lib/dom/component/handlers/lifecycle/onMount.ts';
import { OnChangeHandler } from '@/lib/dom/component/handlers/lifecycle/onChange.ts';
import { ProjectionHandler } from '@/lib/dom/component/handlers/projection.ts';
import { RefContext } from '@/lib/dom/ref/RefContext.ts';
import { effect } from '@/lib/core/effect';
import { ComponentDef } from '@/lib/dom/component/component.ts';

export class ComponentClass<T> extends HTMLElement {
  private projectedHTML = '';
  private props = {};

  private projectionHandler = new ProjectionHandler();
  private refHandler = new RefHandler(this, RefContext.getInstance());

  private lifecycleHandlers = {
    destroyHandler: new OnDestroyHandler(),
    onMountHandler: new OnMountHandler(),
    onChangeHandler: new OnChangeHandler(),
  };

  private propsHandler = new PropsHandler(this, {
    ...this.lifecycleHandlers,
  });

  constructor(private componentDef: ComponentDef<T>) {
    super();
    this.projectedHTML = this.innerHTML;
    this.innerHTML = '';
  }

  async connectedCallback() {
    this.props = this.propsHandler.getProps();
    await this.renderContent();
    this.lifecycleHandlers.onMountHandler.executeCallbacks();
  }

  disconnectedCallback() {
    this.lifecycleHandlers.destroyHandler.executeCallbacks();
  }

  private async handleSlotsRendering(element: HTMLElement) {
    const slots = element?.querySelectorAll(
      'n-content',
    ) as NodeListOf<HTMLSlotElement>;

    const content = document.createElement('div');

    content.innerHTML = this.projectedHTML;

    this.projectionHandler.renderNamedSlotContent({
      namedSlots: Array.from(slots).filter((slot) => slot.hasAttribute('name')),
      content,
    });

    this.projectionHandler.renderUnnamedSlotContent({
      unnamedSlots: Array.from(slots).filter(
        (slot) => !slot.hasAttribute('name'),
      ),
      content,
    });

    this.projectionHandler.removeEmptyProjectionNodes(slots);
  }

  async renderContent() {
    const cmpDefinition = await this.componentDef.call(this, this.props);

    effect(async () => {
      const element = cmpDefinition();

      requestAnimationFrame(() => {
        this.lifecycleHandlers.onChangeHandler.executeCallbacks();
      });

      if (
        element instanceof HTMLElement &&
        element.querySelector('n-content')
      ) {
        await this.handleSlotsRendering(element);
      }

      render(this, element);

      this.refHandler.registerRefs();
    });
  }
}
