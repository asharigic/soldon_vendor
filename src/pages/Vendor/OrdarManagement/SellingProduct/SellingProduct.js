import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEye } from "react-icons/ai";
import { getSellingList, getretunorderList } from '../../../../store/vendor/sellingproduct/action';
import DataTable from '../../../../components/Common/DataTable';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Tabs, Tab } from 'react-bootstrap';
import bgimg1 from '../../../../assets/images/no-img.jpg';
import Spinners from '../../../../components/Common/Spinner';
import moment from 'moment/moment';
import { getProductsList, deleteProduct as onDeleteClick } from '../../../../store/vendor/products/actions';
import DeleteModal from '../../../../components/Common/DeleteModal';
import { BsPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
const ProjectStatus = ({ status }) => {
    switch (status) {
        case "pending":
            return <Badge className="bg-warning"> Pending </Badge>;

        case "approved":
            return <Badge className="bg-success"> Approved </Badge>;

        case "draft":
            return <Badge className="bg-danger"> Draft </Badge>;
        case "published":
            return <Badge className="badge-soft-secondary"> Published </Badge>;
        case "expired":
            return <Badge className="badge-soft-secondary"> Expired</Badge>;
        case "completed":
            <Badge className="bg-success">Completed</Badge>

        default:
            return <Badge className="bg-success"> {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()} </Badge>;
    }
};
const SellingListPage = () => {
    document.title = "Selling | Quench";
    const { sellingproducts, sellingproductloading, returnorderproducts } = useSelector((state) => state.SellingProductData);
    const { products, productloading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [key, setKey] = useState('selling');
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [totalproductItems, setTotalproductItems] = useState(0);
    const [totalreturnItems, setTotalreturnItems] = useState(0);
    const [pageSize, setPageSize] = useState(15); // Default page size
    const [productpageSize, setProductPageSize] = useState(15);
    const [returnpageSize, setReturnPageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [productcurrentPage, setProductCurrentPage] = useState(1);
    const [returncurrentPage, setReturnCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [orderseachvalue, setordersearchvalue] = useState('');
    const [returnseachvalue, setreturnsearchvalue] = useState('');
    const [productList, setProductList] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    useEffect(() => {
        const page = productcurrentPage || 1;
        const limit = productpageSize || 15;
        const payload = {
            per_page: limit,
            search: searchValue,
        };
        dispatch(getProductsList(payload, page));
        // Dispatch action to fetch products list
    }, [productcurrentPage, productpageSize, dispatch]);

    useEffect(() => {
        if (sellingproducts?.meta) {
            setTotalItems(sellingproducts.meta.total); // Update total items count for pagination
        }
    }, [sellingproducts]);
    useEffect(() => {
        if (returnorderproducts?.meta) {
            setTotalreturnItems(returnorderproducts.meta.total); // Update total items count for pagination
        }
    }, [returnorderproducts]);

    useEffect(() => {
        if (products?.meta) {
            setTotalproductItems(products.meta.total); // Update total items count for pagination
        }
    }, [products]);

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
                header: "Product Name",
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

                cell: (cellProps) => (cellProps?.row?.status ? <ProjectStatus status={cellProps?.row?.status} /> : "_"),

                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Stock Status",
                accessorKey: "stock_status",
                cell: ({ row }) => {
                    const stockStatus = row?.order_item?.product?.stock_status;
                    const formattedStatus = stockStatus
                        ? stockStatus.charAt(0).toUpperCase() + stockStatus.slice(1).toLowerCase()
                        : "_";

                    return (
                        <span
                            style={{ textDecoration: 'none' }}
                            dangerouslySetInnerHTML={{ __html: formattedStatus }}
                        />
                    );
                    // return row?.order_item?.product?.stock_status
                    //     ? row?.order_item?.product?.stock_status.charAt(0).toUpperCase() + row?.order_item?.product?.stock_status.slice(1).toLowerCase()
                    //     : "_";
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
                            onClick={() => navigate(`/view-order/${cellProps.row.id}`)}
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
    const retuncolumns = useMemo(
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
                header: "Image",
                accessorKey: "image",
                cell: (cellProps) => {

                    const imageSrc = cellProps?.row?.order_return_items?.product?.image || bgimg1; // Fallback URL
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
                header: "Product Name",
                accessorKey: "productname",
                cell: ({ row }) => {
                    return row?.order_return_items?.product?.productname
                        ? row?.order_return_items?.product?.productname.charAt(0).toUpperCase() + row?.order_return_items?.product?.productname.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Total",
                accessorKey: "total",
                cell: ({ row }) => {
                    return (row?.order_return_items?.price ? <span><i className="bx bx-pound"></i>{row?.order_return_items?.price}</span> : "_")
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Date",
                accessorKey: "date",
                cell: (cellProps) => (cellProps?.row?.returned_at ? <span>{moment(cellProps?.row?.returned_at).format('Do MMMM, YYYY')}</span> : "_"),
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Order",
                accessorKey: "status",
                cell: ({ row }) => {

                    return (
                        <>
                            <Link to="#"

                            >{row?.status ? <ProjectStatus status={row.status} /> : "_"}</Link >


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
                            // onClick={() => handleVieworderdetail(cellProps.row.id)} 
                            onClick={() => navigate(`/manage-order/${cellProps.row.id}`)}

                            style={{ cursor: 'pointer' }}> <AiTwotoneEye /></button>
                        &nbsp;


                    </div >
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [productcurrentPage, productpageSize]
    )
    //product List columns
    const productcolumns = useMemo(
        () => [
            {
                header: "No.",
                accessorKey: "id",
                cell: (cellProps) => {

                    const rowIndex = cellProps.rowIndex;
                    if (rowIndex === undefined || isNaN(rowIndex)) {
                        return "-";
                    }
                    const globalIndex = (productcurrentPage - 1) * productpageSize + rowIndex + 1;
                    return globalIndex;
                },
                enableColumnFilter: false,
                enableSorting: false,

            },

            {
                header: "Image",
                accessorKey: "image",
                cell: (cellProps) => {
                    const imageSrc = cellProps.row.image || bgimg1; // Fallback URL
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
                header: "Product Name",
                accessorKey: "productname",
                cell: ({ row }) => {
                    return row.productname
                        ? row.productname.charAt(0).toUpperCase() + row.productname.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Subtitle",
                accessorKey: "subtitle",
                cell: (cellProps) => cellProps.row.subtitle || "_",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Price",
                accessorKey: "price",
                cell: (cellProps) => (cellProps.row.price ? <span><i className="bx bx-pound"></i>{cellProps.row.price}</span> : "_"),
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ row }) => {
                    const status = row.status;
                    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                    return (
                        <>
                            {
                                status === 'pending' ?
                                    <Link to="#"

                                    >{capitalizedStatus ? <ProjectStatus status={row.status} /> : "_"}</Link >
                                    :
                                    <Link to="#" style={{ cursor: 'default' }}>{capitalizedStatus ? <ProjectStatus status={row.status} /> : "_"}</Link>
                            }

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
                    <div>
                        <button className="btn  btn-sm btn-primary rounded-0" onClick={() => navigate(`/edit-product/${cellProps.row.id}`)} style={{ cursor: 'pointer' }}> <BsPencilFill /></button>
                        &nbsp;
                        <button className="btn  btn-sm btn-danger rounded-0"
                            onClick={() => {
                                setDeleteModal(true);
                                setProductList(cellProps.row);
                            }} style={{ cursor: 'pointer' }}><AiFillDelete /></button>
                    </div>
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [productcurrentPage, productpageSize] // Recalculate when pageSize or currentPage changes
    );
    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: productpageSize
        }

        dispatch(getProductsList(userData, productcurrentPage === productcurrentPage ? 1 : productcurrentPage));
    };
    const handleOrdersSeach = () => {
        var userData = {

            search: orderseachvalue,
            per_page: pageSize
        }

        dispatch(getSellingList(userData, currentPage === currentPage ? 1 : currentPage));
    }
    const handleReturnSearch = () => {
        var userData = {

            search: returnseachvalue,
            per_page: returnpageSize
        }

        dispatch(getretunorderList(userData, returncurrentPage === returncurrentPage ? 1 : returncurrentPage));
    }
    const handleTab = (selectedKey) => {
        setKey(selectedKey)
        setIsLoading(true)
        if (selectedKey === "selling") {
            const page = productcurrentPage || 1;
            const limit = productpageSize || 15;
            const payload = {
                per_page: limit,
                search: searchValue,
            };
            dispatch(getProductsList(payload, page));
        }
        else if (selectedKey === "orders") {
            const page = currentPage || 1;
            const limit = pageSize || 15;
            const payload = {
                per_page: limit,
                search: orderseachvalue,
            };
            dispatch(getSellingList(payload, page));
        }
        else if (selectedKey === "returns") {
            const page = returncurrentPage || 1;
            const limit = returnpageSize || 15;
            const payload = {
                per_page: limit,
                search: returnseachvalue,
            };
            dispatch(getretunorderList(payload, page));
        }
        setIsLoading(false)


    }
    const handleDeleteTag = () => {
        if (productList && productList.id) {
            dispatch(onDeleteClick(productList.id));
            setDeleteModal(false);
            setProductList([]);
            dispatch(getProductsList({ page: currentPage, limit: pageSize }));

        }
    };
    if (isLoading || sellingproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    if (isLoading || productloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    return (
        <Fragment>
            <div className="container">
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteTag}
                    onCloseClick={() => setDeleteModal(false)}
                />
                <div style={{ textAlign: 'center' }}>
                    {/*  */}
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => handleTab(k)}
                        // onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="selling" title="Selling">
                            <h1 className="heading">Selling Product List</h1>
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                            <h1 className="heading">Orders Product List</h1>
                        </Tab>
                        <Tab eventKey="returns" title="Returns">
                            <h1 className="heading">Return Order Product List</h1>
                        </Tab>

                    </Tabs>
                </div>
                {isLoading ? <Spinners setLoading={setIsLoading} />
                    :
                    key === "selling" ?

                        <DataTable
                            data={products?.data || []}
                            columns={productcolumns} // Passing dynamic columns to DataTable
                            pageSize={productpageSize}
                            totalItems={totalproductItems}
                            isAddButton={true}
                            currentPage={productcurrentPage}
                            setCurrentPage={setProductCurrentPage}
                            setPageSize={setProductPageSize}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            handleSearch={handleSearch}
                            SearchPlaceholder="Search..."
                            addButtonText="Add Product"
                            navigateTo="/add-product"
                        />
                        :

                        key === "orders" ?
                            isLoading ? <Spinners setLoading={setIsLoading} />
                                :
                                <DataTable
                                    data={sellingproducts?.data || []}
                                    columns={columns} // Passing dynamic columns to DataTable
                                    pageSize={pageSize}
                                    totalItems={totalItems}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setPageSize={setPageSize}
                                    searchValue={orderseachvalue}
                                    setSearchValue={setordersearchvalue}
                                    handleSearch={handleOrdersSeach}
                                    SearchPlaceholder="Search..."
                                />

                            :

                            <>
                                {isLoading ? <Spinners setLoading={setIsLoading} />
                                    :
                                    <DataTable
                                        data={returnorderproducts?.data || []}
                                        columns={retuncolumns} // Passing dynamic columns to DataTable
                                        pageSize={returnpageSize}
                                        totalItems={totalreturnItems}
                                        currentPage={returncurrentPage}
                                        setCurrentPage={setReturnCurrentPage}
                                        setPageSize={setReturnPageSize}
                                        searchValue={returnseachvalue}
                                        setSearchValue={setreturnsearchvalue}
                                        handleSearch={handleReturnSearch}
                                        SearchPlaceholder="Search..."
                                    />
                                }
                            </>
                }

            </div >
        </Fragment>
    );
};

export default SellingListPage;
