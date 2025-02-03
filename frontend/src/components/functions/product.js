import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const createProduct = async (authtoken, value) => {
  return await axios.post(apiUrl+"/product", value, {
    headers: {
      authtoken,
    },
  });
};


export const listProduct = async (count) => {
  return await axios.get(apiUrl+"/products/" + count);
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete(apiUrl+"/product/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const readProduct = async (id) => {
  return await axios.get(apiUrl+"/product/" + id);
};

export const updateProduct = async (authtoken, id, product) => {
  return await axios.put(apiUrl+"/product/" + id, product, {
    headers: {
      authtoken,
    },
  });
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(apiUrl+"/productby",
    {
      sort,
      order,
      limit
    }
  );
};

export const listProductByOwner = async (authtoken, id) => {
  return await axios.get(apiUrl+"/productby/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const searchFilters = async (arg) => {
  return await axios.post(apiUrl+"/search/filters", arg);
};