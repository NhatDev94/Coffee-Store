const initialStare = {
    isShowPopup: false,
    type: null,
    itemTarget: null
}

const popupReducer = (state = initialStare, action) => {
    switch (action.type) {
        case 'SHOW_POPUP':
            return {
                ...state,
                isShowPopup: true,
                type: action.payload
            }
        case 'HIDE_POPUP':
            return {
                ...state,
                isShowPopup: false,
                itemTarget: null,
                type: action.payload
            }
        case 'SET_ITEM_TARGET':
            return {
                ...state,
                itemTarget: action.payload
            }
        default:
            return state
    }
}

export default popupReducer