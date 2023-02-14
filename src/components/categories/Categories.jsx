import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import AddCategory from './AddCategory'
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";

const Categories = (props) => {


    return (
        <div>
            <NavBar />
            <AddCategory arr={props.arr} />
        </div>
    )
}

export default Categories
