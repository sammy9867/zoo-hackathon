import React, { useState } from 'react';
import axiosInstance from '../../../../utils/axios';
import { useAuthValue } from '../../../../context';
import {
    Redirect,
  } from 'react-router-dom'
import './style.css';

export const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken } = useAuthValue();
    const [redirect, setRedirect] = useState(token ? true : false)

    const handleLogin = (e) => {
        e.preventDefault();
        axiosInstance.post('/users/login', {
            email,
            password
        })
        .then(result => {
            setToken(result.data);
            setRedirect(true);
            console.log(token)
            
        })
        .catch(e => {
            console.log("err", e);
            setRedirect(false);
        })
    }

    return (
        redirect ? 
        <Redirect to='/forest' />
        : 
        <form onSubmit={handleLogin}>
            <div className="field">
                <input type="email"  className="input" placeholder=" " autoComplete="off"  onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="email" className="label" >Email</label>
            </div>

            <div className="field">
                <input type="password" className="input" placeholder=" " onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="password" className="label" >Password</label>
            </div>

            <input type="submit" value="Log In" className="btn btn-background-slide"
            />
        </form>
    );
}