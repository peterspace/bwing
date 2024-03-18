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

  console.log({ tTokenNetwork: tToken?.chain });
  console.log({ fTokenNetwork: fToken?.chain });

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
    validate: async (values) => {
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
      <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] p-1 w-[375px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px] m-2">
            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`text-[18px] font-extrabold leading-[32px] text-black dark:text-white inline-block`}
              >
                Payment Details
              </div>
              <div
                className="cursor-pointer transition-all ease-in duration-75 flex flex-row justify-center items-center hover:opacity-90 text-black dark:text-white shrink-0 rounded-lg hover:bg-opacity-0"
                onClick={() => {
                  setPercentageProgress(1);
                }}
              >
                <span className="px-3 py-2 bg-bgPrimary text-white rounded">
                  Back
                </span>
              </div>
            </div>
            <div className="flex bg-lightslategray-300 h-px" />
          </div>

          <div className="flex flex-col gap-[8px]">
            {service === 'buy' && (
              <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                  <span>{`Receiving wallet address `}</span>
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
            )}

            {service === 'sell' && (
              <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                  <span>{`Sending address `}</span>
                  <span className="text-rose-600">*</span>
                </b>
                <input
                  id="recipientAddress"
                  name="recipientAddress"
                  type="text"
                  className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                  placeholder={`Enter your ${fToken?.symbol.toUpperCase()} sending address`}
                  value={values.recipientAddress}
                  onChange={handleChange}
                />
                {touched.recipientAddress && errors.recipientAddress ? (
                  <div className="text-[#ef4444]">
                    {errors.recipientAddress}
                  </div>
                ) : null}
              </div>
            )}
            <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
              <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                <span>{`Telegram`}</span>
                <span className="text-rose-600">*</span>
              </b>
              <input
                id="telegram"
                name="telegram"
                type="text"
                className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                placeholder="@jason"
                value={values.telegram}
                onChange={handleChange}
              />
              {touched.telegram && errors.telegram ? (
                <div className="text-[#ef4444]">{errors.telegram}</div>
              ) : null}
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
            {service} {fValue} {fToken?.symbol}
          </div>
        </div>
      </div>
    </form>
  );
  return <>{cashInfo}</>;
};
