import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import MemoizedAdminProfitsTable from './tables/AdminProfitsTable';
import NoTransactionFound from '../../components/NoTransactionFound';

const AdminProfitRecord = (props) => {
  const { data } = props;
  const [tableData, setTableData] = useState([]);

  console.log({ dataAdminProfitRecord: data });

  useEffect(() => {
    formatTableData(data);
  }, []);

  const formatTableData = useCallback((data) => {
    const formattedTableData = data.reduce((accumulator, obj) => {
      //===={Main}====================
      const formattedObj = {
        id: obj._id,
        orderNo: obj.orderNo,
        status: obj.id.status, // from populated data
        from: `${obj.fValue} ${obj.fToken.symbol.toUpperCase()}`,
        to: `${obj.tValue} ${obj.tToken.symbol.toUpperCase()}`,
        profitDirect: `${obj.profitDirect} ${obj.tToken.symbol.toUpperCase()}`,
        profitUSD: `${obj.profitUSD} USD`,
      };

      //===={testing}====================

      // const formattedObj = {
      //   id: obj._id,
      //   orderNo: obj.orderNo,
      //   status: obj.status, // from populated data
      //   from: `${obj.fValue} ${obj.fToken.symbol.toUpperCase()}`,
      //   to: `${obj.tValue} ${obj.tToken.symbol.toUpperCase()}`,
      //   profitDirect: `${obj.fValue} ${obj.tToken.symbol.toUpperCase()}`,
      //   profitUSD: `${obj.fValue} USD`,
      // };

      accumulator.push(formattedObj);
      return accumulator;
    }, []);

    setTableData(formattedTableData);
  }, []);

  return (
    <div className="container mx-auto bg-[#F3F3F3] dark:bg-bgDarkMode text-gray-900 dark:text-gray-100">
      {tableData.length ? (
        <MemoizedAdminProfitsTable data={data} tableData={tableData} />
      ) : (
        <NoTransactionFound />
      )}
      {/* <MemoizedAdminProfitsTable data={data} tableData={tableData} /> */}
    </div>
  );
};

export default AdminProfitRecord;
