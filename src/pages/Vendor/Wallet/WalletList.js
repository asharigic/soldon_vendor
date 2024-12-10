import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSoldProductList, getWalletChartDateList, getWalletChartList, getWalletList } from '../../../store/vendor/wallet/actions';
import Spinearea from './Spinearea';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import Spinners from '../../../components/Common/Spinner';
import Select from 'react-select';
import DataTable from '../../../components/Common/DataTable';
import { format } from 'date-fns';

const WalletList = () => {
    document.title = 'Wallet | Quench';

    const navigate = useNavigate();

    const { wallet, walletchart, walletchartdate, soldproducts, loading, chartloading } = useSelector((state) => state.WalletData);

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(loading);
    const [walletChart, setWalletChart] = useState([]);
    const [walletChartDates, setWalletChartDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(15);
    const [totalItems, setTotalItems] = useState(0);

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

            const page = currentPage || 1;
            const limit = pageSize || 15;
            const payload = {
                per_page: limit,
                search: searchValue,
            };

            dispatch(getWalletList());
            dispatch(getWalletChartDateList());
            dispatch(getSoldProductList(payload, page));
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

    useEffect(() => {
        if (soldproducts?.meta) {
          setTotalItems(soldproducts.meta.total);
        }
      }, [soldproducts]);

    const options = walletChartDates.map((date) => ({
        value: date,
        label: date,
    }));

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
                header: "Date Sold",
                accessorKey: "placed_at",
                cell: ({ row }) => format(new Date(row.placed_at), "do MMMM, yyyy"),
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => (cellProps.row.status ? <span style={{ color: "#5bc7f0" }}>{cellProps.row.status}</span> : "_"),
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedDate = {
            date: date.value,
        };
        dispatch(getWalletChartList(selectedDate));  // Dispatch the action with the formatted date
    };

    const handleSearch = () => {
        var userData = {

            search: searchValue,
            per_page: pageSize
        }

        dispatch(getSoldProductList(userData, currentPage === currentPage ? 1 : currentPage));
    };

    if (isLoading || loading) {
        return <Spinners setLoading={setLoading} />;
    };
    console.log("soldproducts:", soldproducts);

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
                                <h5 style={{ marginLeft: "50px" }}>Your earnings</h5>
                            </CardTitle>
                            <CardBody>
                                {isLoading ? <Spinners setLoading={setLoading} />
                                    :
                                    <DataTable
                                        data={soldproducts?.data || []}
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

export default WalletList;
