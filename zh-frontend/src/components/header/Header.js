import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
             <nav className="nav">
                <span className="logo">
                    <Link to="/">
                        <Logo/>
                    </Link>
                </span>
                <ul className="nav-items">
                    <li className="login">
                        <button className="login-button">LOGIN</button>
                    </li>
                </ul> 
             </nav>
        </header>
    );
}
