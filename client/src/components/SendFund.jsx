import React, { useEffect, useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import {
  updateTransactionsAutomatically,
  updateOneBlockchainTransactionByIdService,
} from '../services/apiService';
export const SendFund = (props) => {
  const { txData, setRefetchTxData, transactionRates } = props;
  const [blockChainData, setBlockChainData] = useState();

  //========{begin to monitor transaction after this click}=========================
  // const updateTransaction = async () => {
  //   const userData = {
  //     id: txData?._id,
  //     status: 'Paid',
  //     percentageProgress: 4,
  //   };

  const updateTransaction = async () => {
    const userData = {
      id: txData?._id,
      status: 'Paid',
      percentageProgress: 4,
      youSend: transactionRates?.youSend,
      youGet: transactionRates?.youGet,
      serviceFee: transactionRates?.serviceFee,
      networkFee: transactionRates?.networkFee,
      exchangeRate: transactionRates?.exchangeRate,
      tValue: transactionRates?.tValue,
      amount: transactionRates?.amount,
      directValue: transactionRates?.directValue,
    };

    const response = await updateTransactionsAutomatically(userData);
    if (response?.status === 'Paid') {
      fetchUpdatedBlockchainData();
      setTimeout(() => {
        setRefetchTxData(true);
      }, 2000); // after 1 sec
    }
  };

  const fetchUpdatedBlockchainData = async () => {
    const userData = {
      id: txData?._id,
    };
    const response = await updateOneBlockchainTransactionByIdService(userData);
    setBlockChainData(response);
  };

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 w-[375px]">
      <div className="flex flex-col justify-center items-center gap-[24px] w-full py-2 mt-4">
        <div className="flex flex-col gap-[8px] md:gap-[12px] w-full justify-center items-center">
          <div className="flex flex-row gap-4 mt-[24px] ml-2 mr-2">
            <div className="text-[18px] font-extrabold leading-[32px] inline-block text-black dark:text-white">
              Send funds to the address below
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-full h-px" />
        </div>

        <div className="flex flex-col w-[300px] gap-[8px] ml-4">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Amount
            </div>
            <div className="flex flex-row justify-start gap-1 w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                {txData?.fValue} {txData?.fToken?.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Blendery address {`(${txData?.fToken?.symbol})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 dark:text-white w-[298px]">
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(0, 22)}
                <br />
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(
                    22,
                    txData?.blenderyAddress.length
                  )}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {txData?.fToken?.chain}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white p-1 shrink-0 rounded w-[70%]"
                  onClick={() => {
                    navigator.clipboard.writeText(txData?.blenderyAddress);
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <RxCopy size={15} color="#ffffff" />
                    <div className="leading-[20px] inline-block">
                      copy address
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center py-1 px-2">
          <div className="flex flex-row gap-2 justify-center items-center bg-orangeLight rounded p-1 w-full">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
              <RiFileWarningFill color="#FFB000" size={15} />{' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200">
              Please note that you can send funds to the address above only
              once.
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 w-full h-px" />
        <div
          className="flex flex-row justify-center items-center w-full px-2"
          onClick={updateTransaction}
        >
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Paid
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{sendFund}</>;
};
