import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Adds tests to the component FavoritePokemons.js', () => {
  it('Tests if the correct message is showed', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('Tests favorite pokemons feature', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favorite);
    history.push('/favorites');
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
