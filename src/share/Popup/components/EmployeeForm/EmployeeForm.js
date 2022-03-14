import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../../../../firebase/firebase'

import './employeeForm.scss'

function EmployeeForm(props) {
    const itemTarget = useSelector(state => state.popupReducer.itemTarget)
    const employees = useSelector(state => state.employeeReducer.employees)

    const urlDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0PDg0NDQ0NDQ0NDQ8NDQ4NFhEWFhURExMYHSggGBolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBAUH/8QAMBABAQACAAIGCAcBAQAAAAAAAAECEQMEEiExQVJxFTJRYWKRobEFExQigZKi0XL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAADQ0GaNNAZo0oBOjSzQI0adDQOejTpo0Dno0vRoEaNLYCdGlMBg2sAAAAAAAAAAAAAAAAAAAAAayKBjRoDdEipATpulaboE6NLkNAjRpejQIZpemaBGmLsZYCBVTQZWNYAAAAAAAAAAAAAAAAAAAABFJioDWyEVAFSEipAZMVSNkVICZG6Xo0COizTthw7l1SW+UdOLyuWGPSuu3Wu2wHk0yx1sTYDlYyulibAc9JrpU0EJVUgAAAAAAAAAAAAAAAAAAAARcRF4gqKjIuA2RWMZHfg8HLL1cbff3fMESKmL28LkPHf4x/69Mxw4fZjd+7G2/MHi4XKZ5d2p7+p6ceUwx68rvz6ozPj8S+rhZ77La4ZY53rsyvnKD0Zc1hj1YzflNRWN/N4dl7bueV7nk/Ly8N+Vd+U3LZZdWey9oPBcU2PbzXBvStktl6+qb63C8HPwZf1oPNYmx1sRYDlU10sRkDlUrqAAAAAAAAAAAAAAAAAAAAAI6YucdMQXF4oi8Qev8AD5jc9ZSXc6t+17+Z5n8vUmPbOr2Pk8PKyyztllj6nN49PhzOd2sv47wOT4uWeWXSvdNTuis+a6Ns6O9X2uX4d25eUc+P6+XmD0fq/h+p+q+H6rnLY613+3byZTVs9lsB6f1Xw/Vl5v4fq8yuJhcdb75sHa858P1duX43T31a179vn16uQ7MvOfYHg4vrZed+7lXbi+tfO/dxoIrnXSudBzyRV5IoAAAAAAAAAAAAAAAAAAAAEdMXOOmILi8XOLgLj6n4fn0sLhe77V8qPVyXF6OePsv7b/IPXyWHRzzxvc48f18vN75w9Z3L24yXzj5/Mevl5g7Y8zlJrq8+9y2rluF07u+rO2+33PTxOWl7P2/YHPluFu7vZOz316eJw5lOvuVjjJJJ2RoPnc1h0curss3HbkOzLzn2bz+O8Zl7L9Kn8OvVl5wHh4vrXzv3csl8W/uy8793Ogioq7UZA55IXkgAAAAAAAAAAAAAAAAAAAACLiIqAuKiIqA6Sqlc5VSg+7yvE6eGN79avnHh5jDLp5axys32yVz5Tm/y5ZZuXr7dar0+kp4L/YDHmOJJqcPUnw5N/VcXwf5yPSM8H1PSM8F+YN/VcTwf5yZ+q4vg/wA5HpGeC/M9IzwfUE8Tj8TKWXDqvV6uTr+HY2TLcs652zTn6SngvzZ6Tngv9geHi392X/q/dztbnlu2+22otBlTk2poIqVVIAAAAAAAAAAAAAAAAAAAAEVEqBqpUNBcqtucqtguVUrnK3YOkrduezYOmzbn0i0FbZck7ZsG2stZtloFqaUBiWsAAAAAAAAAAAAAAAAAAAAAaxoDWAKakBcptICzaGgrZtIDdm07Ng3bGAAMArG1gAAAAAAAAAAAAAAAAAAAABsAaMAaMAUJAUJAUJAUJAaMAaMAbWAAAAAAAAAAAD//2Q=='
    const [previewImg, setPreviewImg] = useState(itemTarget ? itemTarget.photoURL : urlDefault)
    const [name, setName] = useState(itemTarget ? itemTarget.name : '')
    const [email, setEmail] = useState(itemTarget ? itemTarget.email : '')
    const [phone, setPhone] = useState(itemTarget ? itemTarget.phone : '')
    const [password, setPassword] = useState(itemTarget ? itemTarget.password : '')
    const [file, setFile] = useState(null)
    const bg = { backgroundImage: `url(${previewImg})`}

    const dispatch = useDispatch()

    const uploadFile = (target) => {
        if (!target.files[0]) return
        const url = URL.createObjectURL(target.files[0])
        setPreviewImg(url)
        setFile(target.files[0])
    }

    const submit = async () => {
        await firebase.upload(file)
        const res = file && await firebase.getImgURL(file.name)
        const newEmployee = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            photoURL: res,
        }
        if (itemTarget) {
            //edit
            newEmployee.id = itemTarget.id
            firebase.updateEmployeeInFirebase(newEmployee)
            const res = await firebase.getEmployeesFromFirebase()
            dispatch({
                type: 'SET_EMPLOYEES',
                payload: res
            })
        }

        if (!itemTarget) {
            // add
            firebase.addEmployeeToFirebase(newEmployee)
            const res = await firebase.getEmployeesFromFirebase()
            dispatch({
                type: 'SET_EMPLOYEES',
                payload: res
            })
        }

        dispatch({
            type: 'HIDE_POPUP',
            payload: null
        })
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
                        placeholder='Tên nhân viên'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        placeholder='Phone'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={submit}>{itemTarget ? 'Update' : 'Add'}</button>
        </div>
    )
}

export default EmployeeForm