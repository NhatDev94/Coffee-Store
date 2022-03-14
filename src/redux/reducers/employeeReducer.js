const initialStare = {
    employees: []
}

const employeeReducer = (state = initialStare, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {
                ...state,
                employees: action.payload
            }
        case 'UPDATE_EMPLOYEE_COMPLETE':
            return {
                ...state,
                employees: action.payload
            }
        case 'DELETE_EMPLOYEE_COMPLETE':
            return {
                ...state,
                employees: action.payload
            }
        default:
            return state
    }
}

export default employeeReducer