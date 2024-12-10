import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../../../components/Common/Spinner';
import { Card, CardBody, Col, Row, } from "reactstrap";
import moment from "moment";
import { showretunorderList } from "../../../../store/vendor/sellingproduct/action";
//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../../../components/Common/withRouter";
const ReturnOrderById = props => {
    document.title = "Show Return Order | Quench";
    const { sellingproductloading, showreturnorderproduct } = useSelector((state) => state.SellingProductData);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(showretunorderList(props.router.params.id));
    }, [dispatch]);



    if (isLoading || sellingproductloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };

    return (

        <Fragment>
            <div className="container py-5">
                <h1 className="heading">Return Order Product Detail</h1>
                <Card>
                    {isLoading ? (
                        <Spinners setLoading={setIsLoading} />
                    ) : (
                        <CardBody>
                            <Row>
                                {/* Left Column - Product Image and Name */}
                                <Col xl={6} className="d-flex flex-column align-items-center">
                                    <h2 className="mb-3">{showreturnorderproduct?.order_return_items?.product?.productname}</h2>
                                    <img
                                        className="img-fluid mb-3" // Using Bootstrap's img-fluid for responsive images
                                        height={200}
                                        src={showreturnorderproduct?.order_return_items?.product?.image}
                                        alt="Product"
                                    />
                                </Col>

                                {/* Right Column - Order and Return Information */}
                                <Col xl={6}>
                                    <div className="mb-3">
                                        <h4 className="font-weight-bold">Date:</h4>
                                        <p>{showreturnorderproduct?.returned_at ? moment(showreturnorderproduct?.returned_at).format('Do MMMM, YYYY') : "_"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="font-weight-bold">Order:</h4>
                                        <p>{showreturnorderproduct?.order_id ? showreturnorderproduct?.order_id : "_"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="font-weight-bold">Status:</h4>
                                        <p>{showreturnorderproduct?.status ? showreturnorderproduct?.status.charAt(0).toUpperCase() + showreturnorderproduct?.status.slice(1).toLowerCase() : "_"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="font-weight-bold">Price:</h4>
                                        <p>{showreturnorderproduct?.order_return_items?.product?.price ? `$${showreturnorderproduct?.order_return_items?.product?.price}` : "_"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="font-weight-bold">Refund Amount:</h4>
                                        <p>{showreturnorderproduct?.refund_amount ? `$${showreturnorderproduct?.refund_amount}` : "_"}</p>
                                    </div>
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