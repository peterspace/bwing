import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networksOptions } from "../../../constants";
import {
  updateIsChangeChainId,
  updateConnectedNetwork,
  updateChain,
} from "../../../redux/features/swap/swapSlice";
import { useAccount, useSwitchNetwork, useDisconnect, useConnect } from "wagmi";
import TokenModal from "../../../components/TokenModal";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import WalletModal from "../../../components/WalletModal";
import SlippageModal from "../../../components/SlippageModal";
import ServiceHeaderDefi from "./ServiceHeaderDefi";
import ServiceHeader from "./ServiceHeader";
import TokenButtonLight from "./TokenButtonLight";
import FToken from "./FToken";
import TToken from "./TToken";
import Menu from "./Menu";
import {
  getSwapApprovalService,
  swapService,
} from "../../../services/apiService";

//Laoding
//'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
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
    setSlippage,
    slippage,
    getSwapInfo,
    setApprovingData,
    setSwappingData,
    walletAddress,
    getApprovalData,
    swap,
    getSwapApprovalAndSwap,
    swapTokensPosition,
  } = props;

  // const loading = true;
  // const loadingExchangeRate = true;
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
  console.log({ connectors: connectors });

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
  const [activeSlippage, setActiveSlippage] = useState();
  const updatedSlippage = useSelector((state) => state?.swap?.slippage);
  // const [approvingData, setApprovingData] = useState();
  // console.log({ approvingData: approvingData });

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

  // useEffect(() => {
  //   setSlippage(activeSlippage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeSlippage]);

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

  // async function nextFunc() {
  //   setService('defi');
  //   setSubService('defi');
  //   // setPercentageProgress(2);
  //   setPercentageProgress(3);
  // }

  // async function nextFunc() {
  //   setService('defi');
  //   setSubService('defi');
  //   getSwapInfo()
  //   // getApprovalData();
  //   // getSwapApprovalAndSwap()
  // }

  async function nextFunc() {
    setService("defi");
    setSubService("defi");
    getSwapInfo();
  }

  //====================================={Token Switchh}===============================================

  useEffect(() => {
    if (checkChain && isConnected) {
      // updateConnectedChain();
      dispatch(updateChain(checkChain));
      switchNetwork(checkChain?.id);
      dispatch(updateIsChangeChainId(true));
      dispatch(updateConnectedNetwork(false));
      localStorage.setItem("chainSwitch", JSON.stringify(true));
    }
    if (checkChain && !isConnected) {
      // updateConnectedChain();
      dispatch(updateChain(checkChain));
      dispatch(updateIsChangeChainId(true));
      dispatch(updateConnectedNetwork(false));
      localStorage.setItem("chainSwitch", JSON.stringify(true));
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

  // async function getApprovalData() {
  //   const userData = { chainId, fToken, fValue };

  //   try {
  //     const response = await getSwapApprovalService(userData);
  //     setApprovingData(response);

  //     console.log(response.data);
  //   } catch (error) {
  //     // setErrorSwapApprove(
  //     //   error?.message ? error?.message : error?.data?.message
  //     // );
  //     console.error(error);
  //   }
  // }

  async function getSwapData() {
    const userData = {
      chainId,
      fToken,
      tToken,
      walletAddress,
      slippage,
      fValue,
    };

    try {
      const response = await getSwapApprovalService(userData);
      setSwappingData(response);

      console.log(response.data);
    } catch (error) {
      // setErrorSwapApprove(
      //   error?.message ? error?.message : error?.data?.message
      // );
      console.error(error);
    }
  }

  //==============={approve data}=======
  //   {
  //     "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000000000174876e800",
  //     "gasPrice": "15662551827",
  //     "to": "0x111111111117dc0aa78b770fa6a738034120c302",
  //     "value": "0"
  // }

  //===={usdt}=======
  // {
  //   "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000000000000000000989680",
  //   "gasPrice": "15769126964",
  //   "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  //   "value": "0"
  // }
  //===={eurt}=======

  //   {
  //     "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000000000000000000989680",
  //     "gasPrice": "14871458590",
  //     "to": "0xc581b735a1688071a1746c968e0798d642ede491",
  //     "value": "0"
  // }

  //===={enj}=======

  //   {
  //     "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000000008ac7230489e80000",
  //     "gasPrice": "18088247910",
  //     "to": "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
  //     "value": "0"
  // }

  //============================={swapping Data}===============================
  //===={usdt/eurt}=======
  //   {
  //     "data": "0x095ea7b30000000000000000000000001111111254eeb25477b68fb85ed929f73a9605820000000000000000000000000000000000000000000000000000000000989680",
  //     "gasPrice": "14842199675",
  //     "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  //     "value": "0"
  // }

  return (
    <>
      <section className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-5 box-border max-w-full text-left text-5xl text-silver font-roboto">
        <div className="w-full flex flex-col items-start justify-start max-w-full">
          <div className="card-gradient-app-container rounded-3xl">
            <div className="rounded-3xl bg-chizzySnow dark:bg-app-container-dark box-border w-[375px] xl:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[8px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300">
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
                <div className="self-stretch card-gradient-app-price rounded-3xl w-full">
                  <div className="self-stretch rounded-3xl bg-chizzySnow dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start pt-4 px-4 pb-8 gap-[24px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
                    <div className="self-stretch flex flex-col gap-2">
                      <div className="input-title">{fTitle}</div>
                      <FToken
                        image={fToken?.image}
                        symbol={fToken?.symbol.toUpperCase()}
                        name={fToken?.chain ? fToken?.chain : fToken?.name}
                        openModal={openFromTokenModal}
                      />
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
                      <input
                        type="text"
                        className="input-sub-header self-stretch relative outline-none dark:outline-none bg-chizzySnow dark:bg-background-dark dark:text-white placeholder-darkgray-100"
                        placeholder="0.1"
                        value={fValue}
                        onChange={onFromValueChanged}
                      />
                      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                        {/* {isFromLoading || loading ? (
                          <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mt-1 mb-1"></div>
                        ) : (
                          <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                            <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                              {`~$${
                                fValue
                                  ? new Intl.NumberFormat().format(
                                      Number(fValue) * Number(fromPrice)
                                    )
                                  : ""
                              }`}
                            </div>
                          </div>
                        )} */}
                        {isFromLoading || loading ? (
                          <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mt-1 mb-1"></div>
                        ) : (
                          <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                            <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                              ~${fromPrice}
                            </div>
                          </div>
                        )}

                        {isConnected && (
                          <div className="flex-1 relative text-gray-500 text-right">
                            {/* fromBalance */}
                            {isFromLoading
                              ? ""
                              : `Balance: ${fromBalance.toString() || ""}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="self-stretch card-gradient-app-price rounded-3xl w-full">
                  <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 gap-[8px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
                    <div className="self-stretch flex flex-col gap-2">
                      <div className="input-title">{tTitle}</div>
                      <TToken
                        image={tToken?.image}
                        symbol={tToken?.symbol.toUpperCase()}
                        name={tToken?.chain ? tToken?.chain : tToken?.name}
                        openModal={openToTokenModal}
                      />
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start py-0 px-2">
                      {loading ? (
                        <>
                          <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[30%] mb-2"></div>
                        </>
                      ) : (
                        <>
                          <div className="input-sub-header self-stretch relative">
                            {tValue}
                          </div>
                        </>
                      )}

                      <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                        {isToLoading || loading ? (
                          <>
                            <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                                <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[60%] mb-2"></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          // <>
                          //   <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                          //     {`~$${
                          //       tValue
                          //         ? new Intl.NumberFormat().format(
                          //             Number(tValue) * Number(toPrice)
                          //           )
                          //         : ""
                          //     } (-${priceDeviation ? priceDeviation : ""}%)`}
                          //   </div>
                          // </>
                          <>
                            <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                              ~${toPrice}
                            </div>
                          </>
                        )}
                        {isConnected && (
                          <div className="flex-1 relative text-gray-500 text-right">
                            {/* toBalance */}
                            {isToLoading
                              ? ""
                              : `Balance: ${toBalance.toString() || ""}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 text-center input-token-container text-darkblue dark:text-indigo-500 font-roboto">
                  <div className="self-stretch rounded-xl bg-lightsteelblue dark:bg-exchange-rate-dark dark:text-indigo-500  dark:bg-opacity-20 flex flex-row items-center justify-center py-2 px-4 gap-[8px]">
                    {loadingExchangeRate ? (
                      <div className="relative animate-pulse h-3 xl:h-4 bg-indigo-200 rounded-full dark:bg-exchange-rate-dark w-[30%] mt-1 mb-1"></div>
                    ) : (
                      <>
                        <div className="flex-1 relative">
                          1 {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{" "}
                          {tToken?.symbol.toUpperCase()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className="cursor-pointer transition-transform duration-300 hover:scale-110 my-0 mx-[!important] absolute top-[calc(50%_-_60.5px)] left-[calc(50%_-_30px)] rounded-3xl bg-indigo-600 box-border h-[61px] flex flex-row items-start justify-start p-2 border-[12px] border-solid border-indigo-100 dark:border-exchange-rate-dark"
                  onClick={swapTokensPosition}
                >
                  <img
                    className="relative w-5 h-5 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/switch.png"
                  />
                </div>
              </div>

              {/* Control Logic for connect and swap */}
              {!isConnected && (
                <div
                  className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center input-token-container text-white font-roboto"
                  onClick={openWalletModal}
                >
                  <div className="flex-1 relative">Connect Wallet</div>
                </div>
              )}
              {isConnected && (
                <div
                  className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center input-token-container text-white font-roboto"
                  onClick={nextFunc}
                >
                  <div className="flex-1 relative">
                    {" "}
                    {`Defi ${fToken?.symbol.toUpperCase()} now`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Network Modal */}
          <TokenModal
            isTokenModalOpen={isNetworkModalOpen}
            setIsTokenModalOpen={setIsNetworkModalOpen}
            filteredTokens={networksOptions}
            setToken={setCheckChain}
            service={service}
            isNotCrypto={false}
            title={"Network"}
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
            title={"Select Token"}
          />

          {/* To Token Modal */}
          <TokenModal
            isTokenModalOpen={isToTokenModalOpen}
            setIsTokenModalOpen={setToTokenModalOpen}
            filteredTokens={filteredtTokens}
            setToken={setToToken}
            allTokens={allTokensTo}
            service={service}
            title={"Select Token"}
          />
          {/* Wallet Modal */}

          <WalletModal
            isTokenModalOpen={isWalletModalOpen}
            setIsTokenModalOpen={setIsWalletModalOpen}
            filteredTokens={connectors}
            setToken={setActiveConnection}
            allTokens={connectors}
            service={service}
            title={"Select Wallet"}
          />
        </div>
      </section>

      {/* Wallet Modal */}
      {/* <WalletModal
        isTokenModalOpen={isWalletModalOpen}
        setIsTokenModalOpen={setIsWalletModalOpen}
        filteredTokens={connectors}
        setToken={setActiveConnection}
        allTokens={connectors}
        service={service}
        title={"Select Wallet"}
      /> */}
      {/* Slippage Modal */}
      <SlippageModal
        isTokenModalOpen={isSlippageModalOpen}
        setIsTokenModalOpen={setIsSlippageModalOpen}
        setSlippage={setActiveSlippage}
        slippage={slippage}
        title={"Slippage tolerance"}
      />
    </>
  );
};

export default DefiApp;
