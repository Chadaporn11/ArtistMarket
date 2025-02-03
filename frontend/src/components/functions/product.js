import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/product", value, {
    headers: {
      authtoken,
    },
  });
};


export const listProduct = async (count) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/products/" + count);
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_VERCEL_API_URL+"/api/product/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const readProduct = async (id) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/product/" + id);
};

export const updateProduct = async (authtoken, id, product) => {
  return await axios.put(process.env.REACT_APP_VERCEL_API_URL+"/api/product/" + id, product, {
    headers: {
      authtoken,
    },
  });
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/productby",
    {
      sort,
      order,
      limit
    }
  );
};

export const listProductByOwner = async (authtoken, id) => {
  return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/productby/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const searchFilters = async (arg) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/search/filters", arg);
};