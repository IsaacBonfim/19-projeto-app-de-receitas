import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import drinks from '../../cypress/mocks/drinks';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import ginDrinks from '../../cypress/mocks/ginDrinks';

const SEARCHBTN = 'search-top-btn';
const SEARCHINPUT = 'search-input';
const MSG = 'Sorry, we haven\'t found any recipes for these filters.';

describe('Continua os testes na searchBar', () => {
  it('Testa mensagem de alerta digitando xablau, na pagina de drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyDrinks)
        .mockResolvedValueOnce(drinks).mockResolvedValueOnce(drinks),
    });
    jest.spyOn(global, 'alert')
      .mockResolvedValue(MSG);
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
    });
    const searchBtn = screen.getByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    await act(async () => {
      const radioOption = await screen.findByText(/name/i);
      const searchInput = await screen.findByTestId(SEARCHINPUT);
      const makeSearch = await screen.findByRole('button', { name: /search/i });
      userEvent.click(radioOption);
      userEvent.type(searchInput, 'xablau');
      userEvent.click(makeSearch);
    });
    expect(alert).toHaveBeenCalled();
    expect(alert)
      .toHaveBeenCalledWith(MSG);
  });

  it('Testa mensagem de alerta digitando xablau, na pagina de drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyMeals)
        .mockResolvedValueOnce(meals).mockResolvedValueOnce(meals),
    });
    jest.spyOn(global, 'alert')
      .mockResolvedValue(MSG);
    await act(async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
    });
    const searchBtn = screen.getByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    const radioOption = await screen.findByText(/name/i);
    await act(async () => {
      const searchInput = await screen.findByTestId(SEARCHINPUT);
      const makeSearch = await screen.findByRole('button', { name: /search/i });
      userEvent.click(radioOption);
      userEvent.type(searchInput, 'xablau');
      userEvent.click(makeSearch);
    });
    expect(alert).toHaveBeenCalled();
    expect(alert)
      .toHaveBeenCalledWith(MSG);
  });

  it('Teste condicional do search, com drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ginDrinks)
        .mockResolvedValueOnce(drinks).mockResolvedValueOnce(drinks),
    });
    const searchBtn = screen.getByTestId(SEARCHBTN);
    fireEvent.click(searchBtn);
    await act(async () => {
      const searchInput = await screen.findByTestId(SEARCHINPUT);
      const radioOption = await screen.findByText(/name/i);
      const makeSearch = await screen.findByRole('button', { name: /search/i });
      userEvent.type(searchInput, 'gin');
      userEvent.click(radioOption);
      userEvent.click(makeSearch);
    });
    ginDrinks.drinks.forEach(async (drink, index) => {
      const individualDrink = await screen.findByTestId(`${index}-recipe-card`);
      const img = await screen.findByTestId(`${index}-card-img`);
      expect(individualDrink).toBeInTheDocument();
      expect(img.src).toBe(drink.strDrinkThumb);
    });
  });
  // it('Teste condicional do search, com foods', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(soupMeals)
  //       .mockResolvedValueOnce(meals).mockResolvedValueOnce(meals),
  //   });
  //   const searchBtn = screen.getByTestId(SEARCHBTN);
  //   fireEvent.click(searchBtn);
  //   await act(async () => {
  //     const searchInput = await screen.findByTestId(SEARCHINPUT);
  //     const radioOption = await screen.findByText(/name/i);
  //     const makeSearch = await screen.findByRole('button', { name: /search/i });
  //     userEvent.type(searchInput, 'soup');
  //     userEvent.click(radioOption);
  //     userEvent.click(makeSearch);
  //   });
  //   soupMeals.meals.forEach(async (meal, index) => {
  //     const individualMeal = await screen.findByTestId(`${index}-recipe-card`);
  //     const img = await screen.findByTestId(`${index}-card-img`);
  //     expect(individualMeal).toBeInTheDocument();
  //     expect(img.src).toBe(meal.strMealThumb);
  //   });
  // });
});
