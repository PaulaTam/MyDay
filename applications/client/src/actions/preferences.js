import * as api from '../api/index.js';

export const getPreference = async (eventid) => {
    try {
        let { data } = await api.getPreference(eventid);
        return data;
    }
    catch (err) {
        return err;
    }
};
export const createPreference = async (createPref) => {
    try {
        let { data } = await api.createPreference(createPref);
        return data;
    }
    catch (err) {
        return err;
    }
};
export const updatePreference = async (updatePref) => {
    try {
        let { data } = await api.updatePreference(updatePref);
        return data;
    }
    catch (err) {
        return err;
    }
};

export const deletePreference = async (eventid) => {
    try {
        let data = await api.deletePreference(eventid);
        return data;
    }
    catch (err) {
        return err;
    }
};