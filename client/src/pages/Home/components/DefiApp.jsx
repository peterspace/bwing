import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { networksOptions } from '../../../constants';
import {
  updateIsChangeChainId,
  updateConnectedNetwork,
  updateChain,
} from '../../../redux/features/swap/swapSlice';
import { useAccount, useSwitchNetwork, useDisconnect, useConnect } from 'wagmi';
import TokenModal from '../../../components/TokenModal';
import { IoMdSettings } from 'react-icons/io';
import { TbLogout2 } from 'react-icons/tb';
import WalletModal from '../../../components/WalletModal';
import SlippageModal from '../../../components/SlippageModal';
import ServiceHeaderDefi from './ServiceHeaderDefi';
import ServiceHeader from './ServiceHeader';
import TokenButtonLight from './TokenButtonLight';
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
    //================={new}=================================================
    isFromLoading,
    fromBalance,
    fromPrice,
    toPrice,
    isToLoading,
    toBalance,
    priceDeviation,
  } = props;
  //======================={RATES and PRICES}========================================================
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const [activeConnection, setActiveConnection] = useState(
    connectors && connectors[0]
  );
  console.log({ activeConnection: activeConnection });

  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  //================{CARDS}==================
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [checkChain, setCheckChain] = useState();
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setToTokenModalOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState(false);

  useEffect(() => {
    setChain(checkChain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkChain]);

  //============================================{Token selection}==============================
  useEffect(() => {
    if (allTokensFrom) {
      filterFTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFrom, fToken, tToken]);

  function filterFTokens() {
    let newTokens = [];
    if (allTokensFrom) {
      allTokensFrom?.map(async (t) => {
        if (t !== tToken) {
          newTokens.push(t);
        }
      });

      setFilteredfTokens(newTokens);
    }
  }

  useEffect(() => {
    if (allTokensTo) {
      filterTTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensTo, fToken, tToken]);

  function filterTTokens() {
    let newTokens = [];
    if (allTokensTo) {
      allTokensTo?.map(async (t) => {
        if (t === fToken) {
          return;
        } else {
          newTokens.push(t);
        }
      });

      setFilteredtTokens(newTokens);
    }
  }

  function onFromValueChanged(ev) {
    // setToValue(0);
    setFromValue(ev.target.value);
  }
  //====================================================================================

  async function nextFunc() {
    setService('defi');
    setSubService('defi');
    // setPercentageProgress(2);
    setPercentageProgress(3);
  }

  //====================================={Token Switchh}===============================================

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
  }

  useEffect(() => {
    if (checkChain && isConnected) {
      // updateConnectedChain();
      dispatch(updateChain(checkChain));
      switchNetwork(checkChain?.id);
      dispatch(updateIsChangeChainId(true));
      dispatch(updateConnectedNetwork(false));
      localStorage.setItem('chainSwitch', JSON.stringify(true));
    }
    if (checkChain && !isConnected) {
      // updateConnectedChain();
      dispatch(updateChain(checkChain));
      dispatch(updateIsChangeChainId(true));
      dispatch(updateConnectedNetwork(false));
      localStorage.setItem('chainSwitch', JSON.stringify(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkChain]);

  function openFromTokenModal() {
    setIsFromTokenModalOpen(true);
  }

  function openToTokenModal() {
    setToTokenModalOpen(true);
  }

  function openNetworkModal() {
    setIsNetworkModalOpen(true);
  }

  function openWalletModal() {
    setIsWalletModalOpen(true);
  }

  function openSlippageModal() {
    setIsSlippageModalOpen(true);
  }

  return (
    <>
      <div className="rounded-3xl bg-chizzySnow dark:bg-app-container-dark box-border w-[375px] md:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[12px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300">
        <Menu
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
        />
        <ServiceHeaderDefi
          subService="Defi"
          image={chain?.image}
          symbol={chain?.symbol}
          name={chain?.name}
          openModal={openNetworkModal}
          openSlippageModal={openSlippageModal}
        />
        <div className="self-stretch flex flex-col items-center justify-start relative gap-[12px]">
          <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy overflow-hidden flex flex-col items-start justify-start pt-4 px-4 pb-8 gap-[24px] border-[1px] border-solid border-lightslategray-300">
            <FToken
              image={fToken?.image}
              symbol={fToken?.symbol.toUpperCase()}
              name={fToken?.chain ? fToken?.chain : fToken?.name}
              openModal={openFromTokenModal}
            />
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
              <input
                type="text"
                className="self-stretch relative font-medium text-[32px] outline-none dark:outline-none dark:bg-chizzy dark:text-white placeholder-darkgray-100"
                placeholder="0.1"
                value={fValue}
                onChange={onFromValueChanged}
              />
              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                  {/* fromprice */}
                  {isFromLoading
                    ? ''
                    : `~$${
                        fValue
                          ? new Intl.NumberFormat().format(
                              Number(fValue) * Number(fromPrice)
                            )
                          : ''
                      }`}
                </div>
                {isConnected && (
                  <div className="flex-1 relative text-gray-500 text-right">
                    {/* fromBalance */}
                    {isFromLoading
                      ? ''
                      : `Balance: ${fromBalance.toString() || ''}`}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 gap-[24px] border-[1px] border-solid border-lightslategray-300">
            <TToken
              image={tToken?.image}
              symbol={tToken?.symbol.toUpperCase()}
              name={tToken?.chain ? tToken?.chain : tToken?.name}
              openModal={openToTokenModal}
            />
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
              <div className="self-stretch relative font-medium">
                {' '}
                <div
                  className={`${
                    loading ? 'animate-pulse' : ''
                  } self-stretch relative font-medium`}
                >
                  {loading ? 'loading' : `~ ${tValue}`}
                </div>
              </div>

              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                  {/* toprice */}
                  {isToLoading
                    ? ''
                    : `~$${
                        tValue
                          ? new Intl.NumberFormat().format(
                              Number(tValue) * Number(toPrice)
                            )
                          : ''
                      } (-${priceDeviation ? priceDeviation : ''}%)`}
                </div>
                {isConnected && (
                  <div className="flex-1 relative text-gray-500 text-right">
                    {/* toBalance */}
                    {isToLoading
                      ? ''
                      : `Balance: ${toBalance.toString() || ''}`}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 text-center text-xl text-darkblue dark:text-indigo-500  font-roboto">
            <div className="self-stretch rounded-xl bg-lightsteelblue dark:bg-exchange-rate-dark dark:text-indigo-500  dark:bg-opacity-20 flex flex-row items-center justify-center py-2 px-4 gap-[8px]">
              <div className="flex-1 relative">
                1 {fToken?.symbol.toUpperCase()} ~{' '}
                {loadingExchangeRate ? 'fetching rates' : exchangeRate}{' '}
                {tToken?.symbol.toUpperCase()}
              </div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
                alt=""
                src="/chevronup@2x.png"
              />
            </div>
          </div>
          <div
            className="cursor-pointer transition-transform duration-300 hover:scale-110 my-0 mx-[!important] absolute top-[calc(50%_-_60.5px)] left-[calc(50%_-_30px)] rounded-3xl bg-indigo-600 box-border h-[61px] flex flex-row items-start justify-start p-2 border-[12px] border-solid border-gray-100 dark:border-exchange-rate-dark"
            onClick={swapTokensPosition}
          >
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0 object-cover"
              alt=""
              src="/arrowdown@2x.png"
            />
          </div>
        </div>

        {/* Control Logic for connect and swap */}
        {!isConnected && (
          <div
            className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto"
            onClick={openWalletModal}
          >
            <div className="flex-1 relative">Connect Wallet</div>
          </div>
        )}
        {isConnected && (
          <div
            className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto"
            onClick={nextFunc}
          >
            <div className="flex-1 relative">
              {' '}
              {`${service} ${fToken?.symbol.toUpperCase()} now`}
            </div>
          </div>
        )}
      </div>
      {/* Network Modal */}
      <TokenModal
        isTokenModalOpen={isNetworkModalOpen}
        setIsTokenModalOpen={setIsNetworkModalOpen}
        filteredTokens={networksOptions}
        setToken={setCheckChain}
        service={service}
        isNotCrypto={false}
        title={'Select Network'}
      />

      {/* From Token Modal */}
      <TokenModal
        isTokenModalOpen={isFromTokenModalOpen}
        setIsTokenModalOpen={setIsFromTokenModalOpen}
        filteredTokens={filteredfTokens}
        setToken={setFromToken}
        allTokens={allTokensFrom}
        service={service}
        isNotCrypto={false}
        title={'Select Token'}
      />

      {/* To Token Modal */}
      <TokenModal
        isTokenModalOpen={isToTokenModalOpen}
        setIsTokenModalOpen={setToTokenModalOpen}
        filteredTokens={filteredtTokens}
        setToken={setToToken}
        allTokens={allTokensTo}
        service={service}
        title={'Select Token'}
      />

      {/* Wallet Modal */}
      <WalletModal
        isTokenModalOpen={isWalletModalOpen}
        setIsTokenModalOpen={setIsWalletModalOpen}
        filteredTokens={connectors}
        setToken={setActiveConnection}
        allTokens={connectors}
        service={service}
        title={'Select Wallet'}
      />
      {/* Slippage Modal */}
      <SlippageModal
        isTokenModalOpen={isSlippageModalOpen}
        setIsTokenModalOpen={setIsSlippageModalOpen}
        filteredTokens={null}
        setToken={null}
        allTokens={null}
        service={service}
        title={'Settings'}
      />
    </>
  );
};

export default DefiApp;
