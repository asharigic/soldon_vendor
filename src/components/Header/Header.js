import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigation with React Router
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../store/actions';
import logo from '../../assets/images/logo.png';
import { Dropdown, ModalFooter } from 'react-bootstrap';
import { getMarkAsAllReadNotification, getNotificationsList, getUnreadNotificationCount } from '../../store/vendor/notifications/actions';
import './Header.css'
const Header = () => {
    const [ModalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    var userDetails = JSON.parse(localStorage.getItem('vendoruser'))
    // const { notifications, notificationsloading } = useSelector((state) => state.NotificationsData);
    const { unreadnotificationcount, notifications, markasallreadnotification, notificationsloading, errornotification, successnotification } = useSelector((state) => state.NotificationsData)
    const [isLoading, setLoading] = useState(notificationsloading);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const toggle1 = () => setModalShow(!ModalShow);
    useEffect(() => {
        if ((unreadnotificationcount && !unreadnotificationcount.length) || markasallreadnotification?.status === true) {
            dispatch(getUnreadNotificationCount());
        }
    }, [dispatch, markasallreadnotification]);
    useEffect(() => {
        if (notifications && !notifications.length) {
            dispatch(getNotificationsList());
        }
    }, [dispatch]);

    const handleMarkAsAllRead = () => {
        if (unreadnotificationcount?.count > 0) {
            dispatch(getMarkAsAllReadNotification());
        }
        // setMenu(!menu);
    };

    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {
            dispatch(getNotificationsList());
            setLoading(false);
        }
    }, []);

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
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/buying-list">Buying</Link>
                    </li>
                    <li>
                        <Link to="/selling-list">Selling</Link>
                    </li>
                    <li>
                        <Link to="/ticket-list">Tickets</Link>
                    </li>
                    <li>
                        <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                        <Link to="/reports">Reports</Link>
                    </li>
                    <li>
                        <Link to="/messages">Messages</Link>
                    </li>
                    <li
                        // onClick={() => {
                        //     handleMarkAsAllRead(),
                        //         navigate('/')
                        // }}
                        onClick={() => {
                            handleMarkAsAllRead();
                            navigate('/notifications');
                        }}
                    >
                        {unreadnotificationcount?.count > 0 ? <i className="bx bx-bell bx-tada h5 m-0" /> : <i className="bx bx-bell h5 m-0" />}
                        {unreadnotificationcount?.count > 0 &&
                            <span className="badge bg-danger rounded-pill">{unreadnotificationcount?.count}</span>}
                        
                    </li>
                    <li className='ms-0'>
                        <Dropdown show={isOpen} onToggle={() => setIsOpen(!isOpen)} >
                            <Dropdown.Toggle as="li" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', padding: '10px' }}>
                                <span>{userDetails?.username}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate('/profile')}> <Link to="/profile">Profile</Link></Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/changepassword')}>Change Password</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/wallet')}>Wallet</Dropdown.Item>
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
