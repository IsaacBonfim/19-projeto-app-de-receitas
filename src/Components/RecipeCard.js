import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';
<<<<<<< HEAD
=======

function RecipeCard({ recipeId, recipeName, recipeImg, index, link }) {
  const history = useHistory();
>>>>>>> 2cacbdfaad5e7adc7d38161a2603131470049593

  return (
    <div
<<<<<<< HEAD
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
=======
      role="button"
      tabIndex={ index }
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${link}${recipeId}`) }
      onKeyDown={ () => history.push(`${link}${recipeId}`) }
>>>>>>> 2cacbdfaad5e7adc7d38161a2603131470049593
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
