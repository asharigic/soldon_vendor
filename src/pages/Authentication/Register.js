import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import CommonModal from '../../components/Common/CommonModal';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/images/QUENCHED-02-01-100x33.png'
const Register = props => {
  //meta title
  document.title = "Register | Quench";
  const { registrationError, user, success, loading } = useSelector((state) => state.Registration);

  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1);
  const validation = useFormik({

    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your User Name"),
      password: Yup.string().min(8, "The password field must be at least 8 characters.").required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
      toggleModal1()
    }
  });

  if (loading) {
    console.log(user && user, "user")
    console.log(registrationError && registrationError, "registrationError")
    console.log(success, "success")
    console.log(loading, "loging")
  }


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">

        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>

                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="text-center mt-4">
                    {/* <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light "> */}

                    <h1 className="heading">Sign Up</h1>
                    {/* <img src={logo} width={100} /> */}
                    {/* </span>
                      </div>
                    </Link> */}
                  </div>
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">

                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >

                      <div className="mb-3">
                        <Label className="form-label">First Name <span className="errorsymbol" style={{ color: "red" }}>*</span></Label>
                        <Input
                          name="firstname"
                          type="text"
                          placeholder="Enter First Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ""}
                          invalid={
                            validation.touched.firstname && validation.errors.firstname ? true : false
                          }
                        />
                        {validation.touched.firstname && validation.errors.firstname ? (
                          <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Last Name <span className="errorsymbol" style={{ color: "red" }}>*</span></Label>
                        <Input
                          name="lastname"
                          type="text"
                          placeholder="Enter Last Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ""}
                          invalid={
                            validation.touched.lastname && validation.errors.lastname ? true : false
                          }
                        />
                        {validation.touched.lastname && validation.errors.lastname ? (
                          <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">User Name <span className="errorsymbol" style={{ color: "red" }}>*</span></Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter User Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Email <span className="errorsymbol" style={{ color: "red" }}>*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password <span className="errorsymbol" style={{ color: "red" }}>*</span></Label>
                        <div className="login-password position-relative">
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
                            className="btn btn-light p-0 start-100 position-absolute top-0 margin-start ms-n2 mt-1"
                            type="button"
                            id="password-addon"
                          >
                            {passwordShow ? <FaEye /> : <FaEyeSlash />}

                          </button>
                        </div>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>


                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "} <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>

              </div>
            </Col>
            {!loading &&
              <CommonModal
                isOpen={modal1}
                toggle={toggleModal1}
                title={success ? "Success" : "Alert"}
                message={success ? "Register User Successfully." : registrationError}
                redirectTo={success ? "/login" : toggleModal1}
                buttonText="Okay"
              />
            }
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
