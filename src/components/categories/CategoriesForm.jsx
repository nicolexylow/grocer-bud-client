import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "../NavBar";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firebase'


const CategoriesForm = () => {
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [imageURL, setImageURL] = useState('')

    const fetchData = async() => {
        const response = await axios.get('http://numbersapi.com/random/trivia')
        setData(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault()
        sendData()
        navigate('/categories')
    }

    const navigate = useNavigate()
    const handleCancel = () => {
        navigate('/categories')
    }

    const sendData = async () => {
        const docRef = await addDoc(collection(db, "categories"), {
            name: name,
            imageURL: imageURL
        })
    }
    

    return (
        <div>   
            <NavBar />
            <div>{data}</div>
            <h1>NEW CATEGORY</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input required onChange={(event) => {setName(event.target.value)}}/>
                </label>

                <label>
                    Image URL
                    <input required onChange={(event) => {setImageURL(event.target.value)}}/>
                </label>

                <button>Create Category</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CategoriesForm