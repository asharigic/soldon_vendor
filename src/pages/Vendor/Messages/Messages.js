import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMessagesList, sendMessage } from '../../../store/vendor/messages/actions';
import { Breadcrumb, Container } from 'react-bootstrap';
import { Button, Card, Col, Dropdown, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import classnames from "classnames";
import Spinners from '../../../components/Common/Spinner';
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { map } from "lodash";
import EmojiPicker from 'emoji-picker-react';

const Messages = (props) => {
    document.title = "Messages | Quench";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { messages, messageserror, messagesloading, messagessuccess, messagesupdate } = useSelector((state) => state.MessagesData);
    const [isLoading, setLoading] = useState(messagesloading);
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [userName, setUserName] = useState(null);
    const [activeTab, setactiveTab] = useState("1");
    const [Chat_Box_Username, setChat_Box_Username] = useState("");
    const [currentParentId, setCurrentParentId] = useState(null);
    const [currentReceiverId, setCurrentReceiverId] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [messagesData, setMessagesData] = useState();
    const [search_Menu, setsearch_Menu] = useState(false);
    const [userID, setUserID] = useState(null);
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [emoji, setEmoji] = useState(false);
    const [curMessage, setCurMessage] = useState("");
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [userDetailID, setUserDetailID] = useState(null);
    const [emojiArray, setEmojiArray] = useState("");
    const [isdisable, setDisable] = useState(false);


    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {
            const obj = JSON.parse(localStorage.getItem("vendoruser"));
            setUserID(obj.id);
            setUserName(obj.username);
            setUserPhone(obj.user_profile.phonenumber);
            setUserEmail(obj.email);
            setUserProfileImage(`${process.env.REACT_APP_URL}` + obj.profile_image);

            dispatch(getMessagesList());
            setLoading(false);
        }
    }, [props.success]);

    // scroll simple bar
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.getScrollElement().scrollTop = scrollRef.current.getScrollElement().scrollHeight;
        }
    }, [messagesData]);

    useEffect(() => {
        if (messages?.data && messages?.data.length > 0) {
            const firstMessageItem = messages?.data[0];
            const parentMessageID = messages?.data?.find(message => message?.parent_msg_id === currentParentId);
            if (currentParentId && parentMessageID) {
                if (currentParentId == parentMessageID?.parent_msg_id) {
                    userChatOpen(parentMessageID);
                }
            } else {
                userChatOpen(firstMessageItem);
            }
        } else {
            userChatOpen(null);
            setMessagesData(null);
        }
    }, [messages]);

    const onEmojiClick = (event, emojiObject) => {
        setEmojiArray([...emojiArray, emojiObject.emoji]);
        setCurMessage(curMessage + event.emoji);
        setDisable(true)
    };

    const toggleTab = tab => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    //search recent user
    const searchUsers = () => {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("search-user");
        filter = input.value.toUpperCase();
        ul = document.getElementById("recent-list");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                // setSearchResultNotFound(false);
            } else {
                li[i].style.display = "none";
                // setSearchResultNotFound(true);
            }
        }
    };

    const toggleSearch = () => {
        setsearch_Menu(!search_Menu);
    };

    const toggleRefresh = () => {
        dispatch(getMessagesList());
    };

    //Use For Chat Box
    const userChatOpen = (chat) => {
        if (!chat) return;
        setChat_Box_Username(chat?.username || "");
        setCurrentParentId(chat?.parent_msg_id || "");
        setCurrentReceiverId(chat?.receiver_id || "");
        setCurrentSubject(chat?.subject || "");

        // Flatten and transform messages for the selected chat
        const flattenMessages = (messages) => {
            return messages.flatMap((msg) => [
                {
                    sender: msg.sender,
                    receiver: msg.receiver,
                    message: msg.message,
                    images: msg.images || null,
                    timing: msg.timing || "Unknown time",
                },
                ...(msg.sub_messages ? flattenMessages(msg.sub_messages) : []),
            ]);
        };

        // Prepare new transformed messagesData
        const transformedMessagesData = [
            {
                sender: chat.username,
                user_email: chat.user_email,
                user_phone: chat.user_phone,
                sender_profileimage: chat.profileimage,
                usermessages: flattenMessages(chat.messages[0].sub_messages || []),
            },
        ];

        // Update messagesData state
        setMessagesData(transformedMessagesData);
    };

    const addMessage = () => {
        if (curMessage !== "" || selectedImage !== null) {
            const newMessage = {
                receiver: currentReceiverId,
                subject: currentSubject,
                message: curMessage,
                parent_msg_id: currentParentId
            };
            dispatch(sendMessage(newMessage));
            if (messagessuccess) {
                dispatch(getMessagesList());
            }
            setCurMessage("");
            setDisable(false)
            setEmoji(false);
            setSelectedImage(null)
        }
    };

    const onKeyPress = (e) => {
        const { key, value } = e;
        if (key === "Enter") {
            setCurMessage(value);
            setDisable(true)
            addMessage();
        }
    };

    // search
    const handelSearch = () => {
        const searchInput = document.getElementById("searchMessage");
        const searchFilter = searchInput.value.toUpperCase();
        const searchUL = document.getElementById("users-conversation")
        const searchLI = searchUL.getElementsByTagName("li");

        Array.prototype.forEach.call(searchLI, (search) => {
            const a = search.getElementsByTagName("p")[0] || '';
            const txtValue = a.textContent || a.innerText || '';

            if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
                search.style.display = "";
            } else {
                search.style.display = "none";
            }
        });
    };



    const handleUserDetailClick = (id) => {
        setUserDetailID(id);
        setShowUserDetail(prevState => !prevState);
    };

    return (
        <Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumb title="Admin" breadcrumbItem="Messages" />
                    <Row style={{ margin: "auto" }}>
                        <Col lg="12">
                            <div className="d-lg-flex g-5">
                                <div className="col-lg-4 chat-leftsidebar" style={{ marginRight: "20px" }}>
                                    <div >
                                        <div className="py-4 border-bottom">
                                            <div className="d-flex">
                                                {userProfileImage == "" ? (
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
                                                            {userName?.charAt(0).toUpperCase() || ""}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="align-self-center me-3">
                                                        <img
                                                            src={userProfileImage}
                                                            style={{
                                                                width: "60px",
                                                                height: "60px",
                                                                borderRadius: "50%",
                                                                marginRight: "15px",
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-15 mt-0 mb-1">{userName}</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="search-box chat-search-box py-4">
                                            <div className="position-relative">
                                                <Input
                                                    onKeyUp={searchUsers}
                                                    id="search-user"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                />
                                                <i className="bx bx-search-alt search-icon" />
                                            </div>
                                        </div>

                                        <div className="chat-leftsidebar-nav position-relative">
                                            <Nav pills justified>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: activeTab === "1",
                                                        })}
                                                        onClick={() => {
                                                            toggleTab("1");
                                                        }}
                                                    >
                                                        <i className="bx bx-chat font-size-20 d-sm-none" />
                                                        <span className="d-none d-sm-block">Chat</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>

                                            <TabContent activeTab={activeTab} className="py-4">
                                                <TabPane tabId="1">
                                                    <div>
                                                        <h5 className="font-size-14 mb-3">Recent</h5>
                                                        {messages?.data?.length > 0 ? (
                                                            <ul className="list-unstyled chat-list" id="recent-list">
                                                                {isLoading ? <Spinners setLoading={setLoading} /> :
                                                                    <SimpleBar style={{ maxHeight: "410px" }}>
                                                                        {map(messages && messages?.data, chat => (
                                                                            <li
                                                                                key={chat.id + chat.status}
                                                                                className={currentParentId === chat.parent_msg_id ? "active" : ""}
                                                                            >
                                                                                <Link
                                                                                    to="#"
                                                                                    onClick={() => {
                                                                                        userChatOpen(chat);
                                                                                    }}
                                                                                >
                                                                                    <div className="d-flex">
                                                                                        {chat?.profileimage == "" ?
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
                                                                                                    {chat.username?.charAt(0).toUpperCase() || ""}
                                                                                                </span>
                                                                                            </div>
                                                                                            :
                                                                                            <div className="align-self-center me-3">
                                                                                                <img
                                                                                                    src={chat.profileimage}
                                                                                                    style={{
                                                                                                        width: "50px",
                                                                                                        height: "50px",
                                                                                                        borderRadius: "50%",
                                                                                                        marginRight: "15px",
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        }
                                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                                            <h4 style={{ fontSize: "16px", margin: 0 }}>{chat?.username?.charAt(0).toUpperCase() + chat?.username?.slice(1)}</h4>
                                                                                            <p style={{ fontSize: "12px", color: "#888", margin: "5px 0" }}>{chat.timing}</p>
                                                                                            <span>{chat.subject}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </SimpleBar>
                                                                }
                                                            </ul>) : (
                                                            <ul className="list-unstyled chat-list" id="recent-list">
                                                                No Records Found.
                                                            </ul>
                                                        )}
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8 user-chat">
                                    <Card>
                                        <div className="p-4 border-bottom ">
                                            <Row>
                                                <Col md="4" xs="9">
                                                    <h5 className="font-size-15 mb-1">{Chat_Box_Username?.charAt(0).toUpperCase() + Chat_Box_Username?.slice(1)}</h5>
                                                </Col>
                                                <Col md="8" xs="3">
                                                    <ul className="list-inline user-chat-nav text-end mb-0">
                                                        <li className="list-inline-item d-none d-sm-inline-block">
                                                            <Dropdown
                                                                className="me-1"
                                                                toggle={toggleRefresh}
                                                            >
                                                                <DropdownToggle className="btn nav-btn" tag="a">
                                                                    {messagesloading ? 
                                                                        <i className="bx bx-loader bx-spin" /> 
                                                                        : 
                                                                        <i className="bx bx-revision" />
                                                                    }
                                                                </DropdownToggle>
                                                            </Dropdown>
                                                        </li>
                                                        <li className="list-inline-item d-none d-sm-inline-block">
                                                            <Dropdown
                                                                className="me-1"
                                                                isOpen={search_Menu}
                                                                toggle={toggleSearch}
                                                            >
                                                                <DropdownToggle className="btn nav-btn" tag="a">
                                                                    <i className="bx bx-search-alt-2" />
                                                                </DropdownToggle>
                                                                <DropdownMenu
                                                                    className="dropdown-menu-md"
                                                                >
                                                                    <Form className="p-3">
                                                                        <FormGroup className="m-0">
                                                                            <InputGroup>
                                                                                <Input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="searchMessage"
                                                                                    placeholder="Search ..."
                                                                                    aria-label="Recipient's username"
                                                                                    onChange={handelSearch}
                                                                                />
                                                                                <Button color="primary" type="submit">
                                                                                    <i className="mdi mdi-magnify" />
                                                                                </Button>
                                                                            </InputGroup>
                                                                        </FormGroup>
                                                                    </Form>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div>
                                            <div className="chat-conversation p-3">
                                                <SimpleBar ref={scrollRef} style={{ height: "300px", width: "100%" }}>
                                                    {isLoading ? (
                                                        <Spinners setLoading={setLoading} />
                                                    ) : (
                                                        <ul className="list-unstyled mb-0" id="users-conversation">
                                                            {messagesData &&
                                                                messagesData?.map((message, msgIndex) =>
                                                                    message.usermessages.map((userMsg, index) => {
                                                                        const isSender = userMsg.receiver === userID;
                                                                        return (
                                                                            <li
                                                                                key={`msg-${msgIndex}-user-${index}`}
                                                                                style={{
                                                                                    display: "flex",
                                                                                    justifyContent: isSender ? "flex-start" : "flex-end",
                                                                                    marginBottom: "10px",
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    className="conversation-list"
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        flexDirection: "column",
                                                                                        maxWidth: "70%",
                                                                                        backgroundColor: "#f0f0f0",
                                                                                        padding: "10px",
                                                                                        borderRadius: "10px",
                                                                                        color: "black",
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        className="ctext-wrap"
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            flexDirection: "column",
                                                                                        }}
                                                                                    >
                                                                                        <div
                                                                                            className="conversation-name"
                                                                                            onClick={() =>
                                                                                                handleUserDetailClick(
                                                                                                    isSender ? userMsg.sender : userID
                                                                                                )}
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                                fontWeight: "bold",
                                                                                            }}
                                                                                        >
                                                                                            {userMsg.receiver === userID ? message.sender : "You"}
                                                                                        </div>
                                                                                        <p>{userMsg.message}</p>
                                                                                        {userMsg.images && (
                                                                                            <img src={userMsg.images} alt="" width="150px" />
                                                                                        )}
                                                                                        {userMsg.timing !== "Unknown time" && (
                                                                                            <p className="chat-time mb-0" style={{ fontSize: "12px", color: "#888" }}>
                                                                                                <i className="bx bx-time-five align-middle me-1"></i>
                                                                                                {userMsg.timing}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>

                                                                                    {/* User Details Modal/Popup */}
                                                                                    <Modal isOpen={showUserDetail}
                                                                                        role="dialog"
                                                                                        autoFocus={true} c
                                                                                        entered data-toggle="modal"
                                                                                        style={{
                                                                                            maxWidth: '300px',
                                                                                        }}
                                                                                        toggle={() => { setShowUserDetail(!showUserDetail); }}
                                                                                    >
                                                                                        <div>
                                                                                            <ModalHeader className="border-bottom-0" toggle={() => { setShowUserDetail(!showUserDetail); }}></ModalHeader>
                                                                                        </div>
                                                                                        <ModalBody>
                                                                                            <div className="text-center mb-4">
                                                                                                <div className="avatar-md mx-auto mb-4">
                                                                                                    {userDetailID === userID ? (
                                                                                                        <img src={userProfileImage} className="avatar-title bg-light  rounded-circle text-primary h1" alt="" style={{ height: "40%", width: "40%",borderRadius: "50%" }} />
                                                                                                    ) : (
                                                                                                        message?.sender_profileimage === "" ? (
                                                                                                        <div className="avatar-title bg-light  rounded-circle text-primary h1">
                                                                                                            <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                                                                {message?.sender?.charAt(0).toUpperCase() || ""}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        <img src={message?.sender_profileimage} className="avatar-title bg-light  rounded-circle text-primary h1" alt="" style={{ height: "40%", width: "40%",borderRadius: "50%" }} />
                                                                                                    ))
                                                                                                    }
                                                                                                </div>

                                                                                                <Row className="justify-content-center">
                                                                                                    <Col xl={10}>
                                                                                                        <h3 className="text-primary">{userDetailID === userID ? userName : message.sender}</h3>
                                                                                                        <h6 className="text-secondary">{userDetailID === userID ? userPhone : message?.user_phone}</h6>
                                                                                                        <h6 className="text-secondary">{userDetailID === userID ? userEmail : message?.user_email}</h6>
                                                                                                        <p className="text-muted font-size-14 mb-4">
                                                                                                        </p>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </div>
                                                                                        </ModalBody>
                                                                                    </Modal>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })
                                                                )}
                                                        </ul>
                                                    )}
                                                </SimpleBar>
                                            </div>


                                            {selectedImage &&
                                                <div className="replymessage-block mb-0 d-flex align-items-start">
                                                    <div className="flex-grow-1">
                                                        <img src={selectedImage} alt="select img" style={{ width: "150px", height: "auto" }} />
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <button type="button" id="close_toggle" className="btn btn-sm btn-link mt-n2 me-n3 fs-18" onClick={() => setSelectedImage(null)}>
                                                            <i className="bx bx-x align-middle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            }

                                            {/* {copyMsgAlert && <UncontrolledAlert color='warning' role="alert">  Message copied</UncontrolledAlert>} */}
                                            {emoji && <EmojiPicker onEmojiClick={onEmojiClick} width={250} height={382} />}

                                            <div className="p-3 chat-input-section">
                                                <Row>
                                                    <Col>
                                                        <div className="position-relative">
                                                            <input
                                                                type="text"
                                                                value={curMessage}
                                                                onKeyPress={onKeyPress}
                                                                onChange={e => { setCurMessage(e.target.value); setDisable(true) }}
                                                                className="form-control chat-input"
                                                                placeholder="Enter Message..."
                                                            />
                                                            <div className="chat-input-links">
                                                                <ul className="list-inline mb-0">
                                                                    <li className="list-inline-item" onClick={() => setEmoji(!emoji)}>
                                                                        <Link to="#">
                                                                            <i className="mdi mdi-emoticon-happy-outline me-1" id="Emojitooltip" />
                                                                            <UncontrolledTooltip
                                                                                placement="top"
                                                                                target="Emojitooltip"
                                                                            >
                                                                                Emojis
                                                                            </UncontrolledTooltip>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col className="col-auto">
                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            disabled={!isdisable}
                                                            onClick={() => addMessage()}
                                                            className="btn btn-primary btn-rounded chat-send w-md "
                                                        >
                                                            <span className="d-none d-sm-inline-block me-2">
                                                                Send
                                                            </span>{" "}
                                                            <i className="mdi mdi-send" />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row >
                </Container>
            </div>
        </Fragment>
    );
};

export default Messages;
