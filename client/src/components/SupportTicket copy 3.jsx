import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterMini from "./FooterMini";
import { createTIcket } from "../services/apiService";
import PhotosUploader from "./PhotosUploader";
import DebouncedInput from "../pages/Tanstack/components/ui/DebouncedInput";
import { DropdownMenu } from "../pages/Tanstack/components/ui/Dropdown-menu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const servicesList = ["Exchange", "Buy", "Sell", "Defi"];

// const subServicesList = ['Exchange', 'Cash', 'Card', 'Defi'];
const subServicesList = ["Cash", "Card"];

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
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
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
    if (service === "Exchange") {
      setSubService("Exchange");
    }

    if (service === "Defi") {
      setSubService("Defi");
    }
    if (service === "Buy") {
      setSubService("Card");
    }
    if (service === "Sell") {
      setSubService("Card");
    }
  }

  function openPhotoModel() {
    setAddPhoto((prev) => !prev);
  }

  async function submit() {
    let newSubject;
    newSubject = subject;

    if (subject === "Custom") {
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
      console.log("sent");
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

  // Start
  const handleServiceToggleDropdown = () => {
    setIsSubService(false);
    setIsService((prev) => !prev);
    setIsSubject(false);
  };
  const handleSelectService = (service) => {
    setService(service);
    setIsService(false);
  };

  const handleSubServiceToggleDropdown = () => {
    setIsSubService((prev) => !prev);
    setIsService(false);
    setIsSubject(false);
  };
  const handleSelectSubService = (subService) => {
    setSubService(subService);
    setIsSubService(false);
  };

  const handleSubjectToggleDropdown = () => {
    setIsSubService(false);
    setIsService(false);
    setIsSubject((prev) => !prev);
  };
  const handleSelectSubject = (subject) => {
    setSubject(subject);
    setIsSubject(false);
  };

  // end

  const support = (
    <div className="w-[375px] 2xl:w-[600px] h-full rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-200 text-left text-xs text-gray-500 font-roboto">
      <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] 2xl:w-[600px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[8px]">
        <div className="self-stretch overflow-hidden flex flex-row items-start justify-between py-0 px-2.5 text-right text-5xl text-text-light-main">
          <div className="flex-1 h-[45px] flex flex-col items-start justify-start">
            <b className="self-stretch relative text-sm 2xl:text-lg dark:text-white">
              {user?.name}
            </b>
            <div className="self-stretch relative text-sm 2xl:text-lg font-montserrat text-gray-500">
              {user?.email}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-xl 2xl:text-[28px] text-gray-500 dark:text-white">
          <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-center py-[11px] px-3 shadow-sm border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200">
            <div className="relative">Submit a ticket</div>
          </div>
        </div>

        {/* Service */}

        <div className="self-stretch relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
              onClick={handleServiceToggleDropdown}
            >
              <div className="flex w-full justify-between items-center">
                {service ? (
                  <>
                    {isService ? (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {"Service"}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronUp size={12} color="#111111" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {service}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronDown size={12} color="#111111" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-700">
                      {"Service"}
                    </span>
                    {isService ? (
                      <FaChevronUp size={16} />
                    ) : (
                      <FaChevronDown size={16} />
                    )}
                  </div>
                )}
              </div>
            </button>
          </div>
          <>
            {isService && (
              <div className="origin-top-right w-full absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
                <div className="max-h-62 overflow-y-auto">
                  {servicesList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer"
                      onClick={() => handleSelectService(item)}
                    >
                      <div className="flex items-center">
                        {/* <span
                        className={`w-2.5 h-2.5 mr-2 rounded-md ${service?.color}`}
                      /> */}
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        </div>

        {/* Sub service */}
        <div className="self-stretch relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
              onClick={handleSubServiceToggleDropdown}
            >
              <div className="flex w-full justify-between items-center">
                {subService ? (
                  <>
                    {isSubService ? (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {"Sub-service"}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronUp size={12} color="#111111" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {subService}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronDown size={12} color="#111111" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-700">
                      {"Sub-service"}
                    </span>
                    {isSubService ? (
                      <FaChevronUp size={16} />
                    ) : (
                      <FaChevronDown size={16} />
                    )}
                  </div>
                )}
              </div>
            </button>
          </div>
          {service === "Exchange" || service === "Defi" ? null : (
            <>
              {isSubService && (
                <div className="origin-top-right w-full absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
                  <div className="max-h-62 overflow-y-auto">
                    {subServicesList.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer"
                        onClick={() => handleSelectSubService(item)}
                      >
                        <div className="flex items-center">
                          <span>{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* end */}

        {/* Subject */}
        <div className="self-stretch relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
              onClick={handleSubjectToggleDropdown}
            >
              <div className="flex w-full justify-between items-center">
                {subject ? (
                  <>
                    {isSubject ? (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {"Subject"}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronUp size={12} color="#111111" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-gray-100 font-normal text-sm">
                              {subject}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          <FaChevronDown size={12} color="#111111" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-700">
                      {"Subject"}
                    </span>
                    {isSubject ? (
                      <FaChevronUp size={16} />
                    ) : (
                      <FaChevronDown size={16} />
                    )}
                  </div>
                )}
              </div>
            </button>
          </div>
          {isSubject && (
            <div className="origin-top-right w-full absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
              <div className="max-h-62 overflow-y-auto">
                {subjectList.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer"
                    onClick={() => handleSelectSubject(item)}
                  >
                    <div className="flex items-center">
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* end */}

        {subject === "Custom" && (
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[8px]">
            <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
              <span>{`Custom Subject `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <input
              type="text"
              placeholder="Enter subject"
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
              value={customSubject}
              onChange={(ev) => setCustomSubject(ev.target.value)}
            />
          </div>
        )}

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[8px]">
          <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
            <span>{`Order No `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <input
            type="text"
            placeholder="K32405"
            className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
            value={orderNumber}
            onChange={(ev) => setOrderNumber(ev.target.value)}
          />
        </div>

        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[8px]">
          <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
            <span>{`Message `}</span>
            <span className="text-rose-600">*</span>
          </b>
          <textarea
            className="self-stretch font-montserrat rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none h-[120px] 2xl:h-[180px] border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            placeholder="Please describe the issue"
            rows={4}
            cols={6}
          ></textarea>
        </div>

        <div
          className="self-stretch cursor-pointer rounded-lg box-border flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm 2xl:text-lg text-gray-500 border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
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
