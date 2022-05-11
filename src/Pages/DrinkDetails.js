import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsShare, BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import appContext from '../Context/AppConText';
import RecomendationCard from '../Components/RecomendationCard';
import fetchApi from '../Services/FetchApi';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../Styles/RecipeDetails.css';

function DrinkDetails() {
  const { detailsRequest, details, setDetails, ingredientList, setIngredientList,
    recomendations, setRecomendations, doneRecipes, recipeInProgress, favoriteRecipes,
    isCopied, setCopied, getDoneRecipe, getRecipeInProgress, getFavoriteRecipes,
    btnFavorite, verifyStorage } = useContext(appContext);

  const history = useHistory();
  const location = useLocation().pathname;
  const id = location.split('/')[2];

  useEffect(() => {
    const getDatails = async () => {
      const url = 'thecocktaildb';
      const aux = await detailsRequest(url, id);
      const [recipe] = aux.drinks;

      const ingredients = [];
      const maxIngredients = 19;

      for (let i = 0; i <= maxIngredients; i += 1) {
        if (recipe[`strIngredient${i + 1}`]) {
          ingredients.push(
            `${recipe[`strIngredient${i + 1}`]} - ${recipe[`strMeasure${i + 1}`]}`,
          );
        }
      }
      setDetails(recipe);
      setIngredientList(ingredients);
    };
    getDatails();

    const getRecomendations = async () => {
      const aux = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recomend = aux.meals;
      const limite = 6;

      setRecomendations(recomend.slice(0, limite));
    };
    getRecomendations();

    getDoneRecipe();
    getRecipeInProgress('cocktails');
    getFavoriteRecipes();
    verifyStorage('favoriteRecipes');
  }, []);

  const btnStartRecipe = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const src = favoriteRecipes
    .some((recipe) => recipe.id === id) ? blackHeartIcon : whiteHeartIcon;

  return (
    <>
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        className="datails-img"
        data-testid="recipe-photo"
      />

      <section className="details-title-section">
        <h2 data-testid="recipe-title" className="recipe-title">{ details.strDrink }</h2>

        <div className="btn-div">
          { isCopied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000${location}`);
              setCopied(true);
            } }
          >
            <BsShare />
          </button>

          <button
            type="button"
            data-testid="favorite-btn"
            src={ src }
            onClick={ () => btnFavorite('drinks', id) }
          >
            { favoriteRecipes.some((recipe) => recipe.id === id) ? (
              <FcLike />) : <BsHeart /> }
          </button>
        </div>

        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          { details.strAlcoholic }
        </span>
        <section className="details-ingredients-section">
          <h2>Ingredientes</h2>
          <ul>
            { ingredientList.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </li>
            )) }
          </ul>
        </section>
      </section>

      <section className="details-description-section">
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>

      <h2 className="recomendation-h2">Recomendações</h2>
      <section className="recomendation-section">
        { recomendations.map((recomendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <RecomendationCard
              link="/foods/"
              recipeId={ recomendation.idMeal }
              recipeName={ recomendation.strMeal }
              recipeImg={ recomendation.strMealThumb }
              index={ index }
            />
          </div>
        )) }
      </section>

      <div className="teste">teste</div>

      { doneRecipes.some((recipe) => recipe.id === id) ? '' : (
        <section className="start-section">
          <button
            type="button"
            className="start-btn"
            data-testid="start-recipe-btn"
            onClick={ btnStartRecipe }
          >
            { recipeInProgress[id] ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </section>
      ) }
    </>
  );
}

export default DrinkDetails;
