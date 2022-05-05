import React, { useEffect, useContext } from 'react';
import Header from '../Components/Header';
import appContext from '../Context/AppConText';
import DoneRecipeCard from '../Components/DoneRecipeCard';

function DoneRecipe() {
  const { verifyStorage, getDoneRecipe, doneRecipes } = useContext(appContext);

  useEffect(() => {
    verifyStorage('doneRecipes');

    getDoneRecipe();
  }, []);

  return (
    <>
      <Header title="Done Recipes" />

      <section className="done-btn-section">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>

      <section className="done-cards-container">
        { doneRecipes.map((recipe, index) => (
          <DoneRecipeCard
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
            date={ recipe.doneDate }
            tags={ recipe.tags }
            type={ recipe.type }
          />
        )) }
      </section>
    </>
  );
}

export default DoneRecipe;
