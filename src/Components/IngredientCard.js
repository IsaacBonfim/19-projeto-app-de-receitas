import React from 'react';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

function IngredientCard({ name, index, type }) {
  // const history = useHistory();

  return (
    <div
      role="button"
      tabIndex={ index }
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
      key={ index }
      // onClick={ () => history.push(`${link}${recipeId}`) }
      // onKeyDown={ () => history.push(`${link}${recipeId}`) }
    >
      <img
        className="recipe-img"
        src={ `https://www.the${type}db.com/images/ingredients/${name}-Small.png` }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{ name }</span>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default IngredientCard;
