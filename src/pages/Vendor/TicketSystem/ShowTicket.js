import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../../components/Common/Spinner';
import { Card, CardBody, Col, Row, Label, Form, Input, FormFeedback, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { showticketList, createticketlist } from '../../../store/vendor/tickets/action';
//redux
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../../components/Common/withRouter";
import avtar1 from "../../../assets/images/users/avatar.jpg";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const TicketById = props => {
    document.title = "Show Return Order | Quench";
    const { showticketlist, ticketloading, successticket, ticketerror } = useSelector((state) => state.TicketData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    const [FormOpen, setFormOpen] = useState(false);
    const toggle1 = () => setFormOpen(!FormOpen);

    const [editorContent, setEditorContent] = useState('');
    const validationType = useFormik({
        enableReinitialize: true,
        initialValues: {
            subject: showticketlist?.ticket?.subject ? showticketlist?.ticket?.subject : "",
            description: '',
            parent_id: props.router.params.id
        },
        validationSchema: Yup.object().shape({
            subject: Yup.string().required("Please Enter Subject"),
            description: Yup.string().required("Please Enter Description"),
        }),
        onSubmit: (values) => {
            values.description = editorContent
            dispatch(createticketlist(values));
            toggleModal1();
            setFormOpen(false)
            dispatch(showticketList(props.router.params.id));
        }
    });

    useEffect(() => {
        dispatch(showticketList(props.router.params.id));
    }, [dispatch]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorContent(data); // Update local state for CKEditor
        validationType.setFieldValue('description', data); // Update Formik content value
    };
    const handleEditorBlur = () => {
        validationType.setFieldTouched('description', true); // Mark content as touched
    };
    if (isLoading || ticketloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };
    const handleToggle1=()=>{
        setFormOpen(false)
        toggleModal1();
    }
    return (

        <Fragment>
            <div className="container py-5">

                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>
                                {isLoading ? (
                                    <Spinners setLoading={setIsLoading} />
                                ) : (

                                    <>
                                        <div className="pt-3">
                                            <Row className="justify-content-center">
                                                <Col xl={8}>
                                                    <div className="mt-4">
                                                        <div className="mt-5">
                                                            <h1 className="heading">Show Ticket Detail</h1>
                                                            <div>
                                                                <div className="d-flex py-3 border-top">
                                                                    <div className="flex-shrink-0 me-3">
                                                                        <div className="avatar-xs">
                                                                            <img
                                                                                src={showticketlist?.ticket?.created_by_detail?.profileimage ? process.env.REACT_APP_URL + showticketlist?.ticket?.created_by_detail?.profileimage : avtar1}
                                                                                style={{ height: 50 }}
                                                                                alt=""
                                                                                className="img-fluid d-block rounded-circle"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <div className="flex-grow-1">
                                                                            <h5 className="font-size-14 mb-1">
                                                                                {showticketlist?.ticket?.created_by_detail?.username ? showticketlist?.ticket?.created_by_detail?.username : ""}
                                                                                <small className="text-muted float-end">
                                                                                    2 hrs Ago
                                                                                </small>
                                                                            </h5>
                                                                            <p
                                                                                className="text-muted"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: showticketlist?.ticket?.description ? showticketlist?.ticket?.description : "",
                                                                                }}
                                                                            ></p>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    showticketlist?.ticket?.replies &&
                                                                    showticketlist?.ticket?.replies.map((element) => (
                                                                        <div className="d-flex py-3 border-top">

                                                                            <div className="flex-shrink-0 me-3">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">

                                                                                        <img
                                                                                            src={element?.created_by_detail?.profileimage ? process.env.REACT_APP_URL + element?.created_by_detail?.profileimage : avtar1}
                                                                                            style={{ height: 50 }}
                                                                                            alt=""
                                                                                            className="img-fluid d-block rounded-circle"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h5 className="font-size-14 mb-1">
                                                                                    {element?.created_by_detail?.username ? element?.created_by_detail?.username : "_"}
                                                                                    <small className="text-muted float-end">
                                                                                        {element?.created_at ? element?.created_at : "_"}
                                                                                    </small>
                                                                                </h5>
                                                                                <p
                                                                                    className="text-muted"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: element?.description ? element?.description : "",
                                                                                    }}
                                                                                ></p>

                                                                            </div>
                                                                        </div>
                                                                    ))

                                                                }



                                                            </div>
                                                            <div className="d-flex flex-wrap gap-2 justify-end">
                                                                <Button type="submit" color="primary" onClick={() => setFormOpen(true)}>
                                                                    Reply
                                                                </Button>{" "}

                                                                <Button type="reset" color="secondary" onClick={() => navigate("/ticket-list")}>
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </>




                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            {FormOpen === true ?
                <Modal isOpen={FormOpen} toggle={toggle1} backdrop="static">
                    <ModalHeader style={{justifyContent:"center"}}> Return Message</ModalHeader>
                    <ModalBody>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                validationType.handleSubmit();
                                return false;
                            }}>
                            <div className="mb-3">
                                <Row>

                                    <Col md={12} style={{ marginTop: "10px" }}>
                                        <Label className="form-label">Subject <span className="errorsymbol">*</span></Label>
                                        <Input
                                            name="subject"
                                            placeholder="Enter Subject"
                                            type="text"
                                            onChange={validationType.handleChange}
                                            onBlur={validationType.handleBlur}
                                            defaultValue={validationType.values.subject || ""}
                                            disabled
                                            invalid={
                                                validationType.touched.subject && validationType.errors.subject ? true : false
                                            }
                                        />
                                        {validationType.touched.subject && validationType.errors.subject ? (
                                            <FormFeedback type="invalid">{validationType.errors.subject}</FormFeedback>
                                        ) : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} style={{ marginTop: "10px" }}>
                                        <Label className="form-label">Description <span className="errorsymbol">*</span></Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{

                                                licenseKey: 'yb9cohmfnwpo4zlbubfkoeyzgj99jhzjo4gp5yie0ribr5y9',
                                            }
                                            }
                                            data={validationType.values.description}

                                            onChange={handleEditorChange} // Update Formik's content field
                                            onBlur={handleEditorBlur} // Formik onBlur for validation
                                        />
                                        {validationType.touched.description && validationType.errors.description && (
                                            <div className="error">{validationType.errors.description}</div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                <Button type="submit" color="primary" >
                                    Send
                                </Button>{" "}

                                <Button type="reset" color="secondary" onClick={() => navigate(`/show-ticket/${props.router.params.id}`)}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
                : ""
            }



            {!ticketloading &&
                <CommonModal
                    isOpen={modal1}
                    toggle={toggleModal1}
                    title={successticket ? "Success" : "Alert"}
                    message={successticket ? "Ticket Added Successfully." : ticketerror}
                    redirectTo={successticket ? `/show-ticket/${props.router.params.id}` : toggleModal1} // Different navigation for this page
                    buttonText="Okay"
                />
            }
        </Fragment >
    );
};

export default withRouter(TicketById);