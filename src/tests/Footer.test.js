import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Testa se o componente "Footer" é renderizado corretamente', () => {
    renderWithRouter(<Footer />);
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    const foodBtn = screen.getByTestId('food-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
  });
  it('Testa se o botão de drink faz o redirecionamento correto', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testa se o botão de explore faz o redirecionamento correto', () => {
    const { history } = renderWithRouter(<Footer />);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBtn);
    expect(history.location.pathname).toBe('/explore');
  });
  it('Testa se o botão de food faz o redirecionamento correto', () => {
    const { history } = renderWithRouter(<Footer />);
    const foodBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodBtn);
    expect(history.location.pathname).toBe('/foods');
  });
});
