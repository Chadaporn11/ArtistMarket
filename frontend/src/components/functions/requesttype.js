import axios from "axios";

export const createRequestType = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/requesttype", value, {
        headers: {
            authtoken,
        },
    });
};

export const listRequestType = async () => {
    return await axios.get("http://localhost:4200/api/requesttype");
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