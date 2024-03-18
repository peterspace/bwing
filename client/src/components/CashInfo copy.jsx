import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { validateAddressService } from '../services/apiService';

import { MdQrCodeScanner } from 'react-icons/md';

export const CashInfo = (props) => {
  const {
    setPercentageProgress,
    userAddress,
    setUserAddress,
    service,
    fValue,
    fToken,
    tToken,
    telegram,
    setTelegram,
  } = props;

  const [recipientAddressInfo, setRecipientAddressInfo] = useState();
  console.log({ recipientAddressInfo: recipientAddressInfo });

  console.log({tTokenNetwork: tToken?.chain})
  console.log({fTokenNetwork: fToken?.chain})


  async function checkAddress(walletAddress) {
    const userData = {
      walletAddress,
    };
    const response = await validateAddressService(userData);
    return response;
  }


  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      recipientAddress: '',
      telegram: '',
      isTermsChecked: false,
    },
    validate: async(values) => {
      const errors = {};

      if (!values.recipientAddress) {
        errors.recipientAddress = 'Recipient address is required!';
      }

      const validityRecipientAddress = await checkAddress(
        values.recipientAddress
      );

      if (validityRecipientAddress) {
        setRecipientAddressInfo(validityRecipientAddress);
      }

      //========={Receiving wallet}================================================

      if (values.recipientAddress && service === 'buy') {
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

      //========={sending wallet}================================================

      if (values.recipientAddress && service === 'sell') {
        if (validityRecipientAddress?.valid == false) {
          errors.recipientAddress = 'Invalid recieiving address!';
        }
        if (
          validityRecipientAddress?.valid == true &&
          validityRecipientAddress.network !== fToken?.chain
        ) {
          errors.recipientAddress = `${fToken?.chain} wallet address required!`;
        }
      }

      if (!values.telegram) {
        errors.telegram = 'Telegram address is required!';
      }

      if (!values.isTermsChecked) {
        errors.isTermsChecked =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy';
      }

      return errors;
    },
    onSubmit: (values) => {
      setUserAddress(values.recipientAddress);
      setTelegram(values.telegram);
      setPercentageProgress(3);
    },
  });

  // const [city, setCity] = useState(cities[0]);

  const cashInfo = (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] lg:w-[500px] p-4">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">

            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[14px] lg:text-[24px]`}
              >
               Cash Payment Detail
              </div>
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgSecondary hover:opacity-90 text-bgPrimary shrink-0 rounded py-1 px-3 lg:px-6 lg:py-3"
                onClick={() => {
                  setPercentageProgress(1);
                }}
              >
                Back
              </div>
            </div>
            <div className="flex bg-lightslategray-300 h-px" />
          </div>

          <div className="flex flex-col gap-[8px]">
            {service === 'buy' && (
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                <div className="w-full">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Receiving wallet address
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
            )}

            {service === 'sell' && (
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                <div className="w-full">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Sending address
                  </div>
                  <input
                    id="recipientAddress"
                    name="recipientAddress"
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder={`Enter your ${fToken?.symbol.toUpperCase()} sending address`}
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
            )}

            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
              <div className="">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Telegram
                </div>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                  placeholder="@jason"
                  value={values.telegram}
                  onChange={handleChange}
                />
                <div>
                  {touched.telegram && errors.telegram ? (
                    <div className="mt-4 text-[#ef4444]">{errors.telegram}</div>
                  ) : null}
                </div>
              </div>
              <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                <MdQrCodeScanner size={15} />
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
  return <>{cashInfo}</>;
};
