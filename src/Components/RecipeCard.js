import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';

function RecipeCard({ recipeId, recipeName, recipeImg, index, link, recipe }) {
  const [ingredientList, setIngredient] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const ingredients = [];
    const maxIngredients = 19;

    for (let i = 0; i < maxIngredients; i += 1) {
      if (recipe[`strIngredient${i + 1}`]) {
        ingredients.push(recipe[`strIngredient${i + 1}`]);
      }
    }

    setIngredient(ingredients);
  }, [recipe]);

  return (
    <div
      role="button"
      tabIndex={ index }
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${link}${recipeId}`) }
      onKeyPress={ () => history.push(`${link}${recipeId}`) }
    >
      <img
        className="recipe-img"
        src={ recipeImg }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
      <ul className="recipe-card-ingredients">
        { ingredientList.map((item, idx) => (
          <li key={ idx }>{ item }</li>
        )) }
      </ul>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
}.isRequired;

export default RecipeCard;
