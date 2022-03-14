import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './header.scss'

function Header(props) {
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cartReducer.cartItems)

    const gotoCart = () => {
        navigate('/cart')
    }
    return (
        <div className='header flex'>
            <Link to="/" className='logo'>The Coffee</Link>
            <ul className='navbar flex'>
                <li>
                    <Link to="/admin/employee" >Trang Quản Lý</Link>
                </li>
                <li>
                    <Link to="/">Trang Khách Hàng</Link>
                </li>
            </ul>
            <div className='user flex'>
                <div className='user__cart' onClick={gotoCart}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className={cartItems.length > 0 ? 'cart-num flex' : 'hide'}>{cartItems.length}</span>
                </div>
                <button className='button'>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Header