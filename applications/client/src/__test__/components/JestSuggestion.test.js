import { cleanup, fireEvent, render, screen, waitFor, act, hasInputValue, getAllByTestId } from '@testing-library/react';
import { Scheduler } from '../../components/Scheduler';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import * as myApi from "../../api/index";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
// Prevent errors in console
beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
});

// Mocking the scheduler to make testing it work
Object.defineProperty(window, 'crypto', {
    value: {
        getRandomValues: arr => jest.fn().mockImplementation(arr => 0)
    },
});
jest.mock('../../api/index');
describe("Suggestions Test", () => {  
    afterEach(cleanup);

it('Suggestions button says no suggestions',async() => {
 
    const { getByTestId } = render(<Scheduler />, { wrapper: MemoryRouter });


    const testbutton = await getByTestId("suggestions-default-testid");
    expect(testbutton.innerHTML).toBe("No suggestions");


});
it('Suggestions button correctly displays returned data',async() => {
 
    const suggestionResult = render(<Scheduler />, { wrapper: MemoryRouter });
    var suggestions= JSON.stringify({ 
    data:[{
        Subject: "Test"
    },
    {
        Subject: "test2"
    }]
});
    

    myApi.getSuggestedEvents.mockResolvedValue(JSON.parse(suggestions));
    var suggestionButton;
    await waitFor(()=> suggestionButton =suggestionResult.getByTestId("suggestions-button-testid"));
    expect(suggestionButton).toBeTruthy();
    act(() => {
        fireEvent.click(suggestionButton);
    });
    await waitFor(()=> screen.findByText("Test"),
    screen.findByText("test2")
    );

});
}

);
