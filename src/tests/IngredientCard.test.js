import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import IngredientCard from '../Components/IngredientCard';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import renderWithRouter from './renderWithRouter';
import chickenMeals from '../../cypress/mocks/chickenMeals';

const DOZE = 12;
const arara = mealIngredients.meals.slice(0, DOZE);
function renderIngredientCard() {
  arara.forEach((meal, index) => {
    renderWithRouter(
      <IngredientCard
        name={ meal.strIngredient }
        index={ index }
        key={ index }
        type="meal"
      />,
    );
  });
}

describe('Testa o componente "IngredientCard"', () => {
  it('Verifica se o componente "IngredientCard" foi renderizado corretamente', () => {
    renderIngredientCard();
    arara.forEach((meal, index) => {
      const img = screen.getByTestId(`${index}-card-img`);
      const name = screen.getByTestId(`${index}-card-name`);
      const nameSplit = meal.strIngredient.split(' ').join('%20');
      expect(img.src).toContain(nameSplit);
      expect(name.innerHTML).toBe(meal.strIngredient);
    });
  });

  it('Verifica se o redirecionamento é correto', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals)
        .mockResolvedValueOnce(mealIngredients),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    await act(async () => {
      const img = await screen.findByTestId('0-ingredient-card');
      fireEvent.click(img);
    });
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
  it('Testa se o redirecionamento é correto', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals)
        .mockResolvedValueOnce(mealIngredients),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    await act(async () => {
      const img = await screen.findByTestId('0-ingredient-card');
      fireEvent.keyDown(img, { key: 'Enter' });
    });
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
});
