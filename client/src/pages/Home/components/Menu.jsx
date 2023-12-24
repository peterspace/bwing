import { useState } from 'react';
import MenuButton from './MenuButton';
import MenuButtonActive from './MenuButtonActive';

const Menu = (props) => {
  const { service, setService, subService, setSubService } = props;
  // const [service, setService] = useState('exchange');
  // const [service, setService] = useState("buy");
  // const [service, setService] = useState("sell");
  // const [service, setService] = useState("defi");

  async function nextFuncExchange() {
    setService('exchange');
    setSubService('exchange');
  }

  async function nextFuncSellCash() {
    setService('sell');
    setSubService('sellCash');
  }

  async function nextFuncSellCard() {
    setService('sell');
    setSubService('sellCard');
  }

  async function nextFuncBuyCard() {
    setService('buy');
    setSubService('buyCard');
  }

  async function nextFuncBuyCash() {
    setService('buy');
    setSubService('buyCash');
  }

  async function nextFuncDefi() {
    setService('defi');
    setSubService('defi');
  }
//border-[1px] border-solid border-lightslategray-300
  return (
    // <div className="rounded-[18px] bg-white dark:bg-bgDarkMode overflow-hidden flex flex-row items-start justify-between py-2.5 px-5 box-border self-stretch border-[1px] border-solid border-lightslategray-300 dark:border-none">
    // <div className="rounded-[18px] bg-white dark:bg-bgDarkMode overflow-hidden flex flex-row items-start justify-between py-2.5 px-5 box-border self-stretch">
    <div className="rounded-[18px] bg-white dark:bg-bgDarkMode overflow-hidden flex flex-row items-start justify-between py-2.5 px-5 box-border self-stretch shadow-sm">
   
      {service === 'exchange' ? (
        <>
          <MenuButtonActive
            title="Exchange"
            menuButtonBorder="1px solid rgba(128, 163, 182, 0.2)"
            handleClick={nextFuncExchange}
          />
        </>
      ) : (
        <>
          <MenuButton
            title="Exchange"
            menuButtonBorder="unset"
            handleClick={nextFuncExchange}
          />
        </>
      )}
      {service === 'buy' ? (
        <>
          <MenuButtonActive
            title="Buy"
            menuButtonBorder="1px solid rgba(128, 163, 182, 0.2)"
            handleClick={nextFuncBuyCard}
          />
        </>
      ) : (
        <>
          <MenuButton
            title="Buy"
            menuButtonBorder="unset"
            handleClick={nextFuncBuyCard}
          />
        </>
      )}
      {service === 'sell' ? (
        <>
          <MenuButtonActive
            title="Sell"
            menuButtonBorder="1px solid rgba(128, 163, 182, 0.2)"
            handleClick={nextFuncSellCard}
          />
        </>
      ) : (
        <>
          <MenuButton
            title="Sell"
            menuButtonBorder="unset"
            handleClick={nextFuncSellCard}
          />
        </>
      )}
      {service === 'defi' ? (
        <>
          <MenuButtonActive
            title="Defi"
            menuButtonBorder="1px solid rgba(128, 163, 182, 0.2)"
            handleClick={nextFuncDefi}
          />
        </>
      ) : (
        <>
          <MenuButton
            title="Defi"
            menuButtonBorder="unset"
            handleClick={nextFuncDefi}
          />
        </>
      )}
    </div>
  );
};

export default Menu;
