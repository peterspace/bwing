const RatesLocalModel = (props) => {
  const {
    fToken,
    tToken,
    fValue,
    fTitle,
    tTitle,
    transactionRates,
    loadingExchangeRate,
  } = props;

  const youSend = transactionRates ? transactionRates?.youSend : 0;
  const youGet = transactionRates ? transactionRates?.youGet : 0;
  const processingFee = transactionRates ? transactionRates?.processingFee : 0;
  const networkFee = transactionRates ? transactionRates?.networkFee : 0;
  const serviceFee = transactionRates ? transactionRates?.serviceFee : 0;
  const tValue = transactionRates ? transactionRates?.tValueFormatted : 0;
  const exchangeRate = transactionRates ? transactionRates?.exchangeRate : 0;
  const directValue = transactionRates ? transactionRates?.directValue : 0;

  return (
    <div className="flex flex-col items-start justify-start text-left text-xs text-gray-500 font-roboto">
      <div className="card-gradient rounded-lg">
        <div className="rounded-lg bg-chizzySnow dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray-300">
          <div className="flex flex-col items-start justify-start">
            {/* You’ll send */}
            <div className="self-stretch rounded-lg bg-white dark:bg-gray-1000 flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] gap-[5px]">
              <b className="relative leading-[28px] inline-block w-[167px]">
                {fTitle}
              </b>
              <div className="self-stretch flex flex-row items-start justify-start text-gray-200 dark:dark:text-silver">
                <div className="flex-1 flex flex-row items-start justify-between">
                  <div className="rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px]">
                    <img
                      className="relative rounded-full w-5 h-5 overflow-hidden shrink-0 object-cover"
                      alt=""
                      src={fToken?.image}
                    />
                    <div className="relative">
                      {fToken?.symbol.toUpperCase()}
                    </div>
                    <img
                      className="relative w-4 h-4 overflow-hidden shrink-0 hidden"
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5 text-sm text-gray-500 border-[1px] border-solid border-lightslategray-300">
                    <div className="relative font-medium">{fValue}</div>
                  </div>
                </div>
              </div>
            </div>
            {/*  Stages*/}

            <div className="self-stretch flex flex-row items-start justify-between py-0 pr-0 pl-[19px] text-sm text-gray-500">
              <div className="relative w-[21px] h-[150px]">
                <div className="absolute top-[0px] left-[10px] bg-white dark:bg-gray-1000 w-0.5 h-[150px] overflow-hidden" />
                <div className="absolute top-[15px] left-[1px] flex flex-col items-start justify-start gap-[30px]">
                  <div className="flex rounded-full bg-white dark:bg-gray-900">
                    <img
                      className="relative rounded-full w-5 h-5"
                      alt=""
                      src="/icon-exchange.svg"
                    />
                  </div>
                  <div className="flex rounded-full bg-white dark:bg-gray-900">
                    <img
                      className="relative rounded-full w-5 h-5"
                      alt=""
                      src="/icon-service.svg"
                    />
                  </div>
                  <div className="flex rounded-full bg-white dark:bg-gray-900">
                    <img
                      className="relative rounded-full w-5 h-5"
                      alt=""
                      src="/icon-network.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-[323px] h-[150px]">
                <div className="absolute top-[calc(50%_-_59px)] left-[0px] w-[323px] h-[118px]">
                  <div className="absolute top-[0px] left-[0px] w-[323px] flex flex-row items-start justify-start">
                    <div className="flex-1 flex flex-row items-start justify-between">
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">Rate</div>
                      </div>
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">
                          {directValue}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[51px] left-[0px] w-[323px] flex flex-row items-start justify-start">
                    <div className="flex-1 flex flex-row items-start justify-between">
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">{`Service fee (0.25%)`}</div>
                      </div>
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">
                          {serviceFee} {tToken?.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[102px] left-[0px] w-[323px] flex flex-row items-start justify-start">
                    <div className="flex-1 flex flex-row items-start justify-between">
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">Network fee</div>
                      </div>
                      <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5">
                        <div className="relative font-medium">
                          {networkFee} {tToken?.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  You’ll get*/}
            <div className="self-stretch rounded-lg bg-white dark:bg-gray-1000 flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] gap-[5px]">
              <b className="relative leading-[28px] inline-block w-[167px]">
                {tTitle}
              </b>
              <div className="self-stretch flex flex-row items-start justify-start text-gray-200 dark:text-silver">
                <div className="flex-1 flex flex-row items-start justify-between">
                  <div className="rounded-xl bg-chizzySnow dark:bg-exchange-rate-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px]">
                    <img
                      className="relative rounded-full w-5 h-5 overflow-hidden shrink-0 object-cover"
                      alt=""
                      src={tToken?.image}
                    />
                    <div className="relative">
                      {tToken?.symbol.toUpperCase()}
                    </div>
                    <img
                      className="relative w-4 h-4 overflow-hidden shrink-0 hidden"
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  <div className="self-stretch rounded-lg flex flex-row items-center justify-center py-0 px-5 text-sm text-gray-500 border-[1px] border-solid border-lightslategray-300">
                    <div className="relative font-medium">{tValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatesLocalModel;
