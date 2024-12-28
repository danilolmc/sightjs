export class ProjectionHandler {
  renderNamedSlotContent({
    namedSlots,
    content,
  }: {
    namedSlots: Array<HTMLSlotElement>;
    content: HTMLElement;
  }) {
    const processedSlotsName = new Map();

    namedSlots.forEach((slot) => {
      const currentSlotName = slot.getAttribute('name') as string;
      const alreadyProcessedSlot = processedSlotsName.has(currentSlotName);

      if (!alreadyProcessedSlot) {
        const elementsWithSlot = Array.from(content.children).filter(
          (element) => {
            const el = element.getAttribute('slot') == currentSlotName;
            element.removeAttribute('slot');
            return el;
          },
        );

        if (elementsWithSlot.length > 0) {
          if (slot) {
            slot.replaceWith(...elementsWithSlot);
          }
        }
        processedSlotsName.set(currentSlotName, true);
      }
    });
  }

  renderUnnamedSlotContent({
    unnamedSlots,
    content,
  }: {
    unnamedSlots: Array<HTMLSlotElement>;
    content: HTMLElement;
  }) {
    const elementsWithOutSlot = Array.from(content.childNodes).filter(
      (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return !(node as Element).hasAttribute('slot');
        }
        return true;
      },
    );

    if (elementsWithOutSlot.length > 0) {
      const singleSlot = unnamedSlots[0];
      if (singleSlot) {
        singleSlot.replaceWith(...elementsWithOutSlot);
      }
    }
  }

  removeEmptyProjectionNodes(slots: NodeListOf<HTMLSlotElement>) {
    slots.forEach((slot) => {
      if (slot.childNodes.length == 0) {
        slot.remove();
      }
    });
  }
}
