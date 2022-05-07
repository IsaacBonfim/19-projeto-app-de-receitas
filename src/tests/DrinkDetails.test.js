import React from 'react';
import { screen } from '@testing-library/react';
import DrinkDetails from '../Pages/DrinkDetails';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "DrinkDetails" ', () => {
  it('Verifica se o componente "DrinkDetails" foi renderizado corretamente', () => {
    renderWithRouter(<DrinkDetails />);
  });
});
