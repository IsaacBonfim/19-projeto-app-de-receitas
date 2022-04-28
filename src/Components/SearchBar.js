import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import appContext from '../Context/AppConText';

function SearchBar() {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');

  const { searchFoods, searchDrinks, recipes } = useContext(appContext);

  const history = useHistory();
  const location = useLocation().pathname;

  function realizeSearch() {
    if (location === '/foods') {
      searchFoods(radio, input);
    } else if (location === '/drinks') {
      searchDrinks(radio, input);
    }
  }

  function redirectForRecipe() {
    if (location === '/foods') {
      history.push(`/foods/${recipes[0].idMeal}`);
    } else if (location === '/drinks') {
      history.push(`/drinks/${recipes[0].idDrink}`);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={ input }
        data-testid="search-input"
        placeholder="Busca"
        onChange={ ({ target }) => setInput(target.value) }
      />

      <div>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="search-radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setRadio(target.value) }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="search-radio"
            value="name"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setRadio(target.value) }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            name="search-radio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setRadio(target.value) }
          />
          First letter
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ realizeSearch }
      >
        Search
      </button>

      { recipes !== undefined && recipes !== null && recipes.length === 1
        ? redirectForRecipe() : '' }
    </div>
  );
}

export default SearchBar;
