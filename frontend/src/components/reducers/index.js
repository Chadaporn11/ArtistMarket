import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { walletReducer } from "./walletReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { wishlistReducer } from "./wishlistReducer";
import { searchReducer } from "./searchReducer";


const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  wishlist: wishlistReducer,
  search: searchReducer,

});

export default rootReducer;