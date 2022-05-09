import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinkIngred from '../Pages/ExploreDrinkIngred';
import drinksIngredients from '../../cypress/mocks/drinkIngredients';
import IngredientCard from '../Components/IngredientCard';

const DOZE = 12;
const arara = drinksIngredients.drinks.slice(0, DOZE);
function renderIngredientCard() {
  arara.forEach((drink, index) => {
    renderWithRouter(
      <IngredientCard
        name={ drink.strIngredient1 }
        index={ index }
        key={ index }
        type="cocktail"
      />,
    );
  });
}

describe('Testa o componente "ExploreDrinkIngred" ', () => {
  it('Verifica se o componente "ExploreDrinkIngred" foi renderizado corretamente', () => {
    renderWithRouter(<ExploreDrinkIngred />);
    const title = screen.getByRole('heading', { name: /explore ingredients/i });
    expect(title).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de profile, redireciona para a página de profile',
    () => {
      const { history } = renderWithRouter(<ExploreDrinkIngred />);
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  it('Testa se os IngredientsCards renderizam', () => {
    renderIngredientCard();
    arara.forEach((element, index) => {
      const img = screen.getByTestId(`${index}-card-img`);
      const name = screen.getByTestId(`${index}-card-name`);
      const nameSplit = element.strIngredient1.split(' ').join('%20');
      expect(img.src).toBe(`https://www.thecocktaildb.com/images/ingredients/${nameSplit}-Small.png`);
      expect(name.innerHTML).toBe(element.strIngredient1);
    });
  });
});
