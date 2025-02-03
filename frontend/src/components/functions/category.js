import axios from "axios";

export const createCategory = async (authtoken,value) => {
  return await axios.post(process.env.PORT+"/api/category", value,{
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async () => {
  return await axios.get(process.env.PORT+"/api/category");
};

export const readCategory = async (authtoken,id) => {
  return await axios.get(process.env.PORT+"/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const editCategory = async (authtoken,id,value) => {
    console.log("Edit Category",id,value);
  return await axios.put(process.env.PORT+"/api/category/"+id,value,{
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken,id) => {
  return await axios.delete(process.env.PORT+"/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};