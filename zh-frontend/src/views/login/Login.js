import React from 'react';
import './Login.css';

export const Login = () => {

    return (
        <div className="login">
            <form>
                <div className="field">
                    <input type="email"  className="input" placeholder=" " autocomplete="off"/>
                    <label for="email" className="label">Email</label>
                </div>

                <div className="field">
                    <input type="password" className="input" placeholder=" "/>
                    <label for="password" className="label">Password</label>
                </div>

                <input type="submit" value="Log In" className="btn btn-background-slide" />
            </form>
            
        </div>
    );
}