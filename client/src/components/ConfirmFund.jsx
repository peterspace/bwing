import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiFileWarningFill } from 'react-icons/ri';
import { SiHiveBlockchain } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { updateOneBlockchainTransactionByIdService } from '../services/apiService';
import { getTransactionByTxIdInternal } from '../redux/features/transaction/transactionSlice';
export const ConfirmFund = (props) => {
  const { txData } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMontor, setIsMontor] = useState(false); // to monitor transaction
  const [blockChainData, setBlockChainData] = useState();
  console.log({ blockChainDataConfrim: blockChainData });

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

  const updateTransaction = async () => {
    fetchUpdatedBlockchainData();
  };
  const fetchUpdatedBlockchainData = async () => {
    let userData = txData?._id;
    const response = await updateOneBlockchainTransactionByIdService(userData);
    setBlockChainData(response);
  };

  async function newFunc() {
    //================{new updates}===============================
    localStorage.removeItem('fTokenExchange');
    localStorage.removeItem('tTokenExchange');
    localStorage.removeItem('fValueExchange');
    localStorage.removeItem('transactionRatesExchange');
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

    dispatch(getTransactionByTxIdInternal(null));
    navigate('/');
  }

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 w-[375px]">
      <div className="flex flex-col justify-center items-center gap-[24px] w-full py-2 mt-4">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px] ml-2 mr-2">
            <div className="text-[18px] font-extrabold leading-[32px] inline-block text-black dark:text-white">
              Confirming funds to the address
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-full h-px" />
        </div>

        <div className="flex flex-col w-[300px] gap-[8px] ml-4">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100  inline-block w-[50%]">
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
              Blendery address {`(${txData?.fToken?.symbol.toUpperCase()})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(0, 22)}
                <br />
                {txData?.blenderyAddress &&
                  txData?.blenderyAddress?.substring(
                    22,
                    txData?.blenderyAddress.length
                  )}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Your address {`(${txData?.tToken?.symbol.toUpperCase()})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-xs leading-[16px] text-green-600 inline-block">
                {txData?.userAddress && txData?.userAddress?.substring(0, 22)}
                <br />
                {txData?.userAddress &&
                  txData?.userAddress?.substring(
                    22,
                    txData?.userAddress.length
                  )}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Status
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base bg-bgSecondary hover:opacity-90 text-bgPrimary w-fit px-1.5 py-0.5 rounded">
                {/* Pending */}
                {txData?.status}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {txData?.fToken?.chain}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white py-1 shrink-0 rounded w-[70%]"
                  onClick={() => setIsMontor(true)}
                >
                  <div className="flex flex-row gap-2">
                    <SiHiveBlockchain size={20} color="#b4b4b4" />
                    <div className="leading-[20px] inline-block">Monitor</div>
                  </div>
                </div>

                <div
                  className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary py-1 shrink-0 rounded w-[30%]"
                  onClick={newFunc}
                >
                  New
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center py-1 px-2">
          <div className="flex flex-row gap-2 justify-center items-center bg-orangeLight rounded py-1 w-full">
            <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
              {' '}
              <RiFileWarningFill color="#FFB000" size={15} />{' '}
            </div>
            <div className="text-xs leading-[14.4px] text-darkslategray-200">
              Please note that this process could last up to 30 minutes.
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 w-full h-px" />
        <div
          className="flex flex-row justify-center items-center w-full px-2"
          onClick={updateTransaction}
        >
          <div className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Please hold ...
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return <>{sendFund}</>;
};
