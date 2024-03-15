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
import Footer from '../../components/Footer';
import FooterMini from '../../components/FooterMini';
import Sectioning from '../../components/Sectioning';

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
import { Elipse } from '../../assets/mints';

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
      <div className="relative h-screen flex flex-col">
        {/* GLASSMORPHIC BACKGROUND STARTS */}
        <div className="h-screen bg-gradient-to-br from-indigo-700 to-purple-500 overflow-hidden">
          {/* <div className="absolute bg-gradient-to-br h-full rounded-full bg-white/30 blur-2xl circle-left"></div>
          <div className="absolute bg-gradient-to-br h-full rounded-full bg-white/30 blur-2xl circle-right"></div>
          <div className="absolute w-96 h-96 backdrop-blur-sm bg-white/30 rounded-full z-9 top-1/2 right-1/2"></div>
          <div className="absolute w-72 h-72 backdrop-blur-sm bg-white/30 rounded-full z-9 bottom-1/2 left-1/2"></div>
          <div className="absolute w-16 h-16 backdrop-blur-sm bg-white/30 rounded-full z-9 insert-y-2/4 insert-x-3/4"></div>
          <div className="absolute top-0 w-full h-screen backdrop-blur-sm bg-gradient-to-br to-purple-500/30 from-indigo-700/40"></div> */}
          <span className="absolute top-0">
          <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
        </span>
        </div>

        {/* GLASSMORPHIC BACKGROUND ENSD */}
        {/* <span className="fixed top-[20%] right-[4%] md:top-[-3.5%] md:right-[-4%] xl:top-[-3.5%] xl:right-[-4%]">
          <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
        </span> */}
        {/* <span className="fixed top-[20%] right-[4%] ss:top-[20%] ss:right-[4%] xs:top-[20%] xs:right-[4%] sm:top-[20%] sm:right-[4%] md:top-[20%] md:right-[4%] lg:top-[20%] lg:right-[4%] xl:top-[20%] xl:right-[4%] '2xl':top-[20%] '2xl':right-[4%] '4xl':top-[20%] '4xl':right-[4%]">
          <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
        </span> */}
        {/* <span className="fixed top-[20%] right-[4%] ss:top-[20%] ss:right-[4%] xs:top-[20%] xs:right-[4%] sm:top-[20%] sm:right-[4%] md:top-[20%] md:right-[4%] lg:top-[20%] lg:right-[4%] xl:top-[20%] xl:right-[4%] '2xl':top-[20%] '2xl':right-[4%] '4xl':top-[20%] '4xl':right-[4%]">
          <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
        </span> */}
        <div className="z-20">
          <div className="flex flex-col">
            {/* <div className={`${styles.hero5} flex flex-col`}> */}
            {percentageProgress === 1 ? (
              <>
                <div
                  // className={`${styles.hero4} flex flex-col justify-center items-center`}
                  className={`flex flex-col justify-center items-center`}
                >
                  <div
                    className={`mt-[24px] mb-[24px] xl:mt-[64px] xl:mb-[64px] flex justify-center`}
                  >
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

                  <div className="flex flex-col xl:flex-row gap-[16px]">
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

                  <HowToCard
                    data={stepsBuy}
                    title={`How to ${service} Crypto`}
                  />

                  <div className="flex flex-col xl:flex-row gap-[16px]">
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

                  <HowToCard
                    data={stepsBuy}
                    title={`How to ${service} Crypto`}
                  />

                  <div className="flex flex-col xl:flex-row gap-[16px]">
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

                  <HowToCard
                    data={stepsSell}
                    title={`How to ${service} Crypto`}
                  />

                  <div className="flex flex-col xl:flex-row gap-[16px]">
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

                  <HowToCard
                    data={stepsSell}
                    title={`How to ${service} Crypto`}
                  />

                  <div className="flex flex-col xl:flex-row gap-[16px]">
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

                  <HowToCard
                    data={stepsDefi}
                    title={`How to ${service} Crypto`}
                  />

                  <div className="flex flex-col xl:flex-row gap-[16px]">
                    <HelpGuide data={helpDefi} title={'Helpful guides'} />
                    <FaqCard data={faqDefi} title={`FaQ ${service}`} />
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <Sectioning /> */}

          <div className="relative text-gray-900 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
            <div className="flex flex-col justify-center items-center">
              <FooterMini />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
