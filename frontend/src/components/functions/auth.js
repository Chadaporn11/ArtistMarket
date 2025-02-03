import axios from "axios";

export const register = async (value) =>
  await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/register", value);

export const registerSeller = async (value) => 
  await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/register-seller", value);

export const login = async (value) =>
  await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentSeller = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/current-seller",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(process.env.REACT_APP_VERCEL_API_URL+"/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}