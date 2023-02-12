import React from 'react'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <NavBar />
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Sign up</button>
                </Link>
        </div>
    )
}

export default Home