import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FooterMini from './FooterMini';

import {
  getAllMessages,
  sendMessage,
  updateMessageStatus,
  getMessagesById,
} from '../services/apiService';
import PhotosUploader from './PhotosUploader';
import SupportTicket from './SupportTicket';
import AdminMessagesRecord from '../pages/Tanstack/AdminMessagesRecord';
import Lottie from 'lottie-react';
import { ChatDate } from './ChatDate';

import animationData from '../animations/typing.json';

import io from 'socket.io-client';
// const ENDPOINT = 'http://localhost:4000'; // "https://chat-app.render.com"; -> After deployment
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
var socket, selectedChatCompare;

const statusList = ['Pending', 'Active', 'Resolved', 'Closed'];

export const MessageContent = (props) => {
  const {
    messageEndRef,
    data,
    message,
    typingHandler,
    istyping,
    submit,
    setAddedPhotos,
    addedPhotos,
    setIsSelectMessage,
    fetchAllMessages,
  } = props;
  const [addPhoto, setAddPhoto] = useState(false);

  // Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // sometimes even the US needs 24-hour time
  const optionsOriginal = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  };
  // const options1 = {
  //   day: 'numeric',
  //   month: 'numeric',
  //   year: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   hourCycle: 'h23',
  // };

  const options1 = {
    day: 'numeric',
    month: 'numeric',
    // month: 'alphabetic',
    year: 'numeric',
  };

  const options2 = {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  };
  // console.log(new Intl.DateTimeFormat("en-US", options).format(date));

  const timeFormat1 = new Intl.DateTimeFormat('en-us', options1);
  const timeFormat2 = new Intl.DateTimeFormat('en-us', options2);

  // "12/19/2012, 19:00:00"

  function openPhotoModel() {
    setAddPhoto((prev) => !prev);
  }

  return (
    <>
     <div className="card-gradient-app-container rounded-lg">
     <div className="w-[375px] md:w-[600px] h-full rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto gap-[20px]">
        {/* <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] md:w-[600px] overflow-auto flex flex-col items-center justify-start p-2.5 box-border gap-[20px]"> */}
        <div className="rounded-lg bg-white dark:bg-background-dark w-full overflow-auto flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
          <div className="flex flex-row justify-between w-full items-center">
            <div
              className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
              onClick={() => {
                setIsSelectMessage(false);
                fetchAllMessages();
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

          <div className="self-stretch text-center text-gray-900 dark:text-gray-100 text-[27px] font-bold font-['Inter'] leading-9">
            {`${data?.subject}`}
          </div>

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm md:text-lg inline-block">
              <span>{`Messages`}</span>
            </b>
            <>
              {/* <div className="flex flex-col h-[450px] w-full gap-4 rounded-lg  box-border focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none overflow-auto border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"> */}
              <div className="flex flex-col h-[300px] md:h-[400px] w-full gap-4 rounded-lg  box-border focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none overflow-auto border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
                {/* {fullMessage} */}
                {data?.content?.map((c, i) => {
                  const prevMessage = data?.content[i - 1];

                  const oneday = 1000 * 60 * 60 * 24;

                  const showDate =
                    !prevMessage ||
                    new Date(c?.created).getTime() -
                      new Date(prevMessage?.created).getTime() >
                      oneday; // messages after 1 day
                  // 60 * 1000; // messages after 60 seconds since timestamp is in milliseconds
                  // 60; // messages after 60 seconds

                  const difference =
                    new Date(c?.created).getTime() -
                    new Date(prevMessage?.created).getTime();

                  return (
                    <div
                      className={`self-stretch rounded-lg w-full ${
                        c?.sender?.role === 'Admin'
                          ? 'chat-box-gradient-admin'
                          : 'chat-box-gradient-user'
                      }`}
                      key={i}
                    >
                      <div
                        className={`self-stretch rounded-lg shadow-md focus:outline-none text-chizzyblue dark:text-gray-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-fit gap-[12px] ${
                          c?.sender?.role === 'Admin'
                            ? 'bg-slate-50 dark:bg-background-dark border-[1px] border-solid box-border border-lightslategray-100 dark:border-lightslategray-100'
                            : 'bg-slate-50 dark:bg-background-dark border-[1px] border-solid box-border border-lightslategray-100 dark:border-lightslategray-100'
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
                            {showDate ? (
                              <>
                                <div className="self-stretch text-sm font-bold font-['Inter'] leading-normal">
                                  {`${timeFormat1.format(
                                    new Date(c?.created ? c?.created : '')
                                  )}`}
                                </div>
                                <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
                                  {`${timeFormat2.format(
                                    new Date(c?.created ? c?.created : '')
                                  )}`}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="self-stretch text-sm font-normal font-['Inter'] leading-normal">
                                  {`${timeFormat2.format(
                                    new Date(c?.created ? c?.created : '')
                                  )}`}
                                </div>
                              </>
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
                    </div>
                  );
                })}

                <div ref={messageEndRef} />
              </div>
            </>
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-background-dark w-full overflow-auto flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
          <>
            {/* {istyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  height={50}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )} */}
            <textarea
              className="self-stretch font-montserrat rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-[100px] md:h-[150px] overflow-auto border-[2px] dark:border-[1px] border-solid border-lightslategray-300 dark:border-indigo-600"
              value={message}
              // onChange={(ev) => setMessage(ev.target.value)}
              onChange={typingHandler}
              placeholder="write ..."
              rows={4}
              cols={6}
            ></textarea>
            <div className="flex flex-row justify-between w-full">
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
          <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />

          <>
            {data?.status === 'Closed' ? (
              <div className="cursor-not-allowed  self-stretch rounded-lg bg-indigo-400 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
                <div className="flex-1 relative">Closed</div>
              </div>
            ) : (
              <div
                className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
                onClick={submit}
              >
                <div className="flex-1 relative">Reply</div>
              </div>
            )}
          </>
        </div>
      </div>
     </div>
     
    </>
  );
};

const SupportMessageAdmin = (props) => {
  const { allMessages, fetchAllMessages, page } = props;
  const { user } = useSelector((state) => state.user);
  const messageEndRef = useRef(null); // for message autoscroll
  const [isSend, setIsSend] = useState(false);
  const [isContent, setIsContent] = useState(true);
  const [isReply, setIsReply] = useState(false);
  const [isSelectMessage, setIsSelectMessage] = useState(false);

  const [message, setMessage] = useState();
  const [isSent, setIsSent] = useState(false);
  const [status, setStatus] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  // const [allMessages, setAllMessages] = useState(); // all user messages
  const [activeMessage, setActiveMessage] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [trackChanges, setTrackChanges] = useState();

  //============{Socket io params}==========================================
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  //============{Socket io params}==========================================

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
    fetchAllMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMessage]);

  // useEffect(() => {
  //   setAllMessages(latestMessages);
  // }, [latestMessages]);

  useEffect(() => {
    if (page === 'Create') {
      setIsSend(true);
      setIsContent(false);
      setIsSelectMessage(false);
    }

    if (page === 'Inbox') {
      setIsSend(false);
      setIsContent(true);
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
      socket.emit('new message', response); // socket io
      // setActiveMessage(response);
      setIsSent(false);
      setMessage('');
      setAddedPhotos([]);
      console.log('sent');
    }
  }

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
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

  //======================={socket.io}=====================================

  useEffect(() => {
    socket = io(BACKEND_URL);
    // socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    joinRoom();
    messageEndRef.current?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMessage]);

  async function joinRoom() {
    if (activeMessage) {
      socket.emit('joinRoom', {
        userId: user?._id ? user?._id : user?.userId,
        username: user?.name,
        room: activeMessage?._id,
      }); // socket io
    }
  }

  const fetchMessages = async () => {
    if (!activeMessage) return;
    const userData = {
      messageId: activeMessage?._id,
    };

    try {
      const response = await getMessagesById(userData);
      if (response?.data) {
        setActiveMessage(response?.data);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = activeMessage;
    // eslint-disable-next-line
  }, [activeMessage]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
        console.log('not current chat, await notification');
      } else {
        setActiveMessage(newMessageRecieved);
      }
    });
  });

  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', activeMessage?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', activeMessage?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 fixed top-[120px] md:top-[200px]">
          {isSend && <SupportTicket />}
          {isContent && !allMessages && <div className="">No Message</div>}

          {/* {isContent && allMessages && isSelectMessage && ( */}
          {isContent && allMessages && !isSelectMessage && (
            <AdminMessagesRecord
              data={allMessages}
              setActiveMessage={setActiveMessage}
              setIsSelectMessage={setIsSelectMessage}
            />
          )}
          <>
            {/* {allMessages && activeMessage && !isSelectMessage && ( */}
            {allMessages && activeMessage && isSelectMessage && (
              <div className="flex flex-col gap-4">
                <MessageContent
                  messageEndRef={messageEndRef}
                  data={activeMessage}
                  message={message}
                  setMessage={setMessage}
                  typingHandler={typingHandler}
                  istyping={istyping}
                  submit={submit}
                  setAddedPhotos={setAddedPhotos}
                  addedPhotos={addedPhotos}
                  setIsContent={setIsContent}
                  setIsSelectMessage={setIsSelectMessage}
                  fetchAllMessages={fetchAllMessages}
                />
                <>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px] rounded border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 p-2 mt-2 bg-white dark:bg-bgDarkMode">
                    <div className="flex flex-row gap-2 mt-2">
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
                      className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver mb-2"
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

// let messages = [];
// messages.map((message, index) => {
//   const prevMessage = messages[index - 1];
//   const showDate =
//     !prevMessage ||
//     message?.timestamp?.seconds - prevMessage?.timestamp?.seconds > 60; // messages after 60 seconds
//   return <>{showDate && <ChatDate date={message?.timestamp?.toDate()} />}</>;
// });
