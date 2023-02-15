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
        <div>
        <div>
          <div>
          <NavBar/>
            <h2>
              Login to your account
            </h2>
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
            </div>
            <div>
              <button type="submit" onClick={onLogin} disabled={loading}>
                Login
              </button>
            </div>
            <div className="App">
                <button onClick={signInWithGoogle}>
                    Sign in with Google
                </button>
            </div>
              <div>
              <p>Don't have an account?
              <Link to="/signup">
                Sign up
              </Link></p>  
            </div>
          </form>
        </div>
      </div>
    );
  };