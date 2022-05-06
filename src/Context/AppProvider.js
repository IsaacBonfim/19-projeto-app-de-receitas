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
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [filter, setFilter] = useState('');

  const initialRequest = async (url, key) => {
    let data = [];

    if (filter) {
      data = await fetchApi(`https://www.${url}.com/api/json/v1/1/filter.php?i=${filter}`);
    } else {
      data = await fetchApi(`https://www.${url}.com/api/json/v1/1/search.php?s=`);
    }

    setRecipes(data[key]);
  };

  const categories = async (url, key) => {
    const data = await fetchApi(`https://www.${url}.com/api/json/v1/1/list.php?c=list`);
    setCategory(data[key]);
  };

  const getDoneRecipe = () => {
    if (localStorage.getItem('doneRecipes')) {
      const aux = JSON.parse(localStorage.getItem('doneRecipes'));

      setDoneRecipes(aux);
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

  const verifyStorage = (key, local, id) => {
    const info = JSON.parse(localStorage.getItem(key));

    if (!info && key !== 'inProgressRecipes') {
      localStorage.setItem(key, JSON.stringify([]));
    } else if (!info && local === 'foods') {
      localStorage
        .setItem(key, JSON.stringify({ cocktails: {}, meals: { [id]: [] } }));
    } else if (!info && local === 'drinks') {
      localStorage
        .setItem(key, JSON.stringify({ cocktails: { [id]: [] }, meals: {} }));
    }
  };

  const btnFavorite = (local, id) => {
    let addRecipe = {};
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteList = favoriteList.filter((recipe) => recipe.id !== id);

    if (favoriteList.some((recipe) => recipe.id === id)) {
      setIsFavorite(false);

      localStorage.setItem('favoriteRecipes', JSON.stringify([...newFavoriteList]));
    } else {
      setIsFavorite(true);

      if (local === 'meals') {
        addRecipe = {
          id: details.idMeal,
          type: 'food',
          nationality: details.strArea,
          category: details.strCategory,
          alcoholicOrNot: '',
          name: details.strMeal,
          image: details.strMealThumb,
        };
      } else if (local === 'drinks') {
        addRecipe = {
          id: details.idDrink,
          type: 'drink',
          nationality: '',
          category: details.strCategory,
          alcoholicOrNot: details.strAlcoholic,
          name: details.strDrink,
          image: details.strDrinkThumb,
        };
      }

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteList, addRecipe]));
    }
    getFavoriteRecipes();
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
    isFavorite,
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
    setIsFavorite,
    searchFoods,
    searchDrinks,
    initialRequest,
    categories,
    detailsRequest,
    btnFavorite,
    verifyStorage,
    setFilter,
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
