import React, { useContext } from 'react';
import appContext from '../Context/AppConText';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import Footer from '../Components/Footer';

function Drink() {
  const { recipes } = useContext(appContext);
  const doze = 12;

  return (
    <main>
      <Header title="Drinks" />
      <section>
        { recipes !== undefined && recipes !== null && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idDrink }
              recipeName={ recipe.strDrink }
              recipeImg={ recipe.strDrinkThumb }
              index={ index }
            />
          )).slice(0, doze))
          : '' }
      </section>
      <Footer />
    </main>
  );
}

export default Drink;
