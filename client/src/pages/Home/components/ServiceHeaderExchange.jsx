import TokenButtonLight from './TokenButtonLight';
//bg-exchange-rate-dark bg-opacity-20
const ServiceHeaderExchange = (props) => {
  const { subService, image, symbol, name, openModal } = props;

  return (
    <div
      className="h-[42px] flex flex-row items-center justify-start py-0 px-4 box-border gap-[32px] text-left text-5xl text-gray-900 dark:text-white font-roboto self-stretch"
      onClick={openModal}
    >
      <div className="flex-1 relative text-gray-500 leading-[28px]">
        {subService}
      </div>
      {/* <TokenButtonLight image={image} symbol={symbol} /> */}
    </div>
  );
};

export default ServiceHeaderExchange;
