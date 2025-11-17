import React from 'react';
import { render, screen } from '@testing-library/react';
import Quiz from '../pages/Quiz';
import { MemoryRouter } from 'react-router-dom';

describe('Quiz', () => {
  it('affiche le bouton Commencer', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );
    const btn = await screen.findByText(/Lancer le quiz/i, {}, { timeout: 2000 });
    expect(btn).toBeInTheDocument();
  });
});
