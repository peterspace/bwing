import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const CheckoutCard = (props) => {
  const {
    setPercentageProgress,
    fTitle,
    tTitle,
    service,
    provider,
    fullName,
    bankName,
    cardNumber,
    phone,
    fToken,
    tToken,
    fValue,
    userAddress,
    transactionRates,
    loadingExchangeRate,
    submitTransaction,
  } = props;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  //===={To be added}========
  const estimatedGas = transactionRates ? transactionRates?.estimatedGas : 0;
  console.log({ service: service });
  console.log({ provider: provider });

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const checkout = (
    <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark  shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 w-[350px]">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px] ml-2 mr-2">
            <div className={`text-[18px] font-extrabold leading-[32px] text-black dark:text-white inline-block`}>
              Checkout
            </div>
            <div
               className="cursor-pointer flex flex-row justify-center items-center bg-chizzySnow dark:bg-exchange-rate-dark hover:opacity-90 text-gray-200 shrink-0 rounded px-6 py-1"
              onClick={() => {
                setPercentageProgress(2);
              }}
            >
              Back
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-full h-px" />
        </div>
        {/* ==========================={You send}==================================== */}
        <div className="flex flex-col w-[300px] gap-[8px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full justify-center items-start">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                {fTitle}
              </div>
              <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                {fValue} {fToken?.symbol.toUpperCase()}
              </div>
              {fToken?.chain ? (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  blockchain: {fToken?.chain}
                </div>
              ) : (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  currency: {fToken?.symbol.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex bg-lightslategray-300 h-px" />
            <div className="flex flex-col w-full justify-center items-start">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                {tTitle}
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                  {tValue} {tToken?.symbol.toUpperCase()}
                </div>
              </div>
              {tToken?.chain ? (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  blockchain: {tToken?.chain}
                </div>
              ) : (
                <div className="text-xs leading-[16px] text-limegreen inline-block">
                  currency: {tToken?.symbol.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 h-px" />
        {/* ==========================={Recepient address}==================================== */}
        <div className="flex flex-col w-[300px] gap-[8px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full justify-center items-start">
              {service === 'buy' && (
                <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                  {`Receiver's address`}
                </div>
              )}
              {service === 'sell' && (
                <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                  {`Sender's address`}
                </div>
              )}

              <div className="text-base leading-[24px] text-black dark:text-white inline-block w-[237px]">
                {userAddress && userAddress?.substring(0, 20)}
                <br />
                {userAddress && userAddress?.substring(20, userAddress.length)}
              </div>
            </div>
            <div className="flex bg-lightslategray-300 h-px" />
          </div>
        </div>
        {/* ==========================={Banking information}==================================== */}

        {service === 'sell' && (
          <>
            {provider?.name === 'Phone' && (
              <>
                <div className="flex flex-col w-[300px] gap-[8px]">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col w-full justify-center items-start">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Full Name
                      </div>
                      <div className="text-base leading-[24px] text-black dark:text-white inline-block w-40">
                        {fullName ? fullName : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-start">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Phone
                      </div>
                      <div className="text-base leading-[24px] text-black dark:text-white inline-block w-40">
                        {phone ? phone : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-start">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Bank Name
                      </div>
                      <div className="text-base leading-[24px] text-black dark:text-white inline-block w-40">
                        {bankName ? bankName : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {provider?.name === 'Card' && (
              <>
                <div className="flex flex-col w-[300px] gap-[8px]">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col w-full justify-center items-start">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Full Name
                      </div>
                      <div className="text-base leading-[24px] text-black dark:text-white inline-block w-40">
                        {fullName ? fullName : ''}
                      </div>
                    </div>
                    <div className="flex flex-col w-full justify-center items-start">
                      <div className="leading-[20px] text-darkgray-200 inline-block">
                        Card Number
                      </div>
                      <div className="text-base leading-[24px] text-black dark:text-white inline-block w-40">
                        {cardNumber ? cardNumber : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <div
          className="flex flex-row justify-center items-center"
          onClick={() => {
            submitTransaction(true);
          }}
        >
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full mb-4">
            Confirm & make payment
          </div>
        </div>
      </div>
    </div>
  );
  return <>{checkout}</>;
};
