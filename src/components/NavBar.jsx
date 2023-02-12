import React from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    
        const navigate = useNavigate();
     
        const handleLogout = () => {               
            signOut(auth).then(() => {
            // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully")
            }).catch((error) => {
            // An error happened.
            });
        }
    
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/about'>
                About
            </NavLink>

            <NavLink to='/categories'>
                Categories
            </NavLink>

            <NavLink to='/grocery-list'>
                Grocery List
            </NavLink>

            <NavLink to='/login'>
                Login
            </NavLink>

            <NavLink to='/signup'>
                Sign Up
            </NavLink>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default NavBar