import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Food from '../Pages/Food';
import meals from '../../cypress/mocks/meals';

const SEARCH_BTN = 'search-top-btn';

describe('Testa o componente Foodf', () => {
  it('Testa se o componente Drink renderiza corretamente', () => {
    renderWithRouter(<Food />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    const foodText = screen.getByRole('heading', { name: /Foods/i });
    expect(searchBtn).toBeInTheDocument();
    expect(foodText).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  it('Testa se o site é renderizado sem o input', () => {
    renderWithRouter(<Food />);
    const input = screen.queryByRole('textbox');
    expect(input).toBeNull();
  });
  it('Testa se ao clicar no botão de search, aparece o input', () => {
    renderWithRouter(<Food />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
  it('Testa se ao clicar duas vezes no botão de search ele fica escondido', () => {
    renderWithRouter(<Food />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    userEvent.click(searchBtn);
    const input = screen.queryByRole('textbox');
    expect(input).toBeNull();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<Food />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Testa se o filtro All faz a requisição inicial', async () => {
    renderWithRouter(<Food />);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const allBtn = await screen.findByRole('button', { name: /all/i });
    await act(async () => {
      userEvent.click(allBtn);
    });
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
