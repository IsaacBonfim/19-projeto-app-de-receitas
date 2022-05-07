import React from 'react';
import { screen } from '@testing-library/react';
import DrinkProgress from '../Pages/DrinkProgress';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "DrinkProgress" ', () => {
  it('Verifica se o componente "DrinkProgress" foi renderizado corretamente', () => {
    renderWithRouter(<DrinkProgress />);
  });
});
