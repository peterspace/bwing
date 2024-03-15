import { useState, useEffect } from 'react';
import { getTokenListExchange } from '../../../redux/features/token/tokenSlice';
import { useDispatch } from 'react-redux';
import TokenModal from '../../../components/TokenModal';
import Menu from './Menu';
import ServiceHeaderExchange from './ServiceHeaderExchange';
import FToken from './FToken';
import TToken from './TToken';
import { getMasterWalletsService } from '../../../services/apiService';
import RatesLocalModel from '../../../components/RatesLocalModel';
import styles from '../AppContainer.module.css';

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

  // const loading = true;
  // const loadingExchangeRate = true;

  //======================={RATES and PRICES}========================================================
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const fromPrice = transactionRates ? transactionRates?.fromPrice : 0;
  const toPrice = transactionRates ? transactionRates?.toPrice : 0;
  const directValue = transactionRates ? transactionRates?.directValue : 0; // directValue = Number(fValue) * exchangeRate;
  console.log({ directValue: directValue });

  const [filteredfTokens, setFilteredfTokens] = useState();
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  console.log({ isFromTokenModalOpen });
  const [isToTokenModalOpen, setToTokenModalOpen] = useState(false);
  const [ratesModalOpen, setRatesModalOpen] = useState(false); // close by default
  const [transactionLimit, setTransactionLimit] = useState();
  const [transactionError, setTransactionError] = useState();
  const [transactionDifference, setTransactionDifference] = useState();

  console.log({ transactionLimit: transactionLimit });
  console.log({ transactionLimitbalance: transactionLimit?.balance });
  console.log({ tTokenChain: tToken?.chain, tTokenSymbol: tToken?.symbol });
  console.log({ transactionError: transactionError });
  console.log({ transactionDifference: transactionDifference });

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
    // verifyTransactionLimit()
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

  function openRatesModal() {
    setRatesModalOpen((prev) => !prev);
  }

  useEffect(() => {
    verifyTransactionLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue, tToken]);

  async function verifyTransactionLimit() {
    const response = await getMasterWalletsService();
    // setTransactionLimit(response);

    if (tToken?.chain === 'Bitcoin') {
      setTransactionLimit(response?.walletsBitcoinMaster?.btc);
    }
    // if (tToken?.chain === 'Ethereum') {
    //   setTransactionLimit(response?.walletsEVMMaster);
    // }
    if (tToken?.chain === 'Ethereum' && tToken?.symbol === 'eth') {
      setTransactionLimit(response?.walletsEVMMaster?.eth);
    }
    if (tToken?.chain === 'Ethereum' && tToken?.symbol === 'usdt') {
      setTransactionLimit(response?.walletsEVMMaster?.usdt);
    }
    if (tToken?.chain === 'Tron' && tToken?.symbol === 'trx') {
      setTransactionLimit(response?.walletsTronMaster?.trx);
    }
    if (tToken?.chain === 'Tron' && tToken?.symbol === 'usdt') {
      setTransactionLimit(response?.walletsTronMaster?.usdt);
    }
  }

  useEffect(() => {
    compareTransactionLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, tValue, tToken, transactionLimit]);

  async function compareTransactionLimit() {
    if (Number(directValue) > Number(transactionLimit?.balance)) {
      const difference =
        Number(directValue) - Number(transactionLimit?.balance);
      setTransactionDifference(difference);
      setTransactionError(
        `Transaction limit exceeded by: ${difference} ${tToken?.symbol.toUpperCase()}`
      );
    } else {
      setTransactionDifference(null);
      setTransactionError('');
    }
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row">
        <>
          {' '}
          <div className="card-gradient-app-container rounded-3xl">
            <div className="rounded-3xl bg-chizzySnow dark:bg-app-container-dark box-border w-[375px] xl:w-[470px] 2xl:w-[600] flex flex-col items-center justify-start p-3 gap-[8px] xl:gap-[12px] text-left input-header text-chizzyblue dark:text-white font-montserrat border-[2px] border-solid border-lightslategray-300 dark:border-lightslategray-300">
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
                <div className="self-stretch card-gradient-app-price rounded-3xl w-full">
                  <div className="self-stretch rounded-3xl bg-chizzySnow dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start pt-4 px-4 pb-8 gap-[8px] xl:gap-[24px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
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
                      {loading ? (
                        <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mt-1 mb-1"></div>
                      ) : (
                        <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                          <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                            ~${fromPrice}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="self-stretch card-gradient-app-price rounded-3xl w-full">
                  <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy overflow-hidden flex flex-col items-start justify-start p-4 gap-[8px] xl:gap-[24px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
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
                          <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                            <div className="relative animate-pulse h-3 xl:h-4 bg-slate-200 rounded-full dark:bg-exchange-rate-dark w-[15%] mb-2"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="input-sub-header self-stretch relative">
                            {tValue}
                          </div>
                          <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 px-2 text-sm text-gray-500">
                            <div className="relative inline-block w-[109px] h-[17px] shrink-0">
                              ~${toPrice}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="self-stretch rounded-3xl bg-white dark:bg-chizzy  overflow-hidden flex flex-col items-start justify-start p-4 text-center input-token-container text-darkblue dark:text-indigo-500  font-roboto">
                  <div className="self-stretch rounded-xl bg-lightsteelblue dark:bg-exchange-rate-dark dark:text-indigo-500  dark:bg-opacity-20 flex flex-row items-center justify-center py-2 px-4 gap-[8px]">
                    {loadingExchangeRate ? (
                      <div className="relative animate-pulse h-3 xl:h-4 bg-indigo-200 rounded-full dark:bg-exchange-rate-dark w-[30%] mt-1 mb-1"></div>
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
              <div
                className="cursor-pointer self-stretch rounded-[18px] bg-indigo-600 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center input-token-container text-white font-roboto"
                onClick={nextFunc}
              >
                <div className="flex-1 relative">
                  {' '}
                  {`Exchange ${fToken?.symbol.toUpperCase()} now`}
                </div>
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
        <>
          {ratesModalOpen && (
            <>
              <div className="flex xl:hidden mt-4">
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
              <div className="hidden xl:flex xl:ml-8">
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

export default ExchangeApp;
