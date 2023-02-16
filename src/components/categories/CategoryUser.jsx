import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import AddCategory from './AddCategory'


const CategoriesUser = (props) => {


    return (
        <div>
            <NavBar />
            <button className='btn btn-success btn-sm mb-5' style={{backgroundColor: '#60954E'}} >Add a category</button>
        </div>
    )
}

export default CategoriesUser