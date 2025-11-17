import React from 'react';
import { render, screen } from '@testing-library/react';
import Champions from '../pages/Champions';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../store/useChampions', () => ({
  useChampions: () => ({
    fetchAll: jest.fn(),
    champions: [{ id: 'Aatrox', name: 'Aatrox' }],
    version: '13.1.1',
    loading: false,
  })
}));

jest.mock('../data/championRegions.json', () => ({
  Aatrox: 'demacia'
}));

describe('Champions', () => {
  it('affiche la liste des champions', () => {
    render(
      <MemoryRouter>
        <Champions />
      </MemoryRouter>
    );
    expect(screen.getByText('Aatrox')).toBeInTheDocument();
  });
});
