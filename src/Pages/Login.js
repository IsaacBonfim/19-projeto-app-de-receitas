import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import appContext from '../Context/AppConText';

function Login() {
  const [password, setPassword] = useState('');
  const { email,
    btnLoginDisabled, setEmail, setBtnLogin } = useContext(appContext);

  const handleChange = () => {
    const number = 6;
    const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

    if (password.length > number && validEmail) {
      setBtnLogin(false);
    } else {
      setBtnLogin(true);
    }
  };

  useEffect(() => {
    handleChange();
  }, [email, password]);

  const history = useHistory();
  const handleBtnLogin = () => {
    history.push('/foods');
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Digite Email"
        data-testid="email-input"
        name="email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        placeholder="Digite a Senha"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
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
