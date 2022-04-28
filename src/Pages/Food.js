import React, { useContext } from 'react';
import appContext from '../Context/AppConText';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';

function Food() {
  const { recipes } = useContext(appContext);
  const doze = 12;

  return (
    <main>
      <Header title="Foods" />
      <section>
        { recipes !== undefined && recipes !== null && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal }
              recipeName={ recipe.strMeal }
              recipeImg={ recipe.strMealThumb }
              index={ index }
            />
          )).slice(0, doze))
          : '' }
      </section>
    </main>
  );
}

export default Food;
