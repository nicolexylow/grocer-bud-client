import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from '../NavBar'
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
            <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '30px'}}>New Category</h1>

            <form onSubmit={handleSubmit}>

                <div>
                <label>
                    <input className="mb-3" placeholder="Name" required onChange={(event) => {setName(event.target.value)}}/>
                </label>
                </div>
                
                <div>
                <label>
                    <input className="mb-3" placeholder='Image URL' required onChange={(event) => {setImageURL(event.target.value)}}/>
                </label>
                </div>
                

                <div>
                    <button className="btn btn-light btn-sm mb-4" style={{backgroundColor: '#A6D48F', width: '190px'}}>Create Category</button>
                </div>
                
                <button type="button" className="btn btn-success btn-sm" style={{backgroundColor: '#60954E'}} onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CategoriesForm