import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const listUser = async (authtoken) => {
  return await axios.get(apiUrl+"/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, values) => {
  // console.log('cahan', values);
  return await axios.post(apiUrl+"/change-role",
    values
    , {
      headers: {
        authtoken,
      },
    });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(apiUrl+"/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, values) => {
  // console.log('reset', id, values);
  return await axios.put(apiUrl+"/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(apiUrl+"/user/cart",
    { cart }, {
    headers: {
      authtoken,
    },
  });
};

export const getUserCart = async (authtoken) => {
  return await axios.get(apiUrl+"/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(apiUrl+"/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const saveAddressOrder = async (authtoken, sendOrder) => {
  return await axios.post(apiUrl+"/user/address-order",
    { sendOrder }, {
    headers: {
      authtoken,
    },
  });
};

export const deleteAddressOrder = async (authtoken, id) => {
  return await axios.delete(apiUrl+"/user/address-order/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const getAddressOrder = async (authtoken) => {
  return await axios.get(apiUrl+"/user/address-order", {
    headers: {
      authtoken,
    },
  });
};

export const saveOrder = async (authtoken, data) => {
  return await axios.post(apiUrl+"/user/order", data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrder = async (authtoken) => {
  return await axios.get(apiUrl+"/user/order", {
    headers: {
      authtoken,
    },
  });
};
export const getOrderSeller = async (authtoken, data) => {
  return await axios.get(apiUrl+"/seller/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrderStatus = async (authtoken, data) => {
  return await axios.get(apiUrl+"/user/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrderStatus = async (authtoken, id, data) => {
  return await axios.put(apiUrl+"/user/order/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateDeliveryStatus = async (authtoken, id, data) => {
  return await axios.put(apiUrl+"/user/order-delivery/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

//Wishlist
export const getWishList = async (authtoken) => {
  return await axios.get(apiUrl+"/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(apiUrl+"/user/wishlist",
    {
      productId
    },
    {
      headers: {
        authtoken,
      },
    });
};

export const removeWishList = async (authtoken, productId) => {
  return await axios.put(apiUrl+"/user/wishlist/" + productId, {},
    {
      headers: {
        authtoken,
      },
    });
};