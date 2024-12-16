import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../../../components/Common/Spinner';
import { Card, CardBody, Col, Row } from "reactstrap";
import { showBuyingProduct } from '../../../../store/vendor/buyingproduct/action';
//redux
import { useSelector, useDispatch } from "react-redux";
import bgimg1 from '../../../../assets/images/no-img.jpg';
import withRouter from "../../../../components/Common/withRouter";
import { createshipmentorder } from "../../../../store/vendor/sellingproduct/action";

import CommonModal from "../../../../components/Common/CommonModal";
const ViewOrderByIdProduct = props => {
    document.title = "Show Return Order | Quench";
    const { buyingproductloading, showbuyingproducts, } = useSelector((state) => state.BuyingProduct);
    const { successsellingproduct, sellingproductloading, sellingerror, showreturnorderproduct } = useSelector((state) => state.SellingProductData);
    const dispatch = useDispatch();
    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(showBuyingProduct(props.router.params.id));
    }, [dispatch]);
    useEffect(() => {
        if (showreturnorderproduct) {
            const blob = new Blob([showreturnorderproduct], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Shipment.pdf'; // You can customize the filename
            link.click(); // Programmatically click the link to start the download

        }
    }, [showreturnorderproduct])
    if (isLoading || buyingproductloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };
    const handleshipmentorder = () => {
        var payload = {
            order_id: props.router.params.id
        }
        dispatch(createshipmentorder(payload))

    }


    return (

        <Fragment>
            <div className="container py-5">
                <h1 className="heading">Order Detail</h1>
                <Card>
                    {isLoading ? (
                        <Spinners setLoading={setIsLoading} />
                    ) : (
                        <CardBody>
                            <Row>
                                {/* Left Column - Product Image and Name */}
                                <Col xl={6} className="d-flex flex-column align-items-center">
                                    <h2 className="mb-3">{showbuyingproducts?.products?.order?.order_item?.product?.productname ? showbuyingproducts?.products?.order?.order_item?.product?.productname : "_"}</h2>
                                    <h6>{showbuyingproducts?.products?.order?.order_item?.product?.subtitle ? showbuyingproducts?.products?.order?.order_item?.product?.subtitle : "_"}</h6>
                                    <img
                                        className="img-fluid mb-3" // Using Bootstrap's img-fluid for responsive images
                                        height={200}
                                        src={showbuyingproducts?.products?.order?.order_item?.product?.image ? showbuyingproducts?.products?.order?.order_item?.product?.image : bgimg1}
                                        alt="Product"
                                    />
                                </Col>

                                {/* Right Column - Order and Return Information */}
                                <Col xl={6}>

                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Order:</h5>
                                        <p className="mb-0">{showbuyingproducts?.products?.order?.uuid ? showbuyingproducts?.products?.order?.uuid : "_"}</p>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Status:</h5>
                                        <p className="mb-0">{showbuyingproducts?.products?.order?.status ? showbuyingproducts?.products?.order?.status.charAt(0).toUpperCase() + showbuyingproducts?.products?.order?.status.slice(1).toLowerCase() : "_"}</p>
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Price:</h5>
                                        {
                                            showbuyingproducts?.products?.order?.order_item?.product?.price ?
                                                <p className="mb-0"><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.order_item?.product?.price}</p>

                                                : "_"

                                        }

                                    </div>

                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Sub Total:</h5>
                                        {
                                            showbuyingproducts?.products?.order?.subtotal ?
                                                <p className="mb-0"><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.subtotal}</p>

                                                : "_"

                                        }

                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Fees:</h5>
                                        {
                                            showbuyingproducts?.products?.order?.fees ?
                                                <p className="mb-0"><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.fees}</p>

                                                : "_"

                                        }

                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">
                                        <h5 className="font-weight-bold me-2 mb-0">Total:</h5>
                                        {
                                            showbuyingproducts?.products?.order?.total ?
                                                <p className="mb-0"><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.total}</p>

                                                : "_"

                                        }

                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">
                                        <button className="btn btn-primary" onClick={() => handleshipmentorder()}>Create Shipment</button>
                                    </div>
                                    <hr />
                                </Col>
                            </Row>
                        </CardBody>
                    )}
                </Card>
                {
                    modal1 && !sellingproductloading &&
                    <CommonModal
                        isOpen={modal1}
                        toggle={toggleModal1}
                        title={successsellingproduct ? "Success" : "Alert"}
                        message={successsellingproduct ? "Order Return Successfully." : sellingerror}
                        redirectTo={successsellingproduct ? "/buying-list" : toggleModal1}
                        buttonText="Okay"
                    />


                }
            </div>
        </Fragment>
    );
};

export default withRouter(ViewOrderByIdProduct);