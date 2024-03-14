import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FooterMini from './FooterMini';
import { createTIcket } from '../services/apiService';
import PhotosUploader from './PhotosUploader';

const servicesList = ['Exchange', 'Buy', 'Sell', 'Defi'];

// const subServicesList = ['Exchange', 'Cash', 'Card', 'Defi'];
const subServicesList = ['Cash', 'Card'];

const subjectList = [
  ` Payment pending`,
  `Stuck on loading page`,
  `Dispatcher issue`,
  `Payment issue`,
  `Custom`,
];

const SupportTicket = () => {
  const location = useLocation();

  const { user } = useSelector((state) => state.user);

  const [isService, setIsService] = useState(false);
  const [isSubService, setIsSubService] = useState(false);
  const [isSubject, setIsSubject] = useState(false);

  const [service, setService] = useState();
  const [subService, setSubService] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [subject, setSubject] = useState();
  const [customSubject, setCustomSubject] = useState();

  const [message, setMessage] = useState();
  const [addPhoto, setAddPhoto] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openServiceModal() {
    // setIsService(true);
    setIsService((prev) => !prev);
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
    // setIsSubject((prev) => !prev);

  }

  function closeModal() {
    setIsService(false);
    setIsSubService(false);
    setIsSubject(false);
  }

  useEffect(() => {
    updateSubservices();
    // updateAutocheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  async function updateSubservices() {
    if (service === 'Exchange') {
      setSubService('Exchange');
    }

    if (service === 'Defi') {
      setSubService('Defi');
    }
    if (service === 'Buy') {
      setSubService('Card');
    }
    if (service === 'Sell') {
      setSubService('Card');
    }
  }

  function openPhotoModel() {
    setAddPhoto((prev) => !prev);
  }

  async function submit() {
    let newSubject;
    newSubject = subject;

    if (subject === 'Custom') {
      newSubject = customSubject;
    }
    const userData = {
      txId: orderNumber,
      subject: newSubject,
      message,
      service,
      subService,
      addedPhotos,
    };

    const response = await createTIcket(userData);

    if (response) {
      setIsSent(true);
      console.log('sent');
    }

    //TODO: api call
  }

  useEffect(() => {
    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    }
  });

  const support = (
    <div className="w-[375px] md:w-[600px] h-full rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-200 text-left text-xs text-gray-500 font-roboto">
      <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] md:w-[600px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
        <div className="self-stretch overflow-hidden flex flex-row items-start justify-between py-0 px-2.5 text-right text-5xl text-text-light-main">
          <div className="flex-1 h-[45px] flex flex-col items-start justify-start">
            <b className="self-stretch relative text-sm md:text-lg dark:text-white">
              {user?.name}
            </b>
            <div className="self-stretch relative text-sm md:text-lg font-montserrat text-gray-500">
              {user?.email}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-xl md:text-[28px] text-gray-500 dark:text-white">
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-center py-[11px] px-3 shadow-sm border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200">
            <div className="relative">Submit a ticket</div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Service `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <div
            className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
            onClick={openServiceModal}
          >
            <div className="relative text-sm md:text-lg">
              {service ? service : `select`}
            </div>
            <img
              className="relative w-4 h-4 overflow-hidden shrink-0"
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
        {/* service list */}

        {isService && !isSubService && !isSubject && (
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-200">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm md:text-lg text-gray-500">
              {servicesList?.map((s, i) => (
                <div
                  key={i}
                  className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                  onClick={() => {
                    closeModal();
                    setService(s);
                  }}
                >
                  <div className="relative font-medium">{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* service list */}
        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Sub-Service `}</span>
            <span className="text-rose-600">*</span>
          </b>
          {service === 'Exchange' || service === 'Defi' ? (
            <div className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver">
              <div className="relative text-sm md:text-lg">
                {subService ? subService : `select`}
              </div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          ) : (
            <div
              className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver"
              onClick={openSubServiceModal}
            >
              <div className="relative text-sm md:text-lg">
                {subService ? subService : `select`}
              </div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          )}
        </div>
        {/* service list */}
        {!isService && isSubService && !isSubject && (
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-200">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm md:text-lg text-gray-500">
              {subServicesList?.map((s, i) => (
                <div
                  key={i}
                  className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                  onClick={() => {
                    closeModal();
                    setSubService(s);
                  }}
                >
                  <div className="relative font-medium">{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* service list */}
        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
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
        {!isService && !isSubService && isSubject && (
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray-200">
            <div className="self-stretch flex flex-col items-start justify-start py-[5px] px-0 gap-[10px] text-sm md:text-lg text-gray-500">
              {subjectList?.map((s, i) => (
                <div
                  key={i}
                  className="cursor-pointer self-stretch flex flex-row hover:text-gray-900 dark:hover:text-white"
                  onClick={() => {
                    closeModal();
                    setSubject(s);
                  }}
                >
                  <div className="relative  font-medium">{s}</div>
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
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
              value={customSubject}
              onChange={(ev) => setCustomSubject(ev.target.value)}
            />
          </div>
        )}

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Order No `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <input
            type="text"
            placeholder="K32405"
            className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
            value={orderNumber}
            onChange={(ev) => setOrderNumber(ev.target.value)}
          />
        </div>

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
          <b className="relative text-sm md:text-lg inline-block w-[167px]">
            <span>{`Message `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <textarea
            className="self-stretch font-montserrat rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm md:text-lg py-2 px-2.5 resize-none h-[120px] md:h-[180px] border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            placeholder="Please describe the issue"
            rows={4}
            cols={6}
          ></textarea>
        </div>

        <div
          className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm md:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
          onClick={openPhotoModel}
        >
          <img
            className="cursor-pointer relative w-6 h-10"
            alt=""
            src="/iconeattach.svg"
          />
          <div className="relative w-px h-10">
            <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_0.5px)] bg-rose-600 w-px h-5 overflow-hidden" />
          </div>
          <div className="h-10 flex flex-row items-center justify-center">
            <div className="relative">Attach file</div>
          </div>
        </div>
        {addPhoto && (
          <>
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
          </>
        )}

        <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />
        {isSent ? (
          <div className="cursor-pointer self-stretch rounded-lg bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-400 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
            <div className="flex-1 relative" onClick={() => setIsSent(false)}>
              Sent
            </div>
          </div>
        ) : (
          <div className="cursor-pointer self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
            <div className="flex-1 relative" onClick={submit}>
              Submit
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="h-full flex flex-col gap-2 justify-center items-center">
  //       {user.name && <div className="fixed top-[120px]">{support}</div>}

  //       <FooterMini />
  //     </div>
  //   </>
  // );
  return <>{support}</>;
};

export default SupportTicket;
