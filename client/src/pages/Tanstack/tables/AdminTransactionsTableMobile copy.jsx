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
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IoCopyOutline } from 'react-icons/io5';
import { DownloadToExcel } from '../components/lib/XlsxAdmin';
import { IoSearch } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BsInfoSquare } from 'react-icons/bs';

import { PiExportBold } from 'react-icons/pi';
import DebouncedInput from '../components/ui/DebouncedInput';
import { statuses } from '../../../constants/statuses';
import Popover from '../../../components/Popover';
import PopoverOrder from '../../../components/PopoverOrder';
import { getTransactionByTxIdService } from '../../../services/apiService';
import { getTransactionByTxIdInternal } from '../../../redux/features/transaction/transactionSlice';
import { useDispatch } from 'react-redux';

const AdminTransactionsTableMobile = ({ data, tableData, setPage }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [isGoToPageDisabled, setIsGoToPageDisabled] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newData, setNewData] = useState();
  console.log(newData);

  const columnsMobile = useMemo(() => {
    const baseColumns = [
      {
        Header: 'Order №',
        accessor: 'orderNo',
        sortType: 'basic',
        Cell: ({ value }) => {
          const getSelectedRowData = data?.find(
            (item) => item.orderNo === value
          );
          const { orderNo } = getSelectedRowData;

          return (
            <div
              className="flex items-center"
              onClick={() => {
                updateTxData(getSelectedRowData);
              }}
            >
              <span className="cursor-pointer text-gray-900 dark:text-gray-100 font-normal text-sm">
                {orderNo}
              </span>
            </div>
          );
        },
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
      columns: columnsMobile,
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

  const renderTimeToLeft = (timeToLeft) => {
    let timeLeftFormatted;
    const targetDate = new Date(timeToLeft);

    const currentTime = new Date();

    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      return (timeLeftFormatted = '00:00:00');
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    timeLeftFormatted = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return timeLeftFormatted;
  };

  async function updateTxData(txDataUpdate) {
    const response = await getTransactionByTxIdService(txDataUpdate?._id);
    if (response) {
      setNewData(response);
      dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
      setPage('Update');
    }
  }

  return (
    <div>
      <div className="flex my-6 w-[286px]">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between items-center w-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2 w-full">
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
                  className="w-full h-10 py-4 px-2 pl-10 pr-2 rounded-lg shadow-md outline-none active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-700 dark:placeholder-darkgray-500"
                  placeholder="Search"
                />
                <div className="flex items-center ml-2">
                  <button
                    onClick={() => DownloadToExcel(data)}
                    className="m-0 cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-2 py-2 w-fit"
                  >
                    {' '}
                    <div className="flex flex-row gap-2">
                      <PiExportBold size={20} color="#ffffff" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
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
                  <div className="origin-top-right w-full absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
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
          </div>
        </div>
      </div>

      {/* <div className="rounded-lg bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 min-h-[595px] overflow-scroll"> */}
      <div className="rounded-lg bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 min-h-[595px] overflow-scroll w-fit">
        <div className="relative mt-2">
          <table
            {...getTableProps()}
            // className="min-w-full table-fixed font-normal"
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
                      className="px-6 py-4 text-[12px] leading-6 font-medium text-gray-900 dark:text-gray-100"
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
                  <tr {...row.getRowProps()} className="text-left">
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
          <div className="flex flex-row"></div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-center items-center ">
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
              <span className="mx-2 text-[12px] font-medium text-gray-900 dark:text-gray-100 ">
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
            </div>
            <div className="flex flex-row items-center rounded-lg border-[1px] border-solid border-lightslategray-300 py-1">
              <span className="ml-6 mr-2 text-[12px] font-medium text-gray-900 dark:text-gray-100">
                Go to
              </span>
              <input
                type="number"
                value={pageNumber}
                onChange={handlePageInputChange}
                className="h-[40px] w-[60px] p-2 rounded-lg bg-transparent border border-solid border-[#5046E5] text-gray-900 dark:text-gray-100 box-border text-center"
              />
              <button
                disabled={isGoToPageDisabled}
                onClick={handleGoToPage}
                className={`m-0 ml-2 flex h-[40px] w-fit items-center justify-center rounded-md px-4 py-[10px] text-[12px] font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 active:bg-[#5046E5] active:shadow-none ${
                  isGoToPageDisabled
                    ? 'cursor-not-allowed bg-[#BAB9C1] text-[#E1E1E1]'
                    : 'bg-[#5046E5] text-white'
                }`}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MemoizedAdminTransactionsTableMobile = memo(AdminTransactionsTableMobile);

export default MemoizedAdminTransactionsTableMobile;
