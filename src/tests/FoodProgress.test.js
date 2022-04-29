import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodProgress from '../Pages/FoodProgress';

describe('Testa o componente "FoodProgress"', () => {
  it('Verifica se o componente "FoodProgress" foi renderizado corretamente', () => {
    renderWithRouter(<FoodProgress />);
    const title = screen.getByRole('heading', { name: /Progresso de Comidas/i });
    expect(title).toBeInTheDocument();
  });
});
