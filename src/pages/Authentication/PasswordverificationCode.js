import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Label,
  Input,
  Row,
  Button,

} from "reactstrap"
import logo from "../../assets/images/QUENCHED-02-01-100x33.png";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../../components/Common/CommonModal";
import withRouter from "../../components/Common/withRouter";
import { verifyforgotcodePassword, userForgetPassword } from "../../store/actions";
import { useNavigate, Link } from "react-router-dom";
const PasswordverificationCode = (props) => {

  //meta title
  document.title = "Verification | Quench";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, forgetpasswordError, forgetpasswordSuccessMsg, verifyforgotcode } = useSelector((state) => state.ForgotData);

  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [OTP, setOTP] = useState(new Array(4).fill(""));
  const [countdown, setCountdown] = useState(() => {
    // Get the saved countdown from localStorage if it exists, otherwise default to 30
    const savedCountdown = localStorage.getItem('countdown');
    return savedCountdown ? parseInt(savedCountdown, 10) : 3 * 60;
  });
  const [isResendEnabled, setIsResendEnabled] = useState(false); // En
  const [Error, setError] = useState('');


  useEffect(() => {
    let interval;

    if (countdown > 0 && !isResendEnabled) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          // Save countdown to localStorage
          localStorage.setItem('countdown', newCountdown);
          return newCountdown;
        });
      }, 1000);
    } else if (countdown === 0) {
      setIsResendEnabled(true); // Enable resend when countdown reaches 0
      localStorage.removeItem('countdown'); // Clear countdown from localStorage when it's over
    }

    return () => clearInterval(interval); // Cleanup the interval when countdown changes
  }, [countdown, isResendEnabled]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  function handleChange(e, index) {
    const value = e.target.value;


    if (!/^\d*$/.test(value) || value.length > 1) return;

    // Update the OTP state
    const newOTP = [...OTP.map((data, indx) => (indx === index ? value : data))];
    setOTP(newOTP);

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

    if (OTP.every(val => val === "")) {
      setError('Please provide a valid OTP.')

    }
    else {

      let userdata = {

        "code": OTP.join("")
      }
      dispatch(verifyforgotcodePassword(userdata));
      toggleModal1()
    }


  }

  const resendOTP = async () => {
    if (isResendEnabled) {

      let userData = {
        "email": localStorage.getItem('emailverification')
      }

      dispatch(userForgetPassword(userData));
      toggleModal()
    } else {

      alert("Please wait before retrying.");
    }
  };


  const handleToggle = () => {
    console.log(forgetpasswordSuccessMsg, "for")
    if (verifyforgotcode) {
      console.log(verifyforgotcode, "verifycode")
      if (verifyforgotcode.status === true) {
        localStorage.setItem('verifycode', verifyforgotcode.code)
        localStorage.removeItem('countdown')
        navigate("/reset-password");
      }
    }
    toggleModal1();
  };

  const handleToggle1 = () => {
    setIsResendEnabled(false);
    setCountdown(3 * 60);
    localStorage.setItem('countdown', 3 * 60);;
    toggleModal();
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <div className="theme-dark-bg" >
                  <Row>

                  </Row>
                </div>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center mt-2">
                      <Link to="/" className="logo-light-element">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light ">
                            <img src={logo} width={100} />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 dark-icon-color"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p className="mb-5">
                          Please enter the 4 digit code sent to{" "}
                          <span className="fw-semibold">
                            {localStorage.getItem('emailverification')}
                          </span>
                        </p>

                        <Form>
                          <Row>

                            {OTP.map((digit, index) => (
                              <>
                                <Col className="col-3">

                                  <div className="mb-3">
                                    <Label htmlFor="digit1-input" className="visually-hidden">{index}</Label>

                                    <Input
                                      key={index}
                                      id={`otp-input-${index}`} // Unique ID for each input
                                      type="text"
                                      value={digit}
                                      onChange={(e) => handleChange(e, index)}
                                      onKeyDown={(e) => handleKeyDown(e, index)}
                                      maxLength={1}
                                      className="form-control form-control-lg text-center two-step"
                                    />
                                  </div>
                                </Col>
                              </>

                            ))}


                          </Row>
                          {
                            Error ?
                              <div
                                className="alert alert-danger text-center mb-4"
                                role="alert"
                              > Please provide a valid OTP. </div>
                              : ""
                          }

                        </Form>

                        <div className="mt-4">
                          <Button
                            onClick={() => verifyOTP()}
                            className="btn btn-success w-md"
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
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
            </Col>
          </Row>

        </Container>
        {/* verifycode.code */}

        {!loading &&
          < CommonModal
            isOpen={modal1}
            toggle={forgetpasswordSuccessMsg ? handleToggle : toggleModal1}
            title={forgetpasswordSuccessMsg ? "Success" : "Alert"}
            message={forgetpasswordSuccessMsg ? 'Code has been successfully verified.' : forgetpasswordError}
            redirectTo={forgetpasswordSuccessMsg ? () => "/reset-password" : toggleModal1}
            buttonText="Okay"
          />
        }

        {!loading &&
          < CommonModal
            isOpen={modal}
            toggle={handleToggle1}

            title={forgetpasswordSuccessMsg ? "Success" : "Alert"}
            message={forgetpasswordSuccessMsg ? 'We have emailed your password reset code.' : forgetpasswordError}
            redirectTo={forgetpasswordSuccessMsg ? "/verification-code" : toggleModal} // Different navigation for this page
            buttonText="Okay"
          />
        }
      </div>
    </React.Fragment >
  )
}
export default withRouter(PasswordverificationCode);
