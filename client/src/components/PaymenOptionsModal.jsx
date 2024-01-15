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

function PaymenOptionsModal(props) {
  const {
    isTokenModalOpen,
    setIsTokenModalOpen,
    title,
    //========================================================
    service,
    setService,
    setSubService,
    paymentMethod,
    setPaymentMethod,
    paymentOptions,
  } = props;

  const closeModal = () => {
    setIsTokenModalOpen(false);
  };

  function handleChange(ev) {
    let newValue = ev.target.value;
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
  }

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

        <div className="flex flex-col mt-[32px] gap-[8px]">
          <div className="flex flex-row bg-bgSecondary md:w-[380px] rounded h-[62px] justify-between">
            <div className="w-full">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Payment method
              </div>
              <div className="ml-2 flex flex-row gap-[8px] items-center mt-[13px]">
                <div className="mr-4 w-full">
                  <select
                    name="paymentMethod"
                    className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                    value={paymentMethod}
                    onChange={handleChange}
                  >
                    {paymentOptions &&
                      paymentOptions.map((payment, index) => (
                        <option key={index} value={payment}>
                          {payment}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PaymenOptionsModal;
