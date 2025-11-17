import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemDetail from '../pages/ItemDetail';
import { MemoryRouter } from 'react-router-dom';

describe('ItemDetail', () => {
  it('affiche le composant sans crash', () => {
    render(
      <MemoryRouter>
        <ItemDetail />
      </MemoryRouter>
    );
    // On vérifie juste que le composant se rend
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
  });
});
