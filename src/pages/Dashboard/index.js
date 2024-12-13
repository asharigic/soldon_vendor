import React, { Fragment, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { getrecentsoldproductslist, getdataordersummarylist, getsellingdatalist } from "../../store/vendor/dashboard/actions";
import Spinners from "../../components/Common/Spinner";
import { Card, CardBody, CardTitle, Col, Row, Badge } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getSoldProductList, getWalletChartDateList, getWalletChartList, getWalletList } from '../../store/vendor/wallet/actions';
import moment from "moment/moment";
//Import Breadcrumb
import "flatpickr/dist/themes/material_blue.css";
import { Link, useNavigate } from 'react-router-dom';
import DataTable from "../../components/Common/DataTable";
//i18n
import { withTranslation } from "react-i18next";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectStatus = ({ status }) => {
    switch (status) {
        case "pending":
            return <Badge className="bg-warning"> Pending </Badge>;

        case "approved":
            return <Badge className="bg-success"> Approved </Badge>;

        case "draft":
            return <Badge className="bg-danger"> Draft </Badge>;
        case "published":
            return <Badge className="badge-soft-secondary"> Published </Badge>;
        case "expired":
            return <Badge className="badge-soft-secondary"> Expired</Badge>;
        case "completed":
            <Badge className="bg-success">Completed</Badge>

        default:
            return <Badge className="bg-success"> {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()} </Badge>;
    }
};
const Dashboard = props => {

    //meta title
    document.title = "Dashboard | Quench";
    const navigate = useNavigate();
    const { soldproductdata, orderdatasummary, sellingdatasummary, dashboardloading } = useSelector((state) => state.DashboardData);
    const { wallet, walletchart, walletchartdate, soldproducts, loading, chartloading } = useSelector((state) => state.WalletData);
    const [username, setusername] = useState("Admin");

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(dashboardloading);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("vendoruser")) {
            const obj = JSON.parse(localStorage.getItem("vendoruser"));

            setusername(obj.username);

        }
    }, [props.success]);

    useEffect(() => {
        if (!localStorage.getItem('vendoruser')) {
            navigate('/login');
        } else {
            const page = currentPage || 1;
            const limit = pageSize || 15;
            const payload = {
                per_page: limit,
                search: searchValue,
            };
            dispatch(getWalletList());
            dispatch(getrecentsoldproductslist(payload, page));
            dispatch(getdataordersummarylist())
            dispatch(getsellingdatalist())
            setLoading(false);
        }
    }, [navigate]);


    useEffect(() => {
        if (soldproductdata?.meta) {
            setTotalItems(soldproductdata.meta.total);
        }
    }, [soldproductdata]);
    const columns = useMemo(
        () => [
            {
                header: "Order",
                accessorKey: "uuid",
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                header: "Item",
                accessorKey: "productname",
                cell: ({ row }) => {
                    return row.order_item.product
                        ? row.order_item.product.productname.charAt(0).toUpperCase() + row.order_item.product.productname.slice(1).toLowerCase()
                        : "_";
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Date",
                accessorKey: "placed_at",
                cell: ({ row }) => moment(row.placed_at).format('Do MMMM, YYYY'),
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => (cellProps?.row?.status ? <ProjectStatus status={cellProps?.row?.status} /> : "_"),

                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Total",
                accessorKey: "total",
                cell: (cellProps) => (cellProps.row.total ? <span><i className="bx bx-pound"></i>{cellProps.row.total}</span> : "_"),
                enableColumnFilter: false,
                enableSorting: false,
            },
        ],
        [currentPage, pageSize] // Recalculate when pageSize or currentPage changes
    );
    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: pageSize
        }

        dispatch(getrecentsoldproductslist(userData, currentPage === currentPage ? 1 : currentPage));
    }
    if (isLoading || dashboardloading) {
        return <Spinners setLoading={setLoading} />;
    };
    const data = {
        labels: ['Completed', 'Pending', 'Cancelled'], // Labels for each segment of the pie
        datasets: [
            {
                // data: [300, 50, 100], // Data values corresponding to each label
                data: [
                    orderdatasummary?.data?.completed,   // Completed data value
                    orderdatasummary?.data?.pending,     // Pending data value
                    orderdatasummary?.data?.cancelled    // Cancelled data value
                ],
                backgroundColor: ['#556ee6', '#53a33666', '#50a5f1'], // Colors for each segment
                hoverBackgroundColor: ['#FF6F61', '#5B9BF9', '#F9E04F'], // Hover colors for each segment
            },
        ],
    };

    return (
        <Fragment>
            <div className="container">
                {/* <div className="alert-success alert alert-success fade show">
                    <h4 className="alert-heading">Welcome to Quench {username}</h4>
                </div> */}
                <Card>
                    <CardBody>
                        <CardTitle className="mb-4">
                            <h1 className="heading">Order Summary</h1>
                        </CardTitle>
                        <Row>
                            <Col sm={4}>
                                <Card>
                                    <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                        <h5 style={{ marginLeft: "50px" }}>Balance available</h5>
                                    </CardTitle>
                                    <CardBody>
                                        <p><i className="bx bx-pound"></i>{wallet?.data?.available_balance}</p>
                                        <p>since the start of the current month</p>
                                    </CardBody>
                                </Card>
                                <Card style={{ marginTop: "20px" }}>
                                    <CardTitle style={{ backgroundColor: '#ede9e4', textAlign: 'left', padding: '10px 0' }}>
                                        <h5 style={{ marginLeft: "50px" }}>Earnings this month</h5>
                                    </CardTitle>
                                    <CardBody>
                                        <p><i className="bx bx-pound"></i>{wallet?.data?.available_balance}</p>
                                        <p>Currently available for payouts</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm="8">
                                <div className="mt-4 mt-sm-0">
                                    <Row sm={12}>
                                        <Col sm="12">
                                            <div className="mt-4 mt-sm-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                                                <Pie data={data} className="chartjs-chart" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Col sm="8">
                                <Row>
                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium small ">
                                                            <b>Total Orders:</b>
                                                        </p>
                                                        <h4 className="mb-0">{sellingdatasummary?.data?.total_orders ? sellingdatasummary?.data?.total_orders : "0"}</h4>
                                                    </div>
                                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                        <span class="avatar-title rounded-circle bg-primary"><i class="bx bx-copy-alt font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium small">
                                                            <b> Total Customers:</b>
                                                        </p>
                                                        <h4 className="mb-0">{sellingdatasummary?.data?.total_customers ? sellingdatasummary?.data?.total_customers : "0"}</h4>
                                                    </div>
                                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                        <span class="avatar-title rounded-circle bg-primary"><i class="bx bx-archive-in font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col md="4">
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium small">
                                                            <b>   Total Products:</b>
                                                        </p>
                                                        <h4 className="mb-0">{sellingdatasummary?.data?.total_products ? sellingdatasummary?.data?.total_products : "0"}</h4>
                                                    </div>
                                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                        <span class="avatar-title rounded-circle bg-primary"><i class="bx bx-purchase-tag-alt font-size-24"></i></span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>



                            </Col>
                        </Row>
                    </CardBody>
                </Card>

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
                                <h5 style={{ marginLeft: "50px" }}>Recent Orders</h5>
                            </CardTitle>
                            <CardBody>
                                {isLoading ? <Spinners setLoading={setLoading} />
                                    :
                                    <DataTable
                                        data={soldproductdata?.data || []}
                                        columns={columns} // Passing dynamic columns to DataTable
                                        pageSize={pageSize}
                                        totalItems={totalItems}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        setPageSize={setPageSize}
                                        searchValue={searchValue}
                                        setSearchValue={setSearchValue}
                                        handleSearch={handleSearch}
                                        SearchPlaceholder="Search..."
                                    />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        </Fragment>
    );
};

Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
