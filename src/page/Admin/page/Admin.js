import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import Header from '../../../part/Header/Header';
import Sidebar from '../../../part/Sidebar/Sidebar';
import Popup from '../../../share/Popup/Popup';
import EmployeePage from '../components/EmployeePage/EmployeePage'
import ProductPage from '../components/ProductPage/ProductPage'
import './admin.scss'

function Admin(props) {
    const { param } = useParams()
    const isShowPopup = useSelector(state => state.popupReducer.isShowPopup)

    const sidebars = [
        {
            type: 'employee',
            to: '/admin/employee'
        },
        {
            type: 'product',
            to: '/admin/product'
        }
    ]       
    // const get = async () => {
    //     const data = await getProducts()
    //     console.log(data);
    // }
    // get()

    // demo()

    return (
        <div className='admin'>
            <Header />
            {isShowPopup && <Popup />}
            <div className='admin__main flex'>
                <Sidebar sidebars={sidebars} title="Trang Admin" />
                <div className='right'>
                    {
                        param === 'employee' && <EmployeePage />
                    }
                    {
                        param === 'product' && <ProductPage />
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin