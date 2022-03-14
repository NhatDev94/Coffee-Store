import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './productItem.scss'

function ProductItem(props) {
    const {param} = useParams()

    let price = props.product && props.product.price

    const formatPrice = (price) => {
        if (!price) return
        return price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)
    }
    return (
        <div className='product-item'>
            <div className='product-item__img'>
                <Link to={`/products/${props.product.id}`} >
                    <img src={props.product.photoURL} />
                </Link>
            </div>
            <Link 
                className='product-item__name'
                to={`/products/${props.product.id}`}
            >{props.product.name}</Link>
            <p>{formatPrice(price)} đ</p>
        </div>
    )
}

export default ProductItem