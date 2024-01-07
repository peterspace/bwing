import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateAddressService } from '../services/apiService';

import { MdQrCodeScanner } from 'react-icons/md';

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

  console.log({tTokenNetwork: tToken?.chain})
  console.log({fTokenNetwork: fToken?.chain})


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
      if(validitySenderAddress){
        setSenderAddressInfo(validitySenderAddress);
      }

      const validityRecipientAddress = await checkAddress(
        values.recipientAddress
      );

      if(validityRecipientAddress){
        setRecipientAddressInfo(validityRecipientAddress);
      }
      

      //========================{Sending wallet}================================================

      if (values.senderAddress) {
        if (validitySenderAddress?.valid == false) {
          errors.senderAddress = 'Invalid sending address!';
        }

        if (
          validitySenderAddress?.valid == true &&
          validitySenderAddress.network !==
            fToken?.chain
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
          validityRecipientAddress.network !==
            tToken?.chain
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
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] md:w-[500px] p-4">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[14px] md:text-[24px]`}
              >
                Wallet address
              </div>
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary shrink-0 rounded py-1 px-3 md:px-6 md:py-3"
                onClick={() => {
                  setPercentageProgress(1);
                }}
              >
                Back
              </div>
            </div>
            <div className="flex bg-lightslategray-300 w-[276px]  md:w-[452px] h-px" />
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Sending address
                </div>
                <input
                  id="senderAddress"
                  name="senderAddress"
                  type="text"
                  className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                  placeholder={`Enter your ${fToken?.symbol.toUpperCase()} sending address`}
                  value={values.senderAddress}
                  onChange={handleChange}
                />
                <div>
                  {touched.senderAddress && errors.senderAddress ? (
                    <div className="mt-4 text-[#ef4444]">
                      {errors.senderAddress}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                <MdQrCodeScanner size={15} />
              </div>
            </div>
            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Receiving address
                </div>
                <input
                  id="recipientAddress"
                  name="recipientAddress"
                  type="text"
                  className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                  placeholder={`Enter your ${tToken?.symbol.toUpperCase()} receiving address`}
                  value={values.recipientAddress}
                  onChange={handleChange}
                />
                <div>
                  {touched.recipientAddress && errors.recipientAddress ? (
                    <div className="mt-4 text-[#ef4444]">
                      {errors.recipientAddress}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                <MdQrCodeScanner size={15} />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-6">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row justify-center items-center bg-gray-400 rounded-[4px] w-[26px] h-[16px]">
                  <span className="text-3xs uppercase text-white inline-block">
                    fio
                  </span>
                </div>
                <div className="flex flex-row justify-center items-center bg-steelblue rounded-[4px] w-[26px] h-[16px]">
                  <span className="text-3xs uppercase text-white inline-block">
                    ud
                  </span>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <span className="text-2xs inline-block py-1 px-1.5">
                    FIO protocol and Unstoppable Domains are supported
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-2">
                <input
                  id="isTermsChecked"
                  name="isTermsChecked"
                  type="checkbox"
                  value={values.isTermsChecked}
                  onChange={handleChange}
                  className="outline-none bg-whitesmoke-100 accent-bgPrimary focus:accent-bgPrimary/30"
                />

                <div className="flex flex-row gap-1 text-xs md:text-smi">
                  <div className="leading-[20px] text-darkslategray-200 inline-block">
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
            className="mb-4 cursor-pointer flex flex-row justify-center items-center bg-bgPrimary text-white w-full hover:opacity-90 h-[49px] shrink-0 rounded transition ease-in-out delay-150"
            onClick={handleSubmit}
          >
            {service} {fValue} {fToken?.symbol}
          </div>
        </div>
      </div>
    </form>
  );
  return <>{walletInfo}</>;
};
