import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMessagesList } from '../../../store/vendor/messages/actions';

const Messages = (props) => {
    document.title = "Messages | Quench";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { messages, messageserror, messagesloading } = useSelector((state) => state.MessagesData);
    const [isLoading, setLoading] = useState(messagesloading);
    const loggedInUserId = 1; // Replace with dynamic user ID from authentication state

    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {
            dispatch(getMessagesList());
            setLoading(false);
        }
    }, [props.success]);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '600px',
        margin: '20px auto',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
        borderBottom: '1px solid #eee',
    };

    const profileImageStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    };

    const messageContainerStyle = (isSent) => ({
        display: 'flex',
        justifyContent: isSent ? 'flex-start' : 'flex-end',
        margin: '10px 0',
    });

    const messageStyle = (isSent) => ({
        maxWidth: '70%',
        padding: '10px',
        borderRadius: isSent ? '10px 0 10px 10px' : '0 10px 10px 10px',
        backgroundColor: isSent ? '#d1f7c4' : '#e9e9e9',
        color: '#333',
        fontSize: '14px',
        lineHeight: '1.5',
    });

    const renderMessages = () => {
        return messages?.data?.map((message, index) => (
            <Fragment key={index}>
                <div style={containerStyle}>
                    <div style={headerStyle}>
                        <img
                            src={message.profileimage}
                            alt="User"
                            style={profileImageStyle}
                        />
                        <div>
                            <h4>{message.username}</h4>
                            <p>{message.timing}</p>
                        </div>
                    </div>
                    {message.messages.map((msg, idx) => (
                        <div
                            key={idx}
                            style={messageContainerStyle(msg.sender === loggedInUserId)}
                        >
                            <div style={messageStyle(msg.sender === loggedInUserId)}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        ));
    };

    return (
        <Fragment>
            <div>
                {isLoading ? <p>Loading...</p> : renderMessages()}
            </div>
        </Fragment>
    );
};

export default Messages;
