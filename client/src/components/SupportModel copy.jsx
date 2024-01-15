import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const services = [
  'Exchange',
  'Buy',
  'Sell',
  'Defi'
]

const subServices = [
  'Exchange',
  'Cash',
  'Card',
  'Defi'
]


const SupportModel = () => {
  const { user } = useSelector((state) => state.user);

  const [isService, setIsService] = useState(false);
  const [isSubService, setIsSubService] = useState(false);
  const [isSubject, setIsSubject] = useState(false);

  function openServiceModal() {
    setIsService(true);
    setIsSubService(false);
    setIsSubject(false);
  }

  function openSubServiceModal() {
    setIsSubService(false);
    setIsSubService(true);
    setIsSubject(false);
  }

  function openSubjectModal() {
    setIsSubject(false);
    setIsSubService(false);
    setIsSubject(true);
  }

  function closeModal() {
    setIsService(false);
    setIsSubService(false);
    setIsSubject(false);
  }

  return (
    <div className="rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto">
      <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
        <div className="self-stretch overflow-hidden flex flex-row items-start justify-between py-0 px-2.5 text-right text-5xl text-text-light-main">
          <div className="flex-1 h-[45px] flex flex-col items-start justify-start">
            <b className="self-stretch relative leading-[28px] dark:text-white">
              {user?.name}
            </b>
            <div className="self-stretch relative text-sm font-montserrat text-gray-500">
           {user?.email}
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-xl text-gray-500 dark:text-white border-[1px] border-solid border-lightslategray-300">
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-center py-[11px] px-3">
            <div className="relative">Submit a ticket</div>
          </div>
        </div>
        <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative leading-[28px] inline-block w-[167px]">
            <span>{`Service `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <div
            className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
            onClick={openServiceModal}
          >
            <div className="relative">Buy</div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
        {/* service list */}
        {isService && !isSubService && !isSubject && (
          <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm text-gray-500">
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Exchange</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Buy</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Sell</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Defi</div>
              </div>
            </div>
          </div>
        )}

        {/* service list */}
        <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative leading-[28px] inline-block w-[167px]">
            <span>{`Sub-Service `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <div
            className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
            onClick={openSubServiceModal}
          >
            <div className="relative">Card</div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
        {/* service list */}
        {!isService && isSubService && !isSubject && (
          <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm text-gray-500">
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Exchange</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Card</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Cash</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Defi</div>
              </div>
            </div>
          </div>
        )}

        {/* service list */}
        <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative leading-[28px] inline-block w-[167px]">
            <span>{`Subject `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <div
            className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
            onClick={openSubjectModal}
          >
            <div className="relative">Payment pending</div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
        {/* service list */}
        {!isService && !isSubService && isSubject && (
          <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm text-gray-500">
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Payment pending</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">
                  Stuck on loading page
                </div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Dispatcher issue</div>
              </div>
              <div
                className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                onClick={() => {
                  closeModal();
                }}
              >
                <div className="relative font-medium">Payment issue</div>
              </div>
            </div>
          </div>
        )}

        <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative leading-[28px] inline-block w-[167px]">
            <span>{`Order No `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <input
            type="text"
            placeholder="K32405"
            className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-[363px]  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
            // value={''}
            onChange={''}
          />
        </div>

        <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative leading-[28px] inline-block w-[167px]">
            <span>{`Message `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <textarea
            className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-[363px] h-[120px] border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
            onChange={''}
            placeholder="Please describe the issue"
            rows={4}
            cols={6}
          ></textarea>
        </div>

        <div className="rounded-lg box-border w-[363px] flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm text-gray-500 border-[1px] border-solid border-lightslategray-300">
          <img className="cursor-pointer relative w-6 h-10" alt="" src="/iconeattach.svg" />
          <div className="relative w-px h-10">
            <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_0.5px)] bg-rose-600 w-px h-5 overflow-hidden" />
          </div>
          <div className="h-10 flex flex-row items-center justify-center">
            <div className="relative">Attach file</div>
          </div>
        </div>
        <div className="relative bg-lightslategray-300 w-[355px] h-px overflow-hidden shrink-0" />
        <div className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
          <div className="flex-1 relative">Submit</div>
        </div>
      </div>
    </div>
  );
};

export default SupportModel;
