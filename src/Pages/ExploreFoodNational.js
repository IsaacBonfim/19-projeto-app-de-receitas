import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import fetchApi from '../Services/FetchApi';
import appContext from '../Context/AppConText';
import RecipeCard from '../Components/RecipeCard';

function ExploreFoodNational() {
  const { recipes, filter, setFilter, initialRequest } = useContext(appContext);
  const [nationalityList, steNationalityList] = useState([]);

  const doze = 12;

  useEffect(() => {
    const getApiNationality = async () => {
      const getNationality = await fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const response = getNationality.meals;
      steNationalityList(response);
    };

    getApiNationality();
    initialRequest('themealdb', 'meals');
  }, []);

  useEffect(() => {
    console.log('atualiza filtro');
    initialRequest('themealdb', 'meals');
  }, [filter]);

  const handleChange = (value) => {
    if (value === 'All') {
      setFilter('');
    } else {
      setFilter(`a=${value}`);
    }
  };

  return (
    <>
      <Header title="Explore Nationalities" />
      <div className="explore-div">
        <select
          data-testid="explore-by-nationality-dropdown"
          id="nationality"
          className="explore-btn"
          onChange={ ({ target }) => handleChange(target.value) }
        >
          <option value="All" data-testid="All-option">All</option>
          {
            nationalityList.map(({ strArea: area }, index) => (
              <option
                data-testid={ `${area}-option` }
                key={ index }
                value={ area }
              >
                { area }
              </option>
            ))
          }
        </select>
        <section className="national-recipes-section">
          {
            recipes.map((recipe, index) => (
              <RecipeCard
                key={ index }
                link="/foods/"
                recipeId={ recipe.idMeal }
                recipeName={ recipe.strMeal }
                recipeImg={ recipe.strMealThumb }
                index={ index }
              />
            )).slice(0, doze)
          }
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodNational;
