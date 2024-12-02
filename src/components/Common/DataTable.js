import React from 'react';
import { Table, Pagination, Spinner, Form, Button } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import { Input } from 'reactstrap';

const DataTable = ({
    data,
    columns,
    pageSize,
    totalItems,
    currentPage,
    setCurrentPage,
    setPageSize,
    handleSearch,
    searchValue,
    setSearchValue,
    SearchPlaceholder
}) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle page size change
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page when page size changes
    };

    return (
        <div>
           
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <Input
                        value={searchValue ?? ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        className="form-control search-box me-2 mb-2"
                        placeholder={SearchPlaceholder}
                        style={{ paddingRight: '40px' }}  // Make space for the button inside the input
                    />
                    <Button
                        type="button"
                        className="btn btn-success"
                        style={{
                            position: 'absolute',
                            right: '5px',  // Align button to the right inside the input field
                            top: '50%',
                            transform: 'translateY(-50%)',  // Center the button vertically
                            width: '30px',
                            height: '30px',
                            padding: 0,  // Remove padding to fit the button well inside
                        }}
                        onClick={handleSearch}
                    >
                        <FiSearch />
                    </Button>
                </div>
                <Form.Select value={pageSize} onChange={handlePageSizeChange} className="form-select" style={{ width: 100 }}>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </Form.Select>
            </div>
            &nbsp;
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} style={{textAlign:'center'}}>No Data found.</td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (

                                <tr key={rowIndex}>
                                    {columns.map((column, colIndex) => {
                                        const cellValue = column.cell ? column.cell({ row, rowIndex }) : row[column.accessorKey];
                                        return <td key={colIndex}>{cellValue}</td>;
                                    })}
                                </tr>
                            )
                            ))
                    }
                    
                </tbody>
            </Table>

            {/* Pagination controls */}
            <div className="pagination-container">


                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
            {/* </>
            )} */}
        </div>
    );
};

export default DataTable;
