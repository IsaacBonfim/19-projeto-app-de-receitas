import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsShare, BsHeart } from 'react-icons/bs';
import appContext from '../Context/AppConText';
import RecomendationCard from '../Components/RecomendationCard';
import fetchApi from '../Services/FetchApi';
import '../Styles/RecipeDetails.css';

function FoodDetails() {
  const { detailsRequest } = useContext(appContext);

  const [details, setDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);

  const history = useHistory();
  const location = useLocation().pathname;
  const id = location.split('/')[2];

  const getDoneRecipe = () => {
    if (localStorage.getItem('doneRecipes')) {
      let aux = localStorage.getItem('doneRecipes');
      aux = JSON.parse(aux);
      const ids = aux.map((recipe) => recipe.id);

      setDoneRecipes(ids);
    }
  };

  const getRecipeInProgress = () => {
    if (localStorage.getItem('inProgressRecipes')) {
      let aux = localStorage.getItem('inProgressRecipes');
      aux = JSON.parse(aux);
      const recipes = aux.meals;

      setRecipeInProgress(recipes);
    }
  };

  useEffect(() => {
    const getDatails = async () => {
      const url = 'themealdb';
      const aux = await detailsRequest(url, id);
      const [recipe] = aux.meals;

      const ingredients = [];
      const maxIngredients = 19;

      for (let index = 0; index <= maxIngredients; index += 1) {
        if (recipe[`strIngredient${index + 1}`]) {
          ingredients.push(
            `${recipe[`strIngredient${index + 1}`]} 
            - ${recipe[`strMeasure${index + 1}`]}`,
          );
        }
      }

      console.log(recipe);
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

    getRecipeInProgress();
  }, [detailsRequest, id]);

  const btnStartRecipe = () => {
    history.push(`/foods/${id}/in-progress`);
  };

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
          <button
            type="button"
            data-testid="share-btn"
          >
            <BsShare />
          </button>

          <button
            type="button"
            data-testid="favorite-btn"
          >
            <BsHeart />
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
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          )) }
        </ul>
      </section>

      <section className="details-description-section">
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>

      <section>
        <h2>Video</h2>
        <embed
          data-testid="video"
          src={ details.strYoutube }
        />
      </section>

      <h2>Recomendações</h2>
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

      { doneRecipes.some((idRecipe) => idRecipe === id) ? '' : (
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
