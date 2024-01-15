import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { WalletInfo } from '../../../components/WalletInfo';
import { DetailsLocal } from '../../../components/DetailsLocal';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import RatesLocalModel from '../../../components/RatesLocalModel';

export const ExchangeScreen2 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    fToken,
    tToken,
    fValue,
    service,
    transactionRates,
    userAddress,
    setUserAddress,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center xl:flex-row">
      <div className="flex flex-col justify-center items-center xl:flex-row xl:items-start gap-[32px] mt-[8px]">
        <div className="ss:hidden xl:flex">
          <div className="flex-col xl:flex-row h-[500px]">
            <Progress percentageProgress={percentageProgress} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-6 xl:mt-0 gap-4">
          <WalletInfo
            setPercentageProgress={setPercentageProgress}
            setUserAddress={setUserAddress}
            userAddress={userAddress}
            service={service}
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
          />
        </div>
        <div className="flex-col xl:flex-row h-[374px]">
          <RatesLocalModel
            fToken={fToken}
            tToken={tToken}
            fValue={fValue}
            fTitle={fTitle}
            tTitle={tTitle}
            transactionRates={transactionRates}
            loadingExchangeRate={loadingExchangeRate}
          />
        </div>
        <div className="ss:flex xl:hidden">
          <div className="flex-col xl:flex-row h-[500px]">
            <Progress percentageProgress={percentageProgress} />
          </div>
        </div>
      </div>
    </div>
  );
};
