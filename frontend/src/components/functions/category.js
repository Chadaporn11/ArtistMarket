import axios from "axios";

export const createCategory = async (authtoken,value) => {
  return await axios.post(process.env.APIURL+"/api/category", value,{
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async () => {
  return await axios.get(process.env.APIURL+"/api/category");
};

export const readCategory = async (authtoken,id) => {
  return await axios.get(process.env.APIURL+"/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const editCategory = async (authtoken,id,value) => {
    console.log("Edit Category",id,value);
  return await axios.put(process.env.APIURL+"/api/category/"+id,value,{
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken,id) => {
  return await axios.delete(process.env.APIURL+"/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};