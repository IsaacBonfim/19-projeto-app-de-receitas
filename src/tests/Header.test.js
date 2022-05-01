import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../Components/Header';

const SEARCH_BTN = 'search-top-btn';
const PROFILE_ICON = 'profile-top-btn';

describe('Testa o componente Header', () => {
  it('Testa se o componente Header renderiza corretamente', () => {
    renderWithRouter(<Header title="Foods" />);
    const profileIcon = screen.getByTestId(PROFILE_ICON);
    const searchIcon = screen.getByTestId(SEARCH_BTN);
    const title = screen.getByRole('heading', { name: /foods/i });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    renderWithRouter(<Header title="ARARA" />);
    const title2 = screen.getByRole('heading', { name: /arara/i });
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<Header title="Foods" />);
      const profileBtn = screen.getByTestId(PROFILE_ICON);
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });

  it('Testa se o site é renderizado sem o input', () => {
    renderWithRouter(<Header title="Foods" />);
    const input = screen.queryByRole('textbox');
    expect(input).toBeNull();
  });

  it('Testa se ao clicar no botão de search, aparece o input', () => {
    renderWithRouter(<Header title="Foods" />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('Testa se ao clicar duas vezes no botão de search ele fica escondido', () => {
    renderWithRouter(<Header title="Foods" />);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    userEvent.click(searchBtn);
    userEvent.click(searchBtn);
    const input = screen.queryByRole('textbox');
    expect(input).toBeNull();
  });
});
