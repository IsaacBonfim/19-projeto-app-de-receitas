import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore() {
  const history = useHistory();

  return (
    <>
      <Header title="Explore" />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

export default Explore;
