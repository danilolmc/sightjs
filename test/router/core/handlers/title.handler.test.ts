import { describe, expect, it } from 'vitest';
import { DocumentTitleRouterHandler } from '@/lib/router';

describe('Document Title Route Handler', () => {
  it('should set document title', () => {
    const handler = new DocumentTitleRouterHandler();
    const title = 'New Title';
    handler.setDocumentTitle(title)

    expect(document.title).toBe(title);
  });

  it('should not set document title if title is not defined', () => {
    document.title = 'Old title';

    const handler = new DocumentTitleRouterHandler();
    handler.setDocumentTitle(undefined)

    expect(document.title).toBe('Old title');
  });

  it('should not set document title if title is empty', () => {
    document.title = 'Old title';

    const handler = new DocumentTitleRouterHandler();
    handler.setDocumentTitle('')

    expect(document.title).toBe('Old title');
  });
});
