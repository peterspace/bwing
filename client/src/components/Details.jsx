import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// using stored transaction data from database
export const Details = (props) => {
  const { fTitle, tTitle, txData, transactionRates } = props;

  const details = (
    <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark  shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 w-[375px]">
      <div className="flex flex-col justify-center items-center gap-[24px] w-full py-2 mt-4">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 dark:text-white text-[24px]`}
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
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200 dark:text-white">
              {txData?.fValue} {txData?.fToken?.symbol.toUpperCase()}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Exchange rate
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200 dark:text-white">
              {transactionRates
                ? transactionRates?.exchangeRate
                : txData?.exchangeRate}{' '}
              {txData?.tToken?.symbol.toUpperCase()}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Service fee (0.25%)
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200 dark:text-white">
              {transactionRates
                ? transactionRates?.serviceFee
                : txData?.serviceFee}{' '}
              {txData?.tToken?.symbol.toUpperCase()}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Network fee
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200 dark:text-white">
              {transactionRates
                ? transactionRates?.networkFee
                : txData?.networkFee}{' '}
              {txData?.tToken?.symbol.toUpperCase()}
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              {tTitle}
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200 dark:text-white">
              {transactionRates ? transactionRates?.tValue : txData?.tValue}{' '}
              {txData?.tToken?.symbol.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{details}</>;
};
