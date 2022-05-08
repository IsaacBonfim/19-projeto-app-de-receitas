import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../Pages/NotFound';

describe('Testa o componente NotFound', () => {
  it('Verifica se é renderizado corretamente', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
