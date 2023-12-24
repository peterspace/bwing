import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdQrCodeScanner } from 'react-icons/md';
import { IoCopyOutline } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import { LiaTelegramPlane } from 'react-icons/lia';

import { updateTransactionByIdService } from '../services/apiService';
import { TimerFormat } from './TimerFormat';

const paymentStatus = [
  {
    name: 'Pending', // user has not sent fiat/crypto to blendery
  },
  {
    name: 'Paid', // user has sent fiat/crypto to blendery
  },
  {
    name: 'Received', // blendery received users fiat/crypto
  },
  {
    name: 'Completed', // blendery has sent  fiat/crypto to user
  },
];

export const CashInfo = (props) => {
  const { item, setRefetchTxData } = props;

  async function handleClose() {
    setRefetchTxData(true);
    localStorage.removeItem('txDataUpdate'); // remove from local storage to allow new data
    localStorage.removeItem('isUpdate'); // remove from local storage to allow new data
    localStorage.removeItem('isUpdating'); // remove from local storage to allow new data
  }

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div
      className={`flex bg-white dark:bg-bgDarkMode justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 outline outline-lightslategray-300 outline-[1px]`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row justify-between mt-2">
            <div
              className={`cursor-pointerleading-[24px] inline-block text-[24px] text-darkslategray-200 dark:text-gray-100`}
            >
              Transaction Detail
            </div>
            <span
              className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
              onClick={handleClose}
            >
              {' '}
              <IoIosClose size={32} />
            </span>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>

        <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] mb-8">
          <>
            <div
              // className={`flex flex-col mr-2 ml-2 font-light p-4 border border-indigo-600 border-b gap-2`}
              className={`grid grid-cols-1 gap-2`}
            >
              <div className="flex flex-row sm:justify-between">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  OrderNo:
                </div>
                <div className="flex flex-row gap-1">
                  <span
                    className={`flex text-center text-gray-900 dark:text-gray-100`}
                  >
                    {item?.orderNo}
                  </span>
                  <span
                    className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
                    onClick={() => copyToClipboard(item?.orderNo)}
                  >
                    {' '}
                    <IoCopyOutline size={16} />
                  </span>
                </div>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />

              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  From:
                </div>

                <div className="flex flex-row items-center gap-1">
                  <p className={`text-gray-900 dark:text-gray-100`}>
                    {item.fValue}
                  </p>

                  <div className="flex flex-row gap-1">
                    <span className={`text-gray-900 dark:text-gray-100`}>
                      {item.fToken?.symbol?.toUpperCase()}{' '}
                      {`(${item.fToken?.chain})`}
                    </span>
                    <span
                      className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
                      onClick={() => copyToClipboard(item.fValue)}
                    >
                      {' '}
                      <IoCopyOutline size={16} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />

              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  To:
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p className={`text-gray-900 dark:text-gray-100`}>
                    {item.tValue}
                  </p>
                  <div className="flex flex-row gap-1">
                    <span className={`text-gray-900 dark:text-gray-100`}>
                      {item.tToken?.symbol?.toUpperCase()}{' '}
                      {`(${item.tToken?.chain})`}
                    </span>
                    <span
                      className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
                      onClick={() => copyToClipboard(item.tValue)}
                    >
                      {' '}
                      <IoCopyOutline size={16} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />

              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  Status:
                </div>
                <span
                  className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                >
                  {item?.status}
                </span>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  User:
                </div>

                <div className="flex flex-row gap-1">
                  <span
                    className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                  >
                    {item?.userAddress && item?.userAddress?.substring(0, 22)}
                    ...
                  </span>
                  <span
                    className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
                    onClick={() => copyToClipboard(item?.userAddress)}
                  >
                    {' '}
                    <IoCopyOutline size={16} />
                  </span>
                </div>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  Blendery:
                </div>

                <div className="flex flex-row gap-1">
                  <span
                    className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                  >
                    {item?.blenderyAddress &&
                      item?.blenderyAddress?.substring(0, 22)}
                    ...
                  </span>
                  <span
                    className="transition-transform duration-300 hover:scale-125 cursor-pointer text-gray-900 dark:text-gray-100"
                    onClick={() => copyToClipboard(item?.blenderyAddress)}
                  >
                    {' '}
                    <IoCopyOutline size={16} />
                  </span>
                </div>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  Country:
                </div>
                <span
                  className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                >
                  {item?.country}
                </span>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  City:
                </div>
                <span
                  className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                >
                  {item?.city}
                </span>
              </div>
              <div className="border-b border-solid border-lightslategray-300" />
              <div className="flex flex-row justify-between items-center">
                <div
                  className={`flex text-center text-gray-900 dark:text-gray-100`}
                >
                  Timeleft:
                </div>
                {item?.status === 'Received' || item?.service === 'defi' ? (
                  <span
                    className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                  >
                    {`-- : -- : --`}
                  </span>
                ) : (
                  <span
                    className={`flex items-center text-center text-gray-900 dark:text-gray-100`}
                  >
                    {item?.timeStatus === 'Expired' ? (
                      <div className={`text-red-600 inline-block w-[69px]`}>
                        Expired
                      </div>
                    ) : (
                      <div
                        className={`text-gray-900 dark:text-gray-100 inline-block w-[69px]`}
                      >
                        <TimerFormat duration={item?.timeLeft} />
                      </div>
                    )}
                  </span>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export const CashUpdate = (props) => {
  // const dispatch = useDispatch();

  const { item, setRefetchTxData } = props;
  const [benderyStatus, setBenderyStatus] = useState(item?.status);
  const [dispatcherTelegram, setDispatcherTelegram] = useState('');
  const [hash, setHash] = useState('');

  let service = item?.service;
  let subService = item?.subService;

  // useEffect(() => {
  //   setBenderyStatus(item?.status);
  // }, [item]);

  const updateTransaction = async () => {
    let userData;

    if (service === 'exchange' && subService === 'exchange') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'defi' && subService === 'defi') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
    }
    if (service === 'buy' && subService === 'buyCash') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        dispatcherTelegram,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'buy' && subService === 'buyCard') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        hashOut: hash,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'sell' && subService === 'sellCash') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        dispatcherTelegram,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    if (service === 'sell' && subService === 'sellCard') {
      userData = {
        id: item?._id,
        status: benderyStatus,
        service: item?.service,
        subService: item?.subService,
        progress: item?.percentageProgress,
        //===========================
      };
      //
    }
    const response = await updateTransactionByIdService(userData);
    if (response) {
      setRefetchTxData(true);
      localStorage.removeItem('txDataUpdate'); // remove from local storage to allow new data
      localStorage.removeItem('isUpdate'); // remove from local storage to allow new data
      localStorage.removeItem('isUpdating'); // remove from local storage to allow new data
    }
  };

  return (
    <div
      className={`flex bg-white dark:bg-bgDarkMode justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 outline outline-lightslategray-300 outline-[1px]`}
    >
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div className="cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-[24px] text-darkslategray-200 dark:text-gray-100">
              Update Transaction
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>

        <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
          <div
            className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
          >
            <div className="md:w-[452px] w-[320px] xs:w-[340px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                Blendery Payment Status
              </div>
              <div className="ml-2 flex flex-row gap-[8px] items-center w-[320px] xs:w-[340px] md:w-[452px] mt-[13px]">
                <div className="mr-4 w-[320px] xs:w-[340px] md:w-[452px]">
                  <select
                    name="benderyStatus"
                    className={`[border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block bg-[transparent]`}
                    value={benderyStatus}
                    onChange={(ev) => setBenderyStatus(ev.target.value)}
                  >
                    {paymentStatus &&
                      paymentStatus.map((status, index) => (
                        <option key={index} value={status?.name}>
                          {status?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
              <MdQrCodeScanner size={15} />
            </div>
          </div>
          {service === 'exchange' && subService === 'exchange' && (
            <>
              <div
                className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
              >
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block w-[90%] outline-none bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'defi' && subService === 'defi' && null}
          {service === 'buy' && subService === 'buyCash' && (
            <>
              <div
                className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
              >
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block w-[90%] outline-none bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>

              <div
                className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
              >
                <div className="">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                    Dispatcher Telegram
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block w-[90%] outline-none bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    placeholder="@jason"
                    value={dispatcherTelegram}
                    onChange={(ev) => setDispatcherTelegram(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
                  <LiaTelegramPlane size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'buy' && subService === 'buyCard' && (
            <>
              <div
                className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
              >
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                    Transaction Hash
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block w-[90%] outline-none bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    placeholder="5229ff374b04b0aa6..."
                    value={hash}
                    onChange={(ev) => setHash(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'sell' && subService === 'sellCash' && (
            <>
              {' '}
              <div
                className={`flex flex-row bg-white dark:bg-app-container-dark rounded h-[62px] justify-between border-[1px] border-solid border-lightslategray-300`}
              >
                <div className="">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-100">
                    Dispatcher Telegram
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block w-[90%] outline-none bg-white dark:bg-app-container-dark placeholder-darkgray-100"
                    placeholder="@jason"
                    value={dispatcherTelegram}
                    onChange={(ev) => setDispatcherTelegram(ev.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden text-darkslategray-200 dark:text-gray-100">
                  <LiaTelegramPlane size={15} />
                </div>
              </div>
            </>
          )}
          {service === 'sell' && subService === 'sellCard' && null}
        </div>
        <div
          className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded"
          onClick={updateTransaction}
        >
          Update
        </div>
      </div>
    </div>
  );
};
//setTxInfo={setTxInfo}
export const CardUpdateInfo = (props) => {
  const { setRefetchTxData } = props;
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );

  //===================={new}==========================

  return (
    <div className={`flex flex-col justify-center items-center gap-[24px]`}>
      <>
        <CashInfo item={txData} setRefetchTxData={setRefetchTxData} />
        <CashUpdate item={txData} setRefetchTxData={setRefetchTxData} />
      </>
    </div>
  );
};
