import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import AddCategory from './AddCategory'
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";

const Categories = () => {

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    return (
        <div>
            <NavBar />
            <AddCategory />
        </div>
    )
}

export default Categories