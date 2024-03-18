import React, { useEffect, useState } from "react";
import { TfiTimer } from "react-icons/tfi";
import { RxCopy } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { TimerFormat } from "./TimerFormat";
import Countdown from "./Countdown";

import { getTransactionByTxId } from "../redux/features/transaction/transactionSlice";

// 2hrs = 2 * 60 * 60 * 1000 ===> to milisecons
//defaultTime={2*60*60*100}

export const Timer = (props) => {
  const { txData } = props;

  // create logic for countdown timer
  const timer = (
    <div className="card-gradient-app-container">
      <div className="w-[363px] rounded-lg bg-chizzySnow dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray-300">
        <div className="flex flex-col items-start justify-start w-full gap-4">
          <div className="self-stretch rounded-lg bg-white dark:bg-gray-1000 flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[15px] gap-[5px]">
            <div className="flex flex-row justify-between items-center w-full text-base">
              <div className="text-darkslategray-100 dark:text-gray-100">
                Time left
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <TfiTimer size={20} color="#b4b4b4" />
                {txData?.status === "Received" || txData?.service === "defi" ? (
                  <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                    {`-- : -- : --`}
                  </div>
                ) : (
                  <>
                    {txData?.timeStatus === "Expired" ? (
                      <div className="text-base leading-[24px] text-red-600 inline-block">
                        Expired
                      </div>
                    ) : (
                      <>
                        {txData?.status === "Completed" ? (
                          <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                            {`-- : -- : --`}
                          </div>
                        ) : (
                          <div className="text-base leading-[24px] text-gray-300 dark:text-white inline-block">
                            <TimerFormat duration={txData?.timeLeft} />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="self-stretch rounded-lg bg-white dark:bg-gray-1000 flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[15px] gap-[5px]">
            <div className="flex flex-row justify-between items-center w-full text-base">
              <div className="text-darkslategray-100 dark:text-gray-100">
                Transaction ID
              </div>
              <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-1 px-2 text-sm text-gray-500 border-[1px] border-solid border-lightslategray-300 gap-2">
                <div className="text-gray-300 dark:text-white">
                  {txData?.orderNo}
                </div>
                <div
                  className="cursor-pointer text-[#b4b4b4] hover:text-darkslategray-100 hover:-translate-y-0.5 transform transition"
                  onClick={() => {
                    navigator.clipboard.writeText(txData?.orderNo);
                  }}
                >
                  <RxCopy size={15} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full" />
        </div>
      </div>
    </div>
  );
  return <>{timer}</>;
};
