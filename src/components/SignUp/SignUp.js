import React from 'react';
import { useState } from 'react';
import initializeFirebaseAuthentication from '../../firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";


initializeFirebaseAuthentication()
const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = getAuth();


    const handleNameChange = e => {
        setName(e.target.value)
    }

    const setUserName = () => {
        updateProfile(auth.currentUser, { displayName: name })
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }
    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then( result => {
            console.log(result)
        })
    }

    const handleSignUp = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setUserName()
                verifyEmail() 
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

    return (
        <div className='text-secondary'>
            <form onSubmit={handleSignUp} >
                <h3 className='text-center text-primary'>Please Sign Up</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fas fa-user text-warning me-2"></i>Full Name</label>
                    <input onChange={handleNameChange} type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><i className="fas fa-envelope-square text-warning me-2"></i>Email</label>
                    <input onBlur={handleChangeEmail} type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><i className="fas fa-key text-warning me-2"></i>Password</label>
                    <input onBlur={handleChangePassword} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary me-3">Sign Up</button>
                <p className='text-danger fw-bold text-center'>{error}</p>
            </form>
        </div>
    );
};

export default SignUp;