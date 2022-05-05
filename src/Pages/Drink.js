import React, { useContext, useEffect } from 'react';
import appContext from '../Context/AppConText';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import RecipeCard from '../Components/RecipeCard';
import Footer from '../Components/Footer';

function Drink() {
  const { recipes, initialRequest, categories, category,
    setFilter } = useContext(appContext);
  const doze = 12;
  const cinco = 5;

  useEffect(() => {
    initialRequest('thecocktaildb', 'drinks');
    categories('thecocktaildb', 'drinks');
    setFilter('');
  }, []);

  return (
    <>
      <Header title="Drinks" />
      <nav className="nav-bar">
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
        <button
          type="button"
          className="nav-button"
          data-testid="All-category-filter"
          onClick={ () => (initialRequest('thecocktaildb', 'drinks')) }
        >
          All
        </button>
      </nav>

      <section className="main-section">
        { recipes !== undefined && recipes !== null && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              link="/drinks/"
              recipeId={ recipe.idDrink }
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
