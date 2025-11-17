import React from 'react';
import { render, screen } from '@testing-library/react';
import ChampionDetail from '../pages/ChampionDetail';
import { MemoryRouter } from 'react-router-dom';

describe('ChampionDetail', () => {
  it('affiche le composant sans crash', () => {
    render(
      <MemoryRouter>
        <ChampionDetail />
      </MemoryRouter>
    );
    // On vérifie juste que le composant se rend
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
  });
});
