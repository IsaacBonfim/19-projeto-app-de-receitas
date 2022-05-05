import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import appContext from '../Context/AppConText';

function IngredientCard({ name, index, type }) {
  const { setFilter } = useContext(appContext);

  const history = useHistory();
  const location = useLocation().pathname;
  const link = location.split('/')[2];

  const redirect = (filter) => {
    setFilter(filter);

    history.push(`/${link}`);
  };

  return (
    <div
      role="button"
      tabIndex={ index }
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
      key={ index }
      onClick={ () => redirect(name) }
      onKeyDown={ () => redirect(name) }
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
