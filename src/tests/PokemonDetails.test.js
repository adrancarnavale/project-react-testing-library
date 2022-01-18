import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests the PookemonDetails component', () => {
  const url = '/pokemons/25';

  it('Tests the detailed infos about the pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    history.push(url);
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const name = screen.getByTestId('pokemon-name');
    const heading = screen.getByRole('heading', { level: 2, name: /summary/i });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(pokemonDetails).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    expect(link).not.toBeInTheDocument();
    expect(heading).toHaveTextContent('Summary');
    expect(paragraph).toBeInTheDocument();
  });

  it('Tests if the maps exist', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const locations = screen.getByRole('heading', { name: /game locations of/i });
    expect(locations).toHaveTextContent(/pikachu/i);

    const maps = screen.getAllByAltText(/pikachu location/i);
    expect(maps).toHaveLength(2);

    const nameOfLocations = screen.getAllByText(/kanto/i);
    expect(nameOfLocations).toHaveLength(2);

    const imageSrcs = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    maps.map((mapUnit, index) => (
      expect(mapUnit.src).toBe(imageSrcs[index])
    ));
  });

  it('Tests if pokémons can be favorited', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const checkbox = screen.getByLabelText(/pokémon favoritado/i);

    userEvent.click(checkbox);
    const star = screen.getByAltText(/pikachu is marked/i);
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
