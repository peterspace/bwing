import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import MemoizedUserMessagessTable from './tables/UserMessagesTable';
import NoTransactionFound from '../../components/NoTransactionFound';

const UserMessagesRecord = (props) => {
  const { data, setActiveMessage, setIsSelectMessage } = props;
  const [tableData, setTableData] = useState([]);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  };
  // console.log(new Intl.DateTimeFormat("en-US", options).format(date));

  const timeFormat = new Intl.DateTimeFormat('en-us', options);

  useEffect(() => {
    formatTableData(data);
  }, []);

  const formatTableData = useCallback((data) => {
    const formattedTableData = data.reduce((accumulator, obj) => {
      const formattedObj = {
        id: obj._id,
        orderNo: obj.orderNo,
        ticketNumber: obj.ticketNumber,
        status: obj.status,
        subject: obj.subject,
        service: obj.service,
        subService: obj.subService,
        updatedAt: `${timeFormat.format(new Date(obj?.updatedAt))}`,
        
      };

      accumulator.push(formattedObj);
      return accumulator;
    }, []);

    setTableData(formattedTableData);
  }, []);

  return (
    <div className="container mx-auto bg-[#F3F3F3] dark:bg-bgDarkMode text-gray-900 dark:text-gray-100">
      {tableData.length ? (
        <MemoizedUserMessagessTable data={data} tableData={tableData} setActiveMessage={setActiveMessage} setIsSelectMessage={setIsSelectMessage} />
      ) : (
        <NoTransactionFound />
      )}
    </div>
  );
};

export default UserMessagesRecord;
