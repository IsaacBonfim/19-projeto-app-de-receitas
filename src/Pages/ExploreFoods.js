import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFood() {
  const history = useHistory();

  const surpriseClick = async () => {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await fetchApi.json();
    console.log(response.meals[0]);
    const surpriseFood = response.meals[0];
    history.push(`/foods/${surpriseFood.idMeal}`);
  };

  return (
    <>
      <Header title="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => surpriseClick() }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default ExploreFood;
