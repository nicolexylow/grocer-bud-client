import { useState, useEffect } from 'react'
import NavBar from '../NavBar'
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
import { signInWithGoogle } from '../../config/firebase';
import {  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup   } from 'firebase/auth';
import { auth } from '../../config/firebase';


export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
    const provider = new GoogleAuthProvider();

    const onLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/categories")
            console.log(user);
        })
        .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    const signInWithGoogle = async () => {
        try {
          setLoading(true);
          await signInWithPopup(auth, provider);
          navigate("/categories");
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
        setLoading(false);
      };

    return (
        <div style={{width: '100vw', height: '100vh'}} className='d-flex justify-content-center align-items-center'>

        <div className='d-flex justify-content-center align-items-center flex-column'>
          <div>
            <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '50px'}}>
              Login to your account
            </h1>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>


          <form>
            <div>
              <div>
                <input onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className='mb-3'
                />
              </div>
              <div>
                <input onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className='mb-3'
                />
              </div>
            </div>
            <div>
              <button className='btn btn-light btn-sm mb-3' style={{backgroundColor: '#A6D48F', width: '190px'}} type="submit" onClick={onLogin} disabled={loading}>
                Login
              </button>
            </div>
            <div className="App">
                <button onClick={signInWithGoogle} className='btn btn-light btn-sm mb-5' style={{backgroundColor: '#A6D48F'}}>
                    Sign in with Google
                </button>
            </div>
              <div>
              <p className='mb-3'>Don't have an account? 
              <Link to="/signup">
                Sign up
              </Link></p>  
            </div>
          </form>

          <Link to='/'>
            <button className='btn btn-success btn-sm' style={{backgroundColor: '#60954E'}} >Back to Login / Signup</button>
          </Link>
          
        </div>
      </div>
    );
  };