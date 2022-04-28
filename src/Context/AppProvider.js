import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppConText';
import fetchApi from '../Services/FetchApi';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [recipe, setRecipe] = useState([]);

  const searchFoods = async (radio, value) => {
    let data = [];

    switch (radio) {
    case 'ingredient':
      data = await fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
      break;
    case 'name':
      data = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
      break;
    case 'firstLetter':
      if (value.length === 1) {
        data = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default: data = '';
    }

    setRecipe(data.meals);
  };

  const searchDrinks = async (radio, value) => {
    let data = '';

    switch (radio) {
    case 'ingredient':
      data = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
      break;
    case 'name':
      data = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
      break;
    case 'firstLetter':
      if (value.length === 1) {
        data = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default: data = '';
    }

    setRecipe(data.drinks);
  };

  const objApp = {
    email,
    recipe,
    btnLoginDisabled,
    setEmail,
    setBtnLogin,
    searchFoods,
    searchDrinks,
  };

  return (
    <appContext.Provider value={ objApp }>
      { children }
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
