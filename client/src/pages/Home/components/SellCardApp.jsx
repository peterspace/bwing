import { useState, useEffect } from 'react';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import { useDispatch } from 'react-redux';
import TokenModal from '../../../components/TokenModal';
import OptionsModalSell from '../../../components/OptionsModalSell';
import CountriesModal from '../../../components/CountriesModal';
import PaymenOptionsModal from '../../../components/PaymenOptionsModal';
import ServiceHeaderBuy from './ServiceHeaderBuy';
import RatesLocalModel from '../../../components/RatesLocalModel';

import Menu from './Menu';
import ServiceHeader from './ServiceHeader';
import FToken from './FToken';
import TToken from './TToken';

//Laoding
//'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
// SellCardDark
const SellCardApp = (props) => {
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
    paymentMethod,
    setPaymentMethod,
    paymentOptions,
    cities,
    setCountry,
    setCityData,
    setCity,
    country,
    cityData,
    city,
    transactionRates,
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();

  // const loading = true;
  // const loadingExchangeRate = true;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     LOCAL STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [isNotCountrySupported, setIsNotCountrySupported] = useState(false);
  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const fromPrice = transactionRates ? transactionRates?.fromPrice : 0;
  const toPrice = transactionRates ? transactionRates?.toPrice : 0;
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setToTokenModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isSubServiceModalOpen, setIsSubServiceModalOpen] = useState(false);
  const [ratesModalOpen, setRatesModalOpen] = useState(false);

  const [isMinValue, setIsMinValue] = useState(false);
  const [isMaxValue, setIsMaxValue] = useState(false);

  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  //============================================{Token selection}==============================
  useEffect(() => {
    dispatch(getTokenListExchange());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  //================================================================================

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

  //====================================================================================

  async function nextFunc() {
    setService('sell');
    setSubService('sellCard');
    setPercentageProgress(2);
  }

  function openFromTokenModal() {
    setIsFromTokenModalOpen(true);
  }

  function openToTokenModal() {
    setToTokenModalOpen(true);
  }

  function openOptionsModal() {
    setIsOptionsModalOpen(true);
  }
  function openSubServiceModal() {
    setIsSubServiceModalOpen(true);
  }

  function openRatesModal() {
    setRatesModalOpen((prev) => !prev);
  }

  //==================================={RANGE}=================================================
  useEffect(() => {
    if (!tValue || Number(tValue) <= minValue) {
      setIsMinValue(true);
    } else {
      setIsMinValue(false);
    }

    if (Number(tValue) > maxValue) {
      setIsMaxValue(true);
    } else {
      setIsMaxValue(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue]);

  useEffect(() => {
    updateTransactionsRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken, tValue]);

  async function updateTransactionsRange() {
    if (tToken?.symbol === 'gbp') {
      setMinValue(150);
      setMaxValue(2000);
    }
    if (tToken?.symbol === 'eur') {
      setMinValue(150);
      setMaxValue(20000);
    }
    if (tToken?.symbol === 'usd') {
      setMinValue(150);
      setMaxValue(2000);
    }
    if (tToken?.symbol === 'aed') {
      setMinValue(1000);
      setMaxValue(10000);
    }
    if (tToken?.symbol === 'rub') {
      setMinValue(30000);
      setMaxValue(300000);
    }
  }

  return (
    <>
     <div className="flex sm:flex-col xl:flex-row">
     <>
        <div className="rounded-3xl bg-chizzySnow dark:bg-app-container-dark box-border w-[375px] xl:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[12px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300">
          <Menu
            service={service}
            setService={setService}
            subService={subService}
            setSubService={setSubService}
          />
          <ServiceHeaderBuy
            symbolSubService={paymentMethod === 'card' ? 'Card' : 'Cash'}
            symbolCountry={country}
            openSubServiceModal={openSubServiceModal}
            openCountryModal={openOptionsModal}
            countries={cities}
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
                 {loading ? (
                  <div className="relative animate-pulse h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mt-1 mb-1"></div>
                ) : (
                  <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                    <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                      ~${fromPrice}
                    </div>
                  </div>
                )}
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
                <div className="self-stretch relative font-medium"> </div>
                {loading ? (
                  <>
                    <div className="relative animate-pulse h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[30%] mb-2"></div>
                    <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                      <div className="relative animate-pulse h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mb-2"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="self-stretch relative font-medium">
                      {tValue}
                    </div>
                    <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                      <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                        ~${toPrice}
                      </div>
                      {isMinValue && (
                        <div className="flex-1 relative text-gray-500 text-right">
                          {`Min: ${minValue}`}
                        </div>
                      )}

                      {isMaxValue && (
                        <div className="flex-1 relative text-gray-500 text-right">
                          {` Max: ${maxValue}`}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 text-center text-xl text-darkblue dark:text-indigo-500  font-roboto">
            <div className="self-stretch rounded-xl bg-lightsteelblue dark:bg-exchange-rate-dark dark:text-indigo-500  dark:bg-opacity-20 flex flex-row items-center justify-center py-2 px-4 gap-[8px]">
                {loadingExchangeRate ? (
                  <div className="relative animate-pulse h-4 bg-indigo-200 rounded-full dark:bg-exchange-rate-dark w-[30%] mt-1 mb-1"></div>
                ) : (
                  <>
                    <div className="flex-1 relative">
                      1 {fToken?.symbol.toUpperCase()} ~ {exchangeRate}{' '}
                      {tToken?.symbol.toUpperCase()}
                    </div>
                    <img
                      className="cursor-pointer relative w-4 h-4 overflow-hidden shrink-0 object-cover"
                      alt=""
                      src="/chevronup@2x.png"
                      onClick={openRatesModal}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="my-0 mx-[!important] absolute top-[calc(50%_-_60.5px)] left-[calc(50%_-_30px)] rounded-3xl bg-indigo-600 box-border h-[61px] flex flex-row items-start justify-start p-2 border-[12px] border-solid border-gray-100 dark:border-exchange-rate-dark">
              <img
                className="relative w-5 h-5 overflow-hidden shrink-0 object-cover"
                alt=""
                src="/arrowdown@2x.png"
              />
            </div>
          </div>

          {country === 'Russia' ? (
            <>
              {tValue < minValue && (
                <div className="cursor-not-allowed self-stretch rounded-[18px] bg-indigo-400 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto">
                  <div className="flex-1 relative">
                    {' '}
                    {`Sell ${fToken?.symbol.toUpperCase()} now`}
                  </div>
                </div>
              )}

              {tValue > maxValue && (
                <div className="cursor-not-allowed self-stretch rounded-[18px] bg-indigo-400 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto">
                  <div className="flex-1 relative">
                    {' '}
                    {`Sell ${fToken?.symbol.toUpperCase()} now`}
                  </div>
                </div>
              )}

              {tValue >= minValue && tValue <= maxValue && (
                <div
                  className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto"
                  onClick={nextFunc}
                >
                  <div className="flex-1 relative">
                    {' '}
                    {`Sell ${fToken?.symbol.toUpperCase()} now`}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {' '}
              <div className="cursor-not-allowed self-stretch rounded-[18px] bg-indigo-400 dark:bg-greenyellow h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white dark:text-yellowgreen font-roboto">
                <div className="flex-1 relative">
                  Not available in your country
                </div>
              </div>
            </>
          )}
        </div>
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
          isNotCrypto={false}
          title={'Select Token'}
        />

        {/* Countries Modal */}
        <CountriesModal
          isTokenModalOpen={isOptionsModalOpen}
          setIsTokenModalOpen={setIsOptionsModalOpen}
          title={'Select Country'}
          paymentMethod={paymentMethod}
          cities={cities}
          setCountry={setCountry}
          setCity={setCity}
          country={country}
          cityData={cityData}
          city={city}
        />

        {/* Payment Modal */}
        <PaymenOptionsModal
          isTokenModalOpen={isSubServiceModalOpen}
          setIsTokenModalOpen={setIsSubServiceModalOpen}
          title={'Select Method'}
          service={service}
          setService={setService}
          setSubService={setSubService}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentOptions={paymentOptions}
        />
      </>
      <>
          {ratesModalOpen && (
            <>
              <div className="sm:flex xl:hidden mt-4">
                <RatesLocalModel
                  fToken={fToken}
                  tToken={tToken}
                  fValue={fValue}
                  fTitle={fTitle}
                  tTitle={tTitle}
                  transactionRates={transactionRates}
                  loadingExchangeRate={loadingExchangeRate}
                />
              </div>
              <div className="sm:hidden xl:flex xl:ml-8">
                <RatesLocalModel
                  fToken={fToken}
                  tToken={tToken}
                  fValue={fValue}
                  fTitle={fTitle}
                  tTitle={tTitle}
                  transactionRates={transactionRates}
                  loadingExchangeRate={loadingExchangeRate}
                />
              </div>
            </>
          )}
        </>
     </div>
    
      
    </>
  );
};

export default SellCardApp;
