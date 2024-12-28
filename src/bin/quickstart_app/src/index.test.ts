import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/dom';

describe('App', () => {
  it('should render', () => {
    const app = screen.findByText('counter is 0');
    expect(app).toBeInTheDocument();
  });
});
