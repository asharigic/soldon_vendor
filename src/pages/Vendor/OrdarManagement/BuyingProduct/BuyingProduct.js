import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEye } from "react-icons/ai";
import { getBuyingList, showBuyingProduct } from '../../../../store/vendor/buyingproduct/action';
import DataTable from '../../../../components/Common/DataTable';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Modal, Button, Table } from 'react-bootstrap';
import bgimg1 from '../../../../assets/images/no-img.jpg';
import Spinners from '../../../../components/Common/Spinner';
import moment from 'moment';
const ProjectStatus = ({ status }) => {
    switch (status) {
        case "pending":
            return <Badge className="bg-warning"> Pending </Badge>;

        case "approved":
            return <Badge className="bg-success"> Approved </Badge>;

        case "draft":
            return <Badge className="bg-danger"> Draft </Badge>;
        case "published":
            return <Badge className="bg-success"> Published </Badge>;
        case "expired":
            return <Badge className="badge-soft-secondary"> Expired</Badge>;
        case "returned":
            return <Badge className="bg-warning"> Returned </Badge>;
        case "completed":
            return  <Badge className="bg-success">Completed</Badge>
        default:
            return <Badge className="bg-success"> {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</Badge>;
    }
};
const BuyingListPage = () => {
    document.title = "Buying | Quench";
    const { buyingproducts, buyingproductloading, showbuyingproducts } = useSelector((state) => state.BuyingProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15); // Default page size
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [ViewModal, setViewModal] = useState(false);


    useEffect(() => {
        const page = currentPage || 1;
        const limit = pageSize || 15;
        const payload = {
            per_page: limit,
            search: searchValue,
        };
        dispatch(getBuyingList(payload, page));// Dispatch action to fetch products list
    }, [currentPage, pageSize, dispatch]);

    useEffect(() => {
        if (buyingproducts?.meta) {
            setTotalItems(buyingproducts.meta.total); // Update total items count for pagination
        }
    }, [buyingproducts]);

    // Dynamic column definition
    const columns = useMemo(
        () => [
            {
                header: "No.",
                accessorKey: "id",
                cell: (cellProps) => {

                    const rowIndex = cellProps.rowIndex;
                    if (rowIndex === undefined || isNaN(rowIndex)) {
                        return "-";
                    }
                    const globalIndex = (currentPage - 1) * pageSize + rowIndex + 1;
                    return globalIndex;
                },
                enableColumnFilter: false,
                enableSorting: false,

            },
            {
                header: "Order ID",
                accessorKey: "uuid",
                cell: ({ row }) => {
                    return row?.uuid
                        ? row?.uuid.charAt(0).toUpperCase() + row?.uuid.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Image",
                accessorKey: "image",
                cell: (cellProps) => {

                    const imageSrc = cellProps?.row?.order_item?.product?.image || bgimg1; // Fallback URL
                    return (
                        <img
                            className="img-drop-area"
                            height={50}
                            width={50}
                            src={imageSrc}
                            alt="Product"
                        />
                    );
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Purchased Item",
                accessorKey: "productname",
                cell: ({ row }) => {
                    return row?.order_item?.product?.productname
                        ? row?.order_item?.product?.productname.charAt(0).toUpperCase() + row?.order_item?.product?.productname.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Total",
                accessorKey: "total",
                cell: (cellProps) => (cellProps?.row?.total ? <span><i className="bx bx-pound"></i>{cellProps?.row?.total}</span> : "_"),

                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Date",
                accessorKey: "date",
                cell: (cellProps) => (cellProps?.row?.placed_at ? <span>{moment(cellProps?.row?.placed_at).format('Do MMMM, YYYY')}</span> : "_"),

                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Order Status",
                accessorKey: "status",
                cell: ({ row }) => {

                    return (
                        <>
                            <Link to="#" style={{ cursor: 'default' }}>{row?.status ? <ProjectStatus status={row.status} /> : "_"}</Link>

                        </>
                    );
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: (cellProps) => (

                    <div className='text-center'>
                        <button className="btn  btn-sm btn-primary rounded-0"
                            // onClick={() => handleVieworderdetail(cellProps.row.id)} style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/buying-order/${cellProps.row.id}`)}
                        >
                            <AiTwotoneEye /></button>
                        &nbsp;


                    </div >
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [currentPage, pageSize] // Recalculate when pageSize or currentPage changes
    );
    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: pageSize
        }
        dispatch(getBuyingList(userData, currentPage === currentPage ? 1 : currentPage));
    };
    const handleVieworderdetail = async (details) => {
        setIsLoading(true)
        await dispatch(showBuyingProduct(details));
        setIsLoading(true)
        setViewModal(true);
    }


    if (isLoading || buyingproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    return (
        <Fragment>
            <div className="container">
                <h1 className="heading">Buying Order List</h1>

                {isLoading ? <Spinners setLoading={setIsLoading} />
                    :

                    <DataTable
                        data={buyingproducts?.data || []}
                        columns={columns} // Passing dynamic columns to DataTable
                        pageSize={pageSize}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setPageSize={setPageSize}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                        SearchPlaceholder="Search..."
                    />
                }
                {ViewModal && (

                    isLoading ? (
                        <div className="loading-container" >
                            <p style={{ color: 'red' }}>Loading...</p> {/* Loading state UI */}
                        </div>
                    ) : (
                        <Modal
                            show={ViewModal}
                            onHide={() => setViewModal(false)}
                            role="dialog"
                            autoFocus={true}
                            centered={true}
                            className="exampleModal"
                            tabIndex="-1"

                        >

                            <div className="modal-content">
                                <Modal.Header closeButton><h4>Order Details</h4></Modal.Header>
                                <Modal.Body>
                                    <h6 className="mb-2">
                                        Product id: <span className="text-primary">#{showbuyingproducts?.products?.order?.uuid}</span>
                                    </h6>
                                    <h6 className="mb-4">
                                        Billing Name: <span className="text-primary">{showbuyingproducts?.products?.order?.user_name}</span>
                                    </h6>

                                    <div className="table-responsive">
                                        <Table className="table align-middle table-nowrap">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        <div>
                                                            <img src={showbuyingproducts?.products?.order?.order_item?.product?.image ? showbuyingproducts?.products?.order?.order_item?.product?.image : bgimg1} alt="" className="avatar-sm" width={50} />
                                                        </div>
                                                    </th>
                                                    <td>
                                                        <div>
                                                            <h5 className="text-truncate font-size-14">{showbuyingproducts?.products?.order?.order_item?.product?.productname}</h5>

                                                        </div>
                                                    </td>
                                                    <td>$ {showbuyingproducts?.products?.order?.order_item?.product?.price}</td>
                                                </tr>

                                                <tr>
                                                    <td colSpan="2">
                                                        <h6 className="m-0 text-right">Sub Total:</h6>
                                                    </td>
                                                    <td>
                                                        $ {showbuyingproducts?.products?.order?.subtotal}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        <h6 className="m-0 text-right">Fees:</h6>
                                                    </td>
                                                    <td>
                                                        ${showbuyingproducts?.products?.order?.fees}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        <h6 className="m-0 text-right">Total:</h6>
                                                    </td>
                                                    <td>
                                                        $  {showbuyingproducts?.products?.order?.total}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="button" color="secondary" onClick={() => setViewModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </div>

                        </Modal>
                    )
                )
                }
            </div >
        </Fragment>
    );
};

export default BuyingListPage;
