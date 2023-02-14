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
            <div>
                Nothing expired
            </div>
            
            {categories.map((category, i) => {
                return <p key={i}>{category.name}</p>
            })}

        </div>
    )
}

export default Category

loading, isloading