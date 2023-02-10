import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/categories'>
                Categories
            </NavLink>

            <NavLink to='/grocery-list'>
                Grocery List
            </NavLink>
        </div>
    )
}

export default NavBar