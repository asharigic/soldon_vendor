import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWalletChartList, getWalletList } from '../../../store/vendor/wallet/actions';
import Spinearea from './Spinearea';
import { Card, CardBody, CardTitle, Col, FormGroup, Row } from 'reactstrap';

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
                    <Col md={4}>
                        <Card>
                            <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                <h5 style={{ marginLeft: "50px" }}>Earnings this month</h5>
                            </CardTitle>
                            <CardBody>
                                <p><i className="bx bx-pound"></i>{wallet?.data?.this_month_earnings}</p>
                                <p>since the start of the current month</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                <h5 style={{ marginLeft: "50px" }}>Balance available</h5>
                            </CardTitle>
                            <CardBody>
                                <p><i className="bx bx-pound"></i>{wallet?.data?.available_balance}</p>
                                <p>currently available for payouts</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                <h5 style={{ marginLeft: "50px" }}>Total earnings</h5>
                            </CardTitle>
                            <CardBody>
                                <p><i className="bx bx-pound"></i>{wallet?.data?.total_earnings}</p>
                                <p>(<i className="bx bx-pound"></i>0.00 earnings in the last 30 days)</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


                <Row style={{ marginTop: "20px" }}>
                    <Col>
                        <Card>
                            <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                <h5 style={{ marginLeft: "50px" }}>Earnings Overview</h5>
                            </CardTitle>
                            <CardBody>
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
