import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList, deleteProduct as onDeleteClick, approveProduct } from '../../../store/vendor/products/actions';
import DataTable from '../../../components/Common/DataTable';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import bgimg1 from '../../../assets/images/no-img.jpg';
import Spinners from '../../../components/Common/Spinner';
import DeleteModal from '../../../components/Common/DeleteModal';
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
            return <Badge className="bg-success"> Published </Badge>;
        case "expired":
            return <Badge className="badge-soft-secondary"> Expired</Badge>;


        default:
            return <Badge className="bg-success"> {status} </Badge>;
    }
};
const ProductListPage = () => {
    document.title = "Products | Quench";
    const { products, productloading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15); // Default page size
    const [currentPage, setCurrentPage] = useState(1);
    const [productList, setProductList] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        const page = currentPage || 1;
        const limit = pageSize || 15;
        const payload = {
            per_page: limit,
            search: searchValue,
        };
        dispatch(getProductsList(payload, page));// Dispatch action to fetch products list
    }, [currentPage, pageSize, dispatch]);

    useEffect(() => {
        if (products?.meta) {
            setTotalItems(products.meta.total); // Update total items count for pagination
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
        [currentPage, pageSize] // Recalculate when pageSize or currentPage changes
    );
    const handleDeleteTag = () => {
        if (productList && productList.id) {
            dispatch(onDeleteClick(productList.id));
            setDeleteModal(false);
            setProductList([]);
            dispatch(getProductsList({ page: currentPage, limit: pageSize }));

        }
    };
    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: pageSize
        }
        console.log(pageSize, "currentPage")
        dispatch(getProductsList(userData, currentPage === currentPage ? 1 : currentPage));
    };
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
                <h1 className="heading">Product List</h1>

                <button className='btn btn-dark' onClick={() => navigate('/add-product')}>Add Product</button>

                {isLoading ? <Spinners setLoading={setIsLoading} />
                    :

                    <DataTable
                        data={products?.data || []}
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
        </Fragment>
    );
};

export default ProductListPage;
