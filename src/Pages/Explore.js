import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <>
      <Header title="Explore" />

      <div className="explore-btn-container">
        <button
          type="button"
          className="explore-btn"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          <IoRestaurantOutline />
          <span>Explore Foods</span>
        </button>

        <button
          type="button"
          className="explore-btn"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          <BiDrink />
          <span>Explore Drinks</span>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
