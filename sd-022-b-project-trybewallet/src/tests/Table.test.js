import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App' 

describe('testando table', () => {
    it('testando password', () => {
        renderWithRouterAndRedux(<App />)
        const entrar = screen.getByText(/entrar/i)
        expect(entrar).toBeDisabled()
        const email = screen.getByTestId("email-input")
        userEvent.type(email, 'test@hotmail.com')
        const password = screen.getByTestId("password-input")
        userEvent.type(password, '123456')
        expect(entrar).not.toBeDisabled()
        userEvent.click(entrar)
        const despesa = screen.getByText(/adicionar despesa/i)
        userEvent.click(despesa)
        const screenText = screen.getByText(/alimentação/i)
        expect(screenText).toBeInTheDocument()
    })
})