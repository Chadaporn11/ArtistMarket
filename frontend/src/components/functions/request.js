import axios from "axios";

export const createRequestType = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/requesttype", value, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestType = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requesttype", {
        headers: {
            authtoken,
        },
    });
};

export const readRequestType = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const editRequestType = async (authtoken, id, value) => {
    console.log("Edit Requesttype", id, value);
    return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/requesttype/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestType = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

//////////////
export const createRequestOther = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/request-other", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestTopup = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/request-topup", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestWithdraw = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/request-withdraw", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestSignupSeller = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/request-signupseller", value, {
        headers: {
            authtoken,
        },
    });
};
export const getRequestOther = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/request-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestWithdraw = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/request-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestTopup = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/request-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestOther = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requests-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestWithdraw = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requests-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestTopup = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requests-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestSignupSeller = async (authtoken, data) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/requests-signupseller/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestOther = async (authtoken, id, value) => {
    return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/request-other/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestSignupSeller = async (authtoken, id, value) => {
    return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/request-signupseller/" + id, value, {
        headers: {
            authtoken,
        },
    });
};
export const UpdateRequestTopup = async (authtoken, id, value) => {
    return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/request-topup/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestWithdraw = async (authtoken, id, value) => {
    return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/request-withdraw/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestOther = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/request-other/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestTopup = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/request-topup/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestWithdraw = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/request-withdraw/" + id, {
        headers: {
            authtoken,
        },
    });
};