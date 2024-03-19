import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SellCashApp from '../components/SellCashApp';
import { SellCashScreen2 } from './SellCashScreen2';
import { SellCashScreen3 } from './SellCashScreen3';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserTransactions,
  getTransactionRate,
} from '../../../redux/features/transaction/transactionSlice';
import {
  getTokenExchangeRate,
  getTransactionRateInfo,
} from '../../../services/apiService';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]
const paymentOptions = ['card', 'cash'];
const cities = [
  {
    country: "USA",
    cities: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Miami",
      "San Francisco",
      "Nashville",
    ],
    flag: "/usa.png",
  },
  {
    country: "UK",
    cities: [
      "London",
      "Liverpool",
      "Birmingham",
      "Manchester",
      "Glasgow",
      "Cambridge",
    ],
    flag: "/uk.png",
  },
  {
    country: "France",
    cities: ["Paris", "Marseille", "Lyon", "Rouen", "Strasbourg"],
    flag: "/france.png",
  },

  {
    country: "Germany",
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    flag: "/germany.png",
  },
  {
    country: "Spain",
    cities: ["Madrid", "Barcelona", "Valencia"],
    flag: "/spain.png",
  },
  {
    country: "Russia",
    cities: [
      "Moscow",
      "Saint Petersburg",
      "Kazan",
      "Yekaterinburg",
      "Omsk",
      "Novosibirsk",
      "Chelyabinsk",
    ],
    flag: "/russia.png",
  },
  {
    country: "Finland",
    cities: ["Helsinki", "Espoo", "Oulou", "Tampere"],
    flag: "/finland.png",
  },
  {
    country: "Hungary",
    cities: ["Budapest", "Debrecen", "Szeged", "Pecs"],
    flag: "/hungary.png",
  },
  {
    country: "Czech",
    cities: ["Prague", "Brno", "Liberec", "Olomouc"],
    flag: "/czech.png",
  },
  {
    country: "UAE",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain"],
    flag: "/uae.png",
  },
];

export const SellCashHome = (props) => {
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

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const dispatch = useDispatch();
  const allTokensFromL = useSelector((state) => state.token?.tokenListSell); // send token to get money
  const allTokensToL = useSelector((state) => state.token?.tokenListFiat);

  const [allTokensFrom, setAllTokensFrom] = useState(allTokensFromL || null);
  const [allTokensTo, setAllTokensTo] = useState(allTokensToL || null);

  //======================={RATES and PRICES}========================================================
  const [loading, setLoading] = useState(false);
  const [loadingExchangeRate, setLoadingExchangeRate] = useState(false);

  const [error, setError] = useState('');
  const [retryMessage, setRetryMessage] = useState();
  const [exchangeRateInfo, setExchangeRateInfo] = useState('0');
  console.log({ exchangeRateInfo: exchangeRateInfo });
  const transactionRatesL = localStorage.getItem('transactionRatesSellCash')
    ? JSON.parse(localStorage.getItem('transactionRatesSellCash'))
    : 0;
  // const [transactionRates, setTransactionRates] = useState(0);
  const [transactionRates, setTransactionRates] = useState(transactionRatesL);
  console.log({ transactionRates: transactionRates });

  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;

  //==============={Primary Data}=========================

  const percentageProgressL = localStorage.getItem('percentageProgressSellCash')
    ? JSON.parse(localStorage.getItem('percentageProgressSellCash'))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const fTokenL = localStorage.getItem('fTokenSellCash')
    ? JSON.parse(localStorage.getItem('fTokenSellCash'))
    : null;

  const [fToken, setFromToken] = useState(fTokenL);
  const tTokenL = localStorage.getItem('tTokenSellCash')
    ? JSON.parse(localStorage.getItem('tTokenSellCash'))
    : null;
  const [tToken, setToToken] = useState(tTokenL);
  const fValueL = localStorage.getItem('fValueSellCash')
    ? JSON.parse(localStorage.getItem('fValueSellCash'))
    : 1;
  const [fValue, setFromValue] = useState(fValueL);

  const [fTitle, setFTitle] = useState('You give');
  const [tTitle, setTTitle] = useState('You get');
  //=============={Exchange1of4}=======================================

  const userAddressL = localStorage.getItem('userAddress')
    ? JSON.parse(localStorage.getItem('userAddress'))
    : null;

  const [userAddress, setUserAddress] = useState(userAddressL);

  const [activeInterval, setActiveInterval] = useState(0);
  const [initailInterval, setinitailInterval] = useState(10000); // fixed// every 10 seconds
  const [delay, setDelay] = useState(60000); // fixed 1 minute 0r 60 secs
  const [nextInterval, setNextInterval] = useState(initailInterval);

  console.log({ activeInterval: activeInterval });
  // const [nextInterval, setNextInterval] = useState(30000);
  console.log({ nextInterval: nextInterval });

  //=============={Exchange3of4}=======================================

  const telegramL = localStorage.getItem('telegram')
    ? JSON.parse(localStorage.getItem('telegram'))
    : null;

  const [telegram, setTelegram] = useState(telegramL);

  const paymentMethodL = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : paymentOptions[0];

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodL);

  const countryL = localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : cities[5]?.country;

  const cityDataL = localStorage.getItem('cityData')
    ? JSON.parse(localStorage.getItem('cityData'))
    : null;
  const cityL = localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city'))
    : null;

  const [country, setCountry] = useState(countryL);
  const [cityData, setCityData] = useState(cityDataL);
  const [city, setCity] = useState(cityL);

  console.log({
    city: city,
    cityData: cityData,
    country: country,
  });

  /************************************************************************************** */
  /******************************{TODO REDIRECT TO LOGIN********************************* */
  /************************************************************************************** */
  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================
  //======================================================================================================

  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        'percentageProgressSellCash',
        JSON.stringify(percentageProgress)
      );
      setPercentageProgressHome(percentageProgress);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  useEffect(() => {
    if (allTokensFromL) {
      setAllTokensFrom(allTokensFromL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allTokensToL) {
      setAllTokensTo(allTokensToL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (allTokensFromL && !fToken) {
      setFromToken(allTokensFromL[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensFromL]);

  useEffect(() => {
    if (allTokensToL && !tToken) {
      setToToken(allTokensToL[3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokensToL]);

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================
  useEffect(() => {
    dispatch(getUserTransactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  async function getCities() {
    // let allCities;
    cities?.map(async (l) => {
      if (l.country === country) {
        setCityData(l.cities);
        setCity(l.cities[0]);
      }
    });
  }

  useEffect(() => {
    if (country) {
      localStorage.setItem('country', JSON.stringify(country));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    if (cityData) {
      localStorage.setItem('cityData', JSON.stringify(cityData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData]);

  useEffect(() => {
    if (city) {
      localStorage.setItem('city', JSON.stringify(city));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    if (telegram) {
      localStorage.setItem('telegram', JSON.stringify(telegram));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegram]);

  useEffect(() => {
    if (transactionRates) {
      localStorage.setItem(
        'transactionRatesSellCash',
        JSON.stringify(transactionRates)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionRates]);
  useEffect(() => {
    if (fToken) {
      localStorage.setItem('fTokenSellCash', JSON.stringify(fToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    if (tToken) {
      localStorage.setItem('tTokenSellCash', JSON.stringify(tToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    if (fValue) {
      localStorage.setItem('fValueSellCash', JSON.stringify(fValue));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  useEffect(() => {
    if (userAddress) {
      localStorage.setItem('userAddress', JSON.stringify(userAddress));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  useEffect(() => {
    if (paymentMethod) {
      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  //====================================================================================================
  //======================================={PRICE BLOCK}================================================
  //====================================================================================================

  useEffect(() => {
    if (activeInterval) {
      setNextInterval(activeInterval);
    }
  }, [activeInterval]);

  useEffect(() => {
    if (exchangeRateInfo?.exchangeRate === '0.000') {
      setActiveInterval(initailInterval + delay);
      setTimeout(() => {
        setActiveInterval(initailInterval);
      }, initailInterval + delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateInfo]);

  useEffect(() => {
    if (exchangeRateInfo?.exchangeRate === '0.000') {
      setLoadingExchangeRate(true);
      setLoading(true);
      console.log({ loading: 'loading prices please hold' });
    } else {
      setLoadingExchangeRate(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeRateInfo]);

  // Simulate fetching expected prices
  useEffect(() => {
    priceDataException();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, exchangeRateInfo]);

  //=========={on Page Reload or Mount}=============================

  useEffect(() => {
    const fetchPrices = async () => {
      exchangeRateException();
    };

    fetchPrices();

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

      if (response.exchangeRate === 'undefined') {
        // set is loading as true
        //too many requests
        return;
      }
      if (response.exchangeRate) {
        // set is loading as true
        setExchangeRateInfo(response);
        setRetryMessage('');
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
      fValue === '0' ||
      fValue === null ||
      fValue === undefined
    ) {
      return;
    }

    if (
      Number(exchangeRateInfo?.exchangeRate) === 0 ||
      exchangeRateInfo?.exchangeRate === '0.000' ||
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

    //=================={update currency}==============

    useEffect(() => {
      updateCurrency();
    }, [country]);
  
    async function updateCurrency() {
      if (country === "USA") {
        setToToken(allTokensTo[0]);
      }
      if (country === "UK") {
        setToToken(allTokensTo[2]);
      }
      if (country === "France") {
        setToToken(allTokensTo[1]);
      }
      if (country === "Germany") {
        setToToken(allTokensTo[1]);
      }
      if (country === "Spain") {
        setToToken(allTokensTo[1]);
      }
      if (country === "Russia") {
        setToToken(allTokensTo[3]);
      }
      if (country === "Finland") {
        setToToken(allTokensTo[1]);
      }
      if (country === "Hungary") {
        setToToken(allTokensTo[1]);
      }
      if (country === "Czech") {
        setToToken(allTokensTo[1]);
      }
      if (country?.country === "UAE") {
        setToToken(allTokensTo[4]);
      }
    }
  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      {percentageProgress === 1 && (
        <>
          <SellCashApp
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
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentOptions={paymentOptions}
            cities={cities}
            setCountry={setCountry}
            setCityData={setCityData}
            setCity={setCity}
            country={country}
            cityData={cityData}
            city={city}
            tValue={tValue}
            transactionRates={transactionRates}
            loadingExchangeRate={loadingExchangeRate}
          />
        </>
      )}
      {percentageProgress === 2 && (
        <SellCashScreen2
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
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentOptions={paymentOptions}
          cities={cities}
          setCountry={setCountry}
          setCityData={setCityData}
          setCity={setCity}
          country={country}
          cityData={cityData}
          city={city}
          tValue={tValue}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          telegram={telegram}
          setTelegram={setTelegram}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
      {percentageProgress === 3 && (
        <SellCashScreen3
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
          country={country}
          city={city}
          telegram={telegram}
          transactionRates={transactionRates}
          loadingExchangeRate={loadingExchangeRate}
        />
      )}
    </>
  );
};
