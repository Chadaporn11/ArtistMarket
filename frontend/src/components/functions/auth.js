import axios from "axios";

export const register = async (value) =>
  await axios.post(process.env.APIURL+"/api/register", value);

export const registerSeller = async (value) => 
  await axios.post(process.env.APIURL+"/api/register-seller", value);

export const login = async (value) =>
  await axios.post(process.env.APIURL+"/api/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post(process.env.APIURL+"/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentSeller = async (authtoken) => {
  return await axios.post(process.env.APIURL+"/api/current-seller",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(process.env.APIURL+"/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}