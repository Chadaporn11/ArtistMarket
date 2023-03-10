import axios from "axios";

export const createRequestType = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/requesttype", value, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestType = async (authtoken) => {
    return await axios.get("http://localhost:4200/api/requesttype", {
        headers: {
            authtoken,
        },
    });
};

export const readRequestType = async (authtoken, id) => {
    return await axios.get("http://localhost:4200/api/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const editRequestType = async (authtoken, id, value) => {
    console.log("Edit Requesttype", id, value);
    return await axios.put("http://localhost:4200/api/requesttype/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestType = async (authtoken, id) => {
    return await axios.delete("http://localhost:4200/api/requesttype/" + id, {
        headers: {
            authtoken,
        },
    });
};

//////////////
export const createRequestOther = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/request-other", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestTopup = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/request-topup", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestWithdraw = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/request-withdraw", value, {
        headers: {
            authtoken,
        },
    });
};

export const createRequestSignupSeller = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/request-signupseller", value, {
        headers: {
            authtoken,
        },
    });
};
export const getRequestOther = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/request-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestWithdraw = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/request-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const getRequestTopup = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/request-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestOther = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/requests-other/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestWithdraw = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/requests-withdraw/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestTopup = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/requests-topup/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestSignupSeller = async (authtoken, data) => {
    return await axios.get("http://localhost:4200/api/requests-signupseller/" + data, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestOther = async (authtoken, id, value) => {
    return await axios.put("http://localhost:4200/api/request-other/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestSignupSeller = async (authtoken, id, value) => {
    return await axios.put("http://localhost:4200/api/request-signupseller/" + id, value, {
        headers: {
            authtoken,
        },
    });
};
export const UpdateRequestTopup = async (authtoken, id, value) => {
    return await axios.put("http://localhost:4200/api/request-topup/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const UpdateRequestWithdraw = async (authtoken, id, value) => {
    return await axios.put("http://localhost:4200/api/request-withdraw/" + id, value, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestOther = async (authtoken, id) => {
    return await axios.delete("http://localhost:4200/api/request-other/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestTopup = async (authtoken, id) => {
    return await axios.delete("http://localhost:4200/api/request-topup/" + id, {
        headers: {
            authtoken,
        },
    });
};

export const deleteRequestWithdraw = async (authtoken, id) => {
    return await axios.delete("http://localhost:4200/api/request-withdraw/" + id, {
        headers: {
            authtoken,
        },
    });
};