import React from 'react'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{width: '100vw', height: '100vh',}}>

            <div>
            <div className='mb-5'>
                <img src="grocerBud.png" alt="GrocerBud Logo" />
            </div>
            
            <div className='mb-3'>
                <Link to="/login">
                    <button className='btn btn-light btn-bg' style={{backgroundColor: '#A6D48F', width: '200px'}}>Login</button>
                </Link>
            </div>
            
            <div>
                <Link to="/signup">
                    <button className='btn btn-light btn-bg' style={{backgroundColor: '#A6D48F', width: '200px'}}>Sign up</button>
                </Link>
            </div>

            </div>
            

            
        </div>

        
    )
}

export default Home