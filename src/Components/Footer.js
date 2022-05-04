import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdTravelExplore } from 'react-icons/md';
import appContext from '../Context/AppConText';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../Styles/Footer.css';

function Footer() {
  const history = useHistory();
  const { initialRequest } = useContext(appContext);

  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Drink Icon"
        onClick={ () => {
          initialRequest('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
          history.push('/drinks');
        } }
      >
<<<<<<< HEAD
        <ion-icon name="wine-sharp" />
        {/* <img src={ drinkIcon } alt="Drink Icon" /> */}
=======
        {/* <ion-icon name="wine-sharp" /> */}
        {/* <img src={ drinkIcon } alt="Drink Icon" /> */}
        <BiDrink />
>>>>>>> 2cacbdfaad5e7adc7d38161a2603131470049593
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Explore Icon"
        onClick={ () => history.push('/explore') }
      >
<<<<<<< HEAD
        <ion-icon name="globe-outline" />
        {/* <img src={ exploreIcon } alt="Explore Icon" /> */}
=======
        {/* <ion-icon name="globe-outline" /> */}
        {/* <img src={ exploreIcon } alt="Explore Icon" /> */}
        <MdTravelExplore />
>>>>>>> 2cacbdfaad5e7adc7d38161a2603131470049593
      </button>

      <button
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
        alt="Meal Icon"
        onClick={ () => history.push('/foods') }
      >
<<<<<<< HEAD
        <ion-icon name="restaurant-outline" />
        {/* <img src={ mealIcon } alt="Meal Icon" /> */}
=======
        {/* <ion-icon name="restaurant-outline" /> */}
        {/* <img src={ mealIcon } alt="Meal Icon" /> */}
        <IoRestaurantOutline />
>>>>>>> 2cacbdfaad5e7adc7d38161a2603131470049593
      </button>
    </footer>
  );
}

export default Footer;
