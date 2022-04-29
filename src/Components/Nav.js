import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import appContext from '../Context/AppConText';
import fetchApi from '../Services/FetchApi';

function Nav({ categoriesName, page, tipo }) {
  const { setRecipes } = useContext(appContext);
  const btnCategory = async (name) => {
    const url = `https://www.${page}.com/api/json/v1/1/filter.php?c=${name}`;
    const data = await fetchApi(url);
    setRecipes(data[tipo]);
    console.log(data);
    console.log('clique');
  };

  return (
    <div>
      <button
        type="button"
        data-testid={ `${categoriesName}-category-filter` }
        onClick={ () => btnCategory(categoriesName) }
      >
        { categoriesName }
      </button>
    </div>
  );
}

Nav.propTypes = {
  categoriesName: PropTypes.string,
}.isRequired;

export default Nav;
