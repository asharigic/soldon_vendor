import React, { useState } from 'react';
import { Table, Pagination, Form, Button } from 'react-bootstrap';
import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Input } from 'reactstrap';

const DataTable = ({
  data,
  columns,
  pageSize,
  isAddButton,
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

  // Sorting state
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  // Handle sorting
  const handleSort = (column) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="me-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Form.Select value={pageSize} onChange={handlePageSizeChange} className="form-select" style={{ width: 100 }}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </Form.Select>
        <div className="d-flex" style={{ gap: '10px' }}>
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
              style={{ paddingRight: '40px' }} // Make space for the button inside the input
            />
            <Button
              type="button"
              className="btn btn-success"
              style={{
                position: 'absolute',
                right: '5px', // Align button to the right inside the input field
                top: '50%',
                transform: 'translateY(-62%)', // Center the button vertically
                width: '30px',
                height: '30px',
                padding: 0, // Remove padding to fit the button well inside
              }}
              onClick={handleSearch}
            >
              <FiSearch />
            </Button>
          </div>
          {isAddButton && (
            <div>
              <button className="btn btn-dark" onClick={() => navigate('/add-product')}>Add Product</button>
            </div>
          )}
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => handleSort(column.accessorKey)} style={{ cursor: 'pointer' }}>
                {column.header}
                {sortColumn === column.accessorKey && (
                  <span style={{ marginLeft: '5px' }}>
                    {sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No Data found.
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const cellValue = column.cell ? column.cell({ row, rowIndex }) : row[column.accessorKey];
                  return <td key={colIndex}>{cellValue}</td>;
                })}
              </tr>
            ))
          )}
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
    </div>
  );
};

export default DataTable;
