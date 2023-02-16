import React, { useState } from 'react'
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from '../../config/firebase'

const AddGrocery = (props) => {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')

    const handleClick = () => {
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // send to database
        sendData()
    }   

    const sendData = async () => {
        
        await addDoc(collection(db, "groceryList"), {
            name: name
        })
        props.onAdd()
    }

    return (
        <div>
            <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '20px'}}>Grocery List</h1>
            <button type='button' className='btn btn-success btn-sm mb-5' style={{backgroundColor: '#60954E'}} onClick={handleClick}>Add item</button>

            {showForm && (
                <form onSubmit={handleSubmit} className='mb-3'>
                    <label>
                        <input placeholder='Add item' onChange={(event) => {setName(event.target.value)}}/>
                    </label>

                    <button className='btn btn-success btn-sm' style={{backgroundColor: '#60954E'}}>Add</button>
                    <button type='button' className='btn btn-success btn-sm' style={{backgroundColor: '#60954E'}} onClick={handleCancel}>Cancel</button>
                </form>
            )}
        </div>
    )
}

export default AddGrocery