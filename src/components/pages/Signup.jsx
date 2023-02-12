import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function Signup () {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()
        
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user);
              navigate("/categories")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
  
      
      }
    

    return (
      <div>
        <div>
          <div>
          <NavBar/>
            <h2>
              GrocerBud sign up
            </h2>
          </div>
          <form onSubmit={onSubmit}>
            <div>
            <div>
                <input onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Username"
                />
              </div>
              <div>
                <input onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
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
                />
              </div>
              <div>
                <input onChange={(e) => setConfirmPassword(e.target.value)}
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
              <button type="submit">
                Sign up
              </button>
            </div>
            <div>
              <div>
              <p>Already have an account?
                <Link to="/login">
                    Login
                </Link></p>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }