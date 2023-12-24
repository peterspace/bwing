import { useState, useEffect } from 'react';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import { useDispatch } from 'react-redux';
import TokenModal from '../../../components/TokenModal';
import ServiceHeader from './ServiceHeader';
import FToken from './FToken';
import TToken from './TToken';
import Menu from './Menu';
//DefiDark
const DefiApp = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    fTitle,
    tTitle,
    fToken,
    setFromToken,
    tToken,
    setToToken,
    fValue,
    setFromValue,
    loading,
    mode,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    allTokensFrom,
    allTokensTo,
    transactionRates,
    chain,
    setChain,
    chainId,
    loadingExchangeRate,
  } = props;
  //======================={RATES and PRICES}========================================================
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();


  return (
    <>
     <div className="rounded-3xl bg-gray-100 dark:bg-app-container-dark box-border w-[375px] md:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[12px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300">
      <Menu />
      {/* <ServiceHeader buyCard="Defi" imgCard="/imgcard@2x.png" rUB="Ethereum" /> */}

      <ServiceHeader
         // subService="Sell Cash"
         subService="Sell"
         image={''}
         symbol={chain}
         name={country}
         openModal={openOptionsModal}
        />
      <div className="self-stretch flex flex-col items-center justify-start relative gap-[12px]">
        <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy overflow-hidden flex flex-col items-start justify-start pt-4 px-4 pb-8 gap-[24px] z-[0] border-[1px] border-solid border-lightslategray-300">
          <FToken imgCard="/imgcard@2x.png" rUB="ETH" ethereum1="Ethereum" />
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
            <div className="self-stretch relative font-medium">1.567904</div>
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
              <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                ~$1432.54
              </div>
              <div className="flex-1 relative text-gray-500 text-right">
                Balance: 18.7685
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 gap-[24px] z-[1] border-[1px] border-solid border-lightslategray-300">
          <TToken imgCard="/imgcard@2x.png" rUB="RUB" tron1="Russian Ruble" />
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
            <div className="self-stretch relative font-medium">3859.042109</div>

            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
              <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                ~$1432.54
              </div>
              <div className="flex-1 relative text-gray-500 text-right">
                Balance: 18.7685
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 z-[2] text-center text-xl text-darkblue dark:text-indigo-500  font-roboto">
          <div className="self-stretch rounded-xl bg-lightsteelblue dark:bg-exchange-rate-dark dark:text-indigo-500  dark:bg-opacity-20 flex flex-row items-center justify-center py-2 px-4 gap-[8px]">
            <div className="flex-1 relative">1 ETH = 1527.8803 USDT</div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
              alt=""
              src="/chevronup@2x.png"
            />
          </div>
        </div>
        <div className="my-0 mx-[!important] absolute top-[calc(50%_-_60.5px)] left-[calc(50%_-_30px)] rounded-3xl bg-indigo-600 box-border h-[61px] flex flex-row items-start justify-start p-2 z-[3] border-[12px] border-solid border-gray-100 dark:border-exchange-rate-dark">
          <img
            className="relative w-5 h-5 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/arrowdown@2x.png"
          />
        </div>
      </div>
      <div className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto">
        <div className="flex-1 relative">Defi ETH now</div>
      </div>
    </div>
    </>
   
  );
};

export default DefiApp;
