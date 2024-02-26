import xlsx from 'json-as-xlsx';

export function DownloadEnquiriesToExcel(data) {
  let columns = [
    {
      // sheet: "Persons",
      sheet: 'Transaction',
      columns: [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Subject', value: 'subject' },
        { label: 'Message', value: 'message' },
        { label: 'Status', value: 'status' },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: 'Enquiries Excel',
  };

  xlsx(columns, settings);
}
