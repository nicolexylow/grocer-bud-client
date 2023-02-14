import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category';

const AddCategory = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/categories/new')
    }

    const fetchUserName = () => {

    }

    return (
        <div>
            <button className='btn btn-info mb-3' onClick={handleClick}>Add a category</button>

            <div className='categories-container'>
                <Category />
            </div>
        </div>
    )
}

export default AddCategory