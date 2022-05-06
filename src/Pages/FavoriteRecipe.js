import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import appContext from '../Context/AppConText';
import FavoriteRecipeCard from '../Components/FavoriteRecipeCard';

function FavoriteRecipes() {
  const { verifyStorage, getFavoriteRecipes, favoriteRecipes,
    setFavoriteRecipes } = useContext(appContext);

  useEffect(() => {
    verifyStorage('favoriteRecipes');

    getFavoriteRecipes();
  }, []);

  const btnFilter = (type) => {
    const aux = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtredRecipes = aux.filter((recipe) => recipe.type === type);

    setFavoriteRecipes(filtredRecipes);
  };

  return (
    <>
      <Header title="Favorite Recipes" />

      <section className="done-btn-section">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getFavoriteRecipes }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => btnFilter('food') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => btnFilter('drink') }
        >
          Drinks
        </button>
      </section>

      <section className="done-cards-container">
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ index }
            id={ recipe.id }
            name={ recipe.name }
            index={ index }
            image={ recipe.image }
            category={
              recipe.type === 'food' ? (
                `${recipe.nationality} - ${recipe.category}`
              ) : recipe.alcoholicOrNot
            }
            type={ recipe.type }
          />
        )) }
      </section>
    </>
  );
}

export default FavoriteRecipes;
