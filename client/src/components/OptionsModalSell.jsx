import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiSearch } from 'react-icons/fi';

import CloseIcon from '../assets/icons/close.svg';
import { BsCreditCard } from 'react-icons/bs';
import { BsCashStack } from 'react-icons/bs';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  content: {
    width: '412px',
    height: '538px',
    borderRadius: '1.25rem',
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');

function OptionsModalSell(props) {
  const {
    isTokenModalOpen,
    setIsTokenModalOpen,
    isNotCrypto,
    title,
    //========================================================

    service,
    setService,
    setSubService,
    paymentMethod,
    setPaymentMethod,
    paymentOptions,
    cities,
    setCountry,
    setCity,
    country,
    cityData,
    city,
  } = props;

  const closeModal = () => {
    setIsTokenModalOpen(false);
  };

  return (
    <Modal
      isOpen={isTokenModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Token Modal"
    >
      <div className="flex flex-col px-4 pt-4">
        <div className="flex h-8 justify-between mb-6">
          <div className="text-5xl leading-8 text-black font-medium">
            {title}
          </div>
          <img
            className="cursor-pointer"
            src={CloseIcon}
            alt="Close modal"
            onClick={closeModal}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 bg-gray-100 outline outline-lightslategray-300 outline-[1px]">
          <div
            className={`${
              paymentMethod === 'card'
                ? `flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover`
                : `flex flex-row justify-center items-center h-[49px] cursor-pointer text-bgPrimary focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-bgPrimary focus:z-10 focus:ring-4 focus:ring-gray-200`
            }`}
            onClick={() => {
              setPaymentMethod(paymentOptions[0]);
              setService('sell');
              setSubService('sellCard');
              localStorage.setItem(
                'paymentMethod',
                JSON.stringify(paymentOptions[0])
              );
            }}
          >
            <div className={`flex flex-row gap-2 `}>
              <BsCreditCard size={20} />
              <div className="leading-[20px] inline-block">Card</div>
            </div>
          </div>

          <div
            className={`${
              paymentMethod === 'cash'
                ? `flex flex-row justify-center items-center h-[49px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded dark:bg-blue-600 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover`
                : `flex flex-row justify-center items-center h-[49px] cursor-pointer text-bgPrimary focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-bgPrimary focus:z-10 focus:ring-4 focus:ring-gray-200`
            }`}
            onClick={() => {
              setPaymentMethod(paymentOptions[1]);
              setService('sell');
              setSubService('sellCash');
              localStorage.setItem(
                'paymentMethod',
                JSON.stringify(paymentOptions[1])
              );
            }}
          >
            <div className={`flex flex-row gap-2 `}>
              <BsCashStack size={20} />
              <div className="leading-[20px] inline-block">Cash</div>
            </div>
          </div>
        </div>
        {paymentMethod === 'cash' ? (
          <div className="flex flex-col  mt-[32px] gap-[8px]">
            <div className="flex flex-row bg-bgSecondary md:w-[380px] rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Country of residence
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center w-full mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="country"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    >
                      {cities &&
                        cities.map((country, index) => (
                          <option key={index} value={country?.country}>
                            {country?.country}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row bg-bgSecondary md:w-[380px] rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  City
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center w-full mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="city"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                      value={city}
                      onChange={(ev) => setCity(ev.target.value)}
                    >
                      {cityData &&
                        cityData.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-[32px] gap-[8px]">
            <div className="flex flex-row bg-bgSecondary md:w-[380px] rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Country of residence
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="country"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    >
                      {cities &&
                        cities.map((country, index) => (
                          <option key={index} value={country?.country}>
                            {country?.country}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default OptionsModalSell;
