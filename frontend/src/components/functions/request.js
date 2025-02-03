import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const createRequestType = async (authtoken, value) => {
    return await axios.post(apiUrl+"/requesttype", value, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestType = async (authtoken) => {
    return await axios.get(apiUrl+"/requesttype", {
        headers: {
            authtoken,
        },
    });
};

export const readRequestType = async (authtoken, id) => {
    return await axios.get(apiUrl+"/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const editRequestType = async (authtoken, id, value) => {
    console.log("Edit Requesttype", id, value);
    return await axios.put(apiUrl+"/requesttype/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestType = async (authtoken, id) => {
    return await axios.delete(apiUrl+"/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

//////////////
export const createRequestOther = async (authtoken, value) => {
    return await axios.post(apiUrl+"/request-other", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestTopup = async (authtoken, value) => {
    return await axios.post(apiUrl+"/request-topup", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestWithdraw = async (authtoken, value) => {
    return await axios.post(apiUrl+"/request-withdraw", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestSignupSeller = async (authtoken, value) => {
    return await axios.post(apiUrl+"/request-signupseller", value, {
        headers: {
            authtoken,
        },
    });
};
export const getRequestOther = async (authtoken, data) => {
    return await axios.get(apiUrl+"/request-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestWithdraw = async (authtoken, data) => {
    return await axios.get(apiUrl+"/request-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestTopup = async (authtoken, data) => {
    return await axios.get(apiUrl+"/request-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestOther = async (authtoken, data) => {
    return await axios.get(apiUrl+"/requests-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestWithdraw = async (authtoken, data) => {
    return await axios.get(apiUrl+"/requests-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestTopup = async (authtoken, data) => {
    return await axios.get(apiUrl+"/requests-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestSignupSeller = async (authtoken, data) => {
    return await axios.get(apiUrl+"/requests-signupseller/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestOther = async (authtoken, id, value) => {
    return await axios.put(apiUrl+"/request-other/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestSignupSeller = async (authtoken, id, value) => {
    return await axios.put(apiUrl+"/request-signupseller/" + id, value, {
        headers: {
            authtoken,
        },
    });
};
export const UpdateRequestTopup = async (authtoken, id, value) => {
    return await axios.put(apiUrl+"/request-topup/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestWithdraw = async (authtoken, id, value) => {
    return await axios.put(apiUrl+"/request-withdraw/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestOther = async (authtoken, id) => {
    return await axios.delete(apiUrl+"/request-other/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestTopup = async (authtoken, id) => {
    return await axios.delete(apiUrl+"/request-topup/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestWithdraw = async (authtoken, id) => {
    return await axios.delete(apiUrl+"/request-withdraw/" + id, {
        headers: {
            authtoken,
        },
    });
};