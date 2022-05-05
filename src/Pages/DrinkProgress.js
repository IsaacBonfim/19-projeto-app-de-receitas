import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsShare, BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import appContext from '../Context/AppConText';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkProgress() {
  const { detailsRequest, details, setDetails, ingredientList, setIngredientList,
    isCopied, setCopied, favoriteRecipes, getFavoriteRecipes, btnFavorite,
    verifyStorage } = useContext(appContext);

  const [selectIngredients, setSelectIngredients] = useState([]);

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

      console.log(recipe);
      setDetails(recipe);
      setIngredientList(ingredients);
    };
    getDatails();
    verifyStorage('inProgressRecipes', 'drinks', id);

    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (storage.cocktails[id]) { setSelectIngredients(storage.cocktails[id]); }

    getFavoriteRecipes();
    verifyStorage('favoriteRecipes');
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const checkStorage = () => {
      const cocktails = {
        ...storage.cocktails,
        [id]: selectIngredients,
      };

      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ ...storage, cocktails }));
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

  const src = favoriteRecipes
    .some((recipe) => recipe === id) ? blackHeartIcon : whiteHeartIcon;

  return (
    <>
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        className="datails-img"
        data-testid="recipe-photo"
      />

      <section className="details-title-section">
        <h2 data-testid="recipe-title">{ details.strDrink }</h2>

        <div>
          { isCopied && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
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
            { favoriteRecipes.some((recipe) => recipe === id) ? (
              <FcLike />) : <BsHeart /> }
          </button>
        </div>

        <span data-testid="recipe-category">{ details.strAlcoholic }</span>
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
          onClick={ () => history.push('/done-recipes') }
        >
          Finish Recipe
        </button>
      </section>

      <div className="teste">teste</div>
    </>
  );
}

export default DrinkProgress;
