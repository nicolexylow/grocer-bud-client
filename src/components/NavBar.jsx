import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

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

        useEffect(()=>{
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  const email = user.email;
                  // ...
                  console.log("uid", uid)
                  console.log('email', email)

                } else {
                  // User is signed out
                  // ...
                  console.log("user is logged out")
                }
              });
             
        }, [])

    const testEnd = 'hello'
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>
            
            <NavLink to='/grocery-list'>
                Grocery List
            </NavLink>

            <NavLink to='/stores'>
                Stores
            </NavLink>

            <NavLink to={'/categories/'}>
                Categories
            </NavLink>

            <NavLink to={'/items/'}>
                Items
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