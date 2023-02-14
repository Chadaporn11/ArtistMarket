import axios from "axios";

export const createCategory = async (authtoken,value) => {
  return await axios.post("http://localhost:4200/api/category", value,{
    headers: {
      authtoken,
    },
  });
};

export const listCategory = async () => {
  return await axios.get("http://localhost:4200/api/category");
};

export const readCategory = async (authtoken,id) => {
  return await axios.get("http://localhost:4200/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};

export const editCategory = async (authtoken,id,value) => {
    console.log("Edit Category",id,value);
  return await axios.put("http://localhost:4200/api/category/"+id,value,{
    headers: {
      authtoken,
    },
  });
};

export const deleteCategory = async (authtoken,id) => {
  return await axios.delete("http://localhost:4200/api/category/"+id,{
    headers: {
      authtoken,
    },
  });
};