import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { NavigationBar } from '../../components/NavigationBar';
import { BrowserRouter } from 'react-router-dom';


describe("NavBar Test", () => {  
    afterEach(cleanup);

    it('goes to the home page after clicking on the brand logo', () => {
        const { getByTestId } = render(<NavigationBar />, { wrapper: BrowserRouter});
        const navBrand = getByTestId('nav-brand');
        expect(navBrand).toBeTruthy();
        fireEvent.click(navBrand);
        expect(navBrand.closest('a')).toHaveAttribute('href', '/home');
    })

    it('opens the dropdown menu', () => {
        const { getByTestId } = render(<NavigationBar />, { wrapper: BrowserRouter});
        const navDropDown = getByTestId('nav-dropdown');
        fireEvent.click(navDropDown);
        expect(navDropDown).toBeTruthy();
    })

    it('goes to the about us page', () => {
        const { getByTestId } = render(<NavigationBar />, { wrapper: BrowserRouter});
        const navDropDown = getByTestId('nav-dropdown');
        const navDropDownButton = within(navDropDown).getByRole('button');
        fireEvent.click(navDropDownButton);
        const aboutUs = within(navDropDown).getByTestId('about-us');
        expect(aboutUs).toBeTruthy();
        expect(aboutUs.closest('a')).toHaveAttribute('href', '/about'); //to check for the /about link
    })
})
