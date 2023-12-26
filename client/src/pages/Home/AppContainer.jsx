import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
//===============================================================
import { BuyCardHome } from './BuyCardHome/BuyCardHome';
import { BuyCashHome } from './BuyCashHome/BuyCashHome';
import { DefiHome } from './DefiHome/DefiHome';
import { ExchangeHome } from './ExchangeHome/ExchangeHome';
import { SellCardHome } from './SellCardHome/SellCardHome';
import { SellCashHome } from './SellCashHome/SellCashHome';
//===============================================================
import styles from './AppContainer.module.css';
import { Footer } from '../../components/Footer';

import {
  stepsExchange,
  stepsBuy,
  stepsSell,
  stepsDefi,
  helpExchange,
  helpBuy,
  helpSell,
  helpDefi,
} from '../../constants';
import { HowToCard } from '../../components/HowToCard';
import { FaqCard } from '../../components/FaqCard';
import { faqExchange, faqBuy, faqSell, faqDefi } from '../../constants';
import { FeedBackContainer } from '../../components/FeedBackContainer';

import { feedback } from '../../constants';

import { HelpGuide } from '../../components/HelpGuide';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTokenList,
  getTokenListDefi,
  getTokenListFiat,
  getTokenListBuy,
  getTokenListSell,
  getTokenListExchange,
  getTokensDefiById,
} from '../../redux/features/token/tokenSlice';

import {
  getUserTransactions,
  getTransactionByTxId,
  getUserExchange,
  getUserDefi,
  getUserBuyCash,
  getUserBuyCard,
  getUserSellCash,
  getUserSellCard,
} from '../../redux/features/transaction/transactionSlice';

import { networksOptions } from '../../constants';

export const AppContainer = (props) => {
  const {
    mode,
    setMode,
    user,
    service,
    setService,
    subService,
    setSubService,
    setTxInfo,
    txInfo,
  } = props;

  const dispatch = useDispatch();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const tokensDefiEthereum = useSelector(
    (state) => state.token?.tokensDefiEthereum
  );

  const [isLightMode, setIsLightMode] = useState(true);
  const allTokensDefi = useSelector((state) => state.token?.tokensDefiById);
  const percentageProgressL = localStorage.getItem('percentageProgress')
    ? JSON.parse(localStorage.getItem('percentageProgress'))
    : 1;

  const [percentageProgress, setPercentageProgress] =
    useState(percentageProgressL);

  const [isToLoading, setIsToLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);

  //====={Controllers}===========================

  useEffect(() => {
    if (percentageProgress) {
      localStorage.setItem(
        'percentageProgress',
        JSON.stringify(percentageProgress)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageProgress]);

  //==============={update lists at intervals}===============================

  useEffect(() => {
    setMode(true); // automatically set ,ode to "light" mode
    dispatch(getTokenListDefi());
    dispatch(getTokenListFiat());
    dispatch(getTokenListBuy());
    dispatch(getTokenListSell());
    dispatch(getTokenListExchange());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('service', JSON.stringify(service));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    localStorage.setItem('subService', JSON.stringify(subService));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subService]);

  useEffect(() => {
    if (user) {
      dispatch(getUserTransactions());
      dispatch(getUserExchange());
      dispatch(getUserDefi());
      dispatch(getUserBuyCash());
      dispatch(getUserBuyCard());
      dispatch(getUserSellCash());
      dispatch(getUserSellCard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="flex flex-col">
        {percentageProgress === 1 ? (
          <>
            <div
              className={`${styles.hero} flex flex-col justify-center items-center`}
            >
              <div className={`mt-[64px] mb-[64px] flex justify-center`}>
                <>
                  {service === 'exchange' && subService === 'exchange' && (
                    <ExchangeHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}
                  {service === 'buy' && subService === 'buyCash' && (
                    <BuyCashHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}
                  {service === 'buy' && subService === 'buyCard' && (
                    <BuyCardHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}

                  {service === 'sell' && subService === 'sellCash' && (
                    <SellCashHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}

                  {service === 'sell' && subService === 'sellCard' && (
                    <SellCardHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}

                  {service === 'defi' && subService === 'defi' && (
                    <DefiHome
                      mode={mode}
                      service={service}
                      setService={setService}
                      subService={subService}
                      setSubService={setSubService}
                      setTxInfo={setTxInfo}
                      txInfo={txInfo}
                      user={user}
                      setPercentageProgressHome={setPercentageProgress}
                    />
                  )}
                </>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
              {service === 'exchange' && subService === 'exchange' && (
                <ExchangeHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}
              {service === 'buy' && subService === 'buyCash' && (
                <BuyCashHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}
              {service === 'buy' && subService === 'buyCard' && (
                <BuyCardHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'sell' && subService === 'sellCash' && (
                <SellCashHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'sell' && subService === 'sellCard' && (
                <SellCardHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                />
              )}

              {service === 'defi' && subService === 'defi' && (
                <DefiHome
                  mode={mode}
                  service={service}
                  setService={setService}
                  subService={subService}
                  setSubService={setSubService}
                  setTxInfo={setTxInfo}
                  txInfo={txInfo}
                  user={user}
                  setPercentageProgressHome={setPercentageProgress}
                  isToLoading={isToLoading}
                  setIsToLoading={setIsToLoading}
                  isFromLoading={isFromLoading}
                  setIsFromLoading={setIsFromLoading}
                />
              )}
            </div>
          </>
        )}

        {/* =============={others}=======================*/}
        {service === 'exchange' && subService === 'exchange' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard
                data={stepsExchange}
                title={`How to ${service} Crypto`}
              />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpExchange} title={'Helpful guides'} />
                <FaqCard data={faqExchange} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}

        {service === 'buy' && subService === 'buyCash' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpBuy} title={'Helpful guides'} />
                <FaqCard data={faqBuy} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}

        {service === 'buy' && subService === 'buyCard' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard data={stepsBuy} title={`How to ${service} Crypto`} />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpBuy} title={'Helpful guides'} />
                <FaqCard data={faqBuy} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}

        {service === 'sell' && subService === 'sellCash' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard data={stepsSell} title={`How to ${service} Crypto`} />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpSell} title={'Helpful guides'} />
                <FaqCard data={faqSell} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}

        {service === 'sell' && subService === 'sellCard' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard data={stepsSell} title={`How to ${service} Crypto`} />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpSell} title={'Helpful guides'} />
                <FaqCard data={faqSell} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}

        {service === 'defi' && subService === 'defi' && (
          <>
            <div className="mt-[64px] flex flex-col justify-center items-center gap-[64px] mb-[64px]">
              <div className="mt-[64px]">
                <FeedBackContainer data={feedback} title={'Testimonials'} />
              </div>

              <HowToCard data={stepsDefi} title={`How to ${service} Crypto`} />

              <div className="flex flex-col md:flex-row gap-[16px]">
                <HelpGuide data={helpDefi} title={'Helpful guides'} />
                <FaqCard data={faqDefi} title={`FaQ ${service}`} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex bg-lightslategray-300 w-full h-px mb-[120px]" />

      {/* <div className="relative bg-white dark:bg-app-container-dark text-gray-400 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
        <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
          <div className="flex bg-lightslategray-300 w-full h-px" />
          <Footer />
        </div>
      </div> */}
    </>
  );
};
