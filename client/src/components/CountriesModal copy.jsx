import React from 'react';
import { useEffect, useState } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [tokensList, setTokensList] = useState([]);
  const modeL = localStorage.getItem('mode')
    ? JSON.parse(localStorage.getItem('mode'))
    : false;

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
  return (
    <>
      {isTokenModalOpen && (
        <div
          className={`self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full w-[375px] lg:w-[470px] 2xl:w-[600] mt-[-576px] lg:mt-[-640px]`}
        >
          <div className="flex-1 rounded-3xl bg-white dark:bg-app-container-dark text-chizzyblue dark:text-white font-montserrat box-border flex flex-col items-start justify-start px-[15px] gap-[24px] max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-4 pb-8 h-[554px]">
            <div className="self-stretch flex flex-row items-start justify-between">
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
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch rounded-lg flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
                <div className="h-10 flex flex-row items-center justify-center">
                  <img
                    className="h-5 w-5 relative overflow-hidden shrink-0"
                    alt=""
                    src="/search.svg"
                  />
                </div>
                <div className="h-10 w-px relative">
                  <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_0.5px)] bg-gray-500 w-px h-5 overflow-hidden" />
                </div>
                <input
                  className="w-full [border:none] [outline:none] bg-[transparent] h-10 flex flex-row items-center justify-center py-3 px-0 box-border font-roboto text-sm text-gray-500"
                  placeholder="Search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="self-stretch h-[316px] overflow-auto shrink-0 flex flex-col items-center justify-start max-w-full text-base">
              {cities &&
                cities.map((token, i) => (
                  <div
                    key={i}
                    className="cursor-pointer w-full flex flex-col items-center justify-start gap-[10px] hover:text-rose-700 dark:hover:text-indigo-300 mt-[12px]"
                    onClick={() => {
                      setCountry(token?.country);
                      setCity(token?.cities[0]);
                      setIsTokenModalOpen(false);
                    }}
                  >
                    <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
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
                          {/* <div
                          className={`w-[189.5px] flex flex-row items-start justify-end text-gray-500`}
                        >
                          <div className="relative"> {token?.cities[0]}</div>
                        </div> */}
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start">
                          <div className="relative">{token?.cities[0]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-px bg-lightslategray-300 dark:bg-gray-500 overflow-hidden shrink-0" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
