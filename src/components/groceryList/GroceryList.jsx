import React from 'react'
import NavBar from '../NavBar'
import AddGrocery from './AddGrocery'
import Groceries from './Groceries'

const GroceryList = () => {
    return (
        <div>
            <NavBar />
            <AddGrocery />
            <Groceries />
        </div>
    )
}

export default GroceryList