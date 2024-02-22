import React, { useEffect, useState } from 'react';
import { Progress } from '../../components/Progress';
import { VerifiedReceivedFundCard } from '../../components/VerifiedReceivedFundCard';
import RatesDataModel from '../../components/RatesDataModel';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Exchange5of5 = (props) => {
  const { percentageProgress, fTitle, tTitle, txData, setRefetchTxData } =
    props;

  const { user } = useSelector((state) => state.user);

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      {txData ? (
        <div className="flex flex-col justify-center items-center xl:flex-row xl:items-start gap-[32px] mt-[8px]">
          <div className="ss:hidden xl:flex">
            <div className="flex-col xl:flex-row h-[500px]">
              <Progress
                percentageProgress={
                  txData?.percentageProgress
                    ? txData?.percentageProgress
                    : percentageProgress
                }
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start xl:justify-center xl:items-center mt-6 xl:mt-0 gap-4">
            <VerifiedReceivedFundCard
              txData={txData}
              setRefetchTxData={setRefetchTxData}
            />
          </div>
          <div className="ss:flex xl:hidden">
            <div className="flex-col xl:flex-row h-[500px]">
              <Progress
                percentageProgress={
                  txData?.percentageProgress
                    ? txData?.percentageProgress
                    : percentageProgress
                }
              />
            </div>
          </div>

          <div className="flex-col xl:flex-row h-[374px]">
            <RatesDataModel
              fTitle={fTitle}
              tTitle={tTitle}
              txData={txData}
              transactionRates={null}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
