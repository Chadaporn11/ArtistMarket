import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post("http://localhost:4200/api/product", value, {
    headers: {
      authtoken,
    },
  });
};


export const listProduct = async (count) => {
  return await axios.get("http://localhost:4200/api/products/" + count);
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete("http://localhost:4200/api/product/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const readProduct = async (id) => {
  return await axios.get("http://localhost:4200/api/product/" + id);
};

export const updateProduct = async (authtoken, id, product) => {
  return await axios.put("http://localhost:4200/api/product/" + id, product, {
    headers: {
      authtoken,
    },
  });
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post("http://localhost:4200/api/productby",
    {
      sort,
      order,
      limit
    }
  );
};

export const listProductByOwner = async (authtoken, id) => {
  return await axios.get("http://localhost:4200/api/productby/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const searchFilters = async (arg) => {
  return await axios.post("http://localhost:4200/api/search/filters", arg);
};