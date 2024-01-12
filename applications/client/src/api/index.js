import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {

    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const callBackEnd = () => API.get("/");
export const getStudentInfo = (sfsuid) => API.get(`user/viewuser/${sfsuid}`);
export const createEvent = (newEvent) => API.post('events/eventcreate', newEvent);
export const getEvents = (sfsuid) => API.get(`events/viewevents/${sfsuid}`);
export const updateEvent = (updatedEvent) => API.patch('events/updateevent', updatedEvent);
export const deleteEvent = (_id, eventid) => API.delete(`events/deleteevent/?objid=${_id}&eventid=${eventid}`);
export const getSuggestedEvents = (events) => API.post("/suggestion/suggestion", events);
export const signup = (data) => API.post('user/usercreate', data);
export const signin = (data) => API.post('user/login', data);
export const createPreference = (createdPreference) => API.post("preferences/preferencecreate", createdPreference);
export const getPreference = (eventid) => API.get(`preferences/getpreferences/${eventid}`);
export const updatePreference = (updatedPreference) => API.patch("preferences/updatepreference", updatedPreference);
export const deletePreference = (eventid) => API.delete(`preferences/deletepreference/${eventid}`);
