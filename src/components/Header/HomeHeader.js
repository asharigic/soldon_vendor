import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation with React Router

import logo from '../../assets/images/logo.png';

import Header from './Header';
import './Header.css'
const HomeHeader = () => {
    const [AuthData, SetAuthData] = useState(true);
    useEffect(() => {
        
        if (!localStorage.getItem("vendoruser")) {
            SetAuthData(false)
        }
        else {
            SetAuthData(true)
        }
    })

    return (
        <>
            {
                AuthData === true ?
                    <Header />
                    :
                    <header className="header">
                        <nav className="navbar">
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} width={100} />

                                </Link>
                            </div>
                            <ul className="nav-links">
                            <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Sign Up</Link>
                                </li>




                            </ul>
                        </nav>

                    </header >
            }

        </>
    );
};

export default HomeHeader;
