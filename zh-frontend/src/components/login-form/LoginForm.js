import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useAuthValue } from '../../context';
import './LoginForm.css';

export const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useAuthValue();

    const handleLogin = (e) => {
        e.preventDefault();
        axiosInstance.post('/users/login', {
            email,
            password
        })
        .then(result => {
            setToken(result.data);
        })
        .catch(e => {
            console.log("err", e);
        })
    }

    return (
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