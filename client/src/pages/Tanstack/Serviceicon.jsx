const Serviceicon = ({ serviceIcon, name, status, max, latest }) => {
  return (
    <div className="w-[440px] h-[280px] flex flex-row items-start justify-start max-w-full text-left text-sm text-gray-500 dark:text-white font-title">
      <div className="self-stretch w-[280px] rounded-lg bg-white dark:bg-[#161621] overflow-hidden shrink-0 flex flex-col items-center justify-end py-[45px] px-[25px] box-border relative">

        <img
          className="w-[60px] h-[60px] absolute my-0 mx-[!important] top-[45.5px] left-[25px] rounded-xl overflow-hidden shrink-0 object-cover"
          loading="eager"
          alt=""
          src={serviceIcon}
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-[10px]">
          <h2 className="m-0 h-[29px] relative text-5xl font-extrabold font-inherit inline-block mq450:text-lgi">
            {name}
          </h2>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <div className="relative">{`Status: ${status}`}</div>
            {status === 'full' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#312E81] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
            {status === 'high' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#1E40AF] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
            {status === 'medium' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#2563EB] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
            {status === 'low' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#60A5FA] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
            {status === 'critical' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#BFDBFE] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
            {status === 'empty' && (
              <div className="h-[17px] w-[17px] relative rounded-[3px] bg-[#DBEAFE] box-border overflow-hidden shrink-0 border-[1px] border-solid border-lightslategray-300" />
            )}
          </div>
          <div className="self-stretch relative">{`Max: ${max}`}</div>
          <div className="self-stretch relative">{`Latest: ${latest}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Serviceicon;
