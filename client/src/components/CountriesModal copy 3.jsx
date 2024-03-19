import React from "react";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export default function CountriesModal(props) {
  const {
    filteredTokens,
    isTokenModalOpen,
    setIsTokenModalOpen,
    title,
    paymentMethod,
    cities,
    setCountry,
    setCity,
    country,
    cityData,
    city,
  } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [tokensList, setTokensList] = useState([]);
  const [newCountry, setNewCountry] = useState({});
  const [isCity, setIsCity] = useState(false);

  useEffect(() => {
    if (filteredTokens) {
      setTokensList(filteredTokens);
    }
  }, [filteredTokens]);

  useEffect(() => {
    handleSearchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const closeModal = () => {
    setIsTokenModalOpen(false);
  };

  const handleSearchToken = () => {
    const searchResult = filteredTokens?.filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTokensList(searchResult);
  };

  const cardTx = (
    <>
      {isTokenModalOpen && (
        <div
          className={`self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full w-[375px] xl:w-[470px] 2xl:w-[600] mt-[-576px] lg:mt-[-640px]`}
        >
          <div className="flex-1 rounded-3xl bg-white dark:bg-app-container-dark text-chizzyblue dark:text-white font-montserrat box-border flex flex-col items-start justify-start max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-4 pb-8 h-[554px]">
            <div className="self-stretch flex flex-row items-start justify-between px-[15px]">
              <div className="h-[42px] w-[185px] flex flex-row items-center justify-start">
                <h3 className="m-0 relative text-inherit font-bold font-roboto text-[24px]">
                  {title}
                </h3>
              </div>
              <div className="h-9 w-[200px] flex flex-row items-start justify-end py-0 px-2.5 box-border">
                <div
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer w-9 rounded-lg box-border flex flex-row items-center justify-center py-2 px-[7px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 bg-bgPrimary"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="self-stretch mt-4 h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />

            <div className="max-h-[400px] overflow-y-auto w-full">
              {cities &&
                cities.map((token, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-0 py-0 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer text-[14px]"
                    onClick={() => {
                      setCountry(token?.country);
                      setNewCountry(token);
                      setIsCity(false);
                      setIsTokenModalOpen(false);
                    }}
                  >
                    <div className="cursor-pointer w-full flex flex-col items-center justify-start gap-[10px] hover:text-rose-700 dark:hover:text-indigo-300 mt-[12px]">
                      <div className="self-stretch px-2 flex flex-row items-start justify-start gap-[8px] max-w-full">
                        <div className="flex flex-row items-center justify-center gap-4">
                          <img
                            className="h-[28px] w-[28px] relative rounded-full overflow-hidden shrink-0 object-cover"
                            src={token?.flag}
                            alt={token?.country}
                          />
                          <div className="w-full flex flex-row items-start text-[16px] justify-start">
                            <b className="relative">{token?.country}</b>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );

  const cashTx = (
    <>
      {isTokenModalOpen && (
        <div
          className={`self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full w-[375px] xl:w-[470px] 2xl:w-[600] mt-[-576px] lg:mt-[-640px]`}
        >
          <div className="flex-1 rounded-3xl bg-white dark:bg-app-container-dark text-chizzyblue dark:text-white font-montserrat box-border flex flex-col items-start justify-start max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-4 pb-8 h-[554px]">
            <div className="self-stretch flex flex-row items-start justify-between px-[15px]">
              <div className="h-[42px] w-[185px] flex flex-row items-center justify-start">
                {isCity ? (
                  <div className="flex flex-row gap-4">
                    <h3 className="m-0 relative text-inherit font-bold font-roboto text-[24px]">
                      {`Select City`}
                    </h3>
                    <div className="flex flex-row items-center justify-center">
                      <img
                        className="h-[32px] w-[32px] relative rounded-full overflow-hidden shrink-0 object-cover"
                        src={newCountry?.flag}
                        alt={newCountry?.country}
                      />
                    </div>
                  </div>
                ) : (
                  <h3 className="m-0 relative text-inherit font-bold font-roboto text-[24px]">
                    {title}
                  </h3>
                )}
              </div>
              {isCity ? (
                <div className="h-9 w-[200px] flex flex-row items-start justify-end py-0 px-2.5 box-border">
                  <div
                    className="text-white transition-transform duration-300 hover:scale-110 cursor-pointer w-9 rounded-lg box-border flex flex-row items-center justify-center py-2 px-[7px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 bg-bgPrimary"
                    onClick={() => {
                      setIsCity(false);
                    }}
                  >
                    <IoArrowBackOutline size={20} />
                  </div>
                </div>
              ) : (
                <div className="h-9 w-[200px] flex flex-row items-start justify-end py-0 px-2.5 box-border">
                  <div
                    className="transition-transform duration-300 hover:scale-110 cursor-pointer w-9 rounded-lg box-border flex flex-row items-center justify-center py-2 px-[7px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 bg-bgPrimary"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="self-stretch mt-4 h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />

            {!isCity && (
              <div className="max-h-[400px] overflow-y-auto w-full">
                {cities &&
                  cities.map((token, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-0 py-0 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer text-[14px]"
                      onClick={() => {
                        setCountry(token?.country);
                        setNewCountry(token);
                        setIsCity(true);
                        // setIsTokenModalOpen(false);
                      }}
                    >
                      {/* <div className="cursor-pointer w-full flex flex-col items-center justify-start gap-[10px] hover:text-rose-700 dark:hover:text-indigo-300 mt-[12px]">
                        <div className="self-stretch px-2 flex flex-row items-start justify-start gap-[8px] max-w-full">
                          <div className="flex flex-row items-center justify-center">
                            <img
                              className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                              src={token?.flag}
                              alt={token?.country}
                            />
                          </div>
                          <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                            <div className="self-stretch flex flex-row items-start justify-between">
                              <div className="w-[189.5px] flex flex-row items-start justify-start">
                                <b className="relative">{token?.country}</b>
                              </div>
                            </div>
                            <div className="self-stretch flex flex-row items-start justify-start">
                              <div className="relative">{token?.cities[0]}</div>
                            </div>
                          </div>
                        </div>


                        <div className="self-stretch h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />
                      </div> */}
                      <div className="cursor-pointer w-full flex flex-col items-center justify-start gap-[10px] hover:text-rose-700 dark:hover:text-indigo-300 mt-[12px]">
                        <div className="self-stretch px-2 flex flex-row items-start justify-start gap-[8px] max-w-full">
                          <div className="flex flex-row items-center justify-center gap-4">
                            <img
                              className="h-[28px] w-[28px] relative rounded-full overflow-hidden shrink-0 object-cover"
                              src={token?.flag}
                              alt={token?.country}
                            />
                            <div className="w-full flex flex-row items-start text-[16px] justify-start">
                              <b className="relative">{token?.country}</b>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {isCity && (
              <div className="max-h-[400px] overflow-y-auto w-full">
                {cityData &&
                  cityData.map((city, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-0 py-0 hover:bg-gray-100 dark:hover:bg-bgDarkMode cursor-pointer text-[14px]"
                      onClick={() => {
                        setCity(city);
                        setIsCity(false);
                        setIsTokenModalOpen(false);
                      }}
                    >
                      <div className="cursor-pointer w-full flex flex-col items-center justify-start gap-[20px] hover:text-rose-700 dark:hover:text-indigo-300 mt-[12px]">
                        <div className="self-stretch px-2 flex flex-row items-start justify-start gap-[8px] max-w-full">
                          <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                            <div className="self-stretch flex flex-row items-start justify-between">
                              <div className="w-[189.5px] flex flex-row items-start justify-start">
                                <b className="relative">{city}</b>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  return (
    <>
      {paymentMethod === "cash" && <>{cashTx}</>}
      {paymentMethod === "card" && <>{cardTx}</>}
    </>
  );
}
