import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWalletChartList, getWalletList } from '../../../store/vendor/wallet/actions';

const WalletList = () => {
    document.title = 'Wallet | Quench';

    const navigate = useNavigate();

    const { wallet, walletchart, loading } = useSelector((state) => state.WalletData);

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(loading);
    const [date, setDate] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            debugger
            const currentDate = new Date();
            const DateFormatted = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
            setDate(DateFormatted);
            const selectedDate = {
                date: DateFormatted,
            };
            dispatch(getWalletList());
            dispatch(getWalletChartList(selectedDate));
            setLoading(false);
        }
    }, [navigate]);


    return (
        <Fragment>
            Wallet
        </Fragment>
    )
}

export default WalletList;
