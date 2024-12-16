import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../../../components/Common/Spinner';
import { Card, CardBody, Col, Row, } from "reactstrap";
import moment from "moment";
import { showretunorderList } from "../../../../store/vendor/sellingproduct/action";
//redux
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg1 from '../../../../assets/images/no-img.jpg'
import withRouter from "../../../../components/Common/withRouter";
const ReturnOrderById = props => {
    document.title = "Show Return Order | Quench";
    const { sellingproductloading, showreturnorderproduct } = useSelector((state) => state.SellingProductData);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(showretunorderList(props.router.params.id));
    }, [dispatch]);



    if (isLoading || sellingproductloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };

    return (

        <Fragment>
            <div className="container py-5">
                <div className="d-flex justify-content-between" style={{cursor:'pointer'}}> 


                    <h1 className="heading d-flex align-items-center" onClick={() => navigate('/selling-list')}><i className="bx bx-chevron-left h2 m-0" ></i>Back</h1>
                    <h1 className="heading">Return Order Product Detail</h1>
                </div>

                <Card>
                    {isLoading ? (
                        <Spinners setLoading={setIsLoading} />
                    ) : (
                        <CardBody>
                            <Row>
                                {/* Left Column - Product Image and Name */}
                                <Col xl={6} className="d-flex flex-column align-items-center">
                                    <h5 className="mb-3">{showreturnorderproduct?.order_return_items?.product?.productname ? showreturnorderproduct?.order_return_items?.product?.productname : "_"}</h5>
                                    <h6>{showreturnorderproduct?.order_return_items?.product?.subtitle ? showreturnorderproduct?.order_return_items?.product?.subtitle : "_"}</h6>
                                    <img
                                        className="img-fluid mb-3" // Using Bootstrap's img-fluid for responsive images
                                        height={200}
                                        src={showreturnorderproduct?.order_return_items?.product?.image ? showreturnorderproduct?.order_return_items?.product?.image : bg1}
                                        alt="Product"
                                    />
                                </Col>

                                {/* Right Column - Order and Return Information */}
                                <Col xl={6}>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Date:</h6>&nbsp;

                                        <h6 >{showreturnorderproduct?.returned_at ? moment(showreturnorderproduct?.returned_at).format('Do MMMM, YYYY') : "_"}</h6>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Order ID:</h6>&nbsp;
                                        <h6 >{showreturnorderproduct?.order_id ? showreturnorderproduct?.order_id : "_"}</h6>
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Status:</h6>&nbsp;
                                        <h6>{showreturnorderproduct?.status ? showreturnorderproduct?.status.charAt(0).toUpperCase() + showreturnorderproduct?.status.slice(1).toLowerCase() : "_"}</h6>&nbsp;
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Price:</h6>&nbsp;
                                        <h6><i className="bx bx-pound"></i>{showreturnorderproduct?.order_return_items?.product?.price ? `${showreturnorderproduct?.order_return_items?.product?.price}` : "_"}</h6>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Refund Amount:</h6>&nbsp;
                                        <h6><i className="bx bx-pound"></i>{showreturnorderproduct?.refund_amount ? `${showreturnorderproduct?.refund_amount}` : "_"}</h6>
                                    </div>
                                    <hr />
                                </Col>
                            </Row>
                        </CardBody>
                    )}
                </Card>
            </div>
        </Fragment>
    );
};

export default withRouter(ReturnOrderById);