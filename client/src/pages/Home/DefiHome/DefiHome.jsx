import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useConnect,
  useAccount,
  useSwitchNetwork,
  useSigner,
  useBalance,
} from "wagmi";
import erc20ABI from "./engine/erc20.json";
import { ethers } from "ethers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import DefiApp from "../components/DefiApp";
import { DefiScreen4 } from "./DefiScreen4";
import Modal from "./Modal";

import { useDispatch, useSelector } from "react-redux";

import {
  getTransactionRateSwap,
  updateChain,
} from "../../../redux/features/swap/swapSlice";
import { updateTransactionsAutomatically } from "../../../redux/features/transaction/transactionSlice";

import {
  getTransactionSwapRateService,
  getTokenExchangeRateSwapService,
  getSpenderService,
  swapService,
  getSwapApprovalService,
  createTransactionService,
} from "../../../services/apiService";
import { networksOptions } from "../../../constants";
import { getTokensDefiByIdService } from "../../../services/apiService";
//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]

export const DefiHome = (props) => {
  const {
    mode,
    user,
    service,
    subService,
    txInfo,
    setTxInfo,
    setService,
    setSubService,
    //========={new}=======================
    isToLoading,
    setIsToLoading,
    isFromLoading,
    setIsFromLoading,
    setPercentageProgressHome,
  } = props;
  const location = useLocation();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************    WAGMI BLOCK    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;
  //====================================================================================================
  //======================================={BALANCES}=====================================
  //====================================================================================================

  const chainL = localStorage.getItem("chainDefi")
    ? JSON.parse(localStorage.getItem("chainDefi"))
    : networksOptions[0];

  const [chain, setChain] = useState(chainL);
  // const [chain, setChain] = useState();
  const chainId = chain?.chainId;

  const { data: dataBal } = useBalance({
    address,
    chainId: Number(chainId), // requires type "Number"
    watch: true,
  });

  const [balance, setBalance] = useState("");
  const [fromBalance, setFromBalance] = useState(0.0);
  const [toBalance, setToBalance] = useState(0.0);

  //====================================================================================================
  //======================================={pPice Deviation}=====================================
  //====================================================================================================

  const [priceDeviation, setPriceDeviation] = useState(0.0);
  const [isPriceDeviation, setIsPriceDeviation] = useState(true);
  const [isCriticalPriceDeviation, setIsCriticalPriceDeviation] =
    useState(true);
  //==================================================================
  //==================================================================
  //The type of service initiated will determine the api calls made and used by the estimator for calling token list and prices
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();
  // const allTokensFromL = useSelector((state) => state.token?.tokensDefiById);
  // const allTokensToL = useSelector((state) => state.token?.tokensDefiById);

  const allTokensFromL = localStorage.getItem("allTokensFromDefi")
    ? JSON.parse(localStorage.getItem("allTokensFromDefi"))
    : null;

  const allTokensToL = localStorage.getItem("allTokensToDefi")
    ? JSON.parse(localStorage.getItem("allTokensToDefi"))
    : null;

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL);
  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState("");
  console.log({ error: error });
  const [retryMessage, setRetryMessage] = useState();
  // console.log({retryMessage:retryMessage})

  const [exchangeRateInfo, setExchangeRateInfo] = useState();
  const transactionRatesL = localStorage.getItem("transactionRatesDefi")
    ? JSON.parse(localStorage.getItem("transactionRatesDefi"))
    : 0;
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);
  // const [transactionRates, setTransactionRates] = useState();

  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const fromPrice = transactionRates ? transactionRates?.fromPrice : 0;
  const toPrice = transactionRates ? transactionRates?.toPrice : 0;

  const [errorSwap, setErrorSwap] = useState("");
  const [errorSwapApprove, setErrorSwapApprove] = useState("");

  console.log({ errorSwap: errorSwap });
  console.log({ errorSwapApprove: errorSwapApprove });

  // console.log({ transactionRatesLoading: transactionRatesLoading });

  //======================={RATES and PRICES}========================================================

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     SWAP PARAMS    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const percentageProgressL = localStorage.getItem("percentageProgressDefi")
    ? JSON.parse(localStorage.getItem("percentageProgressDefi"))
    : 1;
  // const percentageProgressL = localStorage.getItem('percentageProgressDefi')
  //   ? JSON.parse(localStorage.getItem('percentageProgressDefi'))
  //   : 4;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const fTokenL = localStorage.getItem("fTokenDefi")
    ? JSON.parse(localStorage.getItem("fTokenDefi"))
    : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem("tTokenDefi")
    ? JSON.parse(localStorage.getItem("tTokenDefi"))
    : null;
  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem("fValueDefi")
    ? JSON.parse(localStorage.getItem("fValueDefi"))
    : 1;
  const [fValue, setFromValue] = useState(fValueL);

  const updatedSlippage = useSelector((state) => state?.swap?.slippage);
  const slippageL = localStorage.getItem("slippageDefi")
    ? JSON.parse(localStorage.getItem("slippageDefi"))
    : "1";

  const [slippage, setSlippage] = useState(slippageL);

  const approvingDataL = localStorage.getItem("approvingDataDefi")
    ? JSON.parse(localStorage.getItem("approvingDataDefi"))
    : null;
  const [approvingData, setApprovingData] = useState(approvingDataL);
  console.log({ approvingData: approvingData });

  const approvalResponseL = localStorage.getItem("approvalResponseDefi")
    ? JSON.parse(localStorage.getItem("approvalResponseDefi"))
    : null;
  const [approvalResponse, setApprovalResponse] = useState(approvalResponseL);
  console.log({ approvalResponse: approvalResponse });

  const swappingDataL = localStorage.getItem("swappingDataDefi")
    ? JSON.parse(localStorage.getItem("swappingDataDefi"))
    : null;
  const [swappingData, setSwappingData] = useState(swappingDataL);
  console.log({ swappingData: swappingData });
  const [estimatedGas, setEstimatedGas] = useState(0.0);

  const isSendTransactionL = localStorage.getItem("isSendTransactionDefi")
    ? JSON.parse(localStorage.getItem("isSendTransactionDefi"))
    : false;
  const [isSendTransaction, setIsSendTransaction] =
    useState(isSendTransactionL);

  const isSwapSuccessL = localStorage.getItem("isSwapSuccessDefi")
    ? JSON.parse(localStorage.getItem("isSwapSuccessDefi"))
    : false;
  const [isSwapSuccess, setIsSwapSuccess] = useState(isSwapSuccessL);
  const isChainChange = localStorage.getItem("chainSwitch")
    ? JSON.parse(localStorage.getItem("chainSwitch"))
    : false;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************    CONDITIONALS    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const [isRouting, setIsRouting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  // const [customSlippage, setCustomSlippage] = useState('');
  // const [isSlippageChange, setIsSlippageChange] = useState(false);
  // const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is

  const [isSwapError, setIsSwapError] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [isApproveError, setIsApproveError] = useState(false);
  //================{PAGES}==================

  const [validationOwner, setValidationOwner] = useState(false);
  console.log({ validationOwner: validationOwner });

  const isSwappingL = localStorage.getItem("isSwapping")
    ? JSON.parse(localStorage.getItem("isSwapping"))
    : false;
  const [isSwapping, setIsSwapping] = useState(isSwappingL); // approval granted

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const [fTitle, setFTitle] = useState("You send");
  const [tTitle, setTTitle] = useState("You get");

  const userAddressL = localStorage.getItem("userAddress")
    ? JSON.parse(localStorage.getItem("userAddress"))
    : null;

  const [userAddress, setUserAddress] = useState(userAddressL);
  const [spender, setSpender] = useState();
  // console.log({ spender: spender });

  //==================={ON: On delay Timer}===========================
  const [activeInterval, setActiveInterval] = useState(0);
  const [initailInterval, setinitailInterval] = useState(10000); // fixed// every 10 seconds
  const [delay, setDelay] = useState(60000); // fixed 1 minute 0r 60 secs
  const [nextInterval, setNextInterval] = useState(initailInterval);

  const [openModel, setOpenModel] = useState(false);

  //==================={All Tokens List}====================================

  useEffect(() => {
    if (chain) {
      localStorage.setItem("chainDefi", JSON.stringify(chain));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  //========{API CALLS}=========================
  useEffect(() => {
    if (!chain && chainL) {
      // setChain(chainL);
      // dispatch(updateChain(chainL));

      setChain(chainL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  async function getConnectedChain() {
    const response = await getTokensDefiByIdService(chainId);
    if (response) {
      setAllTokensFrom(response);
      setAllTokensTo(response);
      setFromToken(response[0]);
      setToToken(response[1]);
    }
  }

  useEffect(() => {
    getConnectedChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  //==================={Default Selected Tokens }===========================

  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        "percentageProgressDefi",
        JSON.stringify(percentageProgress)
      );
      setPercentageProgressHome(percentageProgress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  useEffect(() => {
    if (allTokensFrom) {
      localStorage.setItem("allTokensFromDefi", JSON.stringify(allTokensFrom));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFrom]);

  useEffect(() => {
    if (approvalResponse) {
      localStorage.setItem(
        "approvalResponseDefi",
        JSON.stringify(approvalResponse)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalResponse]);

  useEffect(() => {
    if (allTokensTo) {
      localStorage.setItem("allTokensToDefi", JSON.stringify(allTokensTo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensTo]);

  useEffect(() => {
    if (allTokensFromL && !fToken) {
      setFromToken(allTokensFromL[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL && !tToken) {
      setToToken(allTokensToL[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);

  //==================={Default Selected Tokens }===========================

  useEffect(() => {
    if (allTokensFromL && !fToken) {
      setFromToken(allTokensFromL[0]);
    }

    if (allTokensFromL && isChainChange === true && chainId !== null) {
      setFromToken(allTokensFromL[0]);
      localStorage.setItem("chainSwitch", JSON.stringify(false));
      localStorage.setItem("chainId", JSON.stringify(chainId));
      networksOptions?.map(async (b) => {
        if (b.id === chainId) {
          localStorage.setItem("chain", JSON.stringify(b));
          dispatch(updateChain(b));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL, isChainChange]);

  useEffect(() => {
    if (allTokensToL && !tToken) {
      setToToken(allTokensToL[1]);
    }

    if (allTokensToL && isChainChange === true && chainId !== null) {
      setToToken(allTokensToL[1]);
      localStorage.setItem("chainSwitch", JSON.stringify(false));
      localStorage.setItem("chainId", JSON.stringify(chainId));
      networksOptions?.map(async (b) => {
        if (b.id === chainId) {
          localStorage.setItem("chain", JSON.stringify(b));
          dispatch(updateChain(b));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL, isChainChange]);

  useEffect(() => {
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================

  useEffect(() => {
    if (transactionRates) {
      localStorage.setItem(
        "transactionRatesDefi",
        JSON.stringify(transactionRates)
      );
    } else {
      setLoading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  useEffect(() => {
    if (fToken) {
      localStorage.setItem("fTokenDefi", JSON.stringify(fToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    if (tToken) {
      localStorage.setItem("tTokenDefi", JSON.stringify(tToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    setSlippage(updatedSlippage);
  }, [updatedSlippage]);

  useEffect(() => {
    if (slippage) {
      localStorage.setItem("slippageDefi", JSON.stringify(slippage));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slippage]);

  useEffect(() => {
    if (fValue) {
      localStorage.setItem("fValueDefi", JSON.stringify(fValue));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  useEffect(() => {
    if (userAddress) {
      localStorage.setItem("userAddress", JSON.stringify(userAddress));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================

  useEffect(() => {
    if (activeInterval) {
      setNextInterval(activeInterval);
    }
  }, [activeInterval]);

  // useEffect(() => {
  //   if (exchangeRateInfo === '0.000') {
  //     setActiveInterval(initailInterval + delay);

  //     setTimeout(() => {
  //       setActiveInterval(initailInterval);
  //     }, initailInterval + delay);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [exchangeRateInfo]);

  // Simulate fetching expected prices
  useEffect(() => {
    priceDataException();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRateInfo]);

  //=========={on Page Reload or Mount}=============================

  useEffect(() => {
    exchangeRateException();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);
  useEffect(() => {
    const fetchPrices = async () => {
      exchangeRateException();
    };
    fetchPrices();

    let priceInterval;

    let duration = nextInterval; // stable mode // 15000 for buy and sell since we're only making a single request per time

    priceInterval = setInterval(fetchPrices, duration); // once every 30 seconds (i.e 4 calls per minute)

    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  useEffect(() => {
    if (exchangeRateInfo === "0.000") {
      setLoadingExchangeRate(true);
      setLoading(true);
      console.log({ loading: "loading prices please hold" });
    } else {
      setLoadingExchangeRate(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateInfo]);

  const exchangeRateException = async () => {
    if (!fToken) {
      return;
    }

    if (!tToken) {
      return;
    }
    // const userData = { fToken, tToken, service: 'defi', subService: 'defi' };
    const userData = {
      fToken,
      tToken,
      chainId,
    };

    try {
      setLoading(true);
      setLoadingExchangeRate(true);

      const response = await getTokenExchangeRateSwapService(userData);
      console.log({ exchangeData: response });
      if (response.exchangeRate === "undefined") {
        return;
      }
      if (response.exchangeRate) {
        setExchangeRateInfo(response);
        setRetryMessage("");
      }
      if (response.message) {
        setRetryMessage(response?.message);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setLoadingExchangeRate(false);
    }
  };
  //====================={PRICE DATA RATE ERROR HANDLING}=========================

  const priceDataException = async () => {
    if (
      fValue === 0 ||
      fValue === "0" ||
      fValue === null ||
      fValue === undefined
    ) {
      return;
    }

    if (
      Number(exchangeRateInfo?.exchangeRate) === 0 ||
      exchangeRateInfo?.exchangeRate === "0.000" ||
      exchangeRateInfo?.exchangeRate === null ||
      exchangeRateInfo?.exchangeRate === undefined
    ) {
      return;
    }

    if (!fToken) {
      return;
    }

    if (!tToken) {
      return;
    }
    const userData = {
      exchangeRate: exchangeRateInfo?.exchangeRate,
      fValue,
    };
    try {
      setLoading(true);

      const response = await getTransactionSwapRateService(userData);

      if (response.tValueFormatted) {
        let newRates = response;
        let updatedRate = {
          ...newRates,
          exchangeRate: exchangeRateInfo?.exchangeRate,
          fromPrice: exchangeRateInfo?.fUSDPrice,
          toPrice: exchangeRateInfo?.tUSDPrice,
        };
        setTransactionRates(updatedRate); // update the transaction rate
        dispatch(getTransactionRateSwap(updatedRate));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  function swapTokensPosition() {
    setLoading(true);
    let tmpToken = fToken;
    let tmValue = tValue;
    setFromValue(tmValue);
    setFromToken(tToken);
    setToToken(tmpToken);
  }

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************    NEW SWAP BLOCK    *************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  //====================================================================================================
  //======================================={CHAIN BALANCE}=====================================
  //====================================================================================================

  useEffect(() => {
    getChainBalance();

    if (isNaN(balance)) {
      // return NaN;
      getChainBalance();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  async function getChainBalance() {
    if (isConnected) {
      const tokenbal = Number(dataBal?.formatted).toFixed(3);
      setBalance(tokenbal);
      if (tToken?.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        // setToBalance(balance);
        setToBalance(Number(balance));
      }
      if (fToken?.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        // setToBalance(balance);
        setFromBalance(Number(balance));
      }
      localStorage.setItem("chainBalance", JSON.stringify(tokenbal));
    }
  }

  //======================================={PRCICE DEVIATION}=====================================
  //====================================================================================================

  useEffect(() => {
    if (tValue !== 0) {
      getPriceDeviation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue, fromPrice, toPrice]);

  async function getPriceDeviation() {
    let fromValueTotalL = Number(fValue) * Number(fromPrice);
    let toValueTotalL = Number(tValue) * Number(toPrice);
    if (fromValueTotalL > toValueTotalL) {
      let priceDifference = fromValueTotalL - toValueTotalL;
      let priceSum = toValueTotalL + fromValueTotalL;
      let priceAverage = priceSum / 2;
      let percentageDeviationRaw = 100 * (priceDifference / priceAverage);
      let percentageDeviation = percentageDeviationRaw.toFixed(2);

      setPriceDeviation(percentageDeviation);
      setIsPriceDeviation(true);

      if (Number(percentageDeviationRaw) > 12) {
        setIsCriticalPriceDeviation(true);
      }
    } else {
      setIsPriceDeviation(false);
    }
  }

  //====================================================================================================
  //======================================={SLIPPAGE}=====================================
  //====================================================================================================

  useEffect(() => {
    let slippageValue = Number(slippage);
    if (slippage !== null && slippageValue > 0 && slippageValue < 0.09) {
      setIsLowSlippage(true);
    }

    if (slippageValue > 3) {
      setIsWarning(true);
    }

    if (slippage !== null && slippageValue > 0.09 && slippageValue <= 3) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }

    if (slippage === null || undefined) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
    if (slippage === "") {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
  }, [slippage, isWarning, isLowSlippage]);

  //===================================================================================================

  useEffect(() => {
    if (isProcessing === true) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 10000); // reduce time
    }
  });
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************    SWAP BLOCK      **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  /*

  
 ====================================================================
                           Validate swap
 ====================================================================
*/

  useEffect(() => {
    localStorage.setItem("isSwapping", JSON.stringify(isSwapping));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwapping]);

  useEffect(() => {
    if (swappingData) {
      localStorage.setItem("swappingDataDefi", JSON.stringify(swappingData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swappingData]);

  useEffect(() => {
    if (approvingData) {
      localStorage.setItem("approvingDataDefi", JSON.stringify(approvingData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvingData]);

  useEffect(() => {
    if (isSwapSuccess) {
      localStorage.setItem("isSwapSuccessDefi", JSON.stringify(isSwapSuccess));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwapSuccess]);

  /*
 ====================================================================
                           Main Swap Call for step 3
 ====================================================================

*/
  //========={Step 1: Generate swap Data }=================
  // useEffect(() => {
  //   if (isSwapping) {
  //     getSwapInfo();
  //     setIsSwapping(false); // after thr process is completed
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSwapping]);

  //========={Step 2: swap only if the user has sufficient balance and there is liquidity for the token pair }=================
  // Why is estimatedGas not set ?
  async function swap() {
    console.log("swapping in progress");

    const userData = {
      chainId,
      fToken,
      tToken,
      walletAddress,
      slippage,
      fValue,
    };

    try {
      const response = await swapService(userData);

      if (response?.data) {
        setSwappingData(response?.data);
        try {
          let tx = {
            data: response?.data?.tx.data,
            from: response?.data?.tx.from,
            gasLimit: estimatedGas,
            // gasLimit: response?.data?.tx.gas,
            gasPrice: response?.data?.tx.gasPrice,
            to: response?.data?.tx.to,
            value: response?.data?.tx.value,
          };

          let wallet = signer.data;

          const transaction = await wallet.sendTransaction(tx);

          console.log({ swapReward: transaction });

          let txStatus = await transaction.wait();

          if (txStatus?.status) {
            // if (txStatus?.status === 1) {
            setIsSwapSuccess(true);
            setOpenModel(true);
            console.log({ txData: txStatus });
            console.log({
              txHash:
                (txStatus?.hash && txStatus?.hash) ||
                (txStatus?.transactionHash && txStatus?.transactionHash) ||
                "",
            });

            const txHash =
              (txStatus?.hash && txStatus?.hash) ||
              (txStatus?.transactionHash && txStatus?.transactionHash) ||
              "";

            let updatedSwappingData = {
              ...swappingData,
              hash: txHash,
            };
            setSwappingData(updatedSwappingData); // add txHash to swapping Data

            console.log({ txStatus: "Successful" });
          }
        } catch (error) {
          setErrorSwap(error?.message); // metamask error
          setIsSwapError(true);
          setOpenModel(true);
        }
      } else {
        setErrorSwap(response?.error?.errorDescription); // oneinch swap error
        setIsSwapError(true);
        setOpenModel(true);
      }
    } catch (error) {
      setError(error); // general server error // server error
    }
  }

  async function getSwapInfo() {
    if (
      fToken?.address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" ||
      fToken?.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      swap();
    } else {
      getSwapApprovalAndSwap();
    }
  }

  //======================={approval}============================

  async function getSwapApprovalAndSwap() {
    const userData = { chainId, fToken, fValue };

    try {
      const response = await getSwapApprovalService(userData);
      if (response) {
        setApprovingData(response);

        try {
          let tx = response;
          let wallet = signer.data;
          const approval = await wallet.sendTransaction(tx);
          console.log({ approvalReward: approval });

          let approvalStatus = await approval.wait();
          setApprovalResponse(approvalStatus);

          if (approvalStatus?.status) {
            setIsApproveSuccess(true);
            // setOpenModel(true);
            console.log({ approvalData: approvalStatus });
            console.log({
              txHash:
                (approvalStatus?.hash && approvalStatus?.hash) ||
                (approvalStatus?.transactionHash &&
                  approvalStatus?.transactionHash) ||
                "",
            });
            //===================================={Swap here}====================================
            setTimeout(async () => {
              //======={Proceed to swap directly after approval}==========================
              await swap(); // updated
            }, 2000);
          }
        } catch (error) {
          setErrorSwapApprove(error?.message); // metamask error
          setIsApproveError(true);
          setOpenModel(true);
        }
      }
    } catch (error) {
      // setErrorSwapApprove(error);
      console.error(error); // server error
    }
  }

  //====================={for testing}==================================
  async function getApprovalData() {
    const userData = { chainId, fToken, fValue };

    try {
      const response = await getSwapApprovalService(userData);

      setApprovingData(response);
    } catch (error) {
      // setErrorSwapApprove(
      //   error?.message ? error?.message : error?.data?.message
      // );
      console.error(error);
    }
  }

  //====================================================
  //========={ Generate swap Data }=================

  //=====================================================================================
  //======={ To be tested for switching inpute values}=========

  //================={updateProtocols}===============

  //=========================={TOKEN BALANCES}=================================
  //=========================={TOKEN BALANCES}=================================

  useEffect(() => {
    if (fromBalance === "NaN") {
      // return NaN;
      setTimeout(() => {
        fTokenBalance();
      }, 200);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromBalance]);

  useEffect(() => {
    if (isConnected) {
      setFromBalance(0.0);
      fTokenBalance();
    }

    if (isConnected === true && isChainChange === true) {
      // setFromBalance(0.0);
      setTimeout(() => {
        fTokenBalance();
      }, 2000); // production 2000
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, fToken, fromBalance, balance]);

  async function fTokenBalance() {
    let tokenAddress = fToken?.address;
    if (tokenAddress != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, fToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setFromBalance(formattedBalance);
      }
    }
  }

  useEffect(() => {
    if (isNaN(toBalance)) {
      // return NaN;
      setTimeout(() => {
        tTokenBalance();
      }, 200);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toBalance]);

  useEffect(() => {
    if (isConnected) {
      setToBalance(0.0);
      tTokenBalance();
    }

    if (isConnected === true && isChainChange === true) {
      // setToBalance(0.0);
      setTimeout(() => {
        tTokenBalance();
      }, 2000); // production 2000
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, tToken, toBalance, balance]);

  async function tTokenBalance() {
    let tokenAddress = tToken?.address;
    if (tokenAddress !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, tToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setToBalance(formattedBalance);
      }
    }
  }

  //======================================={USD Value Converter}===============================================
  //======================================={USD Value Converter}===============================================

  //========{API CALLS}=========================
  // useEffect(() => {
  //   UpdateSpender();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [spender, chain]);

  // async function UpdateSpender() {
  //   if (chainId) {
  //     const userData = {
  //       chainId: chainId ? chainId : '1',
  //     };
  //     const response = await getSpenderService(userData);
  //     if (response) {
  //       const { spenderData } = response;
  //       setSpender(spenderData);
  //     }
  //   }
  // }

  //=============={BACKEND CALLS}==========================

  //======================================={CREATES TRANSACTION HISTORY FOR ONLY COMPLETED TRANSACTIONS}============================================

  useEffect(() => {
    if (isSwapSuccess) {
      submitCompletedTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwapSuccess]);

  const submitCompletedTransaction = async () => {
    const userData = {
      //===========================
      userId: user?._id ? user?._id : user?.userId,
      fToken,
      tToken,
      fValue,
      userAddress,
      service,
      subService, // new to be added to frontend
      percentageProgress: 3, // completed transaction
      //======{new}==========
      youSend: transactionRates ? transactionRates?.youSend : 0,
      youGet: transactionRates ? transactionRates?.youGet : 0,
      serviceFee: transactionRates ? transactionRates?.serviceFee : 0,
      networkFee: transactionRates ? transactionRates?.networkFee : 0,
      processingFee: transactionRates ? transactionRates?.processingFee : 0,
      exchangeRate: transactionRates ? transactionRates?.exchangeRate : 0,
      tValue,
      amount: transactionRates ? transactionRates?.amount : 0,
      hash: swappingData?.hash || "",
      tx: swappingData?.tx, // transaction data
      directValue: transactionRates ? transactionRates?.directValue : 0,
    };

    const response = await createTransactionService(userData);
    if (response?._id) {
      const userData = {
        id: response?._id,
        status: "Completed", // payment recived
        percentageProgress: 5,
      };

      dispatch(updateTransactionsAutomatically(userData));
    }
  };

  //=====================================================================================

  return (
    <>
      {percentageProgress === 1 && (
        <>
          <DefiApp
            percentageProgress={percentageProgress}
            setPercentageProgress={setPercentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            fToken={fToken}
            setFromToken={setFromToken}
            tToken={tToken}
            setToToken={setToToken}
            fValue={fValue}
            setFromValue={setFromValue}
            loading={loading}
            mode={mode}
            service={service}
            setService={setService}
            subService={subService}
            setSubService={setSubService}
            setTxInfo={setTxInfo}
            allTokensFrom={allTokensFrom}
            allTokensTo={allTokensTo}
            transactionRates={transactionRates}
            chain={chain}
            setChain={setChain}
            chainId={chainId}
            loadingExchangeRate={loadingExchangeRate}
            //============={New}=================
            isFromLoading={isFromLoading}
            fromBalance={fromBalance}
            fromPrice={fromPrice}
            toPrice={toPrice}
            isToLoading={isToLoading}
            toBalance={toBalance}
            priceDeviation={priceDeviation}
            setSlippage={setSlippage}
            slippage={slippage}
            getSwapInfo={getSwapInfo}
            setApprovingData={setApprovingData}
            setSwappingData={setSwappingData}
            walletAddress={walletAddress}
            getApprovalData={getApprovalData}
            swap={swap}
            getSwapApprovalAndSwap={getSwapApprovalAndSwap}
            swapTokensPosition={swapTokensPosition}
          />
          <Modal visible={openModel}>
            <DefiScreen4
              percentageProgress={percentageProgress}
              setPercentageProgress={setPercentageProgress}
              isConnected={isConnected}
              setIsSwapSuccess={setIsSwapSuccess}
              isSwapSuccess={isSwapSuccess}
              isSwapError={isSwapError}
              isApproveSuccess={isApproveSuccess}
              isApproveError={isApproveError}
              setIsSwapError={setIsSwapError}
              setErrorSwap={setErrorSwap}
              setIsApproveSuccess={setIsApproveSuccess}
              setIsApproveError={setIsApproveError}
              setErrorSwapApprove={setErrorSwapApprove}
              setOpenModel={setOpenModel}
            />
          </Modal>
        </>
      )}
    </>
  );
};
