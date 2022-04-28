import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipeName, recipeImg, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ recipeImg } alt={ recipeName } data-testid={ `${index}-card-img` } />
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
