import React from 'react';  
import './style.css';

export const ErrorView = () => {

    return (
        <div className="error">
            <h2 className="theme">Oops! Page not found.</h2>
            <h1 className="theme">404</h1>
            <h3 className="theme">Sorry, this page isn't available.</h3>
        </div>
    );

}