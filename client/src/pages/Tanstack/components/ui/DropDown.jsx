import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const servicesList = ["Exchange", "Buy", "Sell", "Defi"];

export default function DropDown() {
  const [service, setService] = useState();
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Start
  const handleServiceToggleDropdown = () => {
    setIsServiceDropdownOpen((prev) => !prev);
  };
  const handleSelectService = (service) => {
    setService(service);
    setIsServiceDropdownOpen(false);
  };

  // end
  return (
    <>
      {/* Start */}
      <div className="relative inline-block text-left ml-6">
        <div>
          <button
            type="button"
            className="inline-flex w-80 h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] gap-[8px] shadow-md active:bg-white dark:active:bg-app-container-dark active:shadow-none border border-solid border-[#E7E7E7] dark:border-lightslategray-300 box-border text-darkslategray-200 dark:text-gray-100 bg-white dark:bg-app-container-dark placeholder-darkgray-100"
            onClick={handleServiceToggleDropdown}
          >
            <div className="flex w-full justify-between items-center">
              {service ? (
                <>
                  {isServiceDropdownOpen ? (
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
                  {isServiceDropdownOpen ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </div>
              )}
            </div>
          </button>
        </div>
        {isServiceDropdownOpen && (
          <div className="origin-top-right w-80 absolute right-0 mt-2 rounded-md bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 shadow-2xl z-50 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
            <div className="max-h-62 overflow-y-auto">
              {servicesList.map((service, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer"
                  onClick={() => handleSelectService(service)}
                >
                  <div className="flex items-center">
                    {/* <span
                        className={`w-2.5 h-2.5 mr-2 rounded-md ${service?.color}`}
                      /> */}
                    <span>{service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* end */}
    </>
  );
}
