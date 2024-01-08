import TokenButtonLight from './TokenButtonLight';
import { useAccount, useDisconnect } from 'wagmi';
import { IoMdSettings } from 'react-icons/io';
import { TbLogout2 } from 'react-icons/tb';

//bg-exchange-rate-dark bg-opacity-20
const ServiceHeaderDefi = (props) => {
  const { subService, image, symbol, name, openModal, openSlippageModal } =
    props;

  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="h-[42px] flex flex-row items-center justify-start py-0 px-4 box-border gap-[32px] text-left text-5xl text-gray-900 dark:text-white font-roboto self-stretch">
      <div className="flex-1 relative text-gray-500  leading-[28px]">
        {subService}
      </div>
      <div className="flex flex-row">
        <div
          className="cursor-pointer flex flex-row justify-center items-center hover:opacity-90 text-white rounded p-2"
          onClick={openSlippageModal}
        >
          <IoMdSettings size={24} color="#4f46e5" />
        </div>
        {isConnected && (
          <div
            className="cursor-pointer flex flex-row justify-center items-center hover:opacity-90 text-white rounded p-2"
            onClick={() => {
              disconnect();
            }}
          >
            <TbLogout2 size={24} color="#4f46e5" />
          </div>
        )}
      </div>
      <div className="" onClick={openModal}>
        <TokenButtonLight
          image={image}
          symbol={symbol && symbol.toUpperCase()}
        />
      </div>
    </div>
  );
};

export default ServiceHeaderDefi;
