import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../config/firebase';

const AddCategory = (props) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/categories/new')
    }

    return (
        <div>
            <button className='btn btn-info mb-3' onClick={handleClick}>Add a category</button>

            <div className='categories-container'>
                <Category />
                <Category arr={props.arr}/>
            </div>
        </div>
    )
}
export default AddCategory