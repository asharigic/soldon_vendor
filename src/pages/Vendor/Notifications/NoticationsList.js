import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotificationsList } from '../../../store/vendor/notifications/actions';
import Spinners from '../../../components/Common/Spinner';

const NotificationsList = (props) => {
    document.title = "Notifications | Quench";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notifications, notificationsloading } = useSelector((state) => state.NotificationsData);
    const [isLoading, setLoading] = useState(notificationsloading);

    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {
            dispatch(getNotificationsList());
            setLoading(false);
        }
    }, [props.success]);

    return (
        <Fragment>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>Notifications</h1>
            {notificationsloading ? (
                <Spinners setLoading={setLoading} />
            ) : (
                <div className="container"
                    style={{
                        maxHeight: "500px", // Set your desired height
                        overflowY: "auto", // Enable vertical scroll
                        padding: "10px",
                        border: "1px solid #ddd", // Optional styling
                        borderRadius: "5px", // Optional styling
                        backgroundColor: "#fff", // Optional styling
                    }}
                >
                    {notifications?.data?.length > 0 ? (
                        notifications?.data?.map((notification) => (
                            <div
                                key={notification.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "15px 10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#f0efef",
                                    border: "1px solid black",
                                    borderRadius: "5px", // Optional styling
                                    maxHeight: "80px"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", height: "50px" }}>
                                    {notification.sent_by_image === "" ? (
                                        <div
                                            className="avatar-md rounded-circle img-thumbnail"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                backgroundColor: "var(--bs-primary-subtle)",
                                                color: "var(--bs-primary)",
                                                fontSize: "30px",
                                            }}
                                        >
                                            <span>
                                                {notification.sent_by_name?.charAt(0).toUpperCase() || ""}
                                            </span>
                                        </div>
                                    ) : (
                                        <img
                                            src={`${process.env.REACT_APP_URL}` + notification.sent_by_image}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%",
                                                marginRight: "15px",
                                                marginBottom: "5px"
                                            }}
                                        />
                                    )}
                                    <div style={{ marginLeft: "10px" }}>
                                        <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{notification.sent_by_name}</h3>
                                        <span style={{ fontSize: "12px", color: "#888", margin: "5px 0" }}>{notification.sent_at}</span><br />
                                        <span>{notification.content.replace(/<[^>]*>/g, "")}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: "center", fontSize: "14px", color: "#888" }}>
                            No notifications found.
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default NotificationsList;
