import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Adds teste to the component Pokedex.js', () => {
  it('Tests if page contains the correct heading', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('Tests "next pokémon"button', () => {
    renderWithRouter(<App />);
    const POKEMON_ARRAY_LENGTH = 8;
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
    userEvent.click(nextPokemonButton);
    const pokemonName = screen.getByText(/charmander/i);
    expect(pokemonName).toBeInTheDocument();

    for (let i = 0; i < POKEMON_ARRAY_LENGTH - 1; i += 1) {
      userEvent.click(nextPokemonButton);
    }
    const lastPokemon = screen.getByText(/dragonair/i);
    expect(lastPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Tests if only one pokémon is showed', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsLink).toHaveLength(1);
  });

  it('Tests if filter buttons exist', () => {
    renderWithRouter(<App />);
    const BUTTONS_QTY = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(BUTTONS_QTY);
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });

  it('Tests if first filter buttons works', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const names = ['Pikachu',
      'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Snorlax', 'Dragonair'];
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const POKEMONS_LENGTH = 7;

    for (let i = 0; i < POKEMONS_LENGTH; i += 1) {
      userEvent.click(buttons[i]);
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const allButton = screen.getByRole('button', { name: /all/i });

      expect(pokemonName).toHaveTextContent(names[i]);
      expect(pokemonType).toHaveTextContent(types[i]);
      expect(buttons[i]).toHaveTextContent(types[i]);
      expect(allButton).toBeInTheDocument();
    }
  });

  it('Tests if is possible reset the filter', () => {
    renderWithRouter(<App />);
    const typeButton = screen.getByRole('button', { name: /fire/i });
    const nextBtn = screen.getByTestId('next-pokemon');

    userEvent.click(typeButton);
    userEvent.click(nextBtn);

    const charmander = screen.getByTestId('pokemon-name');
    expect(charmander).toHaveTextContent('Rapidash');

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    expect(charmander).toHaveTextContent('Pikachu');
  });
});
