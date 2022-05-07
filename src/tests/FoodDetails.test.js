import React from 'react';
import { screen } from '@testing-library/react';
import FoodDetails from '../Pages/FoodDetails';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente \'FoodDetails\'', () => {
  it('Verifica se o componente \'FoodDetails\' foi renderizado corretamente', () => {
    renderWithRouter(<FoodDetails />);
  });
});
