import React, { useState, useEffect } from 'react';

import { updateEnquiryStatus } from '../services/apiService';
import AdminEnquiriesRecord from '../pages/Tanstack/AdminEnquiriesRecord';

const statusList = ['Pending', 'Active', 'Resolved', 'Closed'];

export const MessageContent = (props) => {
  const { data, setIsSelectMessage } = props;

  // sometimes even the US needs 24-hour time
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
  // "12/19/2012, 19:00:00"

  return (
    <>
      <div className="w-[375px] md:w-[600px] h-full md:h-[700px] rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto">
        <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] md:w-[600px] overflow-auto flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
          <div className="flex flex-row justify-between w-full items-center">
            <div
              className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
              onClick={() => {
                setIsSelectMessage(false);
              }}
            >
              <img
                className="cursor-pointer relative w-6 h-10"
                alt=""
                src="/icon-back.svg"
              />
              <div className="h-10 flex flex-row items-center justify-center">
                <div className="relative">{`Back`}</div>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center self-stretch text-base font-normal font-['Inter'] leading-normal">
              {`${data?.email}`}
            </div>
          </div>

          <div className="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-[27px] font-bold font-['Inter'] leading-9">
            {`${data?.subject}`}
          </div>

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm md:text-lg inline-block">
              <span>{`Messages`}</span>
            </b>

            <div className="flex flex-col h-[450px] w-full gap-4 rounded-lg  box-border focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none overflow-auto border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200">
              {/* {fullMessage} */}
              <div
                className={`self-stretch rounded-lg shadow-md focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-fit gap-[12px] bg-chizzySnow dark:bg-gray-1000 border-[1px] border-solid box-border border-lightslategray-100 dark:border-lightslategray-100 `}
              >
                <>
                  <div
                    className={`flex flex-row justify-between rounded-lg border-[1px] border-solid box-border py-1 px-2 shadow-sm border-lightslategray-200 dark:border-lightslategray-200`}
                  >
                    <div className="self-stretch text-base font-bold font-['Inter'] leading-normal">
                      {`${data?.name}`}
                    </div>
                    <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
                      {`${timeFormat.format(
                        new Date(
                          data?.updated ? data?.updated : data?.createdAt
                        )
                      )}`}
                    </div>
                  </div>
                  <div className="mb-4 self-stretch text-chizzyblue dark:text-gray-100  text-sm md:text-lg py-2 px-2.5 resize-none h-fit overflow-auto">
                    {data?.message}
                  </div>
                </>
              </div>
            </div>
          </div>

          <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />
        </div>
      </div>
    </>
  );
};

const SupportEnquiryAdmin = (props) => {
  const { latestMessages } = props;
  const [isSelectMessage, setIsSelectMessage] = useState(false);
  const [status, setStatus] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [allMessages, setAllMessages] = useState(); // all user messages
  const [activeMessage, setActiveMessage] = useState();

  // sometimes even the US needs 24-hour time
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
  // "12/19/2012, 19:00:00"

  useEffect(() => {
    setAllMessages(latestMessages);
  }, [latestMessages]);

  function openStatusModal() {
    setIsStatus(true);
  }
  function closeStatusModal() {
    setIsStatus(false);
  }

  useEffect(() => {
    if (status) {
      updateStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateStatus() {
    const userData = { messageId: activeMessage?._id, status: status };
    const response = await updateEnquiryStatus(userData);
    if (response) {
      console.log('status updates');
    }
  }

  return (
    <>
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 fixed top-[120px] md:top-[200px]">
          {!allMessages && <div className="">No Message</div>}
          {allMessages && !isSelectMessage && (
            <AdminEnquiriesRecord
              data={allMessages}
              setActiveMessage={setActiveMessage}
              setIsSelectMessage={setIsSelectMessage}
            />
          )}
          <>
            {allMessages && activeMessage && isSelectMessage && (
              <div className="flex flex-col gap-4">
                <MessageContent
                  data={activeMessage}
                  setIsSelectMessage={setIsSelectMessage}
                />
                <>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                    <div className="flex flex-row gap-2">
                      <b className="relative text-sm md:text-lg inline-block w-[167px]">
                        <span>{`update status `}</span>
                        <span className="text-rose-600">*</span>
                      </b>
                      <div className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver">
                        <span>{`${
                          activeMessage?.status && activeMessage?.status
                        } `}</span>
                      </div>
                    </div>

                    <div
                      className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
                      onClick={openStatusModal}
                    >
                      <div className="relative text-sm md:text-lg">
                        {status ? status : `select`}
                      </div>
                      <img
                        className="relative w-4 h-4 overflow-hidden shrink-0"
                        alt=""
                        src="/chevrondown.svg"
                      />
                    </div>
                  </div>

                  {/* service list */}
                  {isStatus && (
                    <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
                      <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm md:text-lg text-gray-500">
                        {statusList?.map((s, i) => (
                          <div
                            key={i}
                            className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                            onClick={() => {
                              setStatus(s);
                              closeStatusModal();
                            }}
                          >
                            <div className="relative font-medium">{s}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default SupportEnquiryAdmin;
