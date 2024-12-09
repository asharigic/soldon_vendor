import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation with React Router
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from '../../store/actions';
import logo from '../../assets/images/logo.png';
import { Dropdown, ModalFooter } from 'react-bootstrap';

import './Header.css'
const Header = () => {
    const [ModalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    var userDetails = JSON.parse(localStorage.getItem('vendoruser'))
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const toggle1 = () => setModalShow(!ModalShow);
    const handlelogout = () => {

        localStorage.removeItem("vendoruser")
        localStorage.removeItem("vendorusertoken")
        dispatch(logoutUser());
        setModalShow(false)
        navigate("/")
        window.location.reload();
    }
    return (
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
                        <Link to="/notifications">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/messages">Messages</Link>
                    </li>
                    <li>
                        <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                        <Link to="/favourites">Favourites</Link>
                    </li>
                    <li>
                        <Link to="/buying-list">Buying</Link>
                    </li>
                    <li>
                        <Link to="/selling-list">Selling</Link>
                    </li>
                    <li>
                        <Link to="/reports">Reports</Link>
                    </li>
                    <li>
                        <Dropdown show={isOpen} onToggle={() => setIsOpen(!isOpen)}>
                            <Dropdown.Toggle as="li" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', padding: '10px' }}>
                                <span>{userDetails?.username}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate('/profile')}> <Link to="/profile">Profile</Link></Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/changepassword')}>Change Password</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/settings')}>Settings</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </nav>
            <Modal isOpen={ModalShow} toggle={toggle1} backdrop="static">
                <ModalHeader>Alert</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to logout?</p>
                </ModalBody>
                <ModalFooter>
                    <button onClick={() => handlelogout()} className='otp-button btn btn-primary dz-xs-flex m-r5'>
                        Okay
                    </button>
                    &nbsp;
                    <button onClick={() => setModalShow(false)} className='otp-button btn btn-secondary dz-xs-flex m-r5'>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        </header>
    );
};

export default Header;
