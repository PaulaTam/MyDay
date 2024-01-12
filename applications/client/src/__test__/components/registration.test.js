import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { RegistrationForm } from '../../components/Registration';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../api/index');

describe("RegistrationForm Test", () => {  
    afterEach(cleanup);

    it('registers a new user', () => {
        const { getByLabelText , getByRole } = render(<RegistrationForm />, { wrapper: BrowserRouter });

        const firstName =  getByLabelText("First Name");
        firstName.setAttribute("value", "Jest Firstname");

        const lastName =  getByLabelText("Last Name");
        lastName.setAttribute("value", "Lastname");

        const sfsuid = getByLabelText("SFSU ID");
        const randID = Math.floor(Math.random() * 1000000000);
        sfsuid.setAttribute("value", randID.toString());

        const major = getByLabelText("Major");
        major.setAttribute("value", "Major");

        const minor = getByLabelText("Minor");
        minor.setAttribute("value", "Minor");

        const password = getByLabelText("Password");
        password.setAttribute("value", "Password1!");

        const cPassword = getByLabelText("Confirm Password");
        cPassword.setAttribute("value", "Password1!");

        const registerButton = getByRole("button", { name: 'Register' });

        act(() => {
            fireEvent.click(registerButton);
        });
        expect(registerButton).toBeTruthy();
        
    })

    it('goes to the sign in page', () => {
        const { getByRole } = render(<RegistrationForm />, { wrapper: BrowserRouter });
        const signinButton = getByRole("button", { name: "Already Have an Account? Sign In"});
        act(() => {
            fireEvent.click(signinButton);
        });
        expect(signinButton).toBeTruthy();
    })

})