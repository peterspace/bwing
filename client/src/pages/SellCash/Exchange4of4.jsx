import React, { useEffect, useState } from 'react';
import { Progress } from '../../components/Progress';
import { Timer } from '../../components/Timer';
import { ConfirmReceiveFundCash } from '../../components/ConfirmReceiveFundCash';
import { useDispatch, useSelector } from 'react-redux';
import RatesDataModel from '../../components/RatesDataModel';

import { Navigate } from 'react-router-dom';

export const Exchange4of4 = (props) => {
  const { percentageProgress, fTitle, tTitle, txData } = props;

  const { user } = useSelector((state) => state.user);

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col xl:flex-row justify-center">
      {txData ? (
        <div className="flex flex-col justify-center items-center xl:flex-row xl:items-start gap-[32px] mt-[8px]">
          <div className="hidden xl:flex">
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
            <ConfirmReceiveFundCash txData={txData} />
          </div>
          <div className="flex xl:hidden">
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
            <div className="mb-[16px]">
              <Timer txData={txData} />
            </div>

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
