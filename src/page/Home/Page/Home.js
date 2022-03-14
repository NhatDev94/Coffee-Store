import React from 'react';
import Header from '../../../part/Header/Header';
import Sidebar from '../../../part/Sidebar/Sidebar'
import './home.scss'
import { Outlet } from 'react-router-dom';

function Home(props) {

    const sidebars = [
        {
            type: 'all',
            to: '/'
        },
        {
            type: 'coffee',
            to: '/coffee'
        },
        {
            type: 'tea',
            to: '/tea'
        },
        {
            type: 'other',
            to: '/other'
        }
    ]

    return (
        <div className='home'>
            <div className='layout'>
                <div className='layout__header'>
                    <Header />
                </div>
                <div className='layout__main flex'>
                    <div className='layout__left'>
                        <Sidebar sidebars={sidebars} title="Menu" />
                    </div>
                    <div className='layout__right'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home