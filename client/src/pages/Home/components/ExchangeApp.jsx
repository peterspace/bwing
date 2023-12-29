import { useState, useEffect } from 'react';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import { useDispatch } from 'react-redux';
import TokenModal from '../../../components/TokenModal';
import Menu from './Menu';
import ServiceHeaderExchange from './ServiceHeaderExchange';
import FToken from './FToken';
import TToken from './TToken';

//Laoding
//'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//ExchangeDark
const ExchangeApp = (props) => {
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
    loadingExchangeRate,
  } = props;
  const dispatch = useDispatch();

  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const fromPrice = transactionRates ? transactionRates?.fromPrice : 0;
  const toPrice = transactionRates ? transactionRates?.toPrice : 0;

  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setToTokenModalOpen] = useState(false);

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

  //====================================================================================

  async function nextFunc() {
    setService('exchange');
    setSubService('exchange');
    setPercentageProgress(2);
  }

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
  }

  function openFromTokenModal() {
    setIsFromTokenModalOpen(true);
  }

  function openToTokenModal() {
    setToTokenModalOpen(true);
  }

  return (
    <>
      {/* <div className="rounded-3xl bg-gray-100 dark:bg-app-container-dark box-border w-[375px] md:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[12px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300"> */}
      <div className="rounded-3xl bg-chizzySnow dark:bg-app-container-dark box-border w-[375px] md:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[12px] text-left text-13xl text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300">
        <Menu
          service={service}
          setService={setService}
          subService={subService}
          setSubService={setSubService}
        />
        <ServiceHeaderExchange
          subService="Exchange"
          image={fToken?.image}
          symbol={fToken?.symbol.toUpperCase()}
          name={fToken?.chain ? fToken?.chain : fToken?.name}
          openModal={openFromTokenModal}
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
                  ~${fromPrice}
                </div>
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
              <div
                className={`${
                  loading ? 'animate-pulse' : ''
                } self-stretch relative font-medium`}
              >
                {loading ? 'loading' : `${tValue}`}
              </div>
              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                  ~${toPrice}
                </div>
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
        <div
          className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white font-roboto"
          onClick={nextFunc}
        >
          <div className="flex-1 relative">
            {' '}
            {`${service} ${fToken?.symbol.toUpperCase()} now`}
          </div>
        </div>
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
    </>
  );
};

export default ExchangeApp;
