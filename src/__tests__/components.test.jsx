import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Pagination from '../components/Pagination';

describe('Footer', () => {
  it('affiche le nom de la marque', () => {
    render(<Footer />);
    expect(screen.getByText(/Anisselbd/i)).toBeInTheDocument();
  });
});

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
});

describe('Pagination', () => {
  it('affiche les boutons de pagination', () => {
    const items = [
      { name: 'Item 1', image: { full: 'img1.png' }, id: 1 },
      { name: 'Item 2', image: { full: 'img2.png' }, id: 2 }
    ];
    render(
      <MemoryRouter>
        <Pagination
          items={items}
          itemsPerPage={1}
          page={1}
          setPage={() => {}}
          version=""
          search=""
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page/)).toBeInTheDocument();
    const pageSpans = screen.getAllByText((content, element) =>
      element.textContent?.replace(/\s+/g, ' ').includes('Page 1 / 2')
    );
    expect(pageSpans.length).toBeGreaterThan(0);
  });
});
