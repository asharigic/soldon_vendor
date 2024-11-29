import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotificationsList } from '../../../store/vendor/notifications/actions';
import Spinners from '../../../components/Common/Spinner';

const NoticationsList = (props) => {
    document.title = "Notifications | Quench";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notifications, notificationserror, notificationsloading, notificationssuccess, notificationsupdate } = useSelector((state) => state.NotificationsData);
    const [isLoading, setLoading] = useState(notificationsloading);

    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login')
        }
        else {
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
                <div style={{ margin: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    {notifications?.data?.length > 0 ? (
                        notifications?.data?.map((notification) => (
                            <div
                                key={notification.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderBottom: "1px solid #eee",
                                    padding: "15px 10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <img
                                        src={notification.sent_by_image}
                                        alt={notification.sent_by_name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            marginRight: "15px",
                                        }}
                                    />
                                    <div>
                                        <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>{notification.sent_by_name}</h3>
                                        <p style={{ fontSize: "12px", color: "#888", margin: "5px 0" }}>{notification.sent_at}</p>
                                    </div>
                                </div>
                                <div style={{ fontSize: "14px", color: "#333" }}>
                                    <p>{notification.content}</p>
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
    )
}

export default NoticationsList;
