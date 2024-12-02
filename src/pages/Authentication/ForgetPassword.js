import React, { useState } from "react";
import { Link } from "react-router-dom";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// import images
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/QUENCHED-02-01-100x33.png';
import { userForgetPassword } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../../components/Common/CommonModal";
const ForgotPassword = () => {

  //meta title
  document.title = "Forgot Password | Quench";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, forgetpasswordError, forgetpasswordSuccessMsg } = useSelector((state) => state.ForgotData);

  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values));
      toggleModal1()
    }
  });
  const handleToggle = () => {

    localStorage.setItem('emailverification', validation.values.email)
    navigate("/verification-code");
    toggleModal1();
  };
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">

                <div className="theme-dark-bg" >
                  <Row>

                  </Row>
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
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    > Enter your Email and instructions will be sent to you! </div>

                    <Form className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
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
                      <div className="text-end">
                        <button
                          className="btn btn-primary w-md "
                          type="submit"
                        >
                          Send
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link
                    to="/"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Sign In here
                  </Link>{" "}
                </p>

              </div>
            </Col>
          </Row>
        </Container>
        {!loading &&
          < CommonModal
            isOpen={modal1}
            // toggle={toggleModal1}
            toggle={forgetpasswordSuccessMsg ? handleToggle : toggleModal1}
            title={forgetpasswordSuccessMsg ? "Success" : "Alert"}
            message={forgetpasswordSuccessMsg ? 'We have emailed your password reset code.' : forgetpasswordError}
            redirectTo={forgetpasswordSuccessMsg ? "/verification-code" : toggleModal1} // Different navigation for this page
            buttonText="Okay"
          />
        }
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
