import React, { useState, useEffect } from 'react';
import SellCardApp from './components/SellCardApp';
import SellCashApp from './components/SellCashApp';
import ExchangeApp from './components/ExchangeApp';
import BuyCashApp from './components/ BuyCashApp';
import BuyCardApp from './components/BuyCardApp';
import DefiApp from './components/DefiApp';

export const AppContainerChecker = (props) => {
  return (
    <>
      {/* <div className="flex flex-col container mx-auto gap-10">

    </div> */}

      <div className="flex flex-col justify-center items-center container mx-auto gap-[64px] m-8 overflow-y-auto bg-white dark:bg-background-dark py-[64px]">
        <SellCardApp />
        <SellCashApp />
        <ExchangeApp />
        <BuyCashApp />
        <BuyCardApp />
        <DefiApp />
      </div>
    </>
  );
};
