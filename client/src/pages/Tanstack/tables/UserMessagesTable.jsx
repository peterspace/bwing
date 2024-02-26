/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState, memo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineLeft,
} from 'react-icons/ai';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { DownloadMessagesToExcel } from '../components/lib/DownloadMessagesToExcel';
import { IoSearch } from 'react-icons/io5';

import { PiExportBold } from 'react-icons/pi';
import DebouncedInput from '../components/ui/DebouncedInput';

const statuses = {
  Active: {
    name: 'Active',
    color: 'bg-[#089708]',
  },
  Pending: {
    name: 'Pending',
    color: 'bg-[#FFA500]',
  },
  Resolved: {
    name: 'Resolved',
    color: 'bg-[#800080]',
  },
  Closed: {
    name: 'Closed',
    color: 'bg-[#0000FF]',
  },

  statusList: ['Active', 'Pending', 'Resolved', 'Closed'],
};

const UserMessagesTable = ({
  data,
  tableData,
  setActiveMessage,
  setIsSelectMessage,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isGoToPageDisabled, setIsGoToPageDisabled] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = useMemo(() => {
    const baseColumns = [
      {
        Header: 'Order №',
        accessor: 'orderNo',
        sortType: 'basic',
      },
      {
        Header: 'Ticket №',
        accessor: 'ticketNumber',
        sortType: 'basic',
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortType: 'basic',
        Cell: ({ row }) => {
          const { status } = row.values;
          return (
            <div className="flex items-center">
              <span
                className={`w-2.5 h-2.5 mr-2 rounded-md ${statuses[status].color}`}
              />
              <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                {status}
              </span>
            </div>
          );
        },
      },
      {
        Header: 'Subject',
        accessor: 'subject',
        sortType: 'basic',
        Cell: ({ value }) =>
          value ? <div className="font-bold">{value}</div> : <div>-</div>,
      },
      {
        Header: 'Service',
        accessor: 'service',
        sortType: 'basic',
      },
      {
        Header: 'Sub-service',
        accessor: 'subService',
        sortType: 'basic',
      },
      {
        Header: 'Time',
        accessor: 'updatedAt',
        sortType: 'basic',
        Cell: ({ value }) => (value ? <div>{value}</div> : <div>-</div>),
      },
      {
        accessor: 'id',
        Cell: ({ value }) => {
          const getSelectedRowData = data?.find((item) => item._id === value);

          return (
            <div className="flex justify-center select-none text-gray-900 dark:text-gray-100 rounded-lg">
              <div
                onClick={() => {
                  setActiveMessage(getSelectedRowData);
                  setIsSelectMessage(true);
                }}
                className="flex items-center p-2 gap-2 text-rose-600 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer transition-all rounded-lg border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
              >
                <MdOutlineOpenInNew size={24} />
              </div>
            </div>
          );
        },
      },
    ];
    return baseColumns;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { pageIndex } = state;

  useEffect(() => {
    if (pageNumber > pageCount || pageNumber < 1) {
      setIsGoToPageDisabled(true);
    } else {
      setIsGoToPageDisabled(false);
    }
  }, [pageNumber, pageCount]);

  useEffect(() => {
    if (status?.name) {
      setGlobalFilter(status?.name);
    }
  }, [status]);

  useEffect(() => {
    setGlobalFilter(searchTerm);
  }, [searchTerm]);

  const handlePageInputChange = (e) => {
    const inputPage = e.target.value;
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      setPageNumber(pageNumber);
    }
  };

  const handleGoToPage = () => {
    if (pageNumber <= pageCount && pageNumber >= 1) {
      gotoPage(pageNumber - 1);
    }
  };

  const handleToggleDropdown = () => {
    setSearchTerm('');
    setIsStatusDropdownOpen((prev) => !prev);
  };

  const handleSelectStatus = (status) => {
    setStatus(status);
    setIsStatusDropdownOpen(false);
  };

  return (
    <div>
      <div className="flex my-6">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between items-center w-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between">
              <div className="relative flex items-center gap-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
                  <IoSearch color={'#4f46e5'} size={20} />
                </div>

                <DebouncedInput
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value)}
                  onFocus={() => {
                    if (status) {
                      setStatus(null);
                      setGlobalFilter('');
                    }
                  }}
                  className="w-80 h-10 py-4 px-2 pl-10 pr-2 rounded-lg shadow-md outline-none active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-700 dark:placeholder-darkgray-500"
                  placeholder="Search"
                />
              </div>

              <div className="relative inline-block text-left ml-6">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-80 h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    onClick={handleToggleDropdown}
                  >
                    <div className="flex w-full justify-between items-center">
                      {status ? (
                        <>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <span
                                className={`w-2.5 h-2.5 mr-2 rounded-md ${status.color}`}
                              />
                              <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                                {status.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex h-full items-center">
                            {isStatusDropdownOpen ? (
                              <FaChevronUp size={12} color="#111111" />
                            ) : (
                              <FaChevronDown size={12} color="#111111" />
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex w-full items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-700">
                            {'Status'}
                          </span>
                          {isStatusDropdownOpen ? (
                            <FaChevronUp size={16} />
                          ) : (
                            <FaChevronDown size={16} />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                {isStatusDropdownOpen && (
                  <div className="origin-top-right w-80 absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
                    <div className="max-h-62 overflow-y-auto">
                      {statuses.statusList.map((status, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer"
                          onClick={() => handleSelectStatus(statuses[status])}
                        >
                          <div className="flex items-center">
                            <span
                              className={`w-2.5 h-2.5 mr-2 rounded-md ${statuses[status].color}`}
                            />
                            <span>{statuses[status].name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => DownloadMessagesToExcel(data)}
                className="m-0 cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-2 py-2 w-fit"
              >
                {' '}
                <div className="flex flex-row gap-2">
                  <PiExportBold size={20} color="#ffffff" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 min-h-[595px]">
        <div className="relative mt-2">
          <table
            {...getTableProps()}
            className="min-w-full table-fixed font-normal"
          >
            <thead className="bg-gray-10">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left border-b border-solid border-gray-300"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-4 text-base leading-6 font-medium text-gray-900 dark:text-gray-100"
                    >
                      <div className="flex">{column.render('Header')}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="py-6">
              {page.map((row) => {
                prepareRow(row);
                return (
                  // <div className="bg-chizzySnow dark:bg-gray-1000 rounded-lg border-[1px] border-solid border-lightslategray-300">
                  //   <tr
                  //     {...row.getRowProps()}
                  //     className="text-left cursor-pointer"
                  //   >
                  //     {row.cells.map((cell) => {
                  //       return (
                  //         <td
                  //           {...cell.getCellProps()}
                  //           className="whitespace-nowrap px-6 py-3"
                  //         >
                  //           {cell.render('Cell')}
                  //         </td>
                  //       );
                  //     })}
                  //   </tr>
                  // </div>

                  <tr
                    {...row.getRowProps()}
                    className="text-left"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="whitespace-nowrap px-6 py-3"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount !== 1 ? (
        <div className="pagination mt-8 flex items-center justify-center self-center">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } flex h-10 w-10 items-center justify-center rounded-lg p-2 m-0 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineDoubleLeft
              size={16}
              color={!canPreviousPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } ml-2 flex h-10 w-10 items-center justify-center rounded-lg p-2 m-0 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineLeft
              size={16}
              color={!canPreviousPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <span className="mx-6 text-base font-medium text-gray-900 dark:text-gray-100 ">
            {`Page ${pageIndex + 1} of ${pageCount}`}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={` ${
              !canNextPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } m-0 mr-2 flex h-10 w-10 items-center justify-center rounded-lg p-2 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineRight
              size={16}
              color={!canNextPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`${
              !canNextPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } m-0 flex h-10 w-10 items-center justify-center rounded-lg p-2 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineDoubleRight
              size={16}
              color={!canNextPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>

          <div className="flex items-center">
            <span className="ml-6 mr-2 text-base font-medium text-gray-900 dark:text-gray-100">
              Go to
            </span>
            <input
              type="number"
              value={pageNumber}
              onChange={handlePageInputChange}
              className="h-[40px] w-[60px] p-2 rounded-lg bg-transparent border border-solid border-[#5046E5] text-gray-900 dark:text-gray-100 box-border"
            />
            <button
              disabled={isGoToPageDisabled}
              onClick={handleGoToPage}
              className={`m-0 ml-2 flex h-[40px] w-fit items-center justify-center rounded-md px-4 py-[10px] text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 active:bg-[#5046E5] active:shadow-none ${
                isGoToPageDisabled
                  ? 'cursor-not-allowed bg-[#BAB9C1] text-[#E1E1E1]'
                  : 'bg-[#5046E5] text-white'
              }`}
            >
              Go
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MemoizedUserMessagessTable = memo(UserMessagesTable);

export default MemoizedUserMessagessTable;
