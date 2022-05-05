import React, { useContext, useEffect } from 'react';
import appContext from '../Context/AppConText';
import Header from '../Components/Header';
import Nav from '../Components/Nav';
import RecipeCard from '../Components/RecipeCard';
import Footer from '../Components/Footer';

function Food() {
  const { recipes, initialRequest, categories, category,
    setFilter } = useContext(appContext);
  const doze = 12;
  const cinco = 5;

  useEffect(() => {
    initialRequest('themealdb', 'meals');
    categories('themealdb', 'meals');
    setFilter('');
  }, []);

  return (
    <>
      <Header title="Foods" />
      <nav className="nav-bar">
        {
          category.map((item) => (
            <Nav
              key={ item.strCategory }
              categoriesName={ item.strCategory }
              page="themealdb"
              tipo="meals"
            />
          )).slice(0, cinco)
        }
        <button
          type="button"
          className="nav-button"
          data-testid="All-category-filter"
          onClick={ () => (initialRequest('themealdb', 'meals')) }
        >
          All
        </button>

      </nav>

      <section className="main-section">
        { recipes !== undefined && recipes !== null && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              link="/foods/"
              recipeId={ recipe.idMeal }
              recipeName={ recipe.strMeal }
              recipeImg={ recipe.strMealThumb }
              index={ index }
            />
          )).slice(0, doze))
          : '' }
      </section>
      <Footer />
    </>
  );
}

export default Food;
