import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateAddressService } from '../services/apiService';

import { MdQrCodeScanner } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

export const WalletInfo = (props) => {
  const {
    setPercentageProgress,
    userAddress,
    setUserAddress,
    service,
    fValue,
    fToken,
    tToken,
  } = props;

  // const [walletValidation, setWalletValiadtion] = useState();
  const [senderAddressInfo, setSenderAddressInfo] = useState();
  const [recipientAddressInfo, setRecipientAddressInfo] = useState();

  console.log({ senderAddressInfo: senderAddressInfo });
  console.log({ recipientAddressInfo: recipientAddressInfo });

  console.log({ tTokenNetwork: tToken?.chain });
  console.log({ fTokenNetwork: fToken?.chain });

  // async function checkAddress(walletAddress) {
  //   const userData = {
  //     walletAddress,
  //   };
  //   const response = await validateAddressService(userData);
  //   if (response?.valid) {
  //     console.log(response);
  //   } else {
  //     const message = 'invalid address';
  //     console.log(message);
  //   }
  // }

  async function checkAddress(walletAddress) {
    const userData = {
      walletAddress,
    };
    const response = await validateAddressService(userData);
    return response;
  }

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      senderAddress: '',
      recipientAddress: '',
      isTermsChecked: false,
    },
    validate: async (values) => {
      let errors = {};

      if (!values.senderAddress) {
        errors.senderAddress = `Sending address is required!`;
      }
      if (!values.recipientAddress) {
        errors.recipientAddress = 'Recieiving address is required!';
      }

      const validitySenderAddress = await checkAddress(values.senderAddress);
      if (validitySenderAddress) {
        setSenderAddressInfo(validitySenderAddress);
      }

      const validityRecipientAddress = await checkAddress(
        values.recipientAddress
      );

      if (validityRecipientAddress) {
        setRecipientAddressInfo(validityRecipientAddress);
      }

      //========================{Sending wallet}================================================

      if (values.senderAddress) {
        if (validitySenderAddress?.valid == false) {
          errors.senderAddress = 'Invalid sending address!';
        }

        if (
          validitySenderAddress?.valid == true &&
          validitySenderAddress.network !== fToken?.chain
        ) {
          errors.senderAddress = `${fToken?.chain} wallet address required!`;
        }
      }

      //========={Receiving wallet}================================================

      if (values.recipientAddress) {
        if (validityRecipientAddress?.valid == false) {
          errors.recipientAddress = 'Invalid recieiving address!';
        }

        if (
          validityRecipientAddress?.valid == true &&
          validityRecipientAddress.network !== tToken?.chain
        ) {
          errors.recipientAddress = `${tToken?.chain} wallet address required!`;
        }
      }

      //========={TermsChecked}================================================

      if (!values.isTermsChecked) {
        errors.isTermsChecked =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy';
      }

      return errors;
    },
    onSubmit: (values) => {
      setUserAddress(values.recipientAddress);
      setPercentageProgress(3);
    },
  });

  const walletInfo = (
    <>
      <div className="card-gradient-app-container rounded-lg">
        <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1">
          {' '}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[10px] m-4">
                <div className="flex flex-row justify-between mt-[24px]">
                  <div
                    className={`cursor-pointer leading-[24px] inline-block text-black dark:text-silver text-[14px] md:text-[24px]`}
                  >
                    Wallet address
                  </div>
                  <div
                    className="cursor-pointer flex flex-row justify-center items-center bg-chizzySnow dark:bg-exchange-rate-dark hover:opacity-90 text-gray-200 shrink-0 rounded py-1 px-3 md:px-6 md:py-3"
                    onClick={() => {
                      setPercentageProgress(1);
                    }}
                  >
                    Back
                  </div>
                </div>
                <div className="flex bg-lightslategray-300  h-px" />
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                  <b className="relative leading-[28px] inline-block w-[167px] text-black dark:text-silver">
                    <span>{`Sending address `}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <input
                    id="senderAddress"
                    name="senderAddress"
                    type="text"
                    className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                    placeholder={`Enter your ${fToken?.symbol.toUpperCase()} sending address`}
                    value={values.senderAddress}
                    onChange={handleChange}
                  />
                  {touched.senderAddress && errors.senderAddress ? (
                    <div className="text-[#ef4444]">{errors.senderAddress}</div>
                  ) : null}
                </div>

                <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                  <b className="relative leading-[28px] inline-block w-[167px] text-black dark:text-silver">
                    <span>{`Receiving address `}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <input
                    id="recipientAddress"
                    name="recipientAddress"
                    type="text"
                    className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                    placeholder={`Enter your ${tToken?.symbol.toUpperCase()} receiving address`}
                    value={values.recipientAddress}
                    onChange={handleChange}
                  />
                  {touched.recipientAddress && errors.recipientAddress ? (
                    <div className="text-[#ef4444]">
                      {errors.recipientAddress}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1 m-2 ">
                  <div className="flex flex-row gap-1">
                    <input
                      id="isTermsChecked"
                      name="isTermsChecked"
                      type="checkbox"
                      value={values.isTermsChecked}
                      onChange={handleChange}
                      className="outline-none bg-chizzySnow dark:bg-gray-1000 accent-bgPrimary focus:accent-bgPrimary/30"
                    />

                    <div className="flex flex-row gap-1 text-xs md:text-[12px]">
                      <div className="leading-[20px] text-black dark:text-silver inline-block">
                        I agree with Terms of Use, Privacy Policy and AML/KYC
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    {touched.isTermsChecked && errors.isTermsChecked ? (
                      <div className="mt-1 text-[#ef4444]">
                        {errors.isTermsChecked}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className="mb-4 cursor-pointer flex flex-row justify-center items-center bg-bgPrimary text-white hover:opacity-90 h-[49px] shrink-0 rounded transition ease-in-out delay-150 m-4"
                onClick={handleSubmit}
              >
                {/* {service} {fValue} {fToken?.symbol} */}
                {`Exchange`} {fValue} {fToken?.symbol.toUpperCase()}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  return <>{walletInfo}</>;
};
