import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiFileWarningFill } from 'react-icons/ri';
import { SiHiveBlockchain } from 'react-icons/si';

import { useDispatch } from 'react-redux';

import {
  updateTransactionsAutomatically,
  getTransactionByTxIdInternal,
} from '../redux/features/transaction/transactionSlice';

export const VerifiedFundCard = (props) => {
  const { txData } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMontor, setIsMontor] = useState(false); // to monitor transaction
  const [isVerify, setIsVerify] = useState(false); // to monitor transaction

  const updateTransaction = async () => {
    const userData = {
      id: txData?._id,
      status: 'Completed', // payment recived
      percentageProgress: 5,
    };

    dispatch(updateTransactionsAutomatically(userData));
  };

  useEffect(() => {
    if (isMontor) {
      setTimeout(() => {
        window.location.href = txData?.blockchainUrl
          ? txData?.blockchainUrl
          : txData?.fallbackUrl;
        setIsMontor(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMontor]);

  useEffect(() => {
    if (isVerify) {
      setTimeout(() => {
        window.location.href = txData?.blockchainUrlOut
          ? txData?.blockchainUrlOut
          : txData?.fallbackUrl;
        setIsVerify(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerify]);

  // if (isRedirect) {
  //   return <Navigate to="/" />;
  // }
  async function newFunc() {
    //================{new updates}===============================
    localStorage.removeItem('fTokenBuyCard');
    localStorage.removeItem('tTokenBuyCard');
    localStorage.removeItem('fValueBuyCard');
    localStorage.removeItem('transactionRatesBuyCard');
    //================{new updates}===============================
    localStorage.removeItem('telegram');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('benderyAddress');
    localStorage.removeItem('country');
    localStorage.removeItem('cityData');
    localStorage.removeItem('city');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('txInfo');
    localStorage.removeItem('percentageProgress');
    localStorage.removeItem('blockchainNetworkE');
    localStorage.removeItem('provider');
    localStorage.removeItem('isReceivedByCard');
    dispatch(getTransactionByTxIdInternal(null));
    navigate('/');
  }

  //     const tValueFormatted = Number(txData?.tValue).toFixed(3);
  //     let value = Number(tValueFormatted); // single crypto currency transaction

  const sendFund = (
    <>
    <div className="card-gradient-app-container">
    {txData?.status === 'Completed' ? (
        <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark text-slate-700 dark:text-slate-100 shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] xl:w-[500px] p-4">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px] xl:gap-[12px]">
              <div className="flex flex-row gap-4 mt-[24px] justify-center items-center">
                <div className="text-[18px] xl:text-[24px] font-extrabold leading-[32px] inline-block">
                  Verify Transaction
                </div>
              </div>
              <div className="flex bg-lightslategray-300 w-full h-px" />
            </div>

            <div className="flex flex-col w-[300px] xl:w-[452px] gap-[8px]">
              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Amount
                </div>
                <div className="flex flex-row justify-start gap-1 w-[50%]">
                  <div className="text-base leading-[24px] inline-block">
                    {Number(txData?.tValue).toFixed(3)}{' '}
                    {txData?.tToken?.symbol.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
                </div>
                <div className="flex flex-col justify-start w-[50%]">
                  <div className="text-xs leading-[16px] text-green-600 inline-block">
                    {txData?.userAddress &&
                      txData?.userAddress?.substring(0, 20)}
                    <br />
                    {txData?.userAddress &&
                      txData?.userAddress?.substring(
                        20,
                        txData?.userAddress.length
                      )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Status
                </div>
                <div className="flex flex-col justify-start w-[50%]">
                  <div className="text-base leading-[24px] bg-bgSecondary hover:opacity-90 text-bgPrimary w-fit px-1.5 py-0.5 rounded">
                    {/* Completed */}
                    {txData?.status}
                  </div>
                  <div className="text-xs leading-[16px] text-limegreen inline-block">
                    blockchain: {txData?.tToken?.chain}
                  </div>
                  <div className="flex flex-row gap-2 mt-2">
                    {/* <div
                      className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[50%]"
                      onClick={() => setIsMontor(true)}
                    >
                      <div className="flex flex-row gap-2">
                        <SiHiveBlockchain size={20} color="#b4b4b4" />
                        <div className="leading-[20px] inline-block">
                          Monitor
                        </div>
                      </div>
                    </div> */}
                    <div
                      className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-[50%] outline outline-bgPrimary outline-[1px]"
                      onClick={() => setIsVerify(true)}
                    >
                      <div className="flex flex-row gap-2">
                        <SiHiveBlockchain size={20} color="#4f46e5" />
                        <div className="leading-[20px] inline-block">
                          Verify
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row bg-orangeLight rounded p-1 xl:w-[452px] w-[300px]">
              <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
                {' '}
                <RiFileWarningFill color="#FFB000" size={15} />{' '}
              </div>
              <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
                Your funds has been sent to the address
              </div>
            </div>
            <div className="flex bg-lightslategray-300 xl:w-[452px] w-[300px] h-px" />
            <div
              className="flex flex-row justify-center items-center"
              onClick={newFunc}
            >
              <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
                New Transaction
              </div>
            </div>

            <div className="flex flex-row w-full" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark text-slate-700 dark:text-slate-100 shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] xl:w-[500px] p-4">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px] xl:gap-[12px]">
              <div className="flex flex-row gap-4 mt-[24px] justify-center items-center">
                <div className="text-[18px] xl:text-[24px] font-extrabold leading-[32px] inline-block">
                  Sending funds to the address below
                </div>
              </div>
              <div className="flex bg-lightslategray-300 w-full h-px" />
            </div>

            <div className="flex flex-col w-[300px] xl:w-[452px] gap-[8px]">
              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Amount
                </div>
                <div className="flex flex-row justify-start gap-1 w-[50%]">
                  <div className="text-base leading-[24px] inline-block">
                    {Number(txData?.tValue).toFixed(3)}{' '}
                    {txData?.tToken?.symbol.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
                </div>
                <div className="flex flex-col justify-start w-[50%]">
                  <div className="text-xs leading-[16px] text-green-600 inline-block">
                    {txData?.userAddress &&
                      txData?.userAddress?.substring(0, 20)}
                    <br />
                    {txData?.userAddress &&
                      txData?.userAddress?.substring(
                        20,
                        txData?.userAddress.length
                      )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-smi leading-[22px] text-gray-500 inline-block w-[50%]">
                  Status
                </div>
                <div className="flex flex-col justify-start w-[50%]">
                  <div className="text-base leading-[24px] bg-bgSecondary hover:opacity-90 text-bgPrimary w-fit px-1.5 py-0.5 rounded">
                    {/* In progress */}
                    {txData?.status}
                  </div>
                  <div className="text-xs leading-[16px] text-limegreen inline-block">
                    blockchain: {txData?.tToken?.chain}
                  </div>

                  {/* <div className="flex flex-row gap-2 mt-2">
                    <div
                      className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[50%]"
                      onClick={() => setIsMontor(true)}
                    >
                      <div className="flex flex-row gap-2">
                        <SiHiveBlockchain size={20} color="#b4b4b4" />
                        <div className="leading-[20px] inline-block">
                          Monitor
                        </div>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-[50%] outline outline-bgPrimary outline-[1px]"
                      onClick={() => setIsVerify(true)}
                    >
                      <div className="flex flex-row gap-2">
                        <SiHiveBlockchain size={20} color="#4f46e5" />
                        <div className="leading-[20px] inline-block">
                          Verify
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex flex-row bg-orangeLight rounded p-1 xl:w-[452px] w-[300px]">
              <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
                {' '}
                <RiFileWarningFill color="#FFB000" size={15} />{' '}
              </div>
              <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
                Please note that this process could last up to 30 minutes.
              </div>
            </div>
            <div className="flex bg-lightslategray-300 xl:w-[452px] w-[300px] h-px" />
            <div
              className="flex flex-row justify-center items-center"
              onClick={updateTransaction}
            >
              <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
                Payment received
              </div>
            </div>

            <div className="flex flex-row w-full" />
          </div>
        </div>
      )}
    </div>
     
    </>
  );
  return <>{sendFund}</>;
};
