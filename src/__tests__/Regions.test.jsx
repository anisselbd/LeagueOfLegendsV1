import React from 'react';
import { render, screen } from '@testing-library/react';
import Regions from '../pages/Regions';
import { MemoryRouter } from 'react-router-dom';

describe('Regions', () => {
  it('affiche le titre de la page des régions', () => {
    render(
      <MemoryRouter>
        <Regions />
      </MemoryRouter>
    );
    expect(screen.getByText(/Régions de Runeterra/i)).toBeInTheDocument();
  });
});
