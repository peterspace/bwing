import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FooterMini from './FooterMini';

import {
  getAllMessages,
  sendMessage,
  updateMessageStatus,
} from '../services/apiService';
import PhotosUploader from './PhotosUploader';
import SupportTicket from './SupportTicket';
import AdminMessagesRecord from '../pages/Tanstack/AdminMessagesRecord';

const statusList = ['Pending', 'Active', 'Resolved', 'Closed'];

export const MessageContent = (props) => {
  const {
    user,
    data,
    isSent,
    setIsSent,
    isReply,
    setIsReply,
    message,
    setMessage,
    submit,
    setAddedPhotos,
    addedPhotos,
    setIsSelectMessage,
  } = props;
  const [addPhoto, setAddPhoto] = useState(false);

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

  function openPhotoModel() {
    setAddPhoto((prev) => !prev);
  }

  return (
    <>
      <div className="w-[375px] md:w-[600px] h-full md:h-[700px] rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto">
        <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] md:w-[600px] overflow-auto flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
          <div className="flex flex-row justify-between w-full items-center">
            <div
              className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
              onClick={() => {
                setIsSelectMessage(false);
                setIsReply(false);
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
              {`${data?.ticketNumber}`}
            </div>
          </div>

          <div className="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-[27px] font-bold font-['Inter'] leading-9">
            {`${data?.subject}`}
          </div>

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm md:text-lg inline-block">
              {isReply ? (
                <span>{`Create Message `}</span>
              ) : (
                <span>{`Messages`}</span>
              )}
            </b>

            {isReply ? (
              <>
                <textarea
                  className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-[300px] md:h-[400px] overflow-auto border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  placeholder="Please describe the issue"
                  rows={4}
                  cols={6}
                ></textarea>
                <div className="flex flex-row justify-between w-full">
                  <div
                    className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
                    onClick={() => {
                      setIsReply(false);
                    }}
                  >
                    <img
                      className="cursor-pointer relative w-6 h-10"
                      alt=""
                      src="/icon-return.svg"
                    />
                    <div className="h-10 flex flex-row items-center justify-center">
                      <div className="relative">Return</div>
                    </div>
                  </div>

                  <div
                    className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
                    onClick={openPhotoModel}
                  >
                    <img
                      className="cursor-pointer relative w-6 h-10"
                      alt=""
                      src="/iconeattach.svg"
                    />
                    <div className="relative w-px h-10">
                      <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_0.5px)] bg-rose-600 w-px h-5 overflow-hidden" />
                    </div>
                    <div className="h-10 flex flex-row items-center justify-center">
                      <div className="relative">Attach file</div>
                    </div>
                  </div>
                </div>

                {addPhoto && (
                  <>
                    <PhotosUploader
                      addedPhotos={addedPhotos}
                      onChange={setAddedPhotos}
                    />
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col h-[450px] w-full gap-4 rounded-lg  box-border focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none overflow-auto border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200">
                {/* {fullMessage} */}
                {data?.content?.map((c, i) => (
                  <div
                    key={i}
                    className={`self-stretch rounded-lg shadow-md focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-fit gap-[12px] ${
                      c?.sender?.role === 'Admin'
                        ? 'bg-slate-50 dark:bg-background-dark border-[1px] border-solid box-border border-lightslategray-100 dark:border-lightslategray-100'
                        : 'bg-chizzySnow dark:bg-gray-1000 border-[1px] border-solid box-border border-lightslategray-100 dark:border-lightslategray-100'
                    }`}
                  >
                    <>
                      <div
                        className={`flex flex-row justify-between rounded-lg border-[1px] border-solid box-border py-1 px-2 shadow-sm ${
                          c?.sender?.role === 'Admin'
                            ? 'border-lightslategray-200 dark:border-lightslategray-200'
                            : 'border-lightslategray-200 dark:border-lightslategray-200'
                        }`}
                      >
                        {c?.sender?.role === 'Admin' ? (
                          <div className="self-stretch text-base font-bold font-['Inter'] leading-normal">
                            {`${'Admin'}`}
                          </div>
                        ) : (
                          <div className="self-stretch text-base font-bold font-['Inter'] leading-normal">
                            {`${data?.user?.name}`}
                          </div>
                        )}
                        {c?.created ? (
                          <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
                            {`${timeFormat.format(
                              new Date(c?.created ? c?.created : '')
                            )}`}
                          </div>
                        ) : (
                          <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
                            {`${timeFormat.format(
                              new Date(
                                data?.updated ? data?.updated : data?.createdAt
                              )
                            )}`}
                          </div>
                        )}
                      </div>
                      {c?.role === 'Admin' ? (
                        <>
                          <div className="mt-4 flex flex-col justify-center items-center">
                            {c?.photos.length > 0 &&
                              c?.photos.map((photo, index) => (
                                <div
                                  key={index}
                                  className="flex cursor-pointer gap-4 p-4"
                                >
                                  <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                                    <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                                      <img
                                        className="object-cover w-full h-full"
                                        src={photo}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="mb-4 self-stretch text-chizzyblue dark:text-gray-100  text-sm md:text-lg py-2 px-2.5 resize-none h-fit overflow-auto">
                            {c?.message}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mt-4 flex flex-col justify-center items-center">
                            {c?.photos.length > 0 &&
                              c?.photos.map((photo, index) => (
                                <div
                                  key={index}
                                  className="flex cursor-pointer gap-4 p-4"
                                >
                                  <div className="flex flex-row bg-gray-200 rounded-2xl overflow-hidden gap-10 ml-10 border border-gray-50 shadow-md">
                                    <div className="flex w-64 h-64 bg-gray-300 grow shrink-0">
                                      <img
                                        className="object-cover w-full h-full"
                                        src={photo}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="mb-4 self-stretch text-chizzyblue dark:text-gray-100  text-sm md:text-lg py-2 px-2.5 resize-none h-fit overflow-auto">
                            {c?.message}
                          </div>
                        </>
                      )}
                    </>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />
          {isReply ? (
            <>
              {isSent ? (
                <div
                  className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
                  onClick={() => {
                    setIsSent(false);
                    setIsReply(false);
                    setMessage('');
                  }}
                >
                  <div className="flex-1 relative">Message Sent</div>
                </div>
              ) : (
                <div
                  className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
                  onClick={submit}
                >
                  <div className="flex-1 relative">Send</div>
                </div>
              )}
            </>
          ) : (
            <>
              {data?.status === 'Closed' ? (
                <div className="cursor-not-allowed  self-stretch rounded-lg bg-indigo-400 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
                  <div className="flex-1 relative">Closed</div>
                </div>
              ) : (
                <div
                  className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
                  onClick={() => setIsReply(true)}
                >
                  <div className="flex-1 relative">Reply</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const SupportMessageAdmin = (props) => {
  const { latestMessages, page } = props;
  const { user } = useSelector((state) => state.user);
  const [isSend, setIsSend] = useState(false);
  const [isContent, setIsContent] = useState(true);
  const [isReply, setIsReply] = useState(false);
  const [isSelectMessage, setIsSelectMessage] = useState(false);

  const [message, setMessage] = useState();
  const [isSent, setIsSent] = useState(false);
  const [status, setStatus] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [allMessages, setAllMessages] = useState(); // all user messages
  const [activeMessage, setActiveMessage] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [trackChanges, setTrackChanges] = useState();

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

  useEffect(() => {
    if (page === 'Create') {
      setIsSend(true);
      setIsContent(false);
      setIsReply(false);
      setIsSelectMessage(false);
    }

    if (page === 'Inbox') {
      setIsSend(false);
      setIsContent(true);
      setIsReply(false);
      setIsSelectMessage(false);
    }
  }, [page]);

  async function submit() {
    const userData = {
      message,
      messageId: activeMessage?._id,
      addedPhotos,
    };

    const response = await sendMessage(userData);
    if (response) {
      setIsReply(false);
      console.log('sent');
    }
  }

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
        setIsReply(false);
        setMessage('');
      }, 4000);
    }
  });

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
    const response = await updateMessageStatus(userData);
    if (response) {
      console.log('status updates');
    }
  }

  const content = (
    <div className="flex flex-col gap-4 rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-fit overflow-auto border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300 hover:border-indigo-300">
      {/* {fullMessage} */}
      {allMessages?.map((msg, i) => (
        <div
          key={i}
          className="flex flex-col gap-4"
          onClick={() => {
            setActiveMessage(msg);
            setIsSelectMessage(true);
          }}
        >
          <div className="cursor-pointer self-stretch flex flex-row justify-between rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-fit border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300 hover:border-indigo-300 gap-[12px]">
            <div className="flex justify-end self-stretch text-base font-normal font-['Inter'] leading-normal">
              {`${msg?.ticketNumber}`}
            </div>
            <div className="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-base font-bold font-['Inter'] leading-normal">
              {`${msg?.subject}`}
            </div>
            <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
              {`${timeFormat.format(new Date(msg?.updatedAt))}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 fixed sm:top-[120px] md:top-[200px]">
          {isSend && <SupportTicket />}
          {isContent && !allMessages && <div className="">No Message</div>}
          {isContent && allMessages && !isSelectMessage && (
            // <div className="">{content}</div>
            <AdminMessagesRecord
              data={allMessages}
              setActiveMessage={setActiveMessage}
              setIsSelectMessage={setIsSelectMessage}
            />
          )}
          <>
            {allMessages && activeMessage && isSelectMessage && (
              <div className="flex flex-col gap-4">
                <MessageContent
                  user={user}
                  data={activeMessage}
                  isSent={isSent}
                  setIsSent={setIsSent}
                  isReply={isReply}
                  setIsReply={setIsReply}
                  message={message}
                  setMessage={setMessage}
                  submit={submit}
                  setAddedPhotos={setAddedPhotos}
                  addedPhotos={addedPhotos}
                  setIsContent={setIsContent}
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

export default SupportMessageAdmin;
