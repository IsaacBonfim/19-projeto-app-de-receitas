import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import appContext from '../Context/AppConText';
import '../Styles/Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const { email,
    btnLoginDisabled, setEmail, setBtnLogin } = useContext(appContext);

  useEffect(() => {
    const handleChange = () => {
      const number = 6;
      const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

      if (password.length > number && validEmail) {
        setBtnLogin(false);
      } else {
        setBtnLogin(true);
      }
    };
    handleChange();
  }, [email, password, setBtnLogin]);

  const history = useHistory();

  const handleBtnLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/foods');
  };

  return (
    <div className="container-longin-page">
      <input
        type="email"
        className="login-input"
        placeholder="Digite Email"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        className="login-input"
        placeholder="Digite a Senha"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        className="login-button"
        disabled={ btnLoginDisabled }
        data-testid="login-submit-btn"
        onClick={ () => handleBtnLogin() }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
