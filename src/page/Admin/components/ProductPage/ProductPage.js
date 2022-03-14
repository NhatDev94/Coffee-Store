import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../../../../firebase/firebase';

function ProductPage(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.products)

    useEffect(() => {
        const getProducts = async () => {
            const res = await firebase.getProductsFromFirebase()
            dispatch({
                type: 'SET_PRODUCTS',
                payload: res
            })
        }
        getProducts()
    }, [])

    const showPoppup = () => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'add-product'
        })
    }

    const updateHandle = item => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'edit-product'
        })
        dispatch({
            type: 'SET_ITEM_TARGET',
            payload: item
        })
    }

    const deleteHandle = item => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'delete-product'
        })
        dispatch({
            type: 'SET_ITEM_TARGET',
            payload: item
        })
    }

    const formatPrice = (price) => {
        if (!price) return
        return price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)
    }

    return (
        <div className=''>
            <h4>Danh sách Sản Phẩm</h4>
            <div className='admin__control flex'>
                <p>Filter tuong lai</p>
                <button
                    className='button'
                    onClick={showPoppup}
                >Thêm Sản Phẩm</button>
            </div>
            <div className='admin__list'>
                <table>
                    <tbody>
                        <tr className='flex'>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                        {
                            products && products.map((item, index) => {
                                return <tr className={`${index % 2 === 0 ? 'flex' : 'flex bg'}`} key={index}>
                                    <td>{item.name}</td>
                                    <td>{formatPrice(item.price)}</td>
                                    <td>{item.type}</td>
                                    <td className='flex'>
                                        <button
                                            className='update'
                                            onClick={() => updateHandle(item)}
                                        >Update</button>
                                        <button
                                            className='delete'
                                            onClick={() => deleteHandle(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductPage