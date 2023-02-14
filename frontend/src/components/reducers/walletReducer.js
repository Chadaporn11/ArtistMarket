export function walletReducer(state = null, action) {
    switch (action.type) {
      case "LOGIN_WALLET":
        return action.payload;
      case "LOGOUT_WALLET":
        localStorage.clear()
        return action.payload;
      default:
        return state;
    }
  }