import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  it('affiche le titre de la page d’accueil', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/League of Legends Explorer/i)).toBeInTheDocument();
  });
});
