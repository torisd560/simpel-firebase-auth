import React from 'react';
import initializeFirebaseAuthentication from '../../firebase/firebase.init';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

initializeFirebaseAuthentication()
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const yahooProvider = new OAuthProvider('yahoo.com');

const Login = () => {
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = getAuth()

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }
    const handleLogin = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
        if (password.length < 6) {
            setError('Password should be at least 6 characters')
            return;
        }
        if (!/(?=.*?[A-Z])/.test(password)) {
            setError('Password must have one uppercase')
            return;
        }
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user
                const userInfo = {
                    name: displayName,
                    email: email,
                    img: photoURL
                }
                setUser(userInfo)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user
                console.log(email)
                const userInfo = {
                    name: displayName,
                    email: email,
                    img: photoURL
                }
                setUser(userInfo)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user
                console.log(email)
                const userInfo = {
                    name: displayName,
                    email: email,
                    img: photoURL
                }
                setUser(userInfo)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSignInTwitter = () => {

    }
    const handleSignInYahoo = () => {
        signInWithPopup(auth, yahooProvider)
            .then(result => {
                console.log(result)
                const credential = OAuthProvider.credentialFromResult(result)
                console.log(credential)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result)
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3 className='text-center text-primary'>Please Login</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fas fa-envelope-square text-warning me-2"></i>Email</label>
                    <input onBlur={handleChangeEmail} type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><i className="fas fa-key text-warning me-2"></i>Password</label>
                    <input onBlur={handleChangePassword} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary me-3 px-4">Login</button>
                <button onClick={handleResetPassword} type="button" className="btn btn-secondary">Forgot Password</button>
                <p className='text-danger fw-bold text-center'>{error}</p>
            </form>
            <h5 className='text-center text-secondary mt-4'>------ Or Sign In With ------</h5>
            <button onClick={handleGoogleSignIn} type="button" className="btn btn-warning my-5 me-3"><i className="fab fa-google-plus-g fs-2 text-white me-2 px-4"></i></button>
            <button onClick={handleGithubSignIn} type="button" className="btn btn-secondary my-5 me-3"><i className="fab fa-github fs-2  me-2 px-4"></i></button>
            <button onClick={handleFacebookSignIn} type="button" className="btn btn-primary my-5 me-3"><i className="fab fa-facebook fs-2 text-white me-2 px-4"></i></button>
            <button onClick={handleSignInTwitter} type="button" className="btn btn-info my-5 me-3 "><i className="fab fa-twitter fs-2 text-white me-2 px-4"></i></button>
            <button onClick={handleSignInYahoo} type="button" className="btn btn-success my-5 "><i className="fab fa-yahoo fs-2 text-white me-2 px-4"></i></button>

            <h3>{user.name}</h3>
            <h5>{user.email}</h5>
            <img src={user.img} alt="" />
        </div>
    );
};

export default Login;