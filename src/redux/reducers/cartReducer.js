const initialState = {
    cartItems: [], // id, num, price
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case 'DELETE_CART':
            return {
                ...state,
                cartItems : []
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                cartItems : action.payload
            }
        case 'UPDATE_PRODUCT': 
            return {
                ...state, 
                cartItems: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer