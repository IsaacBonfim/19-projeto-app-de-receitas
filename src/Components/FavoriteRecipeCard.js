import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { BsShare, BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import appContext from '../Context/AppConText';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../Styles/DoneRecipe.css';

function FavoriteRecipeCard({ name, index, image, category, type, id }) {
  const { isCopied, setCopied, favoriteRecipes, btnFavorite } = useContext(appContext);

  const history = useHistory();

  const src = favoriteRecipes
    .some((recipe) => recipe.id === id) ? blackHeartIcon : whiteHeartIcon;

  return (
    <div className="done-card">
      <div
        role="button"
        tabIndex={ index }
        className="done-img"
        onClick={ () => history.push(`/${type}s/${id}`) }
        onKeyPress={ () => history.push(`/${type}s/${id}`) }
      >
        <img
          className="done-img"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>

      <main className="done-recipe-info">
        <span data-testid={ `${index}-horizontal-top-text` }>{ category }</span>
        <span
          role="button"
          tabIndex={ index }
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/${type}s/${id}`) }
          onKeyPress={ () => history.push(`/${type}s/${id}`) }
        >
          { name }
        </span>

        <section>
          { isCopied && <span>Link copied!</span>}
          <button
            type="button"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
              setCopied(true);
            } }
          >
            <BsShare />
          </button>

          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ src }
            onClick={ () => btnFavorite('meals', id) }
          >
            { favoriteRecipes.some((recipe) => recipe.id === id) ? (
              <FcLike />) : <BsHeart /> }
          </button>
        </section>
      </main>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  index: PropTypes.number,
  image: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default FavoriteRecipeCard;
