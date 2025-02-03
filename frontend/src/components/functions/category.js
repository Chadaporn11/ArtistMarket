import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const createCategory = async (authtoken,value) => {
  return await axios.post(apiUrl+"/category", value,{
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async () => {
  return await axios.get(apiUrl+"/category");
};

export const readCategory = async (authtoken,id) => {
  return await axios.get(apiUrl+"/category/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const editCategory = async (authtoken,id,value) => {
    console.log("Edit Category",id,value);
  return await axios.put(apiUrl+"/category/"+id,value,{
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken,id) => {
  return await axios.delete(apiUrl+"/category/"+id,{
    headers: {
      authtoken,
    },
  });
};