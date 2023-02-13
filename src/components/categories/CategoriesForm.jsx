import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "../NavBar";


const CategoriesForm = () => {
    const [data, setData] = useState('')

    const fetchData = async() => {
        const response = await axios.get('http://numbersapi.com/random/trivia')
        setData(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        // send to database
    }

    const navigate = useNavigate()
    const handleCancel = () => {
        navigate('/categories')
    }

    return (
        <div>   
            <NavBar />
            <div>{data}</div>
            <h1>NEW CATEGORY</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input />
                </label>

                <label>
                    Image URL
                    <input />
                </label>

                <button>Create Category</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CategoriesForm