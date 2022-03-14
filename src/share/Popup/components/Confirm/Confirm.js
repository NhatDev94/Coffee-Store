import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as firebase from '../../../../firebase/firebase'

import './confirm.scss'

function Confirm(props) {
    const dispatch = useDispatch()
    const {param} = useParams()
    const employees = useSelector(state => state.employeeReducer.employees)
    const itemTarget = useSelector(state => state.popupReducer.itemTarget)

    const deleteHandle = () => {
        if (param === 'employee') deleteEmployee()
        if (param === 'product') deleteProduct()

        dispatch({
            type: 'HIDE_POPUP',
            payload: null
        })
    }

    const cancelHandle = () => {
        dispatch({
            type: 'HIDE_POPUP',
            payload: null
        })
    }

    const deleteProduct = async () => {
        firebase.deleteProductInFirebase(itemTarget)
        const res = await firebase.getProductsFromFirebase()
        dispatch({
            type: 'SET_PRODUCTS',
            payload: res
        })
    }

    const deleteEmployee = async () => {
        firebase.deleteEmployeeInFirebase(itemTarget)
        const res = await firebase.getEmployeesFromFirebase()
        dispatch({
            type: 'SET_EMPLOYEES',
            payload: res
        })
    }

    return (
        <div className='confirm'>
            <h4 className='confirm__title'>{props.title}</h4>
            <div className='confirm__action flex'>
                <button
                    className='agree'
                    onClick={deleteHandle}
                >Xóa</button>
                <button onClick={cancelHandle}>Hủy</button>
            </div>
        </div>
    )
}

export default Confirm