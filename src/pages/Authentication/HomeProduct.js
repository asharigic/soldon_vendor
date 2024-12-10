import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeProductsList, cloneProduct } from '../../store/auth/homeproduct/actions';
import Spinners from '../../components/Common/Spinner';
import { Container, Row, Col, Card, ListGroupItem, ListGroup, Pagination, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import CommonModal from '../../components/Common/CommonModal';
import { BsHeart } from 'react-icons/bs';
import { deleteFavouriteProduct } from '../../store/vendor/favourite/actions';
import bg1 from '../../assets/images/no-img.jpg'
const HomeProductListPage = () => {
    document.title = "Home | Quench";
    const { homeproducts, homeproductloading, homesuccessproduct, homeerror } = useSelector((state) => state.HomeProductData);
    const { favouriteloading, favouritesuccess, favouriteerror, favouriteproduct } = useSelector((state) => state.FavouriteData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [modal1, setModal1] = useState(false);
    const toggleModal1 = () => setModal1(!modal1);
    const [wishlistmodal, setWishlistmodal] = useState(false);
    const toggleWishlistModal = () => setWishlistmodal(!wishlistmodal);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [pageSize, setPageSize] = useState(15); // Default page size
    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(500);

    useEffect(() => {
        const page = currentPage || 1;
        const limit = pageSize || 15;
        const payload = {
            per_page: limit,
            search: searchValue,
        };
        dispatch(getHomeProductsList(payload, page)); // Dispatch action to fetch products list
    }, [currentPage, pageSize, dispatch, searchValue]);
    useEffect(() => {
        if (homeproducts) {

            setTotalItems(homeproducts?.meta?.total); // Update total items count for pagination
        }
    }, [homeproducts]);

    const categories = ['Electronics', 'Furniture', 'Clothing'];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSliderChange = useCallback((values) => {
        const [min, max] = values;
        setMinCost(min);
        setMaxCost(max);
        setSelectedPriceRange([min, max]);
    }, []);

    useEffect(() => {

    }, [selectedCategory, selectedPriceRange]);

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

    // Pagination handling
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPagination = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={currentPage === number}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };
    const handleWishlist = (productId) => {
        if (!localStorage.getItem("vendoruser")) {
            navigate('/login');
        } else {

            dispatch(deleteFavouriteProduct(productId));
            toggleWishlistModal()
            const page = currentPage || 1;
            const limit = pageSize || 15;
            const payload = {
                per_page: limit,
                search: searchValue,
            };
            dispatch(getHomeProductsList(payload, page));
        }
    }
    return (
        <Fragment>
            {isLoading ? <Spinners setLoading={setIsLoading} /> : (
                <Container>
                    <Row>
                        {/* <Col md={3}>
                            <h1 className="heading">Filters</h1>
                            <div>
                                <ListGroup className="filter-list">
                             
                                    <ListGroupItem>
                                        <h5>Categories</h5>
                                        <div className="list-unstyled">
                                            {categories.map((category) => (
                                                <div key={category} className="mb-2">
                                                    <Link
                                                        to="#"
                                                        className={`d-block ${selectedCategory === category ? 'text-primary' : 'text-dark'}`}
                                                        onClick={() => handleCategorySelect(category)}
                                                    >
                                                        {category}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <h5>Price</h5>
                                        <div className="price-slider">
                                            <Nouislider
                                                range={{ min: 0, max: 600 }}
                                                start={[minCost, maxCost]}
                                                connect
                                                step={1}
                                                onSlide={handleSliderChange}
                                            />
                                            <div className="mt-3">
                                                <span>Min: ${minCost}</span> - <span>Max: ${maxCost}</span>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col> */}
                        <Col md={12}>
                            <h1 className="heading">Product List</h1>
                            <Row>
                                {homeproducts.data.map((product) => (
                                    <Col key={product.id} sm={12} md={6} lg={4}>
                                        <Card className="mb-4">
                                            <Card.Body>

                                                <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none' }}>
                                                    <h5 style={{ margin: 0, border: 'none' }}></h5>

                                                    {
                                                        product.is_added_to_favorite === 0 ?
                                                            <BsHeart style={{ cursor: 'pointer' }} onClick={() => handleWishlist(product.product_id)} />
                                                            :
                                                            <BsHeart style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleWishlist(product.product_id)} />
                                                    }

                                                </Card.Header>
                                                <Card.Img src={product.image ? process.env.REACT_APP_URL + product.image : bg1} />


                                                <Card.Body>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">{product.subtitle}</Card.Subtitle>
                                                    <Card.Text style={{ fontWeight: 'bold', color: 'green' }}>${product.price}</Card.Text>
                                                </Card.Body>


                                                <div className="button-container">
                                                    {product.stock_status === "out_of_stock" ? (
                                                        <button className="button" disabled style={{ cursor: "not-allowed", fontSize: 12 }}>Buy Unavailable</button>
                                                    ) : (
                                                        <button className="button" style={{ backgroundColor: "white", color: "black", fontSize: 12 }}>Buy Available</button>
                                                    )}
                                                    <button
                                                        className="button"
                                                        style={{ backgroundColor: "white", color: "black", fontSize: 12 }}
                                                        onClick={() => { handleCloneProduct(product.product_id) }}
                                                    >
                                                        Sell One Of These
                                                    </button>
                                                </div>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            <div className="pagination-container">

                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                    {renderPagination()}
                                    <Pagination.Next
                                        onClick={() => currentPage < totalItems && handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalItems}
                                    />
                                </Pagination>
                            </div>
                        </Col>
                    </Row>
                    {!homeproductloading &&
                        <CommonModal
                            isOpen={modal1}
                            toggle={toggleModal1}
                            title={homesuccessproduct ? "Success" : "Alert"}
                            message={homesuccessproduct ? "Product Cloned Successfully." : homeerror}
                            redirectTo={homesuccessproduct ? "/productlist" : toggleModal1}
                            buttonText="Okay"
                        />
                    }

                    {
                        wishlistmodal && !favouriteloading &&
                        <CommonModal
                            isOpen={wishlistmodal}
                            toggle={toggleWishlistModal}
                            title={favouritesuccess ? "Success" : "Alert"}
                            message={favouritesuccess ? favouriteproduct.message : favouriteerror}
                            redirectTo={favouritesuccess ? "/" : toggleWishlistModal}
                            buttonText="Okay"
                        />


                    }
                </Container>
            )}
        </Fragment>
    );
};

export default HomeProductListPage;
