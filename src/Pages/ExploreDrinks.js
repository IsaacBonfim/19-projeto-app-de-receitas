import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreDrink() {
  const history = useHistory();

  const surpriseClick = async () => {
    const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const response = await fetchApi.json();
    const surpriseDrink = response.drinks[0];
    history.push(`/drinks/${surpriseDrink.idDrink}`);
  };

  return (
    <>
      <Header title="Explore Drinks" />

      <div className="explore-btn-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
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

export default ExploreDrink;
