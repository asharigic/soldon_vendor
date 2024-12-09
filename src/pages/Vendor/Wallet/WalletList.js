import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWalletChartList, getWalletList } from '../../../store/vendor/wallet/actions';
import Spinearea from './Spinearea';
import { Card, CardBody, Col, FormGroup, Row } from 'reactstrap';

const WalletList = () => {
    document.title = 'Wallet | Quench';

    const navigate = useNavigate();

    const { wallet, walletchart, loading } = useSelector((state) => state.WalletData);

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(loading);
    const [walletChart, setWalletChart] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            const currentDate = new Date();
            const DateFormatted = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

            const selectedDate = {
                date: DateFormatted,
            };
            dispatch(getWalletList());
            dispatch(getWalletChartList(selectedDate));
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (walletchart?.data) {
            setWalletChart(walletchart?.data);
        }
    }, [walletchart]);

    const handleDateChange = (date) => {
        dispatch(getWalletChartList(date));  // Dispatch the action with the formatted date
    };

    return (
        <Fragment>
            <div className="container">
                <h1 className="heading">Wallet</h1>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-end align-items-center">
                                    <div className="d-flex justify-content-end align-items-end" style={{ width: "50%" }}>
                                        <div>
                                            <FormGroup className="mb-0">
                                                Select Date
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Spinearea dataColors='["--bs-primary", "--bs-success"]' chart="NumberofOrders" chartData={walletChart} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default WalletList;
