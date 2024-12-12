import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinners from '../../components/Common/Spinner';
import { showHomeProduct, cloneProduct } from '../../store/auth/homeproduct/actions';
import classnames from "classnames";
import withRouter from "../../components/Common/withRouter";
import CommonModal from '../../components/Common/CommonModal';
const HomeProductDetail = props => {
    document.title = "Product Details | Quench";
    const { showproductdetails, homeproductloading, homesuccessproduct, homeerror } = useSelector((state) => state.HomeProductData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const [activeImage, setActiveImage] = useState("");  // Track active image
    const [modal1, setModal1] = useState(false);
    const [userID, setUserID] = useState(null);
    const toggleModal1 = () => setModal1(!modal1);
    useEffect(() => {
        dispatch(showHomeProduct(props.router.params.id));
    }, [dispatch]);
    useEffect(() => {
        if (localStorage.getItem("vendoruser")) {
            const obj = JSON.parse(localStorage.getItem("vendoruser"));
            setUserID(obj.id);
        }
    }, [props.success]);
    if (isLoading || homeproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }

    // Thumbnail click handler to change main image
    const imageShow = (img) => {
        setActiveImage(img);
    };

    // Default image if no active image is selected
    const subImages = showproductdetails?.products?.product?.images || [];
    const mainImage = activeImage || subImages[0]?.image || "";

    const handleCloneProduct = (productId) => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {
            dispatch(cloneProduct(productId));
            toggleModal1();
        }
    };
    if (isLoading || homeproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    return (
        <div >

            <Row className="my-5">
                <h1 className="heading">Product Detail</h1>
                <Col xl={6}>
                    {/* Product Image Gallery */}
                    <Card className="shadow-sm">
                        <CardBody>
                            <Row>
                                <Col md={2} sm={3}>
                                    <Nav className="flex-column" pills>
                                        {subImages.map((image, index) => (
                                            <NavItem key={image.id}>
                                                <NavLink
                                                    className={classnames({
                                                        active: activeTab === String(index + 1),
                                                    })}
                                                    onClick={() => {
                                                        setActiveTab(String(index + 1));
                                                        imageShow(image.image);
                                                    }}
                                                >
                                                    <img
                                                        src={image.image_thumbnail_1}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="img-fluid mx-auto d-block rounded"
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                </NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>
                                </Col>
                                <Col md={7} sm={9} className="offset-md-1">
                                    <div className="text-center">
                                        <img
                                            src={mainImage}
                                            alt="Product Image"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: "400px", objectFit: "contain" }}
                                        />
                                    </div>
                                    <TabContent activeTab={activeTab}>
                                        {subImages.map((image, index) => (
                                            <TabPane tabId={String(index + 1)} key={image.id}>

                                            </TabPane>
                                        ))}
                                    </TabContent>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    {/* Product Information */}
                    <Card className="shadow-sm">
                        <CardBody>
                            <h3 className="text-primary">{showproductdetails?.products?.product?.productname}</h3>
                            <h5 className="text-muted">{showproductdetails?.products?.product?.subtitle}</h5>
                            <h4 className="my-3">
                                {/* <span className="text-muted text-decoration-line-through">${showproductdetails?.products?.product?.price}</span>{" "} */}
                                <b className="text-success">${showproductdetails?.products?.product?.price}</b>
                            </h4>
                            <p
                                className="text-muted mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: showproductdetails?.products?.product?.description,
                                }}
                            ></p>

                            {/* Buttons */}
                            <div className="d-flex justify-content-start">
                                {
                                    localStorage.getItem("vendoruser") ?
                                        <>
                                            {userID === showproductdetails?.products?.product?.user_id ?
                                                <Button variant="primary" className="me-2" size="md"
                                                    disabled>
                                                    <i className="bx bx-copy me-2"></i> This is Your Product!
                                                </Button>
                                                :
                                                <Button variant="primary" className="me-2" size="md"
                                                    onClick={() => {
                                                        handleCloneProduct(showproductdetails?.products?.product?.id)
                                                    }}>
                                                    <i className="bx bx-copy me-2"></i> Sell One Of These
                                                </Button>
                                            }

                                        </>
                                        : ""
                                }
                                <Button variant="success" size="md" disabled>
                                    <i className="bx bx-shopping-bag me-2"></i> Buy Now
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Product Specifications */}
                    <Card className="mt-4 shadow-sm">
                        <CardBody>
                            <h5 className="mb-3">Specifications:</h5>
                            <Table responsive className="table-bordered">
                                <tbody>
                                    <tr>
                                        <th style={{ width: "30%" }}>Product Condition</th>
                                        <td>{showproductdetails?.products?.product?.info
                                            ? showproductdetails?.products?.product?.info.
                                                productcondition.charAt(0).toUpperCase() + showproductdetails?.products?.product?.info.productcondition.slice(1).toLowerCase() :
                                            "_"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "30%" }}>Model</th>
                                        <td>{showproductdetails?.products?.product?.info
                                            ? showproductdetails?.products?.product?.info.model :
                                            "_"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "30%" }}>Packaging Condition</th>
                                        <td>{showproductdetails?.products?.product?.info
                                            ?
                                            showproductdetails?.products?.product?.info.
                                                packaging_condition.charAt(0).toUpperCase() + showproductdetails?.products?.product?.info.
                                                    packaging_condition.slice(1).toLowerCase() :
                                            "_"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "30%" }}>Additional Condition</th>
                                        <td>{showproductdetails?.products?.product?.info
                                            ?
                                            showproductdetails?.products?.product?.info.
                                                additional_condition.charAt(0).toUpperCase() + showproductdetails?.products?.product?.info.
                                                    additional_condition.slice(1).toLowerCase() :
                                            "_"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                {
                    modal1 && !homeproductloading &&
                    <CommonModal
                        isOpen={modal1}
                        toggle={toggleModal1}
                        title={homesuccessproduct ? "Success" : "Alert"}
                        message={homesuccessproduct ? "Product Cloned Successfully." : homeerror}
                        redirectTo={homesuccessproduct ? `/edit-product/${props.router.params.id}` : toggleModal1}
                        buttonText="Okay"
                    />
                }

            </Row >
        </div>

    );
};

export default withRouter(HomeProductDetail);
