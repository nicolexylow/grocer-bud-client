import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
    const [email, setName] = useState('');
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
     
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
                  const displayName = user.displayName;
                  const email = user.email;
                  // ...
                  console.log("name", displayName)
                  console.log('email', email)
                  setName(user.displayName);

                } else {
                  // User is signed out
                  // ...
                  console.log("user is logged out")
                  setName('');
                }
              });
        }, [])
          
            useEffect(() => {
              const unsubscribe = auth.onAuthStateChanged((user) => {
                setUser(user);
              });
              return () => unsubscribe();
            }, []);

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

            <NavLink to={'/categories'}>
                Categories
            </NavLink>

            <NavLink to={'/items/'}>
                Items
            </NavLink>
            {user ? ('') : (<NavLink to='/login'>
                    Login
                </NavLink>)} 
            {user ? ('') : (<NavLink to='/signup'>
                    Sign Up
                </NavLink>)} 
            {user ? (
                <button onClick={handleLogout}>Sign Out</button>
                    ) : (
                    ''
                    )}
                
            <p>
                {email ? `Welcome ${email}` : 'You are not logged in.'}
            </p>

        </div>
    )
}

export default NavBar