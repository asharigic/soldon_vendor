import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Row, Input, Label, FormGroup } from 'reactstrap';
import Spinners from '../../../components/Common/Spinner';
import Spinearea from './Spinearea';

const ReportList = () => {
    document.title = 'Reports | Quench';

    const navigate = useNavigate();
    const { reports, reportsloading } = useSelector((state) => state.ReportsData);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(reportsloading);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            setLoading(false);
            // dispatch(getSalesReportList());
        }
    }, [navigate]);

    const handleDateChange = () => {
        console.log('From Date:', fromDate);
        console.log('To Date:', toDate);
        // Dispatch actions or fetch reports based on selected date range
        // dispatch(fetchReportsByDateRange({ fromDate, toDate }));
    };

    if (isLoading || reportsloading) {
        return <Spinners setLoading={setLoading} />;
    }

    return (
        <Fragment>
            <div className="container">
                <h1 className="heading">Reports</h1>
                <Row>
                    {/* Left Section: Sales Summary */}
                    <Col xl={3}>
                        <Card style={{ height: "460px" }}>
                            <CardBody>
                                <div>
                                    <h3 className="card-title">Sales Reports</h3>
                                    <FormGroup>
                                        <Label for="fromDate">From:</Label>
                                        <Input
                                            type="date"
                                            id="fromDate"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="toDate">To:</Label>
                                        <Input
                                            type="date"
                                            id="toDate"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                    </FormGroup>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleDateChange}
                                    >
                                        Filter
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h5 className="card-subtitle">Total Sales Value</h5>
                                    <h1 className="marketking_total_b2b_sales_today m-b-0 m-t-30">
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span className="woocommerce-Price-currencySymbol">£</span>2,608.62
                                            </bdi>
                                        </span>
                                    </h1>
                                    <h6 className="text-muted">Sales</h6>
                                    <h3 className="marketking_number_orders_today m-t-30 m-b-0">15</h3>
                                    <h6 className="text-muted">Orders</h6>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Right Section: Graphs */}
                    <Col xl={9}>
                        <Row>
                            {/* Top Graph */}
                            <Col>
                                <span className="mb-4">Average Sales</span>
                                <Spinearea dataColors='["--bs-primary", "--bs-success"]' />
                            </Col>
                        </Row>
                        <Row>
                            {/* Bottom Graph */}
                            <Col>
                                <span className="mb-4">Number of Orders</span>
                                <Spinearea dataColors='["--bs-primary", "--bs-success"]' chart="NumberofOrders" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default ReportList;
