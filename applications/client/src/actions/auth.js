import * as api from '../api/index.js';
export const getStudentInfo = async (sfsuid) => {
    try {
        const result = await api.getStudentInfo(sfsuid);
        return result;
    }

    catch (err) {
        return err;
    }
};

export const signup = async (data) => {
    try {
        const result = await api.signup(data);
        return result;
    }
    
    catch (err) {
        return err;
    }
};

export const signin = async (data) => {
    try {
        const result = await api.signin(data);
        return result;
    }

    catch (err) {
        return err;
    }
};
