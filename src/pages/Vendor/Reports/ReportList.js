import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Input, Label, FormGroup } from 'reactstrap';
import Spinners from '../../../components/Common/Spinner';
import Spinearea from './Spinearea';
import { getSalesReportList } from '../../../store/vendor/reports/actions';

const ReportList = () => {
    document.title = 'Reports | Quench';

    const navigate = useNavigate();
    const { reports, reportsloading } = useSelector((state) => state.ReportsData);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(reportsloading);
    const [reportData, setReportData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            const currentDate = new Date();
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            const startFormatted = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
            const endFormatted = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;

            setFromDate(startFormatted);
            setToDate(endFormatted);

            const selectedDate = {
                start_date: startFormatted,
                end_date: endFormatted
            };
            dispatch(getSalesReportList(selectedDate));
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (reports?.data) {
            setReportData(reports?.data);
        }
    }, [reports]);


    const chartData = Object.keys(reportData).map((month, index) => ({
        index: index + 1,
        total_orders: reportData[month]?.total_orders || 0,
        total_sales: reportData[month]?.total_sales || 0,
        total_commissions: reportData[month]?.total_commissions || 0,
        formatted_month: month
    }));

    const handleDateChange = () => {
        const selectedDate = {
            start_date: fromDate,
            end_date: toDate
        };
        dispatch(getSalesReportList(selectedDate));
    };

    if (isLoading || reportsloading) {
        return <Spinners setLoading={setLoading} />;
    }

    return (
        <Fragment>
            <div className="container">
                <h1 className="heading">Sales Reports</h1>
                <Row>
                    {/* Left Section: Sales Summary */}
                    <Col xl={3}>
                        <Card>
                            <CardBody>
                                <div>
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
                                    <h5>Sales: <i className="bx bx-pound"></i>{reports?.summary?.salesTotal}</h5>
                                    <h5>Orders: {reports?.summary?.orderTotal}</h5>
                                    <h5>Commissions: <i className="bx bx-pound"></i>{reports?.summary?.commissionTotal}</h5>
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
                                <Spinearea dataColors='["--bs-primary", "--bs-success"]' data={chartData} />
                            </Col>
                        </Row>
                        <Row>
                            {/* Bottom Graph */}
                            <Col>
                                <span className="mb-4">Number of Orders</span>
                                <Spinearea dataColors='["--bs-primary", "--bs-success"]' chart="NumberofOrders" data={chartData} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default ReportList;
