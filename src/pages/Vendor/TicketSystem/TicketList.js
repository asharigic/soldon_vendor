import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Spinners from '../../../components/Common/Spinner';
import { getticketslist } from '../../../store/vendor/tickets/action';
import DataTable from '../../../components/Common/DataTable';
import moment from 'moment';
import { AiTwotoneEye } from "react-icons/ai";
const ProjectStatus = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-warning"> Pending </Badge>;

    case "approved":
      return <Badge className="bg-success"> Approved </Badge>;
    case "active":
      return <Badge className="bg-success"> Active </Badge>;

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
const TicketList = (props) => {
  document.title = "Tickets | Quench";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getticketlists, ticketloading } = useSelector((state) => state.TicketData)
  const [isLoading, setLoading] = useState(ticketloading);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(15); // Default page size
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("vendoruser")) {
      navigate('/login');
    } else {
      const page = currentPage || 1;
      const limit = pageSize || 15;
      const payload = {
        per_page: limit,
        search: searchValue,
      };
      dispatch(getticketslist(payload, page));
      setLoading(false);
    }
  }, [props.success, currentPage, pageSize, dispatch]);
  useEffect(() => {
    if (getticketlists?.meta) {
      setTotalItems(getticketlists.meta.total); // Update total items count for pagination
    }
  }, [getticketlists]);

  const columns = useMemo(
    () => [
      {
        header: "No.",
        accessorKey: "id",
        cell: (cellProps) => {

          const rowIndex = cellProps.rowIndex;
          if (rowIndex === undefined || isNaN(rowIndex)) {
            return "-";
          }
          const globalIndex = (currentPage - 1) * pageSize + rowIndex + 1;
          return globalIndex;
        },
        enableColumnFilter: false,
        enableSorting: false,

      },

      {
        header: "Subject",
        accessorKey: "subject",
        cell: (cellProps) => (cellProps.row.subject ? <span>{cellProps.row.subject}</span> : "_"),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (cellProps) => (cellProps?.row?.created_at ? <span>{moment(cellProps?.row?.created_at).format('Do MMMM, YYYY')}</span> : "_"),
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
        header: "Action",
        accessorKey: "action",
        cell: (cellProps) => (

          <div className='text-center'>
            <button className="btn  btn-sm btn-primary rounded-0"
              // onClick={() => handleVieworderdetail(cellProps.row.id)} style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/show-ticket/${cellProps.row.id}`)}
            >
              <AiTwotoneEye /></button>
            &nbsp;


          </div >
        ),
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

    dispatch(getticketslist(userData, currentPage === currentPage ? 1 : currentPage));
  };
  if (isLoading || ticketloading) {
    return <Spinners setLoading={setLoading} />;
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="heading">Ticket List</h1>

        {isLoading ? <Spinners setLoading={setLoading} />
          :
          <DataTable
            data={getticketlists?.data || []}
            columns={columns} // Passing dynamic columns to DataTable
            pageSize={pageSize}
            isAddButton={true}
            totalItems={totalItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            SearchPlaceholder="Search..."
            addButtonText="Add Ticket"
            navigateTo="/add-ticket"
          />
        }
      </div>
    </Fragment>
  );
};

export default TicketList;
