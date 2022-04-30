import React from 'react';
import { useHistory } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Profile.css';

function Profile() {
  const history = useHistory();

  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  return (
    <>
      <Header title="Profile" />
      <section className="profile-container">
        <span
          data-testid="profile-email"
        >
          { user.email }
        </span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
