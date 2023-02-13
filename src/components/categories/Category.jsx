import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'

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

    useEffect(() => {
        fetchData();
    }, [])

    if (categories.length === 0) {
        return ''
    }

    return (
        <div>
            {categories.map((category, i) => {
                return <div key={i}>{category.name}</div>
            })}
        </div>
    )
}

export default Category