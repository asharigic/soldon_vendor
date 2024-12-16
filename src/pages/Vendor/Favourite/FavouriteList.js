import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFavouriteProduct as onDeleteClick, getFavouriteList } from '../../../store/vendor/favourite/actions';
import Spinners from '../../../components/Common/Spinner';
import './FavouriteList.css';
import DataTable from '../../../components/Common/DataTable';
import bgimg1 from '../../../assets/images/no-img.jpg';
import DeleteModal from '../../../components/Common/DeleteModal';
const FavouriteList = (props) => {
  document.title = "Favourites | Quench";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favourite, favouriteloading, favouritesuccess } = useSelector((state) => state.FavouriteData);
  const [isLoading, setLoading] = useState(favouriteloading);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(15); // Default page size
  const [totalItems, setTotalItems] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [FavouriteList, setFavouriteList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("vendoruser")) {
      navigate('/login');
    } else {
      const page = currentPage || 1;
      const limit = pageSize || 15;
      const payload = {
        per_page: limit,
        search: searchValue,
      };
      dispatch(getFavouriteList(payload, page));
      setLoading(false);
    }
  }, [props.success, currentPage, pageSize, dispatch]);
  useEffect(() => {
    if (favourite?.meta) {
      setTotalItems(favourite.meta.total); // Update total items count for pagination
    }
  }, [favourite]);

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
        header: "Item",
        accessorKey: "item",
        cell: (cellProps) => {
          const imageSrc =  process.env.REACT_APP_LOCAL_IMAGE+cellProps.row.product_image || bgimg1; // Fallback URL
          return (
            <img
              className="img-drop-area"
              height={50}
              width={50}
              src={imageSrc}
              alt={imageSrc === "" ? "" : cellProps.row.product_name}
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
          return row.product_name
            ? row.product_name.charAt(0).toUpperCase() + row.product_name.slice(1).toLowerCase()
            : "_";
        },
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (cellProps) => (cellProps.row.product_price ? <span><i className="bx bx-pound"></i>{cellProps.row.product_price}</span> : "_"),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: (cellProps) => (cellProps.row.product_stock_status_label ? <span>{cellProps.row.product_stock_status_label}</span> : "_"),

        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: (cellProps) => (
          <div className="button-container">
            <button className="button" disabled style={{ cursor: "not-allowed" }}>Buy</button>
            <button
              className="button"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => {

                setDeleteModal(true);
                setFavouriteList(cellProps.row);
              }}
            // onClick={() => handleRemoveFavourite(cellProps.row.product_id)}
            >
              Remove
            </button>
          </div>
        ),
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    [currentPage, pageSize] // Recalculate when pageSize or currentPage changes
  );
  // const handleRemoveFavourite = (productId) => {
  //   dispatch(deleteFavouriteProduct(productId));
  //   if (favouritesuccess) {
  //     dispatch(getFavouriteList());
  //   }
  // };
  const handleRemoveFavourite = () => {
   
    if (FavouriteList && FavouriteList.product_id) {

      dispatch(onDeleteClick(FavouriteList.product_id));
      setDeleteModal(false);
      setFavouriteList([]);
      const page = currentPage || 1;
      const limit = pageSize || 15;
      const payload = {
        per_page: limit,
        search: searchValue,
      };
      dispatch(getFavouriteList(payload, page));

    }
  };

  const handleSearch = () => {
    var userData = {

      search: searchValue,
      per_page: pageSize
    }

    dispatch(getFavouriteList(userData, currentPage === currentPage ? 1 : currentPage));
  };
  if (isLoading || favouriteloading) {
    return <Spinners setLoading={setLoading} />;
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="heading">Wishlist Product List</h1>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleRemoveFavourite}
          onCloseClick={() => setDeleteModal(false)}
        />
        {isLoading ? <Spinners setLoading={setLoading} />
          :
          <DataTable
            data={favourite?.data || []}
            columns={columns} // Passing dynamic columns to DataTable
            // isAddButton={true}
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
      </div>
    </Fragment>
  );
};

export default FavouriteList;
