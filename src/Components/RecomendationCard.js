import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import '../Styles/RecomendationCard.css';

function RecomendationCard({ recipeId, recipeName, recipeImg, index, link }) {
  const history = useHistory();

  return (
    <div
      role="button"
      tabIndex={ index }
      className="recomendation-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${link}${recipeId}`) }
      onKeyDown={ () => history.push(`${link}${recipeId}`) }
    >
      <img
        className="recipe-img"
        src={ recipeImg }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-recomendation-title` }>{ recipeName }</span>
    </div>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number,
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
}.isRequired;

export default RecomendationCard;
