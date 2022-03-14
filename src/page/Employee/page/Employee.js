import React, { useEffect } from 'react';
import Header from '../../../part/Header/Header';
import Sidebar from '../../../part/Sidebar/Sidebar';
import * as firebase from '../../../firebase/firebase'

import './employee.scss'
import { useDispatch, useSelector } from 'react-redux';

function Employee(props) {
    const dispatch = useDispatch()
    const oders = useSelector(state => state.oderReducer.oders)

    useEffect(() => {
        const getOders = async () => {
            const res = await firebase.getOdersFromFirebase()
            console.log(res);
            dispatch({
                type: 'SET_ODERS',
                payload: res
            })
        }
        getOders()
    }, [])

    console.log(oders);
    const updateHandle = () => {

    }

    const deleteHandle = () => {

    }

    const formatTime = (time) => {
        const day = time.day < 10 ? `0${time.day}` : time.day
        const month = time.month < 10 ? `0${time.month}` : time.month
        return `${day}/${month}/${time.year}`
    }

    return (
        <div className='employee'>
            <div className='layout'>
                <div className='layout__header'>
                    <Header />
                </div>
                <div className='layout__main'>
                    <div className='filter'>

                    </div>
                    <div className='list-order'>
                        <table>
                            <tbody>
                                <tr className='flex'>
                                    <th>Time</th>
                                    <th>Name</th>
                                    <th>Ship</th>
                                    <th>Payment</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                                {
                                    oders && oders.map((item, index) => {
                                        return <tr className={`${index % 2 === 0 ? 'flex' : 'flex bg'}`} key={index}>
                                            <td>{formatTime(item.time)}</td>
                                            <td>{item.info.name}</td> 
                                            <td>{item.isShip ? 'Đã giao' : 'Chưa'}</td>
                                            <td>{item.isPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                            <td>{123}</td>
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
            </div>
        </div>
    )
}

export default Employee