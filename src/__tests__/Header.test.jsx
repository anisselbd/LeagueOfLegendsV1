import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('affiche le texte League of Legends', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const matches = screen.getAllByText((content, element) =>
      element.textContent?.replace(/\s+/g, ' ').includes('League of Legends')
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it('affiche le bouton Menu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument();
  });
});
