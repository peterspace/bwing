export const ChatDate = (date) => {
  const dateToDateTimeString = (date) => {
    console.log({ dateIn: date });
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    };

    const timeFormat = new Intl.DateTimeFormat('en-us', options);

    if (date) {
      const dateMonthYearString = date.toLocalDateString([], options); // format(date, 'EEEE dd MMMM y');
      //   const dateMonthYearString = date.toLocalDateString([], options); // format(date, 'EEEE dd MMMM y');

      //   const dateMonthYearString = timeFormat.format(new Date(date));
      return dateMonthYearString;
    }
  };
  return (
    <>
      <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
        {dateToDateTimeString(date)}
      </div>
      {/* <div className="">12/12/2024, 20:08</div> */}
    </>
  );
};
