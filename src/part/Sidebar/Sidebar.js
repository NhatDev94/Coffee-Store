import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import './sidebar.scss'

function Sidebar(props) {
    const {param} = useParams()

    const pathname = useLocation().pathname

    return (
        <div className='sidebar'>
            <h4 className='sidebar__title'>{props.title}</h4>
            <div className='sidebar__list'>
                {
                    props.sidebars && props.sidebars.map((item, index) => {
                        return <Link
                            to={item.to}
                            key={index}
                            className={pathname === item.to ? 'active' : ''}
                        >{item.type}</Link>
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar