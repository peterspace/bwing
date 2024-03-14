import { useState, useEffect, useCallback } from 'react';
import MemoizedAdminTransactionsTable from './tables/AdminTransactionsTable';
import MemoizedAdminTransactionsTableMobile from './tables/AdminTransactionsTableMobile';
import NoTransactionFound from '../../components/NoTransactionFound';

const AdminRecord = (props) => {
  const { data, setPage } = props;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    formatTableData(data);
  }, []);

  const formatTableData = useCallback((data) => {
    const formattedTableData = data.reduce((accumulator, obj) => {
      const formattedObj = {
        id: obj._id,
        orderNo: obj.orderNo,
        status: obj.status,
        from: `${obj.fValue} ${obj.fToken.symbol.toUpperCase()}`,
        to: `${obj.tValue} ${obj.tToken.symbol.toUpperCase()}`,
        pin: obj.pin,
        dispatcherId: obj.dispatcherId,
        timeLeft: obj.timeLeft,
      };

      accumulator.push(formattedObj);
      return accumulator;
    }, []);

    setTableData(formattedTableData);
  }, []);

  return (
    <div className="container mx-auto bg-[#F3F3F3] dark:bg-bgDarkMode text-gray-900 dark:text-gray-100">
      {tableData.length ? (
        <>
          <div className="hidden xl:flex">
            <MemoizedAdminTransactionsTable
              data={data}
              tableData={tableData}
              setPage={setPage}
            />
          </div>
          <div className="flex xl:hidden">
            <MemoizedAdminTransactionsTableMobile
              data={data}
              tableData={tableData}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <NoTransactionFound />
      )}
    </div>
  );
};

export default AdminRecord;
