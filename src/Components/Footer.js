import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../Context/AppConText';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../Styles/Footer.css';

function Footer() {
  const history = useHistory();
  const { initialRequest } = useContext(appContext);

  return (
    <footer data-testid="footer" className="fixarRodape">
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
        <img src={ drinkIcon } alt="Drink Icon" />
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Explore Icon"
        onClick={ () => history.push('/explore') }
      >
        <img src={ exploreIcon } alt="Explore Icon" />
      </button>

      <button
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
        alt="Meal Icon"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}

export default Footer;
