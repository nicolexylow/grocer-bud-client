import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import AddCategory from './AddCategory'
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";

const Categories = () => {


    return (
        <div>
            <NavBar />
            <AddCategory />
        </div>
    )
}

export default Categories
