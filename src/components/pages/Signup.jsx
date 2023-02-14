import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function Signup () {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: displayName
        });

            navigate("/categories")
          }
          catch (error) {
              const errorMessage = error.message;
              setErrorMessage(errorMessage);
          };

          if (password !== confirmPassword) {
            return alert("Passwords do not match");
          }
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={onSubmit}>
            <div>
            <div>
                <input onChange={(e) => setDisplayName(e.target.value)}
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