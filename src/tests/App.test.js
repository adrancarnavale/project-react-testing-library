import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Adds tests for the component App.js', () => {
  it('Tests fixed links in Header section', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toHaveTextContent('Home');
    expect(aboutLink).toHaveTextContent('About');
    expect(favoritePokemonsLink).toHaveTextContent('Favorite Pokémons');
  });

  it('Tests if the app redirects to Home page', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Tests if the app redirects to About Page', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Tests if the app redirects to the Favorites Page', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Tests if the app redirects to the Not Found Page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/thisdontexist');
    const notFoundText = screen.getByRole('heading',
      { name: /page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
});
