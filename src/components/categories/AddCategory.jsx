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

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/categories')
    }

    return (
        <div>
            <button className='btn btn-success btn-sm mb-5' style={{backgroundColor: '#60954E'}} onClick={handleClick}>Add a category</button>

            <div className='categories-container'>
                <Category />
                <Category arr={props.arr}/>
            </div>
        </div>
    )
}
export default AddCategory