import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../../../components/Common/Spinner';
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { showBuyingProduct, returnbuyingproduct } from '../../../../store/vendor/buyingproduct/action';
//redux
import { useSelector, useDispatch } from "react-redux";
import bgimg1 from '../../../../assets/images/no-img.jpg';
import withRouter from "../../../../components/Common/withRouter";
import CommonModal from "../../../../components/Common/CommonModal";
import { useNavigate } from "react-router-dom";
const ShowBuyingIdProduct = props => {
    document.title = "Show Return Order | Quench";
    const { buyingproductloading, showbuyingproducts, successbuyingproduct, buyingerror } = useSelector((state) => state.BuyingProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    useEffect(() => {
        dispatch(showBuyingProduct(props.router.params.id));
    }, [dispatch]);

    if (isLoading || buyingproductloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };

    const handleReturnOrder = () => {
        const payload = {
            "order_id": props.router.params.id
        }
        dispatch(returnbuyingproduct(payload))
        if (successbuyingproduct) {
            toggleModal1()
        }
    }
    return (

        <Fragment>
            <div className="container py-5">

                <div className="d-flex justify-content-between" style={{ cursor: 'pointer' }}>


                    <h1 className="heading d-flex align-items-center" onClick={() => navigate('/buying-list')}><i className="bx bx-chevron-left h2 m-0" ></i>Back</h1>
                    <h1 className="heading">Buying Product Detail</h1>
                </div>
                <Card>
                    {isLoading ? (
                        <Spinners setLoading={setIsLoading} />
                    ) : (
                        <CardBody>
                            <Row>
                                {/* Left Column - Product Image and Name */}
                                <Col xl={6} className="d-flex flex-column align-items-center">
                                    <h5 className="mb-3">{showbuyingproducts?.products?.order?.order_item?.product?.productname ? showbuyingproducts?.products?.order?.order_item?.product?.productname : "_"}</h5>
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
                                        <h6 className="font-weight-bold">Order ID:</h6>&nbsp;
                                        {
                                            showbuyingproducts?.products?.order?.uuid ?
                                                <h6> #{showbuyingproducts?.products?.order?.uuid}</h6>

                                                : "_"

                                        }

                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Status:</h6>&nbsp;
                                        <h6>{showbuyingproducts?.products?.order?.status ? showbuyingproducts?.products?.order?.status.charAt(0).toUpperCase() + showbuyingproducts?.products?.order?.status.slice(1).toLowerCase() : "_"}</h6>
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">

                                        <h6 className="font-weight-bold">Price:</h6>&nbsp;
                                        {
                                            showbuyingproducts?.products?.order?.order_item?.product?.price ?
                                                <h6><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.order_item?.product?.price}</h6>

                                                : "_"

                                        }
                                    </div>

                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Sub Total:</h6>&nbsp;

                                        {
                                            showbuyingproducts?.products?.order?.subtotal ?
                                                <h6><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.subtotal}</h6>

                                                : "_"

                                        }

                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Fees:</h6>&nbsp;

                                        {
                                            showbuyingproducts?.products?.order?.fees ?
                                                <h6 className="mb-0"><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.fees}</h6>

                                                : "_"

                                        }
                                    </div>
                                    <hr />
                                    <div className="mb-3 d-flex align-items-center">
                                        <h6 className="font-weight-bold">Total:</h6>&nbsp;

                                        {
                                            showbuyingproducts?.products?.order?.total ?
                                                <h6><i className="bx bx-pound"></i>{showbuyingproducts?.products?.order?.total}</h6>

                                                : "_"

                                        }

                                    </div>
                                    <hr />

                                    <div className="mb-3">
                                        <Button onClick={() => handleReturnOrder()}>Return Order</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    )}
                </Card>
                {
                    modal1 && !buyingproductloading &&
                    <CommonModal
                        isOpen={modal1}
                        toggle={toggleModal1}
                        title={successbuyingproduct ? "Success" : "Alert"}
                        message={successbuyingproduct ? "Order Return Successfully." : buyingerror}
                        redirectTo={successbuyingproduct ? "/buying-list" : toggleModal1}
                        buttonText="Okay"
                    />


                }
            </div>
        </Fragment>
    );
};

export default withRouter(ShowBuyingIdProduct);