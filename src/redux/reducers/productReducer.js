const initialStare = {
    products: []
}

const productReducer = (state = initialStare, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'UPDATE_PRODUCT_COMPLETE':
            return {
                ...state,
                products: action.payload
            }
        case 'DELETE_PRODUCT_COMPLETE':
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

export default productReducer