import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('affiche le nom de la marque', () => {
    render(<Footer />);
    expect(screen.getByText(/Anisselbd/i)).toBeInTheDocument();
  });

  it('affiche le lien GitHub', () => {
    render(<Footer />);
    expect(screen.getByText('GitHub')).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('affiche le lien LinkedIn', () => {
    render(<Footer />);
    expect(screen.getByText('LinkedIn')).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });
});
