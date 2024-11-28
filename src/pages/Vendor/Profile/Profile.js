import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardBody, Button, Label, Input, UncontrolledTooltip, FormFeedback, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, editProfile } from "../../../store/vendor/profile/actions";
import Spinners from "../../../components/Common/Spinner";
import CommonModal from "../../../components/Common/CommonModal";
import * as yup from "yup";
import { useFormik } from "formik";
const Profile = (props) => {
    document.title = "Profile | Quench";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profileerror, profile, profilesuccess, loading, } = useSelector((state) => state.ProfileData);

    const [profileimage, setprofileimage] = useState('')
    const [modal1, setModal1] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const toggleModal1 = () => setModal1(!modal1);
    useEffect(() => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login')

        }
        else {
            dispatch(getProfile());
            setLoading(false)
        }
    }, [props.success]);



    // Form validation 
    const validationType = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: profile ? profile.firstname : "",
            lastname: profile ? profile.lastname : "",
            address1: profile ? profile?.user_profile?.address1 : "",
            address2: profile ? profile?.user_profile?.address2 : "",
            city: profile ? profile?.user_profile?.city : "",
            state: profile ? profile?.user_profile?.state : "",
            country: profile ? profile?.user_profile?.country : "",
            postcode: profile ? profile?.user_profile?.postcode : "",
            profileimage: "",
            phonenumber: profile ? profile?.user_profile?.phonenumber : "",

        },
        validationSchema: yup.object().shape({
            firstname: yup.string().required("Please Enter Firstname"),
            lastname: yup.string().required("Please Enter Lastname"),
            address1: yup.string().required("Please Enter Address"),
            city: yup.string().required("Please Enter City"),
            state: yup.string().required("Please Enter State"),
            country: yup.string().required("Please Enter Country"),
            postcode: yup.string().required("Please Enter Postcode"),

        }),
        onSubmit: (values) => {
            const payload = {
                "phonenumber": values.phonenumber ? values.phonenumber : "",
                "firstname": values.firstname ? values.firstname : "",
                "lastname": values.lastname ? values.lastname : "",
                "address1": values.address1,
                "address2": values.address2 ? values.address2 : "",
                "city": values.city,
                "state": values.state,
                "country": values.country,
                "postcode": values.postcode,
                "profileimage": profileimage ? profileimage.split(',')[1] : ""
            }

            dispatch(editProfile(payload));
            toggleModal1();
        }
    });

    //handleBase64 Images
    const handleAcceptedProfileImage = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
            var logo = fileReader.result;
            setprofileimage(logo);
        }
    };
    if (isLoading || loading) {
        return <Spinners setLoading={setLoading} />;  // Display loading state while data is being fetched
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Row>
                    {loading ?
                        <Spinners setLoading={setLoading} />
                        :
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validationType.handleSubmit();
                                            return false;
                                        }}>
                                        <div className="mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <Label className="form-label">Firstname
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="firstname"
                                                        placeholder="Enter Firstname"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.firstname || ""}
                                                        invalid={
                                                            validationType.touched.firstname &&
                                                                validationType.errors.firstname ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.firstname && validationType.errors.firstname ? (
                                                        <FormFeedback type="invalid">{validationType.errors.firstname}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">Lastname
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="lastname"
                                                        placeholder="Enter Lastname"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.lastname || ""}
                                                        invalid={
                                                            validationType.touched.lastname &&
                                                                validationType.errors.lastname ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.lastname && validationType.errors.lastname ? (
                                                        <FormFeedback type="invalid">{validationType.errors.lastname}</FormFeedback>
                                                    ) : null}
                                                </Col>

                                                <Col md={6}>
                                                    <Label className="form-label">Address1
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="address1"
                                                        placeholder="Enter Address1"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.address1 || ""}
                                                        invalid={
                                                            validationType.touched.address1 &&
                                                                validationType.errors.address1 ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.address1 && validationType.errors.address1 ? (
                                                        <FormFeedback type="invalid">{validationType.errors.address1}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">Address2
                                                    </Label>
                                                    <Input
                                                        name="address2"
                                                        placeholder="Enter Address2"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.address2 || ""}

                                                    />

                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">City
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="city"
                                                        placeholder="Enter City"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.city || ""}
                                                        invalid={
                                                            validationType.touched.city &&
                                                                validationType.errors.city ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.city && validationType.errors.city ? (
                                                        <FormFeedback type="invalid">{validationType.errors.city}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">State
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="state"
                                                        placeholder="Enter State"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.state || ""}
                                                        invalid={
                                                            validationType.touched.state &&
                                                                validationType.errors.state ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.state && validationType.errors.state ? (
                                                        <FormFeedback type="invalid">{validationType.errors.state}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">Country
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="country"
                                                        placeholder="Enter Country"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.country || ""}
                                                        invalid={
                                                            validationType.touched.country &&
                                                                validationType.errors.country ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.country && validationType.errors.country ? (
                                                        <FormFeedback type="invalid">{validationType.errors.country}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">Postcode
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="postcode"
                                                        placeholder="Enter Postcode"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.postcode || ""}
                                                        invalid={
                                                            validationType.touched.postcode &&
                                                                validationType.errors.postcode ? true : false
                                                        }
                                                    />
                                                    {validationType.touched.postcode && validationType.errors.postcode ? (
                                                        <FormFeedback type="invalid">{validationType.errors.postcode}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">PhoneNumber
                                                        <span className="errorsymbol">*</span></Label>
                                                    <Input
                                                        name="phonenumber"
                                                        placeholder="Enter PhoneNumber"
                                                        type="text"
                                                        onChange={validationType.handleChange}
                                                        onBlur={validationType.handleBlur}
                                                        value={validationType.values.phonenumber || ""}

                                                    />

                                                </Col>
                                                <Col md={6}>
                                                    <Label className="form-label">Product Image</Label>

                                                    <Input className="form-control"
                                                        id="formFileLg"
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleAcceptedProfileImage} />


                                                    <div className="avatar-lg">
                                                        <div className="avatar-title bg-light rounded-circle">
                                                            <img src={profileimage ? (
                                                                profileimage.startsWith('data:image') ?
                                                                    profileimage : profileimage) : ''}
                                                                id="profileimage"
                                                                alt=""
                                                                className="avatar-md h-auto rounded-circle"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button type="submit" color="primary" >
                                                Save Changes
                                            </Button>{" "}


                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    }
                </Row>
            </div>
            {!loading &&
                < CommonModal
                    isOpen={modal1}
                    toggle={toggleModal1}
                    title={profilesuccess ? "Updated" : "Alert"}
                    message={profilesuccess ? "Profile Updated Successfully." : profileerror}
                    redirectTo={profilesuccess ? "/profile" : toggleModal1} // Different navigation for this page
                    buttonText="Okay"
                />
            }
        </React.Fragment >
    )
}

export default Profile;