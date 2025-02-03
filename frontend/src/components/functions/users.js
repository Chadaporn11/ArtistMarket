import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, values) => {
  // console.log('cahan', values);
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/change-role",
    values
    , {
      headers: {
        authtoken,
      },
    });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, values) => {
  // console.log('reset', id, values);
  return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/user/cart",
    { cart }, {
    headers: {
      authtoken,
    },
  });
};

export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const saveAddressOrder = async (authtoken, sendOrder) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/user/address-order",
    { sendOrder }, {
    headers: {
      authtoken,
    },
  });
};

export const deleteAddressOrder = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/user/address-order/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const getAddressOrder = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/user/address-order", {
    headers: {
      authtoken,
    },
  });
};

export const saveOrder = async (authtoken, data) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/user/order", data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrder = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/user/order", {
    headers: {
      authtoken,
    },
  });
};
export const getOrderSeller = async (authtoken, data) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/seller/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrderStatus = async (authtoken, data) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/user/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrderStatus = async (authtoken, id, data) => {
  return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/user/order/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateDeliveryStatus = async (authtoken, id, data) => {
  return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/user/order-delivery/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

//Wishlist
export const getWishList = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/user/wishlist",
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
  return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/user/wishlist/" + productId, {},
    {
      headers: {
        authtoken,
      },
    });
};