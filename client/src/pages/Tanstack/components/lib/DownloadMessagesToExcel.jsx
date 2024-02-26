import xlsx from 'json-as-xlsx';

export function DownloadMessagesToExcel(data) {
  let columns = [
    {
      // sheet: "Persons",
      sheet: 'Transaction',
      columns: [
        { label: 'Order №', value: 'orderNo' },
        { label: 'Ticket №', value: 'ticketNumber' },
        { label: 'Subject', value: 'subject' },
        { label: 'Status', value: 'status' },
        { label: 'Service', value: 'service' },
        { label: 'Sub-service', value: 'subService' },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: 'Messages Excel',
  };

  xlsx(columns, settings);
}
