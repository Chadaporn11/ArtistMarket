import axios from "axios";

export const register = async (value) =>
  await axios.post(process.env.PORT+"/api/register", value);

export const registerSeller = async (value) => 
  await axios.post(process.env.PORT+"/api/register-seller", value);

export const login = async (value) =>
  await axios.post(process.env.PORT+"/api/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post(process.env.PORT+"/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentSeller = async (authtoken) => {
  return await axios.post(process.env.PORT+"/api/current-seller",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(process.env.PORT+"/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}