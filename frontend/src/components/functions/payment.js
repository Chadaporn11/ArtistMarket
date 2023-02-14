import axios from "axios";

export const createPayment = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/payment-admin", value, {
        headers: {
            authtoken,
        },
    });
};
export const createPaymentSeller = async (authtoken, value) => {
    return await axios.post("http://localhost:4200/api/payment-seller", value, {
        headers: {
            authtoken,
        },
    });
};


// export const listProduct = async (count) => {
//     return await axios.get("http://localhost:4200/api/products/" + count);
// };


export const readPayment = async (authtoken, value) => {
    console.log("readPayment", value);
    return await axios.get("http://localhost:4200/api/payment/" + value.username, {
        headers: {
            authtoken,
        },
    });
};

export const updatePayment = async (authtoken, id, values) => {
    return await axios.put("http://localhost:4200/api/payment/" + id, values, {
        headers: {
            authtoken,
        },
    });
};

// export const listProductBy = async (sort, order, limit) => {
//     return await axios.post("http://localhost:4200/api/productby",
//         {
//             sort,
//             order,
//             limit
//         }
//     );
// };

// export const searchFilters = async (arg) => {
//     return await axios.post("http://localhost:4200/api/search/filters", arg);
// };