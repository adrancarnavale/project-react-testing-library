import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Adds teste for the component About.js', () => {
  it('Tests if page contains pokedéx infos', () => {
    renderWithRouter(<About />);
    const infoOne = screen.getByText(/this application simulates/i);
    const infoTwo = screen.getByText(/one can filter/i);
    expect(infoOne).toBeInTheDocument();
    expect(infoTwo).toBeInTheDocument();
  });

  it('Tests if page contains correct header', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent('About Pokédex');
  });

  it('Tests if page contains two paragraphs', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Tests if page contains the correct image', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText(/pokédex/i);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
