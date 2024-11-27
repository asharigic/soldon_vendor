
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// actions
import { loginUser } from "../../store/actions";

// import images

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo.png";

const Login = props => {

  //meta title
  document.title = "Login | Quench";
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.removeItem('verifycode')
        localStorage.removeItem('emailverification')
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      navigate('/dashboard')

    }
  }, [props.success]);
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
      dispatch(loginUser(values, props.router.navigate));
    }
  });
  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      error: login.error
    })
  );

  const {
    error
  } = useSelector(LoginProperties);
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden" >
                <div className="theme-dark-bg" >
                  <Row>
                    
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                         
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
                      {error ? <Alert color="danger">{error}</Alert> : null}

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
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />

                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>

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
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                          <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                            <i className={passwordShow ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"}></i>
                          </button>
                        </div>

                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={()=>  navigate('/register')}
                        >
                          Registration
                        </button>
                      </div>



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
      </div >
    </React.Fragment >
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
