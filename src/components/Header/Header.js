import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation with React Router
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from '../../store/actions';
import logo from '../../assets/images/logo.png'
import './Header.css'
const Header = () => {
    const [ModalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    // const history = useNavigate();

    const dispatch = useDispatch()
    const toggle1 = () => setModalShow(!ModalShow);
    const handlelogout = () => {

        localStorage.removeItem("vendoruser")
        localStorage.removeItem("vendorusertoken")
        dispatch(logoutUser());
        navigate("/")
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
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/notifications">Notifications</Link>
                    </li>
                    <li>
                        <Link onClick={() => setModalShow(true)}>Logout</Link>
                    </li>
                </ul>
            </nav>
            <Modal isOpen={ModalShow} toggle={toggle1} backdrop="static">
                <ModalHeader>Alert</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={() => handlelogout()} className='otp-button btn btn-primary dz-xs-flex m-r5'>
                        Save
                    </button>
                    <button onClick={() => setModalShow(false)} className='otp-button btn btn-primary dz-xs-flex m-r5'>
                        cancle
                    </button>
                </ModalBody>
            </Modal>
        </header>
    );
};

export default Header;
