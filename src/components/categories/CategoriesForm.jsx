import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "../NavBar";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from '../../config/firebase'


const CategoriesForm = (props) => {
    const [data, setData] = useState('')
    const [name, setName] = useState('')
    const [imageURL, setImageURL] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        sendData()
        navigate('/categories')
    }

    const navigate = useNavigate()
    const handleCancel = () => {
        navigate('/categories')
    }

    const newDoc = async () => {
        await addDoc(collection(db, "categories"), {
            name: name,
            imageURL: imageURL
        })
    }

    const sendData = () => {
        props.add(name)

        const collectionId = name.toLowerCase();
        const documentId = "default";
        const value = { versionUsed: '' }; 
        setDoc(doc(db, collectionId, documentId), value); 

        // create a new doc
        newDoc()
    }
    

    return (
        <div>   
            <NavBar />
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