import React, { Fragment, useState } from "react";

import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
// Formik validationType
import * as Yup from "yup";
import { useFormik } from "formik";
import CommonModal from "../../../components/Common/CommonModal";
import withRouter from "../../../components/Common/withRouter";
//Import Breadcrumb

import { changepassword } from "../../../store/vendor/profile/actions";
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = props => {

    //meta title
    document.title = "ChangePassword | Quench";
    const dispatch = useDispatch();
    const { profilesuccess, error, profileloading } = useSelector((state) => state.ProfileData);
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShow1, setPasswordShow1] = useState(false);
    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    const navigate = useNavigate();
    // Form validation 
    const validationType = useFormik({

        enableReinitialize: true,
        initialValues: {
            new_password: '',
            new_password_confirmation: "",
        },
        validationSchema: Yup.object().shape({
            new_password: Yup.string().required(
                "Please Enter New Password"
            ),
            new_password_confirmation: Yup.string().required(
                "Please Enter Confirm Password"
            ),
        }),
        onSubmit: (values) => {
            dispatch(changepassword(values));
            toggleModal1()

        }
    });
    return (
        <Fragment>
            <div className="container">
                <h1 className="heading">Change Password</h1>
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>

                                <Form
                                    className="login-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validationType.handleSubmit();
                                        return false;
                                    }}>
                                    <div className="mb-3">

                                        <Label className="form-label">New Password <span className="errorsymbol">*</span></Label>
                                        <div className="login-password">
                                            <Input
                                                name="new_password"
                                                value={validationType.values.new_password || ""}
                                                type={passwordShow ? "text" : "password"}
                                                placeholder="Enter Password"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                invalid={
                                                    validationType.touched.new_password && validationType.errors.new_password ? true : false
                                                }
                                            />
                                            {validationType.touched.new_password && validationType.errors.new_password ? (
                                                <FormFeedback type="invalid">{validationType.errors.new_password}</FormFeedback>
                                            ) : null}
                                            <button onClick={() => setPasswordShow(!passwordShow)} className="btn btn-light " type="button" id="password-addon">
                                                <i className={passwordShow ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"}></i>
                                            </button>
                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <Label className="form-label">Confirm Password <span className="errorsymbol">*</span></Label>
                                        <div className="login-password">
                                            <Input
                                                name="new_password_confirmation"
                                                value={validationType.values.new_password_confirmation || ""}
                                                type={passwordShow1 ? "text" : "password"}
                                                placeholder="Enter Confirm Password"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                invalid={
                                                    validationType.touched.new_password_confirmation && validationType.errors.new_password_confirmation ? true : false
                                                }
                                            />
                                            {validationType.touched.new_password_confirmation && validationType.errors.new_password_confirmation ? (
                                                <FormFeedback type="invalid">{validationType.errors.new_password_confirmation}</FormFeedback>
                                            ) : null}
                                            <button onClick={() => setPasswordShow1(!passwordShow1)} className="btn btn-light " type="button" id="password-addon">
                                                <i className={passwordShow1 ? "mdi mdi-eye-outline" : "mdi mdi-eye-off-outline"}></i>
                                            </button>
                                        </div>

                                    </div>


                                    <div className="d-flex flex-wrap gap-2">
                                        <Button type="submit" color="primary" >
                                            Submit
                                        </Button>{" "}
                                        <Button type="reset" color="secondary" onClick={() => navigate('/dashboard')}>
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>


                </Row>

                {!profileloading &&
                    < CommonModal
                        isOpen={modal1}
                        toggle={toggleModal1}
                        title={profilesuccess ? "Success" : "Alert"}
                        message={profilesuccess ? "Password updated successfully." : error}
                        redirectTo={profilesuccess ? "/dashboard" : toggleModal1} // Different navigation for this page
                        buttonText="Okay"
                    />
                }
            </div>
        </Fragment>
    );
};
export default withRouter(ChangePassword);

