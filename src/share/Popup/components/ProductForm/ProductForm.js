import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../../../../firebase/firebase';

import './productForm.scss'

function ProductForm(props) {
    const itemTarget = useSelector(state => state.popupReducer.itemTarget)

    const urlDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0PDg0NDQ0NDQ0NDQ8NDQ4NFhEWFhURExMYHSggGBolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBAUH/8QAMBABAQACAAIGCAcBAQAAAAAAAAECEQMEEiExQVJxFTJRYWKRobEFExQigZKi0XL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAADQ0GaNNAZo0oBOjSzQI0adDQOejTpo0Dno0vRoEaNLYCdGlMBg2sAAAAAAAAAAAAAAAAAAAAAayKBjRoDdEipATpulaboE6NLkNAjRpejQIZpemaBGmLsZYCBVTQZWNYAAAAAAAAAAAAAAAAAAAABFJioDWyEVAFSEipAZMVSNkVICZG6Xo0COizTthw7l1SW+UdOLyuWGPSuu3Wu2wHk0yx1sTYDlYyulibAc9JrpU0EJVUgAAAAAAAAAAAAAAAAAAAARcRF4gqKjIuA2RWMZHfg8HLL1cbff3fMESKmL28LkPHf4x/69Mxw4fZjd+7G2/MHi4XKZ5d2p7+p6ceUwx68rvz6ozPj8S+rhZ77La4ZY53rsyvnKD0Zc1hj1YzflNRWN/N4dl7bueV7nk/Ly8N+Vd+U3LZZdWey9oPBcU2PbzXBvStktl6+qb63C8HPwZf1oPNYmx1sRYDlU10sRkDlUrqAAAAAAAAAAAAAAAAAAAAAI6YucdMQXF4oi8Qev8AD5jc9ZSXc6t+17+Z5n8vUmPbOr2Pk8PKyyztllj6nN49PhzOd2sv47wOT4uWeWXSvdNTuis+a6Ns6O9X2uX4d25eUc+P6+XmD0fq/h+p+q+H6rnLY613+3byZTVs9lsB6f1Xw/Vl5v4fq8yuJhcdb75sHa858P1duX43T31a179vn16uQ7MvOfYHg4vrZed+7lXbi+tfO/dxoIrnXSudBzyRV5IoAAAAAAAAAAAAAAAAAAAAEdMXOOmILi8XOLgLj6n4fn0sLhe77V8qPVyXF6OePsv7b/IPXyWHRzzxvc48f18vN75w9Z3L24yXzj5/Mevl5g7Y8zlJrq8+9y2rluF07u+rO2+33PTxOWl7P2/YHPluFu7vZOz316eJw5lOvuVjjJJJ2RoPnc1h0curss3HbkOzLzn2bz+O8Zl7L9Kn8OvVl5wHh4vrXzv3csl8W/uy8793Ogioq7UZA55IXkgAAAAAAAAAAAAAAAAAAAACLiIqAuKiIqA6Sqlc5VSg+7yvE6eGN79avnHh5jDLp5axys32yVz5Tm/y5ZZuXr7dar0+kp4L/YDHmOJJqcPUnw5N/VcXwf5yPSM8H1PSM8F+YN/VcTwf5yZ+q4vg/wA5HpGeC/M9IzwfUE8Tj8TKWXDqvV6uTr+HY2TLcs652zTn6SngvzZ6Tngv9geHi392X/q/dztbnlu2+22otBlTk2poIqVVIAAAAAAAAAAAAAAAAAAAAEVEqBqpUNBcqtucqtguVUrnK3YOkrduezYOmzbn0i0FbZck7ZsG2stZtloFqaUBiWsAAAAAAAAAAAAAAAAAAAAAaxoDWAKakBcptICzaGgrZtIDdm07Ng3bGAAMArG1gAAAAAAAAAAAAAAAAAAAABsAaMAaMAUJAUJAUJAUJAaMAaMAbWAAAAAAAAAAAD//2Q=='
    const [previewImg, setPreviewImg] = useState(urlDefault)
    const [name, setName] = useState(itemTarget ? itemTarget.name : '')
    const [price, setPrice] = useState(itemTarget ? itemTarget.price : '')
    const [type, setType] = useState(itemTarget ? itemTarget.type : 'coffee')
    const [info, setInfo] = useState(itemTarget ? itemTarget.info : '')
    const [story, setStory] = useState(itemTarget ? itemTarget.story : '')
    const [toping, setToping] = useState('')
    const [topings, setTopings] = useState(itemTarget ? itemTarget.topings : [])
    const [file, setFile] = useState(null)
    const bg = {backgroundImage: `url(${itemTarget ? itemTarget.photoURL : previewImg})`}

    const dispatch = useDispatch()

    const uploadFile = (target) => {
        if (!target.files[0]) return
        const url = URL.createObjectURL(target.files[0])
        setPreviewImg(url)
        setFile(target.files[0])
    }
    
    const addToping = () => {
        if (toping.trim() === '' || topings.indexOf(toping) > -1) {
            setToping('')
            return
        }
        setTopings([...topings, toping])
        setToping('')
    }

    const deleteToping = (toping) => {
        const newTopings = topings && topings.filter(item => {
            return item !== toping
        })
        setTopings(newTopings)
    }

    const submit = async () => {
        if (!file) return
        await firebase.upload(file)
        const res = await firebase.getImgURL(file.name)
        const newProduct = {
            name: name,
            price: price,
            type: type,
            photoURL: res,
            topings: topings,
            info: info,
            story: story
        }

        if (itemTarget) {
            //edit
            newProduct.id = itemTarget.id
            firebase.updateProductToFirebase(newProduct)
            const res = await firebase.getProductsFromFirebase()
            dispatch({
                type: 'SET_PRODUCTS',
                payload: res
            })
        }

        if (!itemTarget) {
            // add
            firebase.addProductToFirebase(newProduct)
            const res = await firebase.getProductsFromFirebase()
            dispatch({
                type: 'SET_PRODUCTS',
                payload: res
            })
        }

        dispatch({
            type: 'HIDE_POPUP',
            payload: null
        })
    }

    const selectHandle = (value) => {
        setType(value)
    }

    const formatPrice = (price) => {
        if (!price) return
        return price.slice(0, price.length - 3) + '.' + price.slice(price.length - 3)
    }

    return (
        <div className='product-form'>
            <h4 className='product-form__title'>{props.title}</h4>
            <div className='product-form__content flex'>
                <div className='product-form__img'>
                    <label htmlFor='product-form__upload' style={bg}></label>
                    <input onInput={e => uploadFile(e.target)} id='product-form__upload' type='file' />

                </div>
                <div className='product-form__info'>
                    <input 
                        placeholder='Tên sản phẩm'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder='Giá'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <select value={type} onChange={(e) => selectHandle(e.target.value)}>
                        <option value='coffee' >Coffee</option>
                        <option value='tea' >Tea</option>
                        <option value='other' >Other</option>
                    </select>
                    <input 
                        placeholder='Toping' 
                        value={toping}
                        onChange={e => setToping(e.target.value)}
                        onKeyUp={e => e.code === 'Enter' && addToping()}
                    />
                    <div className='list-toping flex'>
                        {
                            topings && topings.map((toping, index) => {
                                return <span 
                                            key={index}
                                            onClick={() => deleteToping(toping)}
                                        >
                                            {toping}
                                        </span>
                            })
                        }
                    </div>
                    <textarea 
                        placeholder='Thông tin'
                         rows='3' 
                         value={info}
                        onChange={e => setInfo(e.target.value)}
                    />
                    <textarea 
                        placeholder='Câu chuyện' 
                        rows='3' 
                        value={story}
                        onChange={e => setStory(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={submit}>{itemTarget ? 'Update' : 'Add'}</button>
        </div>
    )
}

export default ProductForm