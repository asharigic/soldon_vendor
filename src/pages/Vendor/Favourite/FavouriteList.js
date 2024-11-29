import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFavouriteList } from '../../../store/vendor/favourite/actions';

const FavouriteList = (props) => {
  document.title = "Favourite | Quench";
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
console.log("favourite", favourite);

  return (
    <div>
      Favourite List
    </div>
  )
}

export default FavouriteList;
