import React, { useContext, useEffect } from 'react';
import appContext from '../Context/AppConText';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import RecipeCard from '../Components/RecipeCard';
import Footer from '../Components/Footer';

function Drink() {
  const { recipes, initialRequest, categories, category } = useContext(appContext);
  const doze = 12;
  const cinco = 5;

  useEffect(() => {
    initialRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    categories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks');
  }, []);

  return (
    <>
      <Header title="Drinks" />
      <section className="nav-bar">
        {
          category.map((item) => (
            <Nav
              key={ item.strCategory }
              categoriesName={ item.strCategory }
              page="thecocktaildb"
              tipo="drinks"
            />
          )).slice(0, cinco)
        }
      </section>

      <section className="main-section">
        { recipes !== undefined && recipes !== null && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              recipeName={ recipe.strDrink }
              recipeImg={ recipe.strDrinkThumb }
              index={ index }
            />
          )).slice(0, doze))
          : '' }
      </section>
      <Footer />
    </>
  );
}

export default Drink;
