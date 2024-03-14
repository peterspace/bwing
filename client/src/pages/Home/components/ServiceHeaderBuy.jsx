import { useState, useEffect } from 'react';
import TokenButtonLight from './TokenButtonLight';

const ServiceHeaderBuy = (props) => {
  const {
    symbolSubService,
    symbolCountry,
    openCountryModal,
    openSubServiceModal,
    countries,
    //========================================================
    isSubServiceModalOpen,
    setIsSubServiceModalOpen,
    service,
    setService,
    setSubService,
    setPaymentMethod,
    paymentOptions,
  } = props;

  const [flag, setFlag] = useState();
  console.log({ flag: flag });

  useEffect(() => {
    updateCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolCountry]);

  async function updateCountry() {
    if (countries) {
      countries?.map(async (country) => {
        if (country?.country === symbolCountry) {
          setFlag(country.flag);
        }
      });
    }
  }

  function handleChange(s) {
    let newValue = s;
    if (service === 'buy') {
      if (newValue === 'card') {
        setPaymentMethod(newValue);
        setService('buy');
        setSubService('buyCard');
        localStorage.setItem('paymentMethod', JSON.stringify(newValue));
      }
      if (newValue === 'cash') {
        setPaymentMethod(newValue);
        setService('buy');
        setSubService('buyCash');
        localStorage.setItem('paymentMethod', JSON.stringify(newValue));
      }
    }

    if (service === 'sell') {
      if (newValue === 'card') {
        setPaymentMethod(newValue);
        setService('sell');
        setSubService('sellCard');
        localStorage.setItem('paymentMethod', JSON.stringify(newValue));
      }
      if (newValue === 'cash') {
        setPaymentMethod(newValue);
        setService('sell');
        setSubService('sellCash');
        localStorage.setItem('paymentMethod', JSON.stringify(newValue));
      }
    }
    setIsSubServiceModalOpen(false);
  }

  const options = (
    <div className="absolute z-10 mt-[48px] w-[300px] xl:w-[442px] self-stretch rounded-lg bg-chizzySnow dark:bg-app-container-dark box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-200 shadow-md">
      <div className="self-stretch flex flex-col items-start justify-start py-[10px] px-0 text-sm md:text-lg text-gray-500">
        {paymentOptions?.map((s, i) => (
          <div
            key={i}
            className="cursor-pointer self-stretch flex flex-row text-gray-900 dark:text-gray-100 hover:rounded-lg hover:text-white dark:hover:text-white hover:bg-indigo-400 hover:shadow-lg dark:hover:bg-bgDarkMode p-1"
            onClick={() => {
              handleChange(s);
            }}
          >
            <div className="ml-2 relative font-medium">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="h-[42px] flex flex-row items-center justify-start py-0 px-4 box-border gap-[32px] text-left input-icon text-gray-900 dark:text-white font-roboto self-stretch">
        <div className="flex-1 relative" onClick={openSubServiceModal}>
          <div className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-button-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px] text-left input-icon text-gray-900 dark:text-silver font-roboto w-fit border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
            <div className="relative">{symbolSubService}</div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
              alt=""
              src="/chevrondown@2x.png"
            />
          </div>
        </div>
        <div
          className="rounded-xl bg-chizzySnow dark:bg-button-dark text-gray-900 dark:text-silver font-roboto w-fit border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
          onClick={openCountryModal}
        >
          <TokenButtonLight image={flag} symbol={symbolCountry} />
        </div>
      </div>

      {isSubServiceModalOpen && <>{options}</>}
    </div>
  );
};

export default ServiceHeaderBuy;
