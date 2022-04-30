import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsShare, BsHeart } from 'react-icons/bs';
import appContext from '../Context/AppConText';
import RecomendationCard from '../Components/RecomendationCard';
import fetchApi from '../Services/FetchApi';
import '../Styles/RecipeDetails.css';

function DrinkDetails() {
  const { detailsRequest } = useContext(appContext);

  const [details, setDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const location = useLocation().pathname;
  const id = location.split('/')[2];

  const getDatails = async () => {
    const url = 'thecocktaildb';
    const aux = await detailsRequest(url, id);
    const [recipe] = aux.drinks;

    const ingredients = [];
    const maxIngredients = 19;

    for (let index = 0; index <= maxIngredients; index += 1) {
      if (recipe[`strIngredient${index + 1}`]) {
        ingredients.push(
          `${recipe[`strIngredient${index + 1}`]} - ${recipe[`strMeasure${index + 1}`]}`,
        );
      }
    }

    console.log(recipe);
    setDetails(recipe);
    setIngredientList(ingredients);
  };

  const getRecomendations = async () => {
    const aux = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recomend = aux.meals;
    const limite = 6;

    setRecomendations(recomend.slice(0, limite));
  };

  useEffect(() => {
    getDatails();
    getRecomendations();
  }, []);

  useEffect(() => {
    getDatails();
    getRecomendations();
  }, [id]);

  return (
    <>
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        className="datails-img"
        data-testid="recipe-photo"
      />

      <section>
        <h2 data-testid="recipe-title">{ details.strDrink }</h2>

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

        <span data-testid="recipe-category">{ details.strAlcoholic }</span>
      </section>

      <section>
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

      <section>
        <h2>Instruções</h2>
        <p data-testid="instructions">{ details.strInstructions }</p>
      </section>

      <h2>Recomendações</h2>
      <section
        className="recomendation-section"
      >
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

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </>
  );
}

export default DrinkDetails;
