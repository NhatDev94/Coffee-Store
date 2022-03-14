import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';

import './listProduct.scss'

function ListProduct(props) {
    const {param} = useParams()

    const products = useSelector(state => state.productReducer.products)
    
    const filterProducts = (filter) => {
        const data = products.filter(product => {
            return product.type.indexOf(filter) > -1
        })
        return data
    }

    const productsFilter = !param ? products : filterProducts(param)

    return (
        <div className='list-product'>
            <div className='filter flex'>
                <h4>{param ? param : 'Tấc cả sản phẩm'}</h4>
                <p>FIler</p>
            </div>
            <div className='list-product__content flex'>
                {
                    productsFilter && productsFilter.map((product, index) => {
                        return <ProductItem product={product} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default ListProduct