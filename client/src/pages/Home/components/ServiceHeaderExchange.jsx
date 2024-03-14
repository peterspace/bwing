
const ServiceHeaderExchange = (props) => {
  const { subService, image, symbol, name, openModal } = props;

  return (
    <div
      className="h-[42px] flex flex-row items-center justify-start py-0 px-4 box-border gap-[32px] text-left input-icon text-gray-900 dark:text-white font-roboto self-stretch"
      onClick={openModal}
    >
      <div className="flex-1 relative text-gray-500 leading-[28px]">
        {subService}
      </div>
    </div>
  );
};

export default ServiceHeaderExchange;
