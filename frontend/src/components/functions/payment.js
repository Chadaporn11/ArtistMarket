import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const createPayment = async (authtoken, value) => {
    return await axios.post(apiUrl+"/payment-admin", value, {
        headers: {
            authtoken,
        },
    });
};
export const createPaymentSeller = async (authtoken, value) => {
    return await axios.post(apiUrl+"/payment-seller", value, {
        headers: {
            authtoken,
        },
    });
};


// export const listProduct = async (count) => {
//     return await axios.get(apiUrl+"/products/" + count);
// };


export const readPayment = async (authtoken, value) => {
    // console.log("readPayment", value);
    return await axios.get(apiUrl+"/payment/" + value.username, {
        headers: {
            authtoken,
        },
    });
};

export const updatePayment = async (authtoken, id, values) => {
    return await axios.put(apiUrl+"/payment/" + id, values, {
        headers: {
            authtoken,
        },
    });
};

export const updatePaymentSeller = async (authtoken, id, values) => {
    return await axios.put(apiUrl+"/payment-seller/" + id, values, {
        headers: {
            authtoken,
        },
    });
};

// export const listProductBy = async (sort, order, limit) => {
//     return await axios.post(apiUrl+"/productby",
//         {
//             sort,
//             order,
//             limit
//         }
//     );
// };

// export const searchFilters = async (arg) => {
//     return await axios.post(apiUrl+"/search/filters", arg);
// };