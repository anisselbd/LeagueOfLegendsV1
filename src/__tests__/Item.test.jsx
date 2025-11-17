import React from 'react';
import { render, screen } from '@testing-library/react';
import Item from '../pages/Item';
import { MemoryRouter } from 'react-router-dom';

describe('Item', () => {
  it('affiche le titre de la page des items', () => {
    render(
      <MemoryRouter>
        <Item />
      </MemoryRouter>
    );
    const headings = screen.getAllByText(/Page des Items/i);
    expect(headings[0].tagName).toBe('H1');
  });
});
