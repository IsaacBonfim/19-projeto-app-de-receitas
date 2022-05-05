import React, { useEffect, useState } from 'react';
import fetchApi from '../Services/FetchApi';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';

function ExploreFoodIngred() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const doze = 12;

  useEffect(() => {
    const getApiIngredients = async () => {
      const getIngredients = await fetchApi('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const response = getIngredients.meals;
      setIngredientsList(response.slice(0, doze));
    };

    getApiIngredients();
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" />
      {
        ingredientsList.map((ingredient, index) => (
          <IngredientCard
            name={ ingredient.strIngredient }
            index={ index }
            key={ index }
            type="meal"
          />
        ))
      }
      <Footer />
    </>
  );
}

export default ExploreFoodIngred;
