import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../config/firebase'
import { useNavigate, Link } from 'react-router-dom'

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

    useEffect(() => {
        fetchData();
    }, [])

    if (categories.length === 0) {
        return ''
    }

    return (

        <div>
            {categories.map((category, i) => {
                return <Link to={`/categories/${category.name.toLowerCase()}`} key={i}>

                    <button 
                    className="btn btn-success mb-5 py-5" 
                    style={{width: '60%', 
                    backgroundColor: '#A6D48F', 
                    color: 'black', 
                    fontWeight: 'bold', 
                    backgroundImage: `url(${category.imageURL})`, 
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                    }}>
                        <span className="px-4 py-2" style={{backgroundColor: '#A6D48F', borderRadius: '5px', border: '1px solid black'}}>{category.name}</span>
                    </button>
                    </Link>

                
            })}
        </div>

    )
}

export default Category
