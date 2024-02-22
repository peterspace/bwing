import { useState, useEffect } from 'react';
import TokenButtonLight from './TokenButtonLight';

const ServiceHeaderBuy = (props) => {
  const {
    symbolSubService,
    symbolCountry,
    openCountryModal,
    openSubServiceModal,
    countries,
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

  const options = (
    <>
    <div className="flex flex-col gap-2 rounded-lg bg-gray-100 border-[1px] border-gray-300">
      <div>text1</div>
      <div>text1</div>

    </div>
    </>
  )

  return (
    <div className="h-[42px] flex flex-row items-center justify-start py-0 px-4 box-border gap-[32px] text-left text-5xl text-gray-900 dark:text-white font-roboto self-stretch">
      <div className="flex-1 relative" onClick={openSubServiceModal}>
        <div className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-button-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px] text-left text-5xl text-gray-900 dark:text-silver font-roboto w-fit">
          <div className="relative">{symbolSubService}</div>
          <img
            className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/chevrondown@2x.png"
          />
        </div>
      </div>
      <div className="" onClick={openCountryModal}>
        <TokenButtonLight image={flag} symbol={symbolCountry} />
      </div>
    </div>
  );
};

export default ServiceHeaderBuy;
