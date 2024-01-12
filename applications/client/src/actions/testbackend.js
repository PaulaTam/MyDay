import * as api from '../api/index.js';

export const callBackEnd = async () => {

    try {
        const result = await api.callBackEnd();
        return result;
    }

    catch (err) {
        return err;
    }


}