import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppConText';
import fetchApi from '../Services/FetchApi';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);

  const initialRequest = async (url, key) => {
    const data = await fetchApi(url);
    setRecipes(data[key]);
  };

  const categories = async (url, key) => {
    const data = await fetchApi(url);
    setCategory(data[key]);
  };

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

    if (data.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    setRecipes(data.meals);
  };

  const searchDrinks = async (radio, value) => {
    let data = [];

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

    if (data.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    setRecipes(data.drinks);
  };

  const objApp = {
    email,
    recipes,
    btnLoginDisabled,
    category,
    setEmail,
    setBtnLogin,
    searchFoods,
    searchDrinks,
    initialRequest,
    setCategory,
    categories,
    setRecipes,
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
