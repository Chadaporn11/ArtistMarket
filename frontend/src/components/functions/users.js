import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get(process.env.PORT+"/api/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, values) => {
  // console.log('cahan', values);
  return await axios.post(process.env.PORT+"/api/change-role",
    values
    , {
      headers: {
        authtoken,
      },
    });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(process.env.PORT+"/api/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, values) => {
  // console.log('reset', id, values);
  return await axios.put(process.env.PORT+"/api/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(process.env.PORT+"/api/user/cart",
    { cart }, {
    headers: {
      authtoken,
    },
  });
};

export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.PORT+"/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.PORT+"/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const saveAddressOrder = async (authtoken, sendOrder) => {
  return await axios.post(process.env.PORT+"/api/user/address-order",
    { sendOrder }, {
    headers: {
      authtoken,
    },
  });
};

export const deleteAddressOrder = async (authtoken, id) => {
  return await axios.delete(process.env.PORT+"/api/user/address-order/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const getAddressOrder = async (authtoken) => {
  return await axios.get(process.env.PORT+"/api/user/address-order", {
    headers: {
      authtoken,
    },
  });
};

export const saveOrder = async (authtoken, data) => {
  return await axios.post(process.env.PORT+"/api/user/order", data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrder = async (authtoken) => {
  return await axios.get(process.env.PORT+"/api/user/order", {
    headers: {
      authtoken,
    },
  });
};
export const getOrderSeller = async (authtoken, data) => {
  return await axios.get(process.env.PORT+"/api/seller/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const getOrderStatus = async (authtoken, data) => {
  return await axios.get(process.env.PORT+"/api/user/order/" + data, {
    headers: {
      authtoken,
    },
  });
};

export const updateOrderStatus = async (authtoken, id, data) => {
  return await axios.put(process.env.PORT+"/api/user/order/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

export const updateDeliveryStatus = async (authtoken, id, data) => {
  return await axios.put(process.env.PORT+"/api/user/order-delivery/" + id, data, {
    headers: {
      authtoken,
    },
  });
};

//Wishlist
export const getWishList = async (authtoken) => {
  return await axios.get(process.env.PORT+"/api/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(process.env.PORT+"/api/user/wishlist",
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
  return await axios.put(process.env.PORT+"/api/user/wishlist/" + productId, {},
    {
      headers: {
        authtoken,
      },
    });
};