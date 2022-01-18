import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests the component Pokémon.js', () => {
  it('Tests if the correct card is rendered', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText(/pikachu sprite/i);
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image.src).toBe(imageSrc);
  });

  it('Tests the link in the pokemon Card', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });

    expect(link.href).toBe('http://localhost/pokemons/25');

    userEvent.click(link);

    expect(history.location.pathname).toBe('/pokemons/25');

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkbox);

    const star = screen.getByAltText(/pikachu is marked as favorite/i);
    const starSrc = 'http://localhost/star-icon.svg';
    expect(star.src).toBe(starSrc);
  });
});
