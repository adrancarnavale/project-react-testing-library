import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Adds teste to the component NotFpund.js', () => {
  it('Tests if the page contains the correct header', () => {
    renderWithRouter(<NotFound />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent('Page requested not found 😭');
  });

  it('Tests if page contains the correct image', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because/i);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(src);
  });
});
