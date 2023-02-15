import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
    const [name, setName] = useState('');
    const [uid, setUid] = useState('');
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
                  const displayName = user.displayName;
                  const email = user.email;
                  const uid = user.uid;
                  setName(user.displayName);
                  setUid(user.uid)

                } else {
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
                {name ? `Welcome ${name}` : 'You are not logged in.'}
                {uid ? `Welcome ${uid}` : 'You are not logged in.'}
            </p>

        </div>
    )
}

export default NavBar