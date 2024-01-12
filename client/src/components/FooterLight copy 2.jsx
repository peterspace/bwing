const FooterLight = () => {
  return (
    <div className="h-[960px] overflow-hidden text-left text-xl text-gray-900 dark:text-gray-200">
      <div className="bottom-[0px] flex flex-col items-start justify-start p-5 box-border gap-[20px]">
        <div className="flex flex-row items-center justify-center text-13xl">
          <div className="relative font-medium text-gray-900 dark:text-gray-100">
            Blendery
          </div>
        </div>

        {/* <div className="self-stretch bg-lightslategray-300 overflow-hidden" /> */}
      <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" />

        <div className="flex flex-col items-start justify-start gap-[10px]">
          <div className="relative font-medium inline-block h-[35px] shrink-0 text-gray-900 dark:text-gray-100">
            EXCHANGE PAIRS
          </div>
          {/* EXCHANGE STARTS */}
          <div className="flex flex-row items-start justify-start gap-[40px] text-sm font-roboto">
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
              <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-[19px] h-5"
                  alt=""
                  src="/exchangedirection.svg"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
            </div>
          </div>
          {/* EXCHANGE ENDS */}
        </div>
        {/* <div className="self-stretch bg-lightslategray-300 overflow-hidden" /> */}
      <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" />

        <div className="flex flex-col items-start justify-start gap-[10px]">
          <div className="relative font-medium inline-block h-[35px] shrink-0 text-gray-900 dark:text-gray-100">
            BUY PAIRS
          </div>
          {/* BUY STARTS */}
          <div className="flex flex-row items-start justify-start gap-[40px] text-sm font-roboto">
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
              </div>
            </div>
          </div>
          {/* BUY ENDS*/}
        </div>
        {/* <div className="self-stretch bg-lightslategray-300 overflow-hidden" /> */}
      <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" />

        <div className="flex flex-col items-start justify-start gap-[10px]">
          <div className="relative font-medium inline-block h-[35px] shrink-0 text-gray-900 dark:text-gray-100">
            SELL PAIRS
          </div>
          {/* SELL STARTS */}

          <div className="flex flex-row items-end justify-start gap-[20px] text-sm font-roboto">
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/btc.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">BTC</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">ETH</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">TRX</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-ethereum.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Ethereum)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start gap-[4px]">
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usa.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USD</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uk.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">GBP</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/russia.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">RUB</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/eu.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">EUR</div>
                </div>
              </div>
               <div className="flex flex-row items-start justify-start gap-[5px]" onClick={''}>
                <div className="relative w-[35px] h-5">
                  <img
                    className="absolute top-[0px] left-[0px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/usdt-tron.png"
                  />
                  <img
                    className="absolute top-[0px] left-[15px] rounded-full w-5 h-5 overflow-hidden object-cover"
                    alt=""
                    src="/uae.png"
                  />
                </div>
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">USDT (Tron)</div>
                </div>
                <img
                  className="relative w-5 h-5 object-contain"
                  alt=""
                  src="/arrowgroup@2x.png"
                />
                <div className="h-5 flex flex-row items-center justify-center py-px px-0 box-border">
                  <div className="relative">AED</div>
                </div>
              </div>
            </div>
          </div>
          {/* SELL ENDS*/}
        </div>
        {/* <div className="self-stretch bg-lightslategray-300 overflow-hidden" /> */}
      <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" />

        <div className="self-stretch flex flex-col items-end justify-start gap-[10px] text-sm font-medium text-gray-900 dark:text-gray-100 font-roboto">
          <div className="self-stretch relative h-5">
            <div className="absolute top-[0px] left-[70px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">Legal</div>
            </div>
            <div className="absolute top-[0px] left-[125px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">Terms of Use</div>
            </div>
            <div className="absolute top-[0px] left-[0px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">Support</div>
            </div>
            <div className="absolute top-[0px] left-[229px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">Privacy Policy</div>
            </div>
            <div className="absolute top-[0px] left-[337px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">AML/KYC</div>
            </div>
            <div className="absolute top-[0px] left-[418px] h-5 flex flex-row items-center justify-center py-px px-0 box-border">
              <div className="relative">FAQ</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center text-right text-smi text-gray-500 dark:text-gray-200">
            <div className="relative leading-[16.1px]">© Blendery 2024</div>
          </div>
        </div>
      </div>
      {/* <div className="absolute top-[187px] bg-lightslategray-300 w-[1440px] overflow-hidden" /> */}
      {/* <div className="flex bg-lightslategray-300 h-px mt-11" /> */}
      {/* <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" /> */}

    </div>
  );
};

export default FooterLight;
