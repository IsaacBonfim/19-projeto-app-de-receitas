import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App', () => {
  it('Verifica se App renderiza rotas', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const routes = getByTestId('routes');
    expect(routes).toBeInTheDocument();
  });
});
