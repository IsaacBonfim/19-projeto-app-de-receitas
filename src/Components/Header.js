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
      <section className="header-container">
        <button
          type="button"
          className="profile-button"
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        >
          <ion-icon name="person-outline" />
          {/* <img src={ profileIcon } alt="Profile Icon" /> */}
        </button>

        <h1 className="header-title" data-testid="page-title">{ title }</h1>

        <div className="ghost">
          { !explore ? '' : (
            <button
              type="button"
              className="search-button"
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
              onClick={ () => setSearchBar(!searchBarActive) }
            >
              <ion-icon name="search-sharp" />
              {/* <img src={ searchIcon } alt="Search Icon" /> */}
            </button>
          ) }
        </div>
      </section>
      { searchBarActive ? <SearchBar /> : '' }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
