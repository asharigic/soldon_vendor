

import React, { useState } from "react";

import { Row, Col, CardBody, Card, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import CommonModal from "../../components/Common/CommonModal";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { resetforgotcodePassword } from "../../store/actions";

// import images

import logo from "../../assets/images/QUENCHED-02-01-100x33.png";

const ResetPassword = () => {

    const { loading, forgetpasswordError, forgetpasswordSuccessMsg, resetforgotcode } = useSelector((state) => state.ForgotData);

    //meta title
    document.title = "ResetPassword | Quench";

    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmpasswordshow, setconfirmpassword] = useState(false)
    const dispatch = useDispatch();


    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {

            password: "",
            password_confirmation: "",
            code: localStorage.getItem('verifycode'),

        },
        validationSchema: Yup.object({

            password: Yup.string().required("Please Enter Your Password"),
            password_confirmation: Yup.string().required("Please Enter Your Confirm Password"),
        }),
        onSubmit: (values) => {

            dispatch(resetforgotcodePassword(values));


            toggleModal1()
        }
    });

    if (resetforgotcode ? resetforgotcode.status === true : "") {
        localStorage.removeItem('verifycode')
        localStorage.removeItem('emailverification')
    }
    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden" >
                                <div className="theme-dark-bg" >

                                </div>
                                <CardBody className="pt-0">
                                    <div className="text-center mt-2">
                                        <Link to="/" className="logo-light-element">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light ">
                                                    <img src={logo} width={100} />
                                                </span>
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


                                            <div className="mb-3">

                                                <Label className="form-label">Password</Label>
                                                <div className="login-password position-relative">
                                                    <Input
                                                        name="password"
                                                        value={validation.values.password || ""}
                                                        type={passwordShow ? "text" : "password"}
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.password && validation.errors.password ? true : false
                                                        }
                                                    />
                                                    {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                    ) : null}
                                                    <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light p-0 start-100 position-absolute top-0 margin-start ms-n2 mt-1" type="button" id="password-addon">
                                                        {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="mb-3">

                                                <Label className="form-label">Confirm Password</Label>
                                                <div className="login-password position-relative">
                                                    <Input
                                                        name="password_confirmation"
                                                        value={validation.values.password_confirmation || ""}
                                                        type={confirmpasswordshow ? "text" : "password"}
                                                        placeholder="Enter Confirm Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.password_confirmation && validation.errors.password_confirmation ? true : false
                                                        }
                                                    />
                                                    {validation.touched.password_confirmation && validation.errors.password_confirmation ? (
                                                        <FormFeedback type="invalid">{validation.errors.password_confirmation}</FormFeedback>
                                                    ) : null}
                                                    <button onClick={() => setconfirmpassword(!confirmpasswordshow)} className="btn btn-light p-0 start-100 position-absolute top-0 margin-start ms-n2 mt-1" type="button" id="password-addon">

                                                        {confirmpasswordshow ? <FaEye /> : <FaEyeSlash />}
                                                    </button>
                                                </div>

                                            </div>


                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"

                                                >
                                                    Reset Password
                                                </button>
                                            </div>




                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
                {!loading &&
                    < CommonModal
                        isOpen={modal1}
                        toggle={toggleModal1}
                        title={forgetpasswordSuccessMsg ? "Success" : "Alert"}
                        message={forgetpasswordSuccessMsg ? 'Password has been successfully reset.' : forgetpasswordError}
                        redirectTo={forgetpasswordSuccessMsg ? "/" : toggleModal1} // Different navigation for this page
                        buttonText="Okay"
                    />
                }
            </div >
        </React.Fragment >
    );
};

export default ResetPassword;


