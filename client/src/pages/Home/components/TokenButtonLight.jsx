
const TokenButtonLight = ({
  image,
  symbol,
}) => {


  return (
    <div
      // className="cursor-pointer rounded-xl bg-gray-100 dark:bg-button-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px] text-left text-5xl text-gray-900 dark:text-silver font-roboto"
      className="cursor-pointer rounded-xl bg-chizzySnow dark:bg-button-dark overflow-hidden flex flex-row items-center justify-start py-1 px-3 gap-[8px] text-left input-icon text-gray-900 dark:text-silver font-roboto"
    >
      <img
        className="relative rounded-341xl w-5 h-5 overflow-hidden shrink-0 object-cover"
        alt=""
        src={image}
      />
      <div
        className="relative"
      >
        {symbol}
      </div>
      <img
        className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
        alt=""
        src="/chevrondown@2x.png"
      />
    </div>
  );
};

export default TokenButtonLight;
