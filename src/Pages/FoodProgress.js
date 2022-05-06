import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsShare, BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import appContext from '../Context/AppConText';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodProgress() {
  const { detailsRequest, details, setDetails, ingredientList, setIngredientList,
    isCopied, setCopied, favoriteRecipes, getFavoriteRecipes, btnFavorite,
    verifyStorage } = useContext(appContext);

  const [selectIngredients, setSelectIngredients] = useState([]);

  const history = useHistory();
  const location = useLocation().pathname;
  const id = location.split('/')[2];

  useEffect(() => {
    const getDatails = async () => {
      const url = 'themealdb';
      const aux = await detailsRequest(url, id);
      const [recipe] = aux.meals;

      const ingredients = [];
      const maxIngredients = 19;

      for (let i = 0; i <= maxIngredients; i += 1) {
        if (recipe[`strIngredient${i + 1}`]) {
          ingredients.push(
            `${recipe[`strIngredient${i + 1}`]} - ${recipe[`strMeasure${i + 1}`]}`,
          );
        }
      }

      console.log(recipe);
      setDetails(recipe);
      setIngredientList(ingredients);
    };
    getDatails();

    verifyStorage('inProgressRecipes', 'foods', id);

    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage.meals[id]) { setSelectIngredients(storage.meals[id]); }

    getFavoriteRecipes();
    verifyStorage('favoriteRecipes');
    verifyStorage('doneRecipes');
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const checkStorage = () => {
      const meals = {
        ...storage.meals,
        [id]: selectIngredients,
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...storage, meals }));
    };

    checkStorage();
  }, [verifyStorage, id, selectIngredients]);

  const checkIngredient = (checked, ingredientName) => {
    if (checked) {
      setSelectIngredients([...selectIngredients, ingredientName]);
    } else {
      const newSelectedList = selectIngredients
        .filter((ingredient) => ingredient !== ingredientName);

      setSelectIngredients([...newSelectedList]);
    }
  };

  const btnFinishRecipe = () => {
    let addRecipe = {};
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const data = new Date();

    addRecipe = {
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: data.toLocaleDateString(),
      tags: details.strTags.split(', '),
    };

    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipes, addRecipe]));

    history.push('/done-recipes');
  };

  const src = favoriteRecipes
    .some((recipe) => recipe.id === id) ? blackHeartIcon : whiteHeartIcon;

  return (
    <>
      <img
        src={ details.strMealThumb }
        alt={ details.strMeal }
        className="datails-img"
        data-testid="recipe-photo"
      />

      <section className="details-title-section">
        <h2 data-testid="recipe-title">{ details.strMeal }</h2>

        <div>
          { isCopied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
              setCopied(true);
            } }
          >
            <BsShare />
          </button>

          <button
            type="button"
            data-testid="favorite-btn"
            src={ src }
            onClick={ () => btnFavorite('meals', id) }
          >
            { favoriteRecipes.some((recipe) => recipe.id === id) ? (
              <FcLike />) : <BsHeart /> }
          </button>
        </div>

        <span data-testid="recipe-category">{ details.strCategory }</span>
      </section>

      <section className="details-ingredients-section">
        <h2>Ingredientes</h2>
        <ul>
          { ingredientList.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ ingredient }
                checked={ selectIngredients.some((ingredt) => ingredt === ingredient) }
                onChange={ ({ target }) => {
                  checkIngredient(target.checked, ingredient);
                } }
              />
              { ingredient }
            </li>
          )) }
        </ul>
      </section>

      <section className="details-description-section">
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>

      <section className="start-section">
        <button
          type="button"
          className="start-btn"
          data-testid="finish-recipe-btn"
          disabled={ !ingredientList.every((item) => selectIngredients.includes(item)) }
          onClick={ btnFinishRecipe }
        >
          Finish Recipe
        </button>
      </section>

      <div className="teste">teste</div>
    </>
  );
}

export default FoodProgress;
