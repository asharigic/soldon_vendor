import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWalletChartDateList, getWalletChartList, getWalletList } from '../../../store/vendor/wallet/actions';
import Spinearea from './Spinearea';
import { Card, CardBody, CardTitle, Col, FormGroup, Row } from 'reactstrap';
import Spinners from '../../../components/Common/Spinner';
import Select from 'react-select';

const WalletList = () => {
    document.title = 'Wallet | Quench';

    const navigate = useNavigate();

    const { wallet, walletchart, walletchartdate, loading, chartloading } = useSelector((state) => state.WalletData);

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(loading);
    const [walletChart, setWalletChart] = useState([]);
    const [walletChartDates, setWalletChartDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            const currentDate = new Date();
            const DateFormatted = currentDate.toLocaleString('en-US', {
                month: 'short', // Use 'long' for full month name
                year: 'numeric',
            });

            const options = {
                value: DateFormatted,
                label: DateFormatted,
            };

            dispatch(getWalletList());
            dispatch(getWalletChartDateList());
            handleDateChange(options);
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (walletchart?.data) {
            setWalletChart(walletchart?.data);
        }
    }, [walletchart]);

    useEffect(() => {
        if (walletchartdate?.status && Array.isArray(walletchartdate.data)) {
            setWalletChartDates(walletchartdate.data);
        }
    }, [walletchartdate]);

    const options = walletChartDates.map((date) => ({
        value: date,
        label: date,
    }));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedDate = {
            date: date.value,
        };
        dispatch(getWalletChartList(selectedDate));  // Dispatch the action with the formatted date
    };

    if (isLoading || loading) {
        return <Spinners setLoading={setLoading} />;
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
                            <CardTitle
                                style={{
                                    backgroundColor: '#ede9e4',
                                    textAlign: 'left',
                                    padding: '10px 0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h5 style={{ marginLeft: "50px" }}>Earnings Overview</h5>
                                <div style={{ marginRight: "50px" }}>
                                    <Select
                                        options={options}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        placeholder="Select a date"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                padding: '5px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                            }),
                                        }}
                                    />
                                </div>
                            </CardTitle>
                            <CardBody>
                                <div style={{ height: "200px" }}>
                                    {chartloading ?
                                        <Spinners setLoading={setLoading} />
                                        :
                                        <Spinearea
                                            dataColors='["--bs-primary", "--bs-success"]'
                                            chart="NumberofOrders"
                                            chartData={walletChart}
                                        />
                                    }
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
