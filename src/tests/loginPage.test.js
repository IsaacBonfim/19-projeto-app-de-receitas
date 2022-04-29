import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';
import {
  rightEmail,
  rightPassword,
  wrongEmail1,
  wrongEmail2,
  wrongPassword1,
  wrongPassword2,
} from './inputs';

describe('Testa o componente Login', () => {
  it('Testa se o componente Login renderiza corretamente', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/digite email/i);
    const passwordInput = screen.getByPlaceholderText(/digite a senha/i);
    const btn = screen.getByRole('button', { name: /enter/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  it('Testa validação de email e senha', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/digite email/i);
    const passwordInput = screen.getByPlaceholderText(/digite a senha/i);
    const btn = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, rightEmail);
    userEvent.type(passwordInput, rightPassword);
    expect(btn).not.toBeDisabled();
    renderWithRouter(<Login />);
    userEvent.type(emailInput, wrongEmail1);
    userEvent.type(passwordInput, wrongPassword1);
    expect(btn).toBeDisabled();
    renderWithRouter(<Login />);
    userEvent.type(emailInput, wrongEmail2);
    userEvent.type(passwordInput, wrongPassword2);
    expect(btn).toBeDisabled();
    renderWithRouter(<Login />);
    userEvent.type(emailInput, wrongEmail2);
    userEvent.type(passwordInput, wrongPassword2);
    userEvent.type(emailInput, rightEmail);
    userEvent.type(passwordInput, rightPassword);
    expect(btn).not.toBeDisabled();
  });
  it('Testa se no click do botão é redirecionado a página certa', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/digite email/i);
    const passwordInput = screen.getByPlaceholderText(/digite a senha/i);
    const btn = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, rightEmail);
    userEvent.type(passwordInput, rightPassword);
    userEvent.click(btn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
