import React from 'react';
import { useEffect, useState } from 'react';

export default function TokenList(props) {
  const {
    filteredTokens,
    setToken,
    allTokens,
    service,
    isTokenModalOpen,
    setIsTokenModalOpen,
    isNotCrypto,
    title,
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [tokensList, setTokensList] = useState([]);

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

  const setTokenChainBg = (tokenChain) => {
    switch (tokenChain) {
      case 'Bitcoin':
        return 'text-[#FFBC6C]';
      case 'Tron':
        return 'text-[#3EDFAD]';
      case 'Ethereum':
        return 'text-[#B3C2FF]';
      case 'Binance':
        return 'text-[#FBD953]';
      case 'Polygon':
        return 'text-[#D9B9FF]';
      case 'Arbitrum':
        return 'text-[#C1DAFF]';
      case 'Optimism':
        return 'text-[#FF9993]';
      default:
        return;
    }
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
          // className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full mt-[-476px] w-[375px] xl:w-[470px] 2xl:w-[600]"
          //   className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full mt-[-596px] w-[375px] xl:w-[470px] 2xl:w-[600]"
          className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full mt-[-536px] w-[375px] xl:w-[470px] 2xl:w-[600]"
        >
          <div className="flex-1 rounded-3xl bg-white dark:bg-chizzy text-chizzyblue dark:text-white font-montserrat box-border flex flex-col items-start justify-start px-[15px] gap-[24px] max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-4 pb-8 h-[554px]">
            <div className="self-stretch flex flex-row items-start justify-between gap-[20px] flex-wrap">
              <div className="h-[42px] w-[185px] flex flex-row items-center justify-start">
                <h3 className="m-0 relative text-inherit font-bold font-roboto text-[24px]">
                  {title}
                </h3>
              </div>
              <div className="h-9 w-[200px] flex flex-row items-start justify-end py-0 px-2.5 box-border">
                <div
                  className="transition-transform duration-300 hover:scale-110 cursor-pointer w-9 rounded-lg box-border flex flex-row items-center justify-center py-2 px-[7px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200"
                  onClick={closeModal}
                >
                  <img
                    className="h-5 w-5 relative"
                    loading="lazy"
                    alt=""
                    src="/return1.svg"
                  />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch rounded-lg flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 flex-wrap">
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
                  //  className="w-full pl-10 pr-2 rounded-lg text-slate-800 dark:text-gray-600 bg-white dark:bg-background-dark border border-solid border-lightslategray-300 dark:border-lightslategray-300 h-[44px] focus:outline-none"
                  className="w-11 [border:none] [outline:none] bg-[transparent] h-10 flex flex-row items-center justify-center py-3 px-0 box-border font-roboto text-sm text-gray-500"
                  placeholder="Search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="self-stretch h-[316px] overflow-auto shrink-0 flex flex-col items-center justify-start gap-[12px] max-w-full text-base">
              {tokensList?.map((token, i) => (
                <div
                  key={i}
                  className="w-full flex flex-col items-center justify-start gap-[10px]"
                  onClick={() => {
                    setToken(token);
                    setIsTokenModalOpen(false);
                  }}
                >
                  <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
                    <div className="flex flex-row items-center justify-center">
                      <img
                        className="h-[42px] w-[42px] relative rounded-737xl overflow-hidden shrink-0 object-cover"
                        src={token?.image}
                        alt={token?.symbol}
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                      <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                        <div className="w-[189.5px] flex flex-row items-start justify-start">
                          <b className="relative">
                            {token?.symbol.toUpperCase()}
                          </b>
                        </div>
                        <div
                          className={`w-[189.5px] flex flex-row items-start justify-end text-gray-500 
               ${setTokenChainBg(token?.chain)}
             `}
                        >
                          <div className="relative"> {token?.chain}</div>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-row items-start justify-start">
                        <div className="relative">{token?.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
