import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBuyingList } from '../../../../store/vendor/buyingproduct/action';
import DataTable from '../../../../components/Common/DataTable';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import bgimg1 from '../../../../assets/images/no-img.jpg';
import Spinners from '../../../../components/Common/Spinner';
// import DeleteModal from '../../../components/Common/DeleteModal';

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


        default:
            return <Badge className="bg-success"> {status} </Badge>;
    }
};
const BuyingListPage = () => {
    document.title = "Products | Quench";
    const { buyingproducts, buyingproductloading } = useSelector((state) => state.BuyingProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15); // Default page size
    const [currentPage, setCurrentPage] = useState(1);
    const [productList, setProductList] = useState([]);
    // const [deleteModal, setDeleteModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');


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
                header: "Image",
                accessorKey: "image",
                cell: (cellProps) => {
                    console.log(cellProps.row.cart_item.product.image,"cellProps.row.image")
                    const imageSrc = cellProps?.row?.cart_item?.product?.image || bgimg1; // Fallback URL
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
                    return row?.cart_item?.product?.productname
                        ? row?.cart_item?.product?.productname.charAt(0).toUpperCase() + row?.cart_item?.product?.productname.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Total",
                accessorKey: "total",
                cell: (cellProps) => cellProps?.row?.total || "_",
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Date",
                accessorKey: "date",
                cell: (cellProps) => (cellProps?.row?.placed_at ? <span>{cellProps?.row?.placed_at}</span> : "_"),
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Order Status",
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
                        <Link to={`/edit-product/${cellProps.row.id}`} style={{ cursor: 'pointer' }}>View Order</Link>
                        &nbsp;
                        {/* <Link to="#" onClick={() => {
                            // setDeleteModal(true);
                            setProductList(cellProps.row);
                        }} style={{ cursor: 'pointer' }}>Delete</Link> */}
                    </div>
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [currentPage, pageSize] // Recalculate when pageSize or currentPage changes
    );
    // const handleDeleteTag = () => {
    //     if (productList && productList.id) {
    //         dispatch(onDeleteClick(productList.id));
    //         setDeleteModal(false);
    //         setProductList([]);
    //         dispatch(getProductsList({ page: currentPage, limit: pageSize }));

    //     }
    // };
    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: pageSize
        }
        console.log(pageSize, "currentPage")
        dispatch(getBuyingList(userData, currentPage === currentPage ? 1 : currentPage));
    };
    if (isLoading || buyingproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    return (
        <div>
            {/* <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteTag}
                onCloseClick={() => setDeleteModal(false)}
            /> */}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5>Buying Order List</h5>
                {/* <button onClick={() => navigate('/add-product')}>Add Product</button> */}
            </div>
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
                />
            }

        </div>
    );
};

export default BuyingListPage;
