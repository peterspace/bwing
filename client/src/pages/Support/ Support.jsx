import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createMessage, contactAutoReply } from "../../services/apiService";
import FooterMini from "../../components/FooterMini";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const subjectEnquiryList = [`General Enquiry`, `Payment issue`, `Custom`];

export const Support = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubject, setIsSubject] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [customSubject, setCustomSubject] = useState();
  const [isSubmitted, setIsSubmitted] = useState("");
  const [submittedData, setsubmittedData] = useState("");
  const [isAutoReplySent, setIsAutoReplySent] = useState(false);

  useEffect(() => {
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openSubjectModal() {
    setIsSubject((prev) => !prev);
  }

  const handleSubjectToggleDropdown = () => {
    setIsSubject((prev) => !prev);
  };
  const handleSelectSubject = (subject) => {
    setSubject(subject);
    setIsSubject(false);
  };

  async function submit() {
    if (!name || !email || !message) {
      return;
    }
    let newSubject;
    newSubject = subject;

    if (subject === "Custom") {
      newSubject = customSubject;
    }
    const userData = {
      subject: newSubject,
      name,
      email,
      message,
    };
    const data = await createMessage(userData);
    if (data) {
      setIsSubmitted(true);
      setsubmittedData(data);
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      SendAutoReply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  async function SendAutoReply() {
    const userData = {
      name: submittedData?.name,
      email: submittedData?.email,
      subject: submittedData?.subject,
      message: submittedData?.message,
    };

    const data = await contactAutoReply(userData);
    if (data) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsAutoReplySent(true);
      setIsSubmitted(false);

      setTimeout(() => {
        setIsAutoReplySent(false);
        navigate("/");
      }, 10000);
    }
  }

  async function RedirectHome() {
    setTimeout(() => {
      if (isAutoReplySent) {
        setIsAutoReplySent(false);
      }
      navigate("/");
    }, 5000);
  }

  const enquiry = (
    <div className="card-gradient-app-container">
      <div className="w-[375px] 2xl:w-[600px] h-full rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500 font-roboto">
        <div className="rounded-lg bg-white dark:bg-background-dark w-[375px] 2xl:w-[600px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[8px]">
          <div className="self-stretch flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-[16px] 2xl:text-[20px] text-gray-500 dark:text-white">
            <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-center py-[11px] px-3 shadow-sm border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200">
              <div className="relative">Contact us</div>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
              <span>{`Name `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <input
              type="text"
              placeholder="John Doe"
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
              <span>{`Email `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          {/* Subject */}

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[8px]">
            <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
              <span>{`Subject `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <div className="self-stretch relative inline-block text-left">
              <div>
                <div
                  className="inline-flex w-full h-10 mt-0 mx-0 px-2 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
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
                                  {"Select"}
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
                          {"Select"}
                        </span>
                        {isSubject ? (
                          <FaChevronUp size={16} />
                        ) : (
                          <FaChevronDown size={16} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isSubject && (
                <div className="origin-top-right w-full absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
                  <div className="max-h-62 overflow-y-auto">
                    {subjectEnquiryList.map((item, i) => (
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
          </div>

          {/* end */}

          {subject === "Custom" && (
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
              <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
                <span>{`Custom Subject `}</span>
                <span className="text-rose-600">*</span>
              </b>
              <input
                type="text"
                placeholder="Enter subject"
                className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                value={customSubject}
                onChange={(ev) => setCustomSubject(ev.target.value)}
              />
            </div>
          )}

          {subject === "Payment issue" && (
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
              <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
                <span>{`Order No `}</span>
                <span className="text-rose-600">*</span>
              </b>
              <input
                type="text"
                placeholder="K32405"
                className="self-stretch rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border border-gray-400 focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none border-[1px] border-solid border-lightslategray-100 dark:border-lightslategray-300"
                value={orderNumber}
                onChange={(ev) => setOrderNumber(ev.target.value)}
              />
            </div>
          )}

          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[8px]">
            <b className="relative text-sm 2xl:text-lg inline-block w-[167px]">
              <span>{`Message `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <textarea
              className="self-stretch font-montserrat rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border focus:outline-none text-chizzyblue dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm 2xl:text-lg py-2 px-2.5 resize-none h-[40px] lg:h-[80px] 2xl:h-[180px] border-[1px] border-solid border-lightslategray-200 dark:border-lightslategray-200"
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
              placeholder="How may we help you today?"
              rows={4}
              cols={6}
            ></textarea>
          </div>

          <div className="relative self-stretch  bg-lightslategray-300 h-px overflow-hidden shrink-0" />

          {isSubmitted ? (
            <div
              className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform transition self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
              onClick={RedirectHome}
            >
              <div className="flex-1 relative">Sent</div>
            </div>
          ) : (
            <div
              className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform transition self-stretch rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white"
              onClick={submit}
            >
              <div className="flex-1 relative">Submit</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 fixed top-[120px] 2xl:top-[200px]">
          {enquiry}
        </div>
        {/* <FooterMini /> */}
      </div>
    </>
  );
};
