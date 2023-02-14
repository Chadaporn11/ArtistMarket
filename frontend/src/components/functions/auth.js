import axios from "axios";

export const register = async (value) =>
  await axios.post("http://localhost:4200/api/register", value);

export const registerSeller = async (value) => 
  await axios.post("http://localhost:4200/api/register-seller", value);

export const login = async (value) =>
  await axios.post("http://localhost:4200/api/login", value);

export const currentUser = async (authtoken) => {
  return await axios.post("http://localhost:4200/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentSeller = async (authtoken) => {
  return await axios.post("http://localhost:4200/api/current-seller",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async (authtoken) => {
  return await axios.post("http://localhost:4200/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}