import axios from "axios";

// export const getWalletUser = async (authtoken, id) => {
//     console.log("getWalletUser", id, authtoken);
//     return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/wallet-user", id, {
//         headers: {
//             authtoken,
//         },
//     });
// };

// export const getWalletUser = async (authtoken, values) => {
//     console.log('getWalletUser',values);
//   return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/wallet",
//      values
//   , {
//     headers: {
//         authtoken,
//     },
//   });
// };

export const getWalletUser = async (authtoken, values) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/wallets/"+values,{
      headers: {
        authtoken,
      },
    });
  };