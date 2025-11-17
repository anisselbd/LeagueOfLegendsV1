
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  it('affiche la pagination', () => {
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
