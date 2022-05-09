import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import appContext from '../Context/AppConText';

function ExploreFood() {
  const { setFilter } = useContext(appContext);
  const history = useHistory();

  const surpriseClick = async () => {
    const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await fetchApi.json();
    const surpriseFood = response.meals[0];
    history.push(`/foods/${surpriseFood.idMeal}`);
  };

  return (
    <>
      <Header title="Explore Foods" />

      <div className="explore-btn-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-nationality"
          onClick={ () => {
            setFilter('a=american');
            history.push('/explore/foods/nationalities');
          } }
        >
          By Nationality
        </button>
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-surprise"
          onClick={ () => surpriseClick() }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFood;
