import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from '../Context/AppConText';
import fetchApi from '../Services/FetchApi';

function Nav({ categoriesName, page, tipo }) {
  const [active, setActive] = useState(false);
  const { setRecipes, initialRequest } = useContext(appContext);

  const btnCategory = async (name) => {
    if (active === false) {
      const url = `https://www.${page}.com/api/json/v1/1/filter.php?c=${name}`;
      const data = await fetchApi(url);
      setRecipes(data[tipo]);
      setActive(true);
    } else {
      initialRequest(`https://www.${page}.com/api/json/v1/1/search.php?s=`, tipo);
      setActive(false);
    }
  };

  return (
    <button
      type="button"
      className="nav-button"
      data-testid={ `${categoriesName}-category-filter` }
      onClick={ () => btnCategory(categoriesName) }
    >
      { categoriesName }
    </button>
  );
}

Nav.propTypes = {
  categoriesName: PropTypes.string,
}.isRequired;

export default Nav;
