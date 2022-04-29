import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';

function RecipeCard({ recipeName, recipeImg, index }) {
  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="recipe-img"
        src={ recipeImg }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
}.isRequired;

export default RecipeCard;
