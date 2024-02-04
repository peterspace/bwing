import React, { useState, useEffect } from 'react';
import { Progress } from '../../../components/Progress';
import { Checkout } from '../../../components/Checkout';
import { CheckoutDefi } from '../../../components/CheckoutDefi';
import { Signup } from '../../../components/Signup';
import { Confirm } from '../../../components/Confirm';
import { ConfirmSwap } from '../../../components/ConfirmSwap';
import {
  createTransaction,
  getTransactionByTxId,
  getTransactionByTxIdInternal,
} from '../../../redux/features/transaction/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import stylesSlippage from '../../../components/Slippage.module.css';
import { IoIosClose } from 'react-icons/io';

export const DefiScreen4 = (props) => {
  const {
    percentageProgress,
    setPercentageProgress,
    isConnected,
    setIsSwapSuccess,
    isSwapSuccess,
    isSwapError,
    isApproveSuccess,
    isApproveError,
    setIsSwapError,
    setErrorSwap,
    setIsApproveSuccess,
    setIsApproveError,
    setErrorSwapApprove,
    setOpenModel,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */

  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center">
      <>
        {/* Transaction sucessfull */}
        {isConnected === true &&
        isSwapSuccess === true &&
        isSwapError === false &&
        isApproveSuccess === false &&
        isApproveError === false ? (
          <>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <span
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer text-bgPrimary dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-bgPrimary ms-auto -mx-1.5 -my-1.5 h-8 w-8"
                  onClick={() => {
                    setIsSwapSuccess(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  {' '}
                  <IoIosClose size={32} />
                </span>
                <div className={stylesSlippage.swapSettings}>
                  Transaction Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  Sucessful
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl dark:bg-indigo-800 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                  onClick={() => {
                    setIsSwapSuccess(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Transaction unsucessfull */}
        {isConnected === true &&
        isSwapSuccess === false &&
        isSwapError === true &&
        isApproveSuccess === false &&
        isApproveError === false ? (
          <>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <span
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer text-bgPrimary dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-bgPrimary ms-auto -mx-1.5 -my-1.5 h-8 w-8"
                  onClick={() => {
                    setErrorSwap('');
                    setIsSwapError(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  {' '}
                  <IoIosClose size={32} />
                </span>
                <div className={stylesSlippage.swapSettings}>
                  Transaction Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  Unsucessful
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl dark:bg-indigo-800 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                  onClick={() => {
                    setErrorSwap('');
                    setIsSwapError(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Approval sucessfull */}
        {isConnected === true &&
        isSwapSuccess === false &&
        isSwapError === false &&
        isApproveSuccess === true &&
        isApproveError === false ? (
          <>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <span
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer text-bgPrimary dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-bgPrimary ms-auto -mx-1.5 -my-1.5 h-8 w-8"
                  onClick={() => {
                    setIsApproveSuccess(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  {' '}
                  <IoIosClose size={32} />
                </span>
                <div className={stylesSlippage.swapSettings}>
                  Approval Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">Granted</div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl dark:bg-indigo-800 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                  onClick={() => {
                    setIsApproveSuccess(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Approval unsucessfull */}
        {isConnected === true &&
        isSwapSuccess === false &&
        isSwapError === false &&
        isApproveSuccess === false &&
        isApproveError === true ? (
          <>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <span
                  onClick={() => {
                    setErrorSwapApprove('');
                    setIsApproveError(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  {' '}
                  <IoIosClose size={32} />
                </span>
                <div className={stylesSlippage.swapSettings}>
                  Approval Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">Denied</div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] cursor-pointer text-white bg-bgPrimary hover:bg-bgPrimaryHover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl dark:bg-indigo-800 dark:hover:bg-bgPrimary dark:focus:ring-bgPrimaryHover"
                  onClick={() => {
                    setErrorSwapApprove('');
                    setIsApproveError(false);
                    setPercentageProgress(1);
                    setOpenModel(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
};
