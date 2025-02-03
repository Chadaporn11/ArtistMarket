import axios from "axios";
const apiUrl = process.env.REACT_APP_VERCEL_API_URL;

// export const getWalletUser = async (authtoken, id) => {
//     console.log("getWalletUser", id, authtoken);
//     return await axios.get(apiUrl+"/wallet-user", id, {
//         headers: {
//             authtoken,
//         },
//     });
// };

// export const getWalletUser = async (authtoken, values) => {
//     console.log('getWalletUser',values);
//   return await axios.get(apiUrl+"/wallet",
//      values
//   , {
//     headers: {
//         authtoken,
//     },
//   });
// };

export const getWalletUser = async (authtoken, values) => {
    return await axios.get(apiUrl+"/wallets/"+values,{
      headers: {
        authtoken,
      },
    });
  };