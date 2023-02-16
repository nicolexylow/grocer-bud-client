import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import AddGrocery from './AddGrocery'

const Groceries = () => {
    const [groceries, setGroceries] = useState([])
    const [showItemForm, setShowItemForm] = useState(false)
    const [name, setName] = useState('')

    const fetchData = async() => {
        const querySnapshot = await getDocs(collection(db, "groceryList"));
        const arr = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            arr.push(data)
        });
        setGroceries(arr)
    }

    const deleteData = async (groceryId) => {
        await deleteDoc(doc(db, 'groceryList', groceryId))
    }

    const handleDelete = groceryId => event => {
        deleteData(groceryId)
        fetchData()
    }

    const editData = (groceryId) => {
        const docRef = doc(db, "groceryList", groceryId);
        const data = {
            name: name
        }
        updateDoc(docRef, data)
    }

    const handleEdit = (id) => {
        setShowItemForm(id)
    }

    const handleSubmit = groceryId => event => {
        event.preventDefault()

        editData(groceryId)
        fetchData()
        setShowItemForm(false)
    }

    const handleCancel = () => {
        setShowItemForm(false)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <AddGrocery onAdd={fetchData}/>

            <div className='d-flex justify-content-center'>
            <ul style={{padding: '0', width: '30%', border: '1px solid black', borderRadius: '10px'}} className='px-3'>
                {groceries.map((grocery, i) => {
                    return (
                    <>
                    
                        <li key={i} className='my-3 d-flex justify-content-between'>
                            <span className='mr-1'>
                                {grocery.name}
                            </span>

                            <div>
                                <button className='btn btn-light btn-sm' style={{backgroundColor: '#A6D48F'}} onClick={() => handleEdit(grocery.id)}>Edit</button>
                                <button className='btn btn-light btn-sm' style={{backgroundColor: '#A6D48F'}} onClick={handleDelete(grocery.id)}>Delete</button>
                            </div>
                        </li>

                        {showItemForm === grocery.id && (
                            <form onSubmit={handleSubmit(grocery.id)} className='d-flex justify-content-start'>
                                <label>
                                    <input placeholder={grocery.name} onChange={(event) => {setName(event.target.value)}}/>
                                </label>

                                <button className='btn btn-light btn-sm' style={{backgroundColor: '#A6D48F'}}>Confirm</button>
                                <button type='button' className='btn btn-light btn-sm' style={{backgroundColor: '#A6D48F'}} onClick={handleCancel}>Cancel</button>
                            </form>
                        )}
                    
                    </>
                )
                
            })}
            </ul>
            </div>
        </div>
        
    )
}

export default Groceries