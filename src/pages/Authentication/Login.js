
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, verifycodePassword, resetcodePassword } from "../../store/actions";


const Login = props => {

  //meta title
  document.title = "Login | Quench";
  const { loginError, user, success, forgetError, verifycode, resetcode } = useSelector((state) => state.Login);

  const [ModalShow, setModalShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [countdown, setCountdown] = useState(3 * 60);
  const [OTP, setOTP] = useState(new Array(4).fill(""));
  const [username, setusername] = useState('');
  const [error, setError] = useState('');
  const [resendmodal, setresendModal] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [verifyModal, setverifyModal] = useState(false)
  const [userId, setUserId] = useState('');
  const toggle = () => setModalShow(!ModalShow);
  const toggle1 = () => setverifyModal(!verifyModal);
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("vendoruser")) {
      navigate('/dashboard')

    }
  }, [props.success]);
  useEffect(() => {
    let interval;

    if (countdown > 0 && !isResendEnabled) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          // Save countdown to localStorage

          return newCountdown;
        });
      }, 1000);
    } else if (countdown === 0) {
      setIsResendEnabled(true); // Enable resend when countdown reaches 0

    }

    return () => clearInterval(interval); // Cleanup the interval when countdown changes
  }, [countdown, isResendEnabled]);
  useEffect(() => {
    let timer;

    if (isResendEnabled && counter > 0) {
      timer = setInterval(() => {
        setCounter(prevCountdown => prevCountdown - 1);
      }, 1000);
    }
    else if (counter === 0) {
      // Stop counting when countdown reaches zero
      setIsResendEnabled(false);
    }

    // Clear interval on component unmount or when countdown ends
    return () => clearInterval(timer);
  }, [isResendEnabled, counter])
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
      "device_name": "web"
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Username"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));

      // toggle()



    }
  });

  function handleChange(e, index) {
    const value = e.target.value;

    // Allow only digits and ensure the input is not more than 1 character
    if (!/^\d*$/.test(value) || value.length > 1) return;

    // Update the OTP state
    const newOTP = [...OTP.map((data, indx) => (indx === index ? value : data))];
    setOTP(newOTP);
    // setOTP([...OTP.map((data, indx) => (indx === index ? e.target.value : data))]);
    if (value && index < OTP.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }
  const handleKeyDown = (e, index) => {
    // Focus the previous input if Backspace is pressed and the current input is empty
    if (e.key === 'Backspace' && !OTP[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const verifyOTP = async () => {
    try {
      if (OTP.every(val => val === "")) {
        setError('Please provide a valid OTP.')

      }
      else {

        let userdata = {

          "code": OTP.join(""),
          "user_id": userId,
          "device_name": "web"

        }
        dispatch(verifycodePassword(userdata));

        // toggleModal1()
      }

    } catch (error) {

      if (error.name === 'HTTPError') {
        const errorJson = await error.response.json();
        setError(errorJson.message)
      } else {
        setError("The provided credentials are incorrect.")
      }
    }

  }
  const resendOTP = async () => {
    if (isResendEnabled) {

      let userData = {
        "user_id": userId
      }

      dispatch(resetcodePassword(userData));
      setresendModal(true)
    } else {

      alert("Please wait before retrying.");
    }
  };
  useEffect(() => {
    // Show modal only if login is successful and no login error
    if (success === true && !loginError) {
      if (user?.user && user?.user?.vendor_setting?.is_2fa_enabled === "0") {
        setModalShow(false);
        localStorage.setItem('vendorusertoken', JSON.stringify(user.token));
        localStorage.setItem('vendoruser', JSON.stringify(user.user));
        navigate('/dashboard')
      }
      else {

        setusername(user.message);
        setUserId(user.user_id);
        setCounter(3 * 60); // Set countdown to 3 minutes 
        setCountdown(3 * 60);
        setModalShow(true); // Open modal on successful login
      }

    }
  }, [success, loginError, user]);
  useEffect(() => {

    if (verifycode === null || success === false) {

    }
    else {
      localStorage.setItem('vendorusertoken', JSON.stringify(verifycode.token));
      localStorage.setItem('vendoruser', JSON.stringify(verifycode.user));
      setModalShow(false)
      setverifyModal(true)
    }

  }, [verifycode]);
  const handleToggle1 = () => {
    setIsResendEnabled(false);
    setCountdown(3 * 60);

    setresendModal(false)

  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="theme-dark-bg">
                  <Row></Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light"></span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal login-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                 
                      {loginError && (
                       
                          < Alert color="danger" className="text-center">
                            These credentials do not match.
                          </Alert>
                      )}


                      {/* Username Field */}
                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter Username"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>

                      {/* Password Field */}
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <div className="login-password">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type={passwordShow ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password && validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                          <button
                            onClick={() => setPasswordShow(!passwordShow)}
                            className="btn btn-light"
                            type="button"
                            id="password-addon"
                          >
                            <i className={passwordShow ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"}></i>
                          </button>
                        </div>
                      </div>

                      {/* Login Button */}
                      <div className="mt-3 d-grid">
                        <button className="btn btn-primary btn-block" type="submit">
                          Log In
                        </button>
                      </div>

                      {/* Registration Button */}
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={() => navigate('/register')}
                        >
                          Registration
                        </button>
                      </div>

                      {/* Forgot Password Link */}
                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal for OTP Verification */}
      <Modal isOpen={ModalShow} toggle={toggle} backdrop="static">
        <ModalBody>
          <div className="modal-container otp-popup">
            <h1>OTP Verification</h1>
            <p>{username}</p>
            <div className="otp-input">
              {OTP.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`} // Unique ID for each input
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                />
              ))}
            </div>
            {
              !forgetError && error ?
                <div
                  className="alert alert-danger text-center mb-4"
                  role="alert"
                > Please provide a valid OTP. </div>
                : ""
            }
            {forgetError && (

              <Alert color="danger" className="text-center">
                {forgetError}
              </Alert>


            )}

            <button onClick={() => verifyOTP()} className='otp-button btn btn-primary dz-xs-flex m-r5'>
              Verify
            </button>
            <div className="resend-text">

              <p>
                Did&apos;t receive a code ?{" "}
                {
                  isResendEnabled ?
                    <a onClick={resendOTP}
                      disabled={isResendEnabled} className="fw-medium text-primary " >
                      {" "}
                      Resend OTP
                    </a>
                    :
                    <a onClick={resendOTP}
                      className="fw-medium text-primary " style={{ cursor: "default" }}>
                      {" "}
                      Resend OTP in {formatTime(countdown)}
                    </a>
                }


              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={verifyModal} toggle={toggle1} backdrop="static">
        <ModalHeader>Success</ModalHeader>
        <ModalBody>
          <p>Code has been successfully verified.</p>
          <button onClick={() => navigate('/dashboard')} className='otp-button btn btn-primary dz-xs-flex m-r5'>
            Okay
          </button>
        </ModalBody>
      </Modal>
      <Modal isOpen={resendmodal} toggle={toggle1} backdrop="static">
        <ModalHeader>Success</ModalHeader>
        <ModalBody>
          <p>{resetcode ? resetcode.message : ""}</p>
          <button onClick={() => handleToggle1()} className='otp-button btn btn-primary dz-xs-flex m-r5'>
            Okay
          </button>
        </ModalBody>
      </Modal>

    </React.Fragment >
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
