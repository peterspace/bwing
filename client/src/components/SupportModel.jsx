import React, { useState, useEffect } from 'react';
import FooterMini from './FooterMini';

const subjectEnquiryList = [`General Enquiry`, `Payment issue`, `Custom`];

const SupportModel = () => {
  const [isSubject, setIsSubject] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [subject, setSubject] = useState();
  const [customSubject, setCustomSubject] = useState();

  const [message, setMessage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  // function openSubjectModal() {
  //   setIsSubject(false);
  //   setIsSubService(false);
  //   setIsSubject(true);
  // }

  function openSubjectModal() {
    setIsSubject((prev) => !prev);
  }

  async function submit() {
    if (!name || !email || !message) {
      return;
    }
    let newSubject;
    newSubject = subject;

    if (subject === 'Custom') {
      newSubject = customSubject;
    }
    const userData = {
      subject: newSubject,
      name,
      email,
      message,
    };

    //TODO: api call
  }

  const enquiry = (
    <div className="w-[375px] md:w-[600px] h-full rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto">
      <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] md:w-[600px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
        <div className="mt-[24px] self-stretch rounded-lg bg-white dark:bg-gray-1000 box-border flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-xl md:text-[28px] text-gray-500 dark:text-white border-[1px] border-solid border-lightslategray-300">
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-center py-[11px] px-3">
            <div className="relative">Contact us</div>
          </div>
        </div>

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Name `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <input
            type="text"
            placeholder="John Doe"
            className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Email `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        {/* subject list */}
        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Subject `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <div
            className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
            onClick={openSubjectModal}
          >
            <div className="relative text-sm md:text-lg">
              {' '}
              {subject ? subject : `select`}
            </div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
        {/* subject list */}
        {isSubject && (
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-300">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm md:text-lg text-gray-500">
              {subjectEnquiryList?.map((s, i) => (
                <div
                  key={i}
                  className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                  onClick={() => {
                    setSubject(s);
                    setIsSubject(false);
                  }}
                >
                  <div className="relative font-medium">{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subject === 'Custom' && (
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm md:text-lg inline-block w-[167px]">
              <span>{`Custom Subject `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <input
              type="text"
              placeholder="Enter subject"
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
              value={customSubject}
              onChange={(ev) => setCustomSubject(ev.target.value)}
            />
          </div>
        )}

        {subject === 'Payment issue' && (
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm md:text-lg inline-block w-[167px]">
              <span>{`Order No `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <input
              type="text"
              placeholder="K32405"
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
              value={orderNumber}
              onChange={(ev) => setOrderNumber(ev.target.value)}
            />
          </div>
        )}

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Message `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <textarea
            className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-[120px] md:h-[180px] border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            placeholder="How may we help you?"
            rows={4}
            cols={6}
          ></textarea>
        </div>

        <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />
        <div className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
          <div className="flex-1 relative">Submit</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="fixed top-[120px]">{enquiry}</div>
        <FooterMini />
      </div> */}
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 fixed ss:top-[120px] lg:top-[200px]">
          {enquiry}
        </div>
        <FooterMini />
      </div>
    </>
  );
};

export default SupportModel;
