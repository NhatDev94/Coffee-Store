import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './cartItem.scss'

function CartItem(props) {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cartReducer.cartItems)

    const formatPrice = (price) => {
        if (!price) return
        return price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)
    }

    const deleteProduct = () => {
        const products = cartItems.filter(item => {
            return item.id !== props.item.id
        })
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: products
        })
    }

    const changeNum = operator => {
        let num = props.item.num
        operator === 'minus' ? num-- : num++
        if (num <= 0) {
            deleteProduct()
            return
        }
        const products = cartItems.map(item => {
            if (item.id === props.item.id) {
                item.num = num
            }
            return item
        })

        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: products
        })
    }
    return (
        <div className='item flex'>
            <div className='item__left'>
                <h4>{props.item.num} x {props.item.name}</h4>
                <p className={props.item.size === 'small' ? '' : 'hide'}>Nhỏ</p>
                <p className={props.item.size === 'medium' ? '' : 'hide'}>Vừa</p>
                <p className={props.item.size === 'large' ? '' : 'hide'}>Lớn</p>
                <span className='action' onClick={() => changeNum('minus')}>
                    <i className="fa-solid fa-minus"></i>
                </span>
                <span className='action' onClick={() => changeNum('add')}>
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span
                    className='delete'
                    onClick={deleteProduct}
                >Xóa</span>
            </div>
            <p className='price'>{formatPrice(props.item.price)}đ</p>
        </div>
    )
}

export default CartItem