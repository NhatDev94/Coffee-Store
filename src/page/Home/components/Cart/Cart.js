import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../../part/Header/Header';
import CartItem from '../CartItem/CartItem';
import * as firebase from '../../../../firebase/firebase'

import './cart.scss'

function Cart(props) {
    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [payment, setPayment] = useState('cash')

    const getTotal = () => {
        let total = 0
        cartItems.map(item => {
            total = total + (item.price * item.num)
        })
        return total
    }

    const formatPrice = (price) => {
        if (!price) return
        price = '' + price
        return price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)
    }

    const deleteCart = () => {
        dispatch({
            type: 'DELETE_CART',
            payload: null
        })
    }

    const submitOder = async () => {
        // validated input
        const now = new Date()
        const time = {
            day : now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear()
        }
        const oder = {
            info: {
                name: name,
                phone: phone,
                address: address,
                payment: payment
            },
            time: time,
            list: cartItems,
            isShip: false,
            isPayment: false,
            isDont: false
        }
        console.log(oder);
        await firebase.addOderToFirebase(oder)
    }

    return (
        <div className='cart'>
            <Header />
            <h2>Xác nhận đơn hàng</h2>
            <div className='cart__content flex'>
                <div className='cart__info'>
                    <h6>Giao hàng</h6>
                    <input 
                        placeholder='Tên người nhận' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder='Số điện thoại' 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <input 
                        placeholder='Địa chỉ nhận hàng' 
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <h6>Phương thức thanh toán</h6>
                    <div className='pay-item flex'>
                        <div className='input'>
                            <input 
                                id="cash" 
                                type='checkbox' 
                                checked={payment === 'cash'} 
                                onClick={(e) => setPayment('cash')}
                            />
                        </div>
                        <label htmlFor='cash'>Tiền mặt</label>
                    </div>
                    <div className='pay-item flex'>
                        <div className='input'>
                            <input 
                                id="bank" 
                                type='checkbox' 
                                checked={payment === 'bank'} 
                                onClick={() => setPayment('bank')}
                            />
                        </div>
                        <label htmlFor='bank'>Thẻ ngân hàng</label>
                    </div>

                </div>
                <div className='cart__bill'>
                    <div className='cart__bill--header flex'>
                        <h4>Các món đã chọn</h4>
                        <Link to="/">
                            <button className='button'>Thêm món</button>
                        </Link>
                    </div>
                    <div className='border'></div>
                    {
                        cartItems && cartItems.map((item, index) => {
                            return <CartItem item={item} key={index} />
                        })
                    }
                    <div className='total flex'>
                        <h4>Tổng cộng</h4>
                        <p>{cartItems.length > 0 ? formatPrice(getTotal()) : '0'}đ</p>
                    </div>
                    <button 
                        className='button submit'
                        onClick={submitOder}
                    >Thanh toán</button>
                    <div className='delete flex'>
                        <i className="fa-solid fa-trash"></i>
                        <p onClick={deleteCart}>Xóa đơn hàng</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart