import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Category from './Category';

const AddCategory = (props) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/categories/new')
    }

    return (
        <div>
            <button className='btn btn-info mb-3' onClick={handleClick}>Add a category</button>

            <div className='categories-container'>
                <Category arr={props.arr}/>
            </div>
        </div>
    )
}

export default AddCategory