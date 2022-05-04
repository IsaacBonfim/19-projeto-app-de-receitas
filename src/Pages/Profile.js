import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/Profile.css';

function Profile() {
  const [user, setUser] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      let aux = localStorage.getItem('user');
      aux = JSON.parse(aux);
      const { email } = aux;

      setUser(email);
    }
  }, []);

  return (
    <>
      <Header title="Profile" />
      <section className="profile-container">
        <span
          data-testid="profile-email"
        >
          { user }
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
