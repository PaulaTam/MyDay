import { cleanup, fireEvent, render, screen, waitFor, act, hasInputValue } from '@testing-library/react';
import { Scheduler } from '../../components/Scheduler';
import { MemoryRouter } from 'react-router-dom';
import * as myApi from "../../api/index";

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

//mock api functions
jest.mock('../../api/index');

describe("Scheduler Test", () => {

    afterEach(cleanup);

    it('Check that scheduler widgets are visible', () => {

        const result = render(<Scheduler />, { wrapper: MemoryRouter });

        const columnTime = result.container.querySelector(".e-schedule-table");
        expect(columnTime).toBeTruthy();
        const rowHeaderDate = result.container.querySelector(".e-header-row");
        expect(rowHeaderDate).toBeTruthy();

        const displayArray = result.container.querySelectorAll(".e-tbar-btn-text");
        const datePicker = displayArray[0];
        expect(datePicker).toBeTruthy();
        fireEvent.click(datePicker);
        const miniCalendar = result.container.querySelector(".e-header-calendar");
        expect(miniCalendar).toBeTruthy();
        const todayTab = displayArray[1];
        expect(todayTab).toBeTruthy();
        expect(todayTab.textContent).toBe("Today");
        const dayTab = displayArray[2];
        expect(dayTab).toBeTruthy();
        expect(dayTab.textContent).toBe("Day");
        const weekTab = displayArray[3];
        expect(weekTab).toBeTruthy();
        expect(weekTab.textContent).toBe("Week");
        const workWeekTab = displayArray[4];
        expect(workWeekTab).toBeTruthy();
        expect(workWeekTab.textContent).toBe("Work Week");
        const monthTab = displayArray[5];
        expect(monthTab).toBeTruthy();
        expect(monthTab.textContent).toBe("Month");
        const agendaTab = displayArray[6];
        expect(agendaTab).toBeTruthy();
        expect(agendaTab.textContent).toBe("Agenda");
    });

    it("Check cell popup window", async () => {
        const result = render(<Scheduler />, { wrapper: MemoryRouter });
        const cell = result.container.querySelector('.e-work-cells');
        act(() => {
            fireEvent.click(cell);
        });
        const popUpWindow = result.container.querySelector(".e-cell-popup");
        expect(popUpWindow).toBeTruthy();
        const titleInput = result.container.querySelector(".e-subject");
        expect(titleInput).toBeTruthy();
        expect(titleInput.placeholder).toBe("Add title");
        const saveBtn1 = result.container.querySelector(".e-event-create");
        expect(saveBtn1).toBeTruthy();
        expect(saveBtn1.textContent).toBe("Save");
        const moreDetailsBtn = popUpWindow.querySelector(".e-event-details");
        expect(moreDetailsBtn).toBeTruthy();
        expect(moreDetailsBtn.textContent).toBe("More Details");

        act(() => {
            fireEvent.click(moreDetailsBtn);
        });

        const { getByTestId, getAllByTestId } = render(<Scheduler />, { wrapper: MemoryRouter });
        const res = getAllByTestId("scheduler-container-testid")[0];
        const subjectInput = res.querySelector(".e-subject");
        expect(subjectInput.name).toBe("Subject");
        fireEvent.change(subjectInput, { target: { value: "Event Title" } });
        expect(subjectInput.value).toBe("Event Title");

        const startTimeTitle = screen.queryAllByText("Start")[0];
        expect(startTimeTitle).toBeTruthy();
        expect(startTimeTitle.textContent).toBe("Start");

        const endTimeTitle = screen.queryAllByText("End")[0];
        expect(endTimeTitle).toBeTruthy();
        expect(endTimeTitle.textContent).toBe("End");

        const allDayCheckBox = screen.queryAllByText("All day")[0];
        expect(allDayCheckBox).toBeTruthy();
        expect(allDayCheckBox.textContent).toBe("All day");

        const timeZoneCheckBox = screen.queryAllByText("Timezone")[0];
        expect(timeZoneCheckBox).toBeTruthy();
        expect(timeZoneCheckBox.textContent).toBe("Timezone");

        const repeatTitle = screen.queryAllByText("Repeat")[0];
        expect(repeatTitle).toBeTruthy();
        expect(repeatTitle.textContent).toBe("Repeat");

        const descriptionTitle = screen.queryAllByText("Description")[0];
        expect(descriptionTitle).toBeTruthy();
        expect(descriptionTitle.textContent).toBe("Description");

        const locDropDown = await waitFor(() => getByTestId("loc-dropdown-testid"));
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Burk Hall, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Lam Family College of Business, Business, 1600 Holloway Ave, San Francisco, CA 94132, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Lam Family College of Business, Business, 1600 Holloway Ave, San Francisco, CA 94132, USA');
        fireEvent.change(locDropDown, { target: { value: 'School SFSU, Creative Arts, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('School SFSU, Creative Arts, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'SFSU Psychology Clinic, San Francisco State University, Ethnic Studies & Psychology, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('SFSU Psychology Clinic, San Francisco State University, Ethnic Studies & Psychology, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Fine Arts Gallery, San Francisco State University, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Fine Arts Gallery, San Francisco State University, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Mashouf Wellness Center, Font Boulevard,h San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Mashouf Wellness Center, Font Boulevard,h San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Hensill Hall, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Hensill Hall, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Humanities Building, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Humanities Building, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'J. Paul Leonard Library, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('J. Paul Leonard Library, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Marcus Hall (George and Judy Marcus Hall), 8 Tapia Dr, San Francisco, CA 94132' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Marcus Hall (George and Judy Marcus Hall), 8 Tapia Dr, San Francisco, CA 94132');
        fireEvent.change(locDropDown, { target: { value: 'SFSU College of Science and Engineering, San Francisco State University, Holloway Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('SFSU College of Science and Engineering, San Francisco State University, Holloway Avenue, San Francisco, CA, USA');
        fireEvent.change(locDropDown, { target: { value: 'Thornton Hall, 20th Avenue, San Francisco, CA, USA' } });
        expect(locDropDown.value).toBeTruthy();
        expect(locDropDown.value).toBe('Thornton Hall, 20th Avenue, San Francisco, CA, USA');

        const cancelBtn = screen.getAllByText("Cancel")[1];
        expect(cancelBtn.textContent).toBe("Cancel");
        const saveBtn = screen.getAllByText("Save")[2];
        fireEvent.click(saveBtn);
    });

    it("Check preferences window", () => {

        const result = render(<Scheduler />, { wrapper: MemoryRouter });
        const cell = result.container.querySelector('.e-work-cells');
        act(() => {
            fireEvent.click(cell);
        });

        const moreDetailsBtn = result.container.querySelector(".e-event-details");
        expect(moreDetailsBtn).toBeTruthy();
        expect(moreDetailsBtn.textContent).toBe("More Details");

        act(() => {
            fireEvent.click(moreDetailsBtn);
        });

        const addPrefsBtn = screen.getByText("Add Prefs");
        expect(addPrefsBtn).toBeTruthy();
        expect(addPrefsBtn.textContent).toBe("Add Prefs");
        fireEvent.click(addPrefsBtn);

        const { getByTestId } = render(<Scheduler />, { wrapper: MemoryRouter });

        const prefsTitle = getByTestId("preferences-title-testid");
        expect(prefsTitle).toBeTruthy();
        expect(prefsTitle.textContent).toBe("Preferences");

        const tagsTitle = getByTestId("tags-title-testid");
        expect(tagsTitle).toBeTruthy();
        expect(tagsTitle.textContent).toBe("Tags");

        const tagsDropDown = getByTestId("tags-dropdown-testid").children;

        const tagsArray = ["Bar",
            "Boba",
            "Break",
            "Breakfast",
            "Burger",
            "Coffee",
            "Food",
            "Gym",
            "Ice Cream",
            "Pizza",
            "Reading",
            "Relax",
            "Smoothie",
            "Study",
            "Swimming",
            "Workout"
        ];

        for (let i = 0; i < tagsDropDown.length; i++) {
            expect(tagsDropDown[i].children[0].checked).toBeFalsy();
            expect(tagsDropDown[i].textContent).toBe(tagsArray[i]);
            expect(tagsDropDown[i].textContent).toBeTruthy();
        }

        const relativeTitle = getByTestId("relative-title-testid");
        expect(relativeTitle).toBeTruthy();
        expect(relativeTitle.textContent).toBe("Relative");

        const relativeDropDown = getByTestId("relative-dropdown-testid").children;

        const relativeArray = ["Before", "After"];

        for (let i = 0; i < relativeDropDown.length; i++) {
            expect(relativeDropDown[i].textContent).toBe(relativeArray[i]);
            expect(relativeDropDown[i].textContent).toBeTruthy();
        }

        const closeBtn = getByTestId("close-btn-testid");
        expect(closeBtn).toBeTruthy();
        expect(closeBtn.textContent).toBe("Close");

        const saveChangesBtn = getByTestId("savechanges-btn-testid");
        expect(saveChangesBtn).toBeTruthy();
        expect(saveChangesBtn.textContent).toBe("Save Changes");

        fireEvent.click(saveChangesBtn);
    });

    it("Check events apis", async () => {

        var start = new Date();
        start.setHours(8, 0, 0, 0);

        var end = new Date();
        end.setHours(16, 59, 59, 999);
        const mockEvent = {
            data: [{
                Id: 0,
                StartTime: start,
                EndTime: end,
                Subject: "Test Event"
            }]
        };

        myApi.getEvents.mockResolvedValue(mockEvent);
        const result = render(<Scheduler />, { wrapper: MemoryRouter });
        await waitFor(() => {
            screen.getByText("Test Event");
        });

        const titleInput = result.container.querySelector(".e-subject");
        expect(titleInput).toBeTruthy();
        expect(titleInput.textContent).toBe("Test Event");
        act(() => {
            fireEvent.click(titleInput);
        });
        const editBtn = result.container.querySelector(".e-edit");
        expect(editBtn).toBeTruthy();
        act(() => {
            fireEvent.click(editBtn);
        });
        const editTitle = screen.getByText("Edit Event");
        expect(editTitle.textContent).toBe("Edit Event");

        myApi.deleteEvent.mockResolvedValue(mockEvent);

        const deletedResult = render(<Scheduler />, { wrapper: MemoryRouter });

        const deletedEvent = await waitFor(() => deletedResult.container.querySelector(".e-subject"));
        expect(deletedEvent).toBeFalsy();

    });

    it("Check preferences apis", async () => {

        const result = render(<Scheduler />, { wrapper: MemoryRouter });
        const cell = result.container.querySelector('.e-work-cells');
        act(() => {
            fireEvent.click(cell);
        });

        const moreDetailsBtn = result.container.querySelector(".e-event-details");
        expect(moreDetailsBtn).toBeTruthy();
        expect(moreDetailsBtn.textContent).toBe("More Details");

        act(() => {
            fireEvent.click(moreDetailsBtn);
        });

        const mockPreferences =
            [{
                tags: ["Food"],
                relative: "After"
            }];

        myApi.getPreference.mockResolvedValue(mockPreferences);

        const addPrefsBtn = screen.getByText("Add Prefs");
        expect(addPrefsBtn).toBeTruthy();
        expect(addPrefsBtn.textContent).toBe("Add Prefs");
        fireEvent.click(addPrefsBtn);

        render(<Scheduler />, { wrapper: MemoryRouter });

        await waitFor(() => {
            screen.getByText("After");
            screen.getByText("Food");
        });
    });
});

