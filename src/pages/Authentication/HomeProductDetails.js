import React, { useEffect, useState, Fragment } from "react";
import Spinners from '../../components/Common/Spinner';
import { showHomeProduct } from '../../store/auth/homeproduct/actions';
import { Row, Col, Card, CardBody, NavItem, Nav, NavLink, Table,TabContent,TabPane } from "react-bootstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

const HomeProductDetail = props => {
    document.title = "Product Details | Quench";
    const { showproductdetails, homeproductloading } = useSelector((state) => state.HomeProductData);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(showHomeProduct(props.router.params.id));
    }, [dispatch]);
    if (isLoading || homeproductloading) {
        return <Spinners setLoading={setIsLoading} />;  // Display loading state while data is being fetched
    };
    const imageShow = (img, id) => {
        const expandImg = document.getElementById("expandedImg" + id);
        expandImg.src = img;
    };
    return (

        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xl={6}>
                                    <div className="product-detai-imgs">
                                        <Row>
                                            <Col md={2} sm={3} className="col-4">
                                                <Nav className="flex-column" pills>
                                                    <NavItem>
                                                        <NavLink >
                                                            {/* <img src={showproductdetails?.products?.product?.images["subImage"][0]} alt=""
                                                                onClick={() => {
                                                                    imageShow(showproductdetails?.products?.product?.images["subImage"][0], 1);
                                                                }}
                                                                 className="img-fluid mx-auto d-block rounded"
                                                            /> */}
                                                        </NavLink>
                                                    </NavItem>
                                                    {/* <NavItem>
                                                        <NavLink className={classnames({ active: activeTab === "2", })} onClick={() => { toggleTab("2"); }}>
                                                            <img src={productDetail["subImage"][1]} alt=""
                                                                onClick={() => {
                                                                    imageShow(productDetail["subImage"][1], 2);
                                                                }}
                                                                className="img-fluid mx-auto d-block rounded"
                                                            />
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink className={classnames({ active: activeTab === "3", })} onClick={() => { toggleTab("3"); }}>
                                                            <img src={productDetail["subImage"][2]} alt=""
                                                                onClick={() => {
                                                                    imageShow(productDetail["subImage"][2], 3);
                                                                }}
                                                                className="img-fluid mx-auto d-block rounded"
                                                            />
                                                        </NavLink>
                                                    </NavItem> */}
                                                </Nav>
                                            </Col>
                                            <Col md={7} sm={9} className="offset-md-1 col-8">
                                                {
                                                    showproductdetails?.products?.product?.images.map((element) => {
                                                        <TabContent>
                                                            <TabPane tabId="1">
                                                                <div>
                                                                    <img src={element.image} alt="" id="expandedImg1" className="img-fluid mx-auto d-block" />
                                                                </div>
                                                            </TabPane>
                                                        </TabContent>
                                                    })

                                                }

                                            </Col>
                                            {/*
                                                <TabContent activeTab={activeTab}>
                                                    <TabPane tabId="1">
                                                        <div>
                                                            <img src={productDetail.image} alt="" id="expandedImg1" className="img-fluid mx-auto d-block" />
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <div>
                                                            <img src={productDetail.image} id="expandedImg2" alt="" className="img-fluid mx-auto d-block" />
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="3">
                                                        <div>
                                                            <img src={productDetail.image} id="expandedImg3" alt="" className="img-fluid mx-auto d-block" />
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="4">
                                                        <div>
                                                            <img src={productDetail.image} id="expandedImg4" alt="" className="img-fluid mx-auto d-block" />
                                                        </div>
                                                    </TabPane>
                                                </TabContent>
                                                <div className="text-center">
                                                    <Button
                                                        type="button"
                                                        color="primary"
                                                        className="btn mt-2 me-1"
                                                    >
                                                        <i className="bx bx-cart me-2" /> Add to cart
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        color="success"
                                                        className="ms-1 btn mt-2"
                                                    >
                                                        <i className="bx bx-shopping-bag me-2" />
                                                        Buy now
                                                    </Button>
                                                </div>
                                            </Col> */}
                                        </Row>
                                    </div>
                                </Col>

                                <Col xl="6">
                                    <div className="mt-4 mt-xl-3">
                                        <Link to="#" className="text-primary">
                                            {showproductdetails?.products?.product?.productname}
                                        </Link>
                                        <h4 className="mt-1 mb-3">{showproductdetails?.products?.product?.subtitle}</h4>
                                        <h5 className="mb-4">
                                            Price :{" "}
                                            <span className="text-muted me-2">
                                                <del>${showproductdetails?.products?.product?.price} USD</del>
                                            </span>{" "}
                                            <b>${showproductdetails?.products?.product?.price} USD</b>
                                        </h5>
                                        <p className="text-muted mb-4" dangerouslySetInnerHTML={{ __html: showproductdetails?.products?.product?.description }}>

                                        </p>
                                        {/* <div className="text-muted float-start me-3">
                                            <StarRatings
                                                rating={4}
                                                starRatedColor="#F1B44C"
                                                starEmptyColor="#74788d"
                                                numberOfStars={5}
                                                name="rating"
                                                starDimension="14px"
                                                starSpacing="3px"
                                            />
                                        </div>
                                        <p className="text-muted mb-4">
                                            ( {productDetail.reviews} Customers Review )
                                        </p>

                                        {!!productDetail.isOffer && (
                                            <h6 className="text-success text-uppercase">
                                                {productDetail.offer} % Off
                                            </h6>
                                        )}
                                       
                                        <p className="text-muted mb-4">
                                            To achieve this, it would be necessary to have
                                            uniform grammar pronunciation and more common words
                                            If several languages coalesce
                                        </p>
                                        <Row className="mb-3">
                                            <Col md="6">
                                                {productDetail.features &&
                                                    productDetail.features.map((item, i) => (
                                                        <div key={i}>
                                                            <p className="text-muted">
                                                                <i
                                                                    className={classnames(
                                                                        item.icon,
                                                                        "font-size-16 align-middle text-primary me-2"
                                                                    )}
                                                                />
                                                                {item.type && `${item.type}: `}
                                                                {item.value}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </Col>
                                            <Col md="6">
                                                {productDetail.features &&
                                                    productDetail.features.map((item, i) => (
                                                        <div key={i}>
                                                            <p className="text-muted">
                                                                <i
                                                                    className={classnames(
                                                                        item.icon,
                                                                        "font-size-16 align-middle text-primary me-2"
                                                                    )}
                                                                />
                                                                {item.type && `${item.type}:`}
                                                                {item.value}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </Col>
                                        </Row>

                                        <div className="product-color">
                                            <h5 className="font-size-15">Color :</h5>
                                            {productDetail.colorOptions &&
                                                productDetail.colorOptions.map((option, i) => {
                                                    return (
                                                        <Link to="#" className="active" key={i}>
                                                            <div className="product-color-item border rounded">
                                                                <img
                                                                    src={option.image}
                                                                    alt=""
                                                                    className="avatar-md"
                                                                />
                                                            </div>
                                                            <p>{option.color}</p>
                                                        </Link>
                                                    )
                                                })}
                                        </div> */}
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className="mt-5">
                <h5 className="mb-3">Specifications :</h5>

                <div className="table-responsive">
                    <Table className="table mb-0 table-bordered">
                        <tbody>
                            {showproductdetails?.products?.product?.categories &&
                                showproductdetails?.products?.product?.categories.map((specification, i) => (
                                    <tr key={i}>
                                        <th
                                            scope="row"
                                            style={{ width: "400px" }}
                                            className={"text-capitalize"}
                                        >
                                            {specification.name}
                                        </th>
                                        <td>{specification.name}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </div>

        </Fragment>
    );
};

export default withRouter(HomeProductDetail);