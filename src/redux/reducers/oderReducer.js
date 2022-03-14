const initialState = {
    oders: []
}

const oderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ODERS':
            return {
                ...state,
                oders: action.payload
            }
        default:
            return state;
    }
}

export default oderReducer