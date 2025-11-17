import React from 'react';
import { render, screen } from '@testing-library/react';
import RegionDetail from '../pages/RegionDetail';
import { MemoryRouter } from 'react-router-dom';

describe('RegionDetail', () => {
  it('affiche le composant sans crash', () => {
    render(
      <MemoryRouter>
        <RegionDetail />
      </MemoryRouter>
    );
    // On vérifie juste que le composant se rend
    expect(screen.getByText(/Région inconnue/i)).toBeInTheDocument();
  });
});
