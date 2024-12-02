import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFavouriteProduct, getFavouriteList } from '../../../store/vendor/favourite/actions';
import Spinners from '../../../components/Common/Spinner';
import './FavouriteList.css';

const FavouriteList = (props) => {
  document.title = "Favourites | Quench";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favourite, favouriteerror, favouriteloading, favouritesuccess, favouriteupdate } = useSelector((state) => state.FavouriteData);
  const [isLoading, setLoading] = useState(favouriteloading);

  useEffect(() => {
    if (!localStorage.getItem("vendoruser")) {
      navigate('/login');
    } else {
      dispatch(getFavouriteList());
      setLoading(false);
    }
  }, [props.success]);

  const handleRemoveFavourite = (productId) => {
    dispatch(deleteFavouriteProduct(productId));
    if (favouritesuccess) {
      dispatch(getFavouriteList());
    }
  };


  return (
    <Fragment>
      <div className="container">
        <h1 className="heading">Favourite Product List</h1>
        {favouriteloading ? (
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
        )}
      </div>
    </Fragment>
  );
};

export default FavouriteList;
