import React, { Fragment, useState } from "react";
import { Row, Col, Card, CardBody, Button, Label, Input, Container, FormFeedback, Form } from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../../components/Common/withRouter";
// Import Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//Import Breadcrumb


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal";


import { createticketlist } from "../../../store/vendor/tickets/action";
const AddTicket = () => {

  //meta title
  document.title = "Add Ticket | Quench";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const {ticketloading,successticket,ticketerror}= useSelector((state) => state.TicketData)

  const toggleModal1 = () => setModal1(!modal1);


  // Form validation 
  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      subject: Yup.string().required("Please Enter Subject"),
      description: Yup.string().required("Please Enter Description"),
    }),
    onSubmit: (values) => {
      values.description = editorContent
      dispatch(createticketlist(values));
      toggleModal1();
    }
  });

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data); // Update local state for CKEditor
    validationType.setFieldValue('description', data); // Update Formik content value
  };

  const handleEditorBlur = () => {
    validationType.setFieldTouched('description', true); // Mark content as touched
  };
  return (
    <Fragment>
      <div className="container">
      <h1 className="heading">Add Ticket</h1>
          
            <Row>
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
                         
                          <Col md={12} style={{ marginTop: "10px" }}>
                            <Label className="form-label">Subject <span className="errorsymbol">*</span></Label>
                            <Input
                              name="subject"
                              placeholder="Enter Subject"
                              type="text"
                              onChange={validationType.handleChange}
                              onBlur={validationType.handleBlur}
                              value={validationType.values.subject || ""}
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
                          Save
                        </Button>{" "}

                        <Button type="reset" color="secondary" onClick={() => navigate("/ticket-list")}>
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          
        

        {/* Alert Popup */}
        {!ticketloading &&
          <CommonModal
            isOpen={modal1}
            toggle={toggleModal1}
            title={successticket ? "Success" : "Alert"}
            message={successticket ? "Ticket Added Successfully." : ticketerror}
            redirectTo={successticket ? "/ticket-list" : toggleModal1} // Different navigation for this page
            buttonText="Okay"
          />
        }
      </div>
    </Fragment>
  );
};
export default withRouter(AddTicket);