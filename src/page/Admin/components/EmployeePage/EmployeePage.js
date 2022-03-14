import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as firebase from '../../../../firebase/firebase'

function EmployeePage(props) {
    const employees = useSelector(state => state.employeeReducer.employees)
    const dispatch = useDispatch()

    useEffect(() => {
        const getEmployees = async () => {
            const res = await firebase.getEmployeesFromFirebase()
            dispatch({
                type: 'SET_EMPLOYEES',
                payload: res
            })
        }
        getEmployees()
    }, [])

    const showPoppup = () => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'add-employee'
        })
    }

    const updateHandle = item => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'edit-employee'
        })
        dispatch({
            type: 'SET_ITEM_TARGET',
            payload: item
        })
    }

    const deleteHandle = item => {
        dispatch({
            type: 'SHOW_POPUP',
            payload: 'delete-employee'
        })
        dispatch({
            type: 'SET_ITEM_TARGET',
            payload: item
        })
    }

    return (
        <div className=''>
            <h4>Danh sách Nhân Viên</h4>
            <div className='admin__control flex'>
                <p>Filter tuong lai</p>
                <button
                    className='button'
                    onClick={showPoppup}
                >Thêm Nhân Viên</button>
            </div>
            <div className='admin__list'>
                <table>
                    <tbody>
                        <tr className='flex'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                        {
                            employees && employees.map((item, index) => {
                                return <tr className={`${index % 2 === 0 ? 'flex' : 'flex bg'}`} key={index}>
                                    <td><p>{item.name}</p></td>
                                    <td><p>{item.email}</p></td>
                                    <td><p>{item.phone}</p></td>
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

export default EmployeePage