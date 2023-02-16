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

            {!user ? ('') : (
                <div className='navbar navbar-dark mb-5 px-4' style={{backgroundColor: '#A6D48F'}}>

                <img src="grocerBud.png" alt="GrocerBud Logo" width={200} />
    
    
                <div>
                    {!user ? ('') : (<NavLink className='px-5' to='/categories' style={{color: 'black', textDecoration: 'none'}}> 
                        Home
                    </NavLink>)}
                    
                    <NavLink className='px-5' to='/grocery-list' style={{color: 'black', textDecoration: 'none'}}>
                        Grocery List
                    </NavLink>
        
                    <NavLink className='px-5' to='/stores' style={{color: 'black', textDecoration: 'none'}}>
                        Stores
                    </NavLink>
                </div>
                
                
                    
                
               <div>
                <span className='mx-3'>{name ? `${name}` : ''}</span>
                
                    
    
                    {user ? (
                        <button className='btn btn-success btn-sm' style={{backgroundColor: '#60954E'}} onClick={handleLogout}>Sign Out</button>
                            ) : (
                            ''
                            )}
               </div>
                
    
            </div>
            )}

        </div>

        
    )
}

export default NavBar