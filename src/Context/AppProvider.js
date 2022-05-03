import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppConText';
import fetchApi from '../Services/FetchApi';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [category, setCategory] = useState([]);
  const [details, setDetails] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [isCopied, setCopied] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const initialRequest = async (url, key) => {
    const data = await fetchApi(url);
    console.log(data[key]);
    setRecipes(data[key]);
  };

  const categories = async (url, key) => {
    const data = await fetchApi(url);
    console.log(data[key]);
    setCategory(data[key]);
  };

  const getDoneRecipe = () => {
    if (localStorage.getItem('doneRecipes')) {
      let aux = localStorage.getItem('doneRecipes');
      aux = JSON.parse(aux);
      const ids = aux.map((recipe) => recipe.id);

      setDoneRecipes(ids);
    }
  };

  const getRecipeInProgress = (key) => {
    if (localStorage.getItem('inProgressRecipes')) {
      let aux = localStorage.getItem('inProgressRecipes');
      aux = JSON.parse(aux);
      const listRecipesInProgress = aux[key];

      setRecipeInProgress(listRecipesInProgress);
    }
  };

  const getFavoriteRecipes = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      let aux = localStorage.getItem('favoriteRecipes');
      aux = JSON.parse(aux);
      const ids = aux.map((recipe) => recipe.id);

      setFavoriteRecipes(ids);
    }
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

  const detailsRequest = async (url, key) => {
    console.log(url, key);
    const data = await fetchApi(`https://www.${url}.com/api/json/v1/1/lookup.php?i=${key}`);
    return data;
  };

  const objApp = {
    email,
    recipes,
    btnLoginDisabled,
    category,
    details,
    doneRecipes,
    favoriteRecipes,
    ingredientList,
    isCopied,
    recipeInProgress,
    recomendations,
    getDoneRecipe,
    getFavoriteRecipes,
    getRecipeInProgress,
    setEmail,
    setBtnLogin,
    setCategory,
    setCopied,
    setRecipes,
    setDetails,
    setDoneRecipes,
    setFavoriteRecipes,
    setIngredientList,
    setRecomendations,
    setRecipeInProgress,
    searchFoods,
    searchDrinks,
    initialRequest,
    categories,
    detailsRequest,
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
