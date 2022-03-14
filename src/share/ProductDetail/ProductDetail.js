import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../part/Header/Header';

import './productDetail.scss'

function ProductDetail(props) {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.products)
    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const [size, setSize] = useState('medium')
    const [num, setNum] = useState(1)

    const [product] = products.filter(item => {
        return item.id == id
    })

    let price = product && product.price
    price = price && price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)

    const addCart = () => {
        let isProductExist = false
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            num: num
        }
        // có sản phẩm trong giỏ rồi -> tăng số lượng lên
        cartItems.map(item => {
            if (item.id  === id) {
                isProductExist = true
                item.num = item.num + num
            }
        })
        if (isProductExist) {
            dispatch({
                type: 'UPDATE_PRODUCT',
                payload: cartItems
            })
            return
        }
        // chưa có sản phẩm trong giỏ
        dispatch({
            type: 'ADD_PRODUCT_TO_CART',
            payload: cartItem
        })
    }

    const gotoCart = () => {
        navigate('/cart')
    }

    return (
        <div className='product-detail'>
            <div className='product-detail__header'>
                <Header />
            </div>
            <div className='link flex'>
                <Link to="/" >Menu / </Link>
                <Link to={`/${product && product.type}`}>{product && product.type}</Link>
                <Link to="" >/ {product && product.name}</Link>
            </div>
            <div className='product-detail__row flex'>
                <div className='product-detail__img'>
                    <div className='img-wrap'>
                        <img src={product && product.photoURL} />
                    </div>
                </div>
                <div className='product-detail__info'>
                    <h4 className='name'>{product && product.name}</h4>
                    <h6 className='price'>{price} đ</h6>
                    <p className='size'>Kích thước</p>
                    <div className='size flex'>
                        <span className={size === 'medium'? 'active' : ''} onClick={() => setSize('medium')}>Vừa</span>
                        <span className={size === 'large' ? 'active': ''} onClick={() => setSize('large')}>Lớn</span>
                    </div>
                    <div className='num flex'>
                        <i 
                            className="fa-solid fa-minus"
                            onClick={() => num > 1 && setNum(num - 1)}
                        ></i>
                        <p>{num}</p>
                        <i 
                            className="fa-solid fa-plus"
                            onClick={() => setNum(num + 1)}
                        ></i>
                    </div>
                    <button onClick={addCart}>Thêm vào giỏ hàng</button>
                    <button onClick={gotoCart}>Thanh Toán</button>
                </div>
            </div>

            <div className='border'></div>

            <div className='product-detail__row flex'>
                <div className='info'>
                    <h4>Thông tin</h4>
                    {/* Textarea */}
                    <p>{product && product.info}</p>
                </div>
                <div className='story'>
                    <h4>Câu chuyện</h4>
                    {/* Textarea */}
                    <p>{product && product.story}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail