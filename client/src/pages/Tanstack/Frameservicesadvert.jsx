import Serviceicon from './Serviceicon';
const Frameservicesadvert = (props) => {
  const { allWallets } = props;


  return (
    <div className="w-full h-full mt-[64px] overflow-auto text-gray-500 dark:text-white flex-col justify-start items-center gap-10 inline-flex">
        <div className="w-[70%] h-full p-6 flex-col justify-start items-start gap-6 flex overflow-y-auto">
      <div className="self-stretch text-start text-[27px] font-bold font-['Inter'] leading-9">
        Wallet Health Status
      </div>
      <div className="w-[440px] flex flex-row items-start justify-between max-w-full mq450:flex-wrap mq450:justify-center">
        <div className="flex flex-col gap-[80px] h-full">
          <Serviceicon
            serviceIcon="/btc.png"
            name="Bitcoin"
            status={allWallets?.statusBitcoin}
            max={allWallets?.fullBalanceBitcoin}
            latest={allWallets?.currentBalanceBitcoin}
          />
           <Serviceicon
            serviceIcon="/ethereum.png"
            name="Ethereum"
            status={allWallets?.statusEthereum}
            max={allWallets?.fullBalanceEthereum}
            latest={allWallets?.currentBalanceEthereum}
          />
         
          <Serviceicon
            serviceIcon="/tron.png"
            name="Tron"
            status={allWallets?.statusTron}
            max={allWallets?.fullBalanceTron}
            latest={allWallets?.currentBalanceTron}
          />
        </div>
        <div className="flex flex-col gap-[80px] h-full">
        <Serviceicon
            serviceIcon="/usdt-ethereum.png"
            name="USDT (Ethereum)"
            status={allWallets?.statusEthereumUSDT}
            max={allWallets?.fullBalanceEthereumUSDT}
            latest={allWallets?.currentBalanceEthereumUSDT}
          />
          <Serviceicon
            serviceIcon="/usdt-tron.png"
            status={allWallets?.statusTronUSDT}
            max={allWallets?.fullBalanceTronUSDT}
            latest={allWallets?.currentBalanceTronUSDT}
          />
        </div>
        {/* percentage bar starts */}
        <div className="h-[150px] flex flex-col items-start justify-start gap-[9px]">
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#312E81] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">Full</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#1E40AF] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">High</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#2563EB] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">Medium</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#60A5FA] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">Low</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#BFDBFE] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">Critical</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#DBEAFE] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            <div className="relative">Empty</div>
          </div>
        </div>
        {/* percentage bar ends */}
      </div>
      </div>
    </div>
  );
};

export default Frameservicesadvert;
