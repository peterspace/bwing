import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import MemoizedAdminSupportTable from './tables/AdminSupportTable';
import NoTransactionFound from '../../components/NoTransactionFound';

const AdminSupportRecord = (props) => {
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
        service: obj.service,
        subService: obj.subService,
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
        <MemoizedAdminSupportTable data={data} tableData={tableData} setPage={setPage} />
      ) : (
        <NoTransactionFound />
      )}
    </div>
  );
};

export default AdminSupportRecord;
