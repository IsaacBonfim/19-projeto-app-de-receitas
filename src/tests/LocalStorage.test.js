import React from 'react';
import { sendLocalStorage, getLocalStorage } from '../Helpers/localStorage';
import Login from '../Pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Testa a função localStorage', () => {
  it('Verifica se o localStorage está sendo utilizado corretamente', () => {
    renderWithRouter(<Login />);
    const obj = {
      email: 'email@email.com',
    };
    sendLocalStorage(obj);
    const { email, mealsToken, cocktailsToken } = getLocalStorage();
    expect(email).toContain('email@email.com');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });
});
