import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { SignIn } from '../../components/SignIn';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../../api/index');

describe("SignIn Test", () => {  
    afterEach(cleanup);

    it('signs in test user', () => {
        const { getByLabelText , getByRole } = render(<SignIn />, { wrapper: BrowserRouter });

        const sfsuid = getByLabelText("SFSU ID");
        sfsuid.setAttribute("value", "987654321");

        const password = getByLabelText("Password");
        password.setAttribute("value", "Password1!");

        const signInButton = getByRole("button", { name: 'Sign In' });

        act(() => {
            fireEvent.click(signInButton);
        });
        expect(signInButton).toBeTruthy();
        
    })

    it('goes to the sign up page', () => {
        const { getByRole } = render(<SignIn />, { wrapper: BrowserRouter });
        const signupButton = getByRole("button", { name: "Don't Have an Account? Sign Up"});
        act(() => {
            fireEvent.click(signupButton);
        });
        expect(signupButton).toBeTruthy();
    })

})