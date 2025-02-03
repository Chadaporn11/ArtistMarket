import axios from "axios";

// export const getWalletUser = async (authtoken, id) => {
//     console.log("getWalletUser", id, authtoken);
//     return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/wallet-user", id, {
//         headers: {
//             authtoken,
//         },
//     });
// };

// export const getWalletUser = async (authtoken, values) => {
//     console.log('getWalletUser',values);
//   return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/wallet",
//      values
//   , {
//     headers: {
//         authtoken,
//     },
//   });
// };

export const getWalletUser = async (authtoken, values) => {
    return await axios.get(process.env.REACT_APP_VERCEL_API_URL+"/api/wallets/"+values,{
      headers: {
        authtoken,
      },
    });
  };