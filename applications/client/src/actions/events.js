import * as api from '../api/index.js';

export const createEvent = async (event) => {
    try {
        const { data } = await api.createEvent(event);
        return data;
    }

    catch (err) {
        return err;
    }
};


export const updateEvent = async (event) => {
    try {
        const { data } = await api.updateEvent(event);
        return data;
    }

    catch (err) {
        return err;
    }
};

export const getEvents = async (sfsuid) => {
    try {
        const data = await api.getEvents(sfsuid);
        return data;
    }

    catch (err) {
        return err;
    }
};

export const deleteEvent = async (objid, eventid) => {

    try {
        const {data} = await api.deleteEvent(objid, eventid);
        return data;
    }

    catch (err) {
        return err;
    }
};

export const getSuggestedEvents = async (events) => {
    try {
        const data = await api.getSuggestedEvents(events);
        return data;
    }

    catch (err) {
        return err;
    }
};
