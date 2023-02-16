import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../../contexts/AuthContext';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore"; 

export default function Signup () {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setErrorMessage('Passwords does not match')
        }
      }
      return isValid
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        
        
        if(validatePassword()) {
        try {
          setLoading(true);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user;

        await updateProfile(user, {
          displayName: displayName
        });

            navigate("/categories")

            await addDoc(collection(db, "users"), {
              userId: user.uid,
              displayName,
              authProvider: "local",
              email
          });

          }
        

          catch (error) {
              const errorMessage = error.message;
              setErrorMessage(errorMessage);
          };

          setLoading(false);
      }}
    
    return (
      <div style={{width: '100vw', height: '100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <div>
            <h1 style={{fontSize: '28px', marginTop: '0', marginBottom: '50px'}}>
              Create an account
            </h1>
          </div>
          <div>{errorMessage}</div>
          <form onSubmit={onSubmit}>
            <div>
            <div>
                <input className='mb-3' onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Username"
                />
              </div>
              <div>
                <input className='mb-3' onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <input className='mb-3' onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
              </div>
              <div>
                <input className='mb-3' onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button className='btn btn-light btn-sm px-5 mb-5' style={{backgroundColor: '#A6D48F', width: '190px'}} type="submit" disabled={loading}>
                Sign up
              </button>
            </div>
            <div>
              <div>
              <p className='mb-3'>Already have an account?
                <Link to="/login">
                    Login
                </Link></p>
                
              </div>
            </div>
          </form>

          <Link to='/'>
            <button className='btn btn-success btn-sm' style={{backgroundColor: '#60954E'}} >Back to Login / Signup</button>
          </Link>
        </div>
      </div>
    );
  }