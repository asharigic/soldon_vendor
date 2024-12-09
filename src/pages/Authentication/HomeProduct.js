import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeProductsList } from '../../store/auth/homeproduct/actions';
import Spinners from '../../components/Common/Spinner';
const HomeProductListPage = () => {
    document.title = "Home | Quench";
    const { homeproducts, homeproductloading, homeerror } = useSelector((state) => state.HomeProductData);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(15); // Default page size
    useEffect(() => {
        const page = currentPage || 1;
        const limit = pageSize || 15;
        const payload = {
            per_page: limit,
            search: searchValue,
        };
        dispatch(getHomeProductsList(payload, page));// Dispatch action to fetch products list
    }, [currentPage, pageSize, dispatch]);
    if (isLoading || homeproductloading) {
        return <Spinners setLoading={setIsLoading} />;
    }
    return (
        <Fragment>
            {isLoading ? <Spinners setLoading={setIsLoading} />
                :
                <div className="container">
                    <h1>Product List </h1>
                </div>
            }
        </Fragment>
    );
};

export default HomeProductListPage;
