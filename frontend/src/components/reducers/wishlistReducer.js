let initialState = []

if (typeof window !== 'undefined') {
    if (localStorage.getItem('wishlist')) {
        initialState = JSON.parse(localStorage.getItem('wishlist'));
    } else {
        initialState = [];
    }
}

export function wishlistReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return action.payload;
        default:
            return state;
    }
}