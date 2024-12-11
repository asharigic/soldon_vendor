import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFavouriteProduct, getFavouriteList } from '../../../store/vendor/favourite/actions';
import Spinners from '../../../components/Common/Spinner';
import './FavouriteList.css';
import DataTable from '../../../components/Common/DataTable';
import bgimg1 from '../../../assets/images/no-img.jpg';
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
          const imageSrc = cellProps.row.product_image || bgimg1; // Fallback URL
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
        cell: (cellProps) => (cellProps.row.product_stock_status ? <span>{cellProps.row.product_stock_status}</span> : "_"),

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
              onClick={() => handleRemoveFavourite(cellProps.row.product_id)}
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
  const handleRemoveFavourite = (productId) => {
    dispatch(deleteFavouriteProduct(productId));
    if (favouritesuccess) {
      dispatch(getFavouriteList());
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
        {/* {favouriteloading ? (
          <Spinners setLoading={setLoading} />
        ) : favourite?.data?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="th">Item</th>
                <th className="th">Name</th>
                <th className="th">Price</th>
                <th className="th">Stock</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favourite?.data?.map((item) => (
                <tr key={item.id}>
                  <td className="td">
                    <img
                      src={item.product_image}
                      alt={item.product_image === "" ? "" : item.product_name}
                      className="img"
                    />
                  </td>
                  <td className="td">{item.product_name}</td>
                  <td className="td">{item.product_price ? <span><i className="bx bx-pound"></i>{item.product_price}</span> : "_"}</td>
                  <td className="td">{item.product_stock_status}</td>
                  <td className="td">
                    <div className="button-container">
                      <button className="button" disabled style={{ cursor: "not-allowed" }}>Buy</button>
                      <button
                        className="button"
                        style={{ backgroundColor: "white", color: "black" }}
                        onClick={() => handleRemoveFavourite(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          
          </table>
        ) : (
          <p className="no-data">No favourite products found.</p>
        )} */}
          {isLoading ? <Spinners setLoading={setLoading} />
              :
              <DataTable
                data={favourite?.data || []}
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
      </div>
    </Fragment>
  );
};

export default FavouriteList;
