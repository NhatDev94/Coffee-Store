import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Confirm from './components/Confirm/Confirm';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import ProductForm from './components/ProductForm/ProductForm';

import './popup.scss'

function Popup(props) {
    const type = useSelector(state => state.popupReducer.type)

    const dispatch = useDispatch()

    const components = [
        {
            type: 'add-product',
            component: <ProductForm title="Thêm Sản phẩm" />
        },
        {
            type: 'edit-product',
            component: <ProductForm title="Sửa Sản phẩm" />
        },
        {
            type: 'delete-product',
            component: <Confirm title="Xác nhận xóa Sản phẩm" />
        },
        {
            type: 'add-employee',
            component : <EmployeeForm title="Thêm Nhân Viên" />
        },
        {
            type: 'edit-employee',
            component: <EmployeeForm title="Thêm Sản phẩm" />
        },
        {
            type: 'delete-employee',
            component: <Confirm title="Xác nhận xóa Nhân viên" />
        }
    ]

    const hidePopup = () => {
        dispatch({
            type: 'HIDE_POPUP',
            payload: null
        })
    }

    return(
        <div className='popup'>
            <div className='popup__content'>
                {
                    components.filter(component => {
                        return type === component.type
                    })[0].component
                }
            </div>
            <div 
                className='popup__overload'
                onClick={hidePopup}
            ></div>
        </div>
    )
}

export default Popup