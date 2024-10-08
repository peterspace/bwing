import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExchangeApp from "../components/ExchangeApp";
import { ExchangeScreen2 } from "./ExchangeScreen2";
import { ExchangeScreen3 } from "./ExchangeScreen3";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionRate } from "../../../redux/features/transaction/transactionSlice";

import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from "../../../services/apiService";

import { getTokenListExchange } from "../../../redux/features/token/tokenSlice";

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]
export const ExchangeHome = (props) => {
  const {
    mode,
    user,
    service,
    subService,
    txInfo,
    setTxInfo,
    setService,
    setSubService,
    setPercentageProgressHome,
  } = props;
  const location = useLocation();

  //==================================================================
  //==================================================================
  //The type of service initiated will determine the api calls made and used by the estimator for calling token list and prices
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();
  const allTokensFromL = useSelector((state) => state.token?.tokenListExchange);
  const allTokensToL = useSelector((state) => state.token?.tokenListExchange);
  console.log({ allTokensFrom: allTokensFromL });

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL);

  const [allTokensTo, setAllTokensTo] = useState(allTokensToL);
  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState("");
  const [retryMessage, setRetryMessage] = useState();
  const [exchangeRateInfo, setExchangeRateInfo] = useState("0");
  console.log({ exchangeRateInfo: exchangeRateInfo });
  const transactionRatesL = localStorage.getItem("transactionRatesExchange")
    ? JSON.parse(localStorage.getItem("transactionRatesExchange"))
    : 0;
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);
  // const [transactionRates, setTransactionRates] = useState();

  console.log({ transactionRates: transactionRates });
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  // console.log({ transactionRatesLoading: transactionRatesLoading });

  //======================={RATES and PRICES}========================================================

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const percentageProgressL = localStorage.getItem("percentageProgressExchange")
    ? JSON.parse(localStorage.getItem("percentageProgressExchange"))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  //==============={Primary Data}=========================

  const fTokenL = localStorage.getItem("fTokenExchange")
    ? JSON.parse(localStorage.getItem("fTokenExchange"))
    : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem("tTokenExchange")
    ? JSON.parse(localStorage.getItem("tTokenExchange"))
    : null;
  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem("fValueExchange")
    ? JSON.parse(localStorage.getItem("fValueExchange"))
    : 1;
  const [fValue, setFromValue] = useState(fValueL);

  const [fTitle, setFTitle] = useState("You send");
  const [tTitle, setTTitle] = useState("You get");

  const userAddressL = localStorage.getItem("userAddress")
    ? JSON.parse(localStorage.getItem("userAddress"))
    : null;

  const [userAddress, setUserAddress] = useState(userAddressL);
  console.log({ tValue });
  console.log({ fValue });

  console.log({ tValueType: typeof tValue });

  console.log({ fValueType: typeof fValue });
  //==================={ON: On delay Timer}===========================
  const [activeInterval, setActiveInterval] = useState(0);
  const [initailInterval, setinitailInterval] = useState(10000); // fixed// every 10 seconds
  const [delay, setDelay] = useState(60000); // fixed 1 minute 0r 60 secs
  const [nextInterval, setNextInterval] = useState(initailInterval);

  console.log({ activeInterval: activeInterval });
  // const [nextInterval, setNextInterval] = useState(30000);
  console.log({ nextInterval: nextInterval });

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        "percentageProgressExchange",
        JSON.stringify(percentageProgress)
      );
      setPercentageProgressHome(percentageProgress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  //==================={All Tokens List}===========================
  useEffect(() => {
    if (allTokensFromL) {
      setAllTokensFrom(allTokensFromL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL) {
      setAllTokensTo(allTokensToL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);
  //==================={Default Selected Tokens }===========================

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

  useEffect(() => {
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================

  useEffect(() => {
    if (transactionRates) {
      localStorage.setItem(
        "transactionRatesExchange",
        JSON.stringify(transactionRates)
      );
    } else {
      setLoading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);

  useEffect(() => {
    if (fToken) {
      localStorage.setItem("fTokenExchange", JSON.stringify(fToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    if (tToken) {
      localStorage.setItem("tTokenExchange", JSON.stringify(tToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    if (fValue) {
      localStorage.setItem("fValueExchange", JSON.stringify(fValue));
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

  // useEffect(() => {
  //   if (activeInterval) {
  //     setNextInterval(activeInterval);
  //   }
  // }, [activeInterval]);

  // useEffect(() => {
  //   if (exchangeRateInfo?.exchangeRate === "0.000") {
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
    if (exchangeRateInfo?.exchangeRate === "0.000") {
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
    const userData = { fToken, tToken, service, subService };
    try {
      setLoading(true);
      setLoadingExchangeRate(true);

      const response = await getTokenExchangeRate(userData);
      console.log({ exchangeData: response });

      // setExchangeRateInfo(response?.exchangeRate);

      if (response.exchangeRate === "undefined") {
        // set is loading as true
        //too many requests
        return;
      }
      if (response.exchangeRate) {
        // set is loading as true
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
      fToken,
      tToken,
      exchangeRate: exchangeRateInfo?.exchangeRate,
      fValue,
      service,
      subService,
    };
    try {
      setLoading(true);

      const response = await getTransactionRateInfo(userData);

      if (response.tValueFormatted) {
        // setTransactionRates(response);
        let newRates = response;
        let updatedRate = {
          ...newRates,
          exchangeRate: exchangeRateInfo?.exchangeRate,
          fromPrice: exchangeRateInfo?.fUSDPrice,
          toPrice: exchangeRateInfo?.tUSDPrice,
        };
        setTransactionRates(updatedRate);

        dispatch(getTransactionRate(updatedRate));
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

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      {percentageProgress === 1 && (
        <>
          <ExchangeApp
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
            service={service}
            setService={setService}
            subService={subService}
            setSubService={setSubService}
            setTxInfo={setTxInfo}
            allTokensFrom={allTokensFrom}
            allTokensTo={allTokensTo}
            exchangeRate={exchangeRate}
            transactionRates={transactionRates}
            loadingExchangeRate={loadingExchangeRate}
            swapTokensPosition={swapTokensPosition}
          />
        </>
      )}
      {percentageProgress === 2 && (
        <ExchangeScreen2
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
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
          setTxInfo={setTxInfo}
          allTokensFrom={allTokensFrom}
          allTokensTo={allTokensTo}
          exchangeRate={exchangeRate}
          transactionRates={transactionRates}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
      {percentageProgress === 3 && (
        <ExchangeScreen3
          percentageProgress={percentageProgress}
          setPercentageProgress={setPercentageProgress}
          fToken={fToken}
          tToken={tToken}
          fValue={fValue}
          userAddress={userAddress}
          fTitle={fTitle}
          tTitle={tTitle}
          service={service}
          subService={subService}
          setTxInfo={setTxInfo}
          transactionRates={transactionRates}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
    </>
  );
};
