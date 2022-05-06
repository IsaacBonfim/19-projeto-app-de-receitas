import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes, { string } from 'prop-types';
import { BsShare } from 'react-icons/bs';
import appContext from '../Context/AppConText';
import shareIcon from '../images/shareIcon.svg';
import '../Styles/DoneRecipe.css';

function DoneRecipeCard({ name, index, image, category, date, tags, type, id }) {
  const { isCopied, setCopied } = useContext(appContext);

  const history = useHistory();

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
        <section className="category">
          <span data-testid={ `${index}-horizontal-top-text` }>{ category }</span>
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
        </section>

        <span
          role="button"
          tabIndex={ index }
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => history.push(`/${type}s/${id}`) }
          onKeyPress={ () => history.push(`/${type}s/${id}`) }
        >
          { name }
        </span>
        <span data-testid={ `${index}-horizontal-done-date` }>{ date }</span>
        { tags.map((tag, idx) => (
          <span
            key={ idx }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        )) }
      </main>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  index: PropTypes.number,
  image: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(string),
  type: PropTypes.string,
}.isRequired;

export default DoneRecipeCard;
