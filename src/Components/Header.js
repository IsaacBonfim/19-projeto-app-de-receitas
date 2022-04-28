import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [searchBarActive, setSearchBar] = useState(false);

  const explore = title === 'Foods' || title === 'Drinks'
    || title === 'Explore Nationalities';

  const history = useHistory();

  return (
    <header className="header">
      <button
        type="button"
        src={ profileIcon }
        alt="Profile Icon"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>

      <h1 data-testid="page-title">{ title }</h1>

      { !explore ? '' : (
        <button
          type="button"
          src={ searchIcon }
          alt="Search Icon"
          data-testid="search-top-btn"
          onClick={ () => setSearchBar(!searchBarActive) }
        >
          <img src={ searchIcon } alt="Search Icon" />
        </button>
      ) }
      { searchBarActive ? <SearchBar /> : '' }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
