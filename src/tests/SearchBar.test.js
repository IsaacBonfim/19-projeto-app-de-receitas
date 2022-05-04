import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import App from '../App';

const SEARCHBTN = 'search-top-btn';
const SEARCHINPUT = 'search-input';
const LINKDRINKS1 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const LINKDRINKS2 = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const LINKFOODS1 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const LINKFOODS2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

describe('Testa o componente "Search"', () => {
  it('Testa o funcionamento do componente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    expect(searchBtn).toBeInTheDocument();
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    expect(searchInput).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Testa o filtro ingredients na pagina drinks', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/ingredient/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(radioOption);
    userEvent.type(searchInput, 'banana');
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS1);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS2);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=banana');
  });

  it('Testa o filtro name na pagina drinks', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/name/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.type(searchInput, 'banana');
    userEvent.click(radioOption);
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS1);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS2);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=banana');
  });

  it('Testa o filtro firstLetter na pagina drinks', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/first letter/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(radioOption);
    userEvent.type(searchInput, 'b');
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS1);
    expect(fetch).toHaveBeenCalledWith(LINKDRINKS2);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b');
  });

  it('Testa o filtro ingredients na pagina foods', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/ingredient/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(radioOption);
    userEvent.type(searchInput, 'banana');
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS1);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS2);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=banana');
  });

  it('Testa o filtro name na pagina foods', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/name/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(radioOption);
    userEvent.type(searchInput, 'banana');
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS1);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS2);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=banana');
  });

  it('Testa o filtro ingredients na pagina foods', async () => {
    const THREE = 3;
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const searchBtn = await screen.findByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const searchInput = await screen.findByTestId(SEARCHINPUT);
    const radioOption = screen.getByText(/first letter/i);
    const makeSearch = screen.getByRole('button', { name: /search/i });
    userEvent.click(radioOption);
    userEvent.type(searchInput, 'b');
    userEvent.click(makeSearch);
    expect(fetch).toHaveBeenCalledTimes(THREE);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS1);
    expect(fetch).toHaveBeenCalledWith(LINKFOODS2);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
  });

  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
      const searchBtn = screen.getByTestId(SEARCHBTN);
      fireEvent.click(searchBtn);
      const searchInput = screen.getByTestId(SEARCHINPUT);
      const radioOption = screen.getByText(/name/i);
      const makeSearch = screen.getByRole('button', { name: /search/i });
      userEvent.click(radioOption);
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(makeSearch);
      expect().toBe('/drinks/178319');
      // Perguntar pro arthur amanha
    });

  // it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/foods');
  //     jest.spyOn(global, 'fetch').mockResolvedValue({
  //       json: jest.fn().mockResolvedValue(meals),
  //     });
  //     const searchBtn = await screen.findByTestId(SEARCHBTN);
  //     fireEvent.click(searchBtn);
  //     const searchInput = await screen.findByTestId(SEARCHINPUT);
  //     const radioOption = await screen.findByText(/name/i);
  //     const makeSearch = await screen.findByRole('button', { name: /search/i });
  //     userEvent.click(radioOption);
  //     userEvent.type(searchInput, 'Arrabiata');
  //     userEvent.click(makeSearch);
  //     await act(async () => {
  //       const halfSecond = 500;
  //       setTimeout(() => {
  //         expect(history.location.pathname).toBe('/foods/52771');
  //         expect(true).toBe(false);
  //       }, halfSecond);
  //     });
  //   });
});
