import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppConText';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const objApp = {
    email,
    setEmail,
    btnLoginDisabled,
    setBtnLogin,
  };

  return (
    <appContext.Provider value={ objApp }>
      { children }
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
