import React from 'react';

export default function TokenList() {
  return (
    <div className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full mt-[-476px] w-[375px] xl:w-[470px] 2xl:w-[600]">
      {/* <div className="flex-1 rounded-3xl bg-gray-100 box-border flex flex-col items-start justify-start pt-4 px-[15px] pb-8 gap-[24px] max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-[496px] pb-[21px] box-border"> */}
      <div className="flex-1 rounded-3xl bg-white dark:bg-chizzy text-chizzyblue dark:text-white font-montserrat box-border flex flex-col items-start justify-start px-[15px] gap-[24px] max-w-full z-[1] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200 pt-[496px] pb-[21px]">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] flex-wrap">
          <div className="h-[42px] w-[185px] flex flex-row items-center justify-start">
            <h3 className="m-0 relative text-inherit font-bold font-roboto text-[24px]">
              Token List
            </h3>
          </div>
          <div className="h-9 w-[200px] flex flex-row items-start justify-end py-0 px-2.5 box-border">
            <div className="w-9 rounded-lg box-border flex flex-row items-center justify-center py-2 px-[7px] border-[1px] border-solid border-lightslategray-300 dark:border-lightslategray-200">
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
              className="w-11 [border:none] [outline:none] bg-[transparent] h-10 flex flex-row items-center justify-center py-3 px-0 box-border font-roboto text-sm text-gray-500"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <div className="self-stretch h-[316px] overflow-auto shrink-0 flex flex-col items-center justify-start gap-[12px] max-w-full text-base">
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[42px] w-[42px] relative rounded-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="/usdt-ethereum.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start min-w-[246px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[0px] [row-gap:20px] flex-wrap">
                  <div className="w-[189.5px] flex flex-row items-start justify-start">
                    <b className="relative">BTC</b>
                  </div>
                  <div className="w-[189.5px] flex flex-row items-start justify-end text-gray-500">
                    <div className="relative">Bitcoin</div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="relative">Bitcoin</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-500 overflow-hidden shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
