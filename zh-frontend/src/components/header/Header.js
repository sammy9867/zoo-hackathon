import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <span className="logo flex">
                <Link to="/">
                    <Logo />
                </Link>
            </span>
            <nav className="navbar">
                <ul className="nav-items">
                    <li className="flex">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="flex">
                        <Link to="/donate">
                            Donate
                        </Link>
                    </li>
                </ul>
             </nav>
        </header>
    );
}
