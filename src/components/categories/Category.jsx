import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const [categories, setCategories] = useState([])

    const fetchData = async() => {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const arr = []
        querySnapshot.forEach((doc) => {
            
            arr.push(doc.data())
        });
        setCategories(arr)
    }

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/categories')
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (categories.length === 0) {
        return ''
    }

    return (
        <div>
            {categories.map((category, i) => {
                return <button type='button' className="btn btn-info mb-4 w-75 py-5" onClick={handleClick} key={i}>{category.name}</button>
            })}
        </div>
    )
}

export default Category