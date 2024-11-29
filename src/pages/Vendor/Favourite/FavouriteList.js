import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFavouriteList } from '../../../store/vendor/favourite/actions';
import Spinners from '../../../components/Common/Spinner';

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
    // Dispatch the remove action here
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    th: {
      backgroundColor: '#f8f9fa',
      color: '#333',
      textAlign: 'left',
      padding: '10px',
      border: '1px solid #ddd',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    img: {
      width: '100px',
      height: 'auto',
      borderRadius: '4px',
    },
    button: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#c82333',
    },
    noData: {
      textAlign: 'center',
      color: '#888',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Favourite Product List</h1>
      {favouriteloading ? (
        <Spinners setLoading={setLoading} />
      ) : favourite?.data?.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {favourite?.data?.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    style={styles.img}
                  />
                </td>
                <td style={styles.td}>{item.product_name}</td>
                <td style={styles.td}>{item.product_price}</td>
                <td style={styles.td}>{item.product_stock_status}</td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handleRemoveFavourite(item.product_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noData}>No favourite products found.</p>
      )}
    </div>
  );
};

export default FavouriteList;
