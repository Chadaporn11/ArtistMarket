import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

export const register = async (value) =>
  await axios.post(apiUrl+"/register", value);

export const registerSeller = async (value) => 
  await axios.post(apiUrl+"/register-seller", value);

export const login = async (value) =>
  await axios.post(apiUrl+"/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post(apiUrl+"/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentSeller = async (authtoken) => {
  return await axios.post(apiUrl+"/current-seller",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post(apiUrl+"/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}