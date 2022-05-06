import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import appContext from '../Context/AppConText';
import DoneRecipeCard from '../Components/DoneRecipeCard';

function DoneRecipe() {
  const { verifyStorage, getDoneRecipe, doneRecipes,
    setDoneRecipes } = useContext(appContext);

  useEffect(() => {
    verifyStorage('doneRecipes');

    getDoneRecipe();
  }, []);

  const btnFilter = (type) => {
    const aux = JSON.parse(localStorage.getItem('doneRecipes'));
    const filtredRecipes = aux.filter((recipe) => recipe.type === type);

    setDoneRecipes(filtredRecipes);
  };

  return (
    <>
      <Header title="Done Recipes" />

      <section className="done-btn-section">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getDoneRecipe }
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
