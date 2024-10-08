import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// using data from localstorage
export const DetailsLocal = (props) => {
  const { fToken, tToken, fValue, fTitle, tTitle, transactionRates } = props;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  // const transactionRates = useSelector(
  //   (state) => state.transaction?.getTransactionRate
  // );
  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  const details = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Transaction Detail
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              {fTitle}
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {/* {fValue} {fToken?.symbol} */}
              {fValue} {fToken?.symbol}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Exchange rate
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {exchangeRate} {tToken?.symbol}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Service fee (0.25%)
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {serviceFee} {tToken?.symbol}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Network fee
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {networkFee} {tToken?.symbol}
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              {tTitle}
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {tValue} {tToken?.symbol}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{details}</>;
};
