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

function FoodDetails() {
  const { detailsRequest, details, setDetails, ingredientList, setIngredientList,
    recomendations, setRecomendations, doneRecipes, recipeInProgress, favoriteRecipes,
    isCopied, setCopied, getDoneRecipe, getRecipeInProgress, getFavoriteRecipes,
    btnFavorite, verifyStorage } = useContext(appContext);

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

      setDetails(recipe);
      setIngredientList(ingredients);
    };

    getDatails();

    const getRecomendations = async () => {
      const aux = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const recomend = aux.drinks;
      const limite = 6;

      setRecomendations(recomend.slice(0, limite));
    };

    getRecomendations();

    getDoneRecipe();
    getRecipeInProgress('meals');
    getFavoriteRecipes();
    verifyStorage('favoriteRecipes');
  }, []);

  const btnStartRecipe = () => {
    history.push(`/foods/${id}/in-progress`);
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
        <h2 data-testid="recipe-title" className="recipe-title">{ details.strMeal }</h2>

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
            onClick={ () => btnFavorite('meals', id) }
          >
            { favoriteRecipes.some((recipe) => recipe.id === id) ? (
              <FcLike />) : <BsHeart /> }
          </button>
        </div>

        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          { details.strCategory }
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

      <section className="details-video-section">
        <h2>Video</h2>
        <embed
          data-testid="video"
          src={ details.strYoutube }
        />
      </section>

      <h2 className="recomendation-h2">Recomendações</h2>
      <section className="recomendation-section">
        { recomendations.map((recomendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <RecomendationCard
              link="/drinks/"
              recipeId={ recomendation.idDrink }
              recipeName={ recomendation.strDrink }
              recipeImg={ recomendation.strDrinkThumb }
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

export default FoodDetails;
