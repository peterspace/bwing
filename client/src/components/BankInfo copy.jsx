import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { validateAddressService } from '../services/apiService';

import { MdQrCodeScanner } from 'react-icons/md';
import BanksDropdown from './BanksDropdown';
import { useCardPaymentSystemIcon } from '../hooks/useCardDetector';
import { banksOptions } from '../constants';

export const BankInfo = (props) => {
  const {
    setPercentageProgress,
    setUserAddress,
    service,
    fValue,
    fToken,
    tToken,
    provider,
    setFullName,
    setBankName,
    setCardNumber,
    setPhone,
  } = props;

  const [selectedBank, setSelectedBank] = useState(null);
  const [isBank, setIsBank] = useState(false);

  console.log({ selectedBank: selectedBank });
  console.log({ banksOptions: banksOptions });

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

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      recipientAddress: '',
      name: '',
      phoneNumber: '',
      bankName: '',
      cardNumber: '',
      isTermsChecked: false,
    },
    validate: async (values) => {
      let errors = {};

      if (!values.recipientAddress) {
        errors.recipientAddress = 'Receiver address is required!';
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

      if (!values.name) {
        errors.name = 'Name is required!';
      }

      if (provider?.name === 'Phone' && !values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required!';
      }

      if (provider?.name === 'Phone' && !values.bankName) {
        errors.bankName = 'Bank name is required!';
      }

      if (provider?.name === 'Card' && !values.cardNumber) {
        errors.cardNumber = 'Card number is required!';
      }

      if (!values.isTermsChecked) {
        errors.isTermsChecked =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy';
      }

      return errors;
    },
    onSubmit: (values) => {
      setUserAddress(values.recipientAddress);
      setFullName(values.name);
      setPhone(values.phoneNumber);
      setBankName(values.bankName);
      setCardNumber(values.cardNumber);

      setPercentageProgress(3);
    },
  });

  const paymentSystemIcon = useCardPaymentSystemIcon(values.cardNumber);

  // const { paymentSystemIcon, setPaymentSystemIcon } = useState(null);

  // useEffect(() => {

  // }, [values.cardNumber])

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    if (selectedBank?.name) {
      handleBankSelect(selectedBank?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBank]);

  const handleBankSelect = (selectedBank) => {
    setFieldValue('bankName', selectedBank);
  };

  const handleCardNumberChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 16) {
      return;
    }
    setFieldValue(name, formattedValue);
  };

  function openBanksModal() {
    setIsBank((prev) => !prev);
  }

  function onBankChanged(ev) {
    setSelectedBank(ev.target.value);
    setIsBank(false);
  }

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setIsBank(false);
  };

  const bankInfo = (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] md:w-[500px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div
                className={`cursor-pointer leading-[24px] inline-block text-black dark:text-silver text-[14px] md:text-[24px]`}
              >
                Payment Details
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

            <div className="flex bg-lightslategray-300 w-[276px] md:w-[452px] h-px" />
          </div>
          {provider?.name === 'Phone' && (
            <>
              <div>
                <div className="w-full">
                  <BanksDropdown
                    selectedBank={selectedBank}
                    setSelectedBank={setSelectedBank}
                  />
                </div>

                <div>
                  {touched.bankName && errors.bankName ? (
                    <div className="text-[#ef4444]">{errors.bankName}</div>
                  ) : null}
                </div>
              </div>

              <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                <b className="relative leading-[28px] inline-block w-[167px]">
                  <span>{`Select a bank `}</span>
                  <span className="text-rose-600">*</span>
                </b>
                {/* <div
                  className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
                  onClick={openBanksModal}
                >
                  <div className="relative">{`${
                    selectedBank ? selectedBank?.name : `Select`
                  }`}</div>
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/chevrondown.svg"
                  />
                </div> */}
                <div
                  className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px]"
                  onClick={openBanksModal}
                >
                  <img
                    className="relative rounded-full w-5 h-5 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src={`${selectedBank ? selectedBank?.image : ``}`}
                  />
                  <div className="relative">{`${
                    selectedBank ? selectedBank?.name : `Select`
                  }`}</div>
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0"
                    alt=""
                    src="/chevrondown.svg"
                  />
                </div>
              </div>
              {/* service list */}
              {isBank && (
                <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
                  <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm text-gray-500">
                    {/* {banksOptions &&
                      banksOptions.map((bank, index) => (
                        <div key={index} className="flex gap-4 mt-8">
                          <div className="flex items-center">
                            <img
                              src={bank?.image}
                              alt="Bank Logo"
                              className="w-16 mr-6"
                            />

                            <div className="text-black font-normal text-[16px]">
                              {bank?.name}
                            </div>
                          </div>
                        </div>
                      ))} */}

                    {banksOptions &&
                      banksOptions.map((bank, index) => (
                        <div
                          key={index}
                          className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                          // onClick={() => {
                          //   setBankName(bank?.name);
                          //   selectedBank(bank)
                          // }}

                          onClick={() => handleSelectBank(bank)}
                        >
                          <div className="relative font-medium">
                            {bank?.name}
                          </div>
                        </div>
                        // <div key={index} className="flex gap-4 mt-8">
                        //   <div className="flex items-center">
                        //     <img
                        //       src={bank?.image}
                        //       alt="Bank Logo"
                        //       className="w-16 mr-6"
                        //     />

                        //     <div className="text-black font-normal text-[16px]">
                        //       {bank?.name}
                        //     </div>
                        //   </div>
                        // </div>
                      ))}

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
                    <span>{`Name`}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                    placeholder="Aleksadra Romanova"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name ? (
                    <div className="text-[#ef4444]">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                  <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                    <span>{`Phone`}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                    placeholder="79031234567"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <div className="text-[#ef4444]">{errors.phoneNumber}</div>
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

                    <div className="flex flex-row gap-1 text-xs md:text-smi">
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
            </>
          )}
          {provider?.name === 'Card' && (
            <>
              <div className="flex flex-col gap-[8px]">
                {service === 'buy' && (
                  <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                    <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                      <span>{`Receiving wallet address`}</span>
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
                      <span>{`Sending address`}</span>
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
                    <span>{`Name`}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                    placeholder="Aleksadra Romanova"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name ? (
                    <div className="text-[#ef4444]">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-full flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
                  <b className="relative leading-[28px] inline-block text-black dark:text-silver">
                    <span>{`Card`}</span>
                    <span className="text-rose-600">*</span>
                  </b>
                  <div className="flex flex-row w-full justify-between items-center">
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base py-2 px-2.5 resize-none w-full  border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                      placeholder="Card Number"
                      value={values.cardNumber}
                      onChange={handleCardNumberChange}
                    />

                    <div className="cursor-pointer ml-2 flex justify-center items-center w-[36px] h-[64px] overflow-hidden">
                      {paymentSystemIcon && (
                        <img src={paymentSystemIcon} alt="Payment system" />
                      )}
                    </div>
                  </div>

                  {touched.cardNumber && errors.cardNumber ? (
                    <div className="text-[#ef4444]">{errors.cardNumber}</div>
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

                    <div className="flex flex-row gap-1 text-xs md:text-smi">
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
            </>
          )}

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
  return <>{bankInfo}</>;
};
