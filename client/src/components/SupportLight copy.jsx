const SupportLight = () => {
  return (
    <div className="relative bg-white dark:bg-gray-400 w-full h-[960px] overflow-hidden text-left text-xs text-gray-500 font-roboto">
      <div className="absolute top-[calc(50%_-_400px)] left-[calc(50%_-_193px)] rounded-lg bg-white dark:bg-gray-400 overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray">
        <div className="rounded-lg bg-white dark:bg-gray-400 w-[375px] overflow-hidden flex flex-col items-center justify-start p-2.5 box-border gap-[20px]">
          <div className="self-stretch overflow-hidden flex flex-row items-start justify-between py-0 px-2.5 text-right text-5xl text-text-light-main">
            <div className="flex-1 h-[45px] flex flex-col items-start justify-start">
              <b className="self-stretch relative leading-[28px] dark:text-white">John Doe</b>
              <div className="self-stretch relative text-sm font-montserrat text-slategray">
                johndoe@gmail.com
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start pt-2.5 px-2.5 pb-[15px] text-right text-xl text-slategray dark:text-white border-[1px] border-solid border-lightslategray">
            <div className="self-stretch rounded-lg bg-chizzySnow dark:bg-darkslategray-100 overflow-hidden flex flex-row items-center justify-center py-[11px] px-3">
              <div className="relative">Submit a ticket</div>
            </div>
          </div>
          <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative leading-[28px] inline-block w-[167px]">
              <span>{`Service `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <div className="rounded-xl bg-chizzySnow dark:bg-darkslategray-100 overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver">
              <div className="relative">Buy</div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          </div>
          <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative leading-[28px] inline-block w-[167px]">
              <span>{`Sub-Service `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <div className="rounded-xl bg-chizzySnow dark:bg-darkslategray-100 overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver">
              <div className="relative">Cash</div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          </div>
          <div className="w-[375px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[10px]">
            <b className="relative leading-[28px] inline-block w-[167px]">
              <span>{`Subject `}</span>
              <span className="text-rose-600">*</span>
            </b>
            <div className="rounded-xl bg-chizzySnow dark:bg-darkslategray-100 overflow-hidden flex flex-row items-center justify-start h-[30px] px-3 gap-[8px] text-gray-200 dark:text-silver">
              <div className="relative">Payment pending</div>
              <img
                className="relative w-4 h-4 overflow-hidden shrink-0"
                alt=""
                src="/chevrondown.svg"
              />
            </div>
          </div>
          <div className="self-stretch relative bg-rose-600 h-px overflow-hidden shrink-0" />
          <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray">
            <b className="relative leading-[28px] inline-block w-[167px]">
              Order No
            </b>
            <div className="self-stretch flex flex-row items-start justify-start py-[5px] px-0 gap-[10px] text-sm text-slategray">
              <img className="relative w-5 h-5" alt="" src="/purpose.svg" />
              <div className="self-stretch flex flex-row items-center justify-center">
                <div className="relative font-medium">K32405</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-chizzySnow dark:bg-gray-1000 box-border w-[363px] h-[120px] flex flex-col items-start justify-start py-0 px-2.5 gap-[10px] border-[1px] border-solid border-lightslategray">
            <b className="relative leading-[28px] inline-block w-[167px]">
              Comment
            </b>
            <div className="self-stretch flex flex-row items-start justify-start gap-[10px] text-sm text-slategray">
              <img className="relative w-5 h-5" alt="" src="/comment.svg" />
              <div className="self-stretch flex-1 flex flex-row items-center justify-center">
                <div className="flex-1 relative font-medium">
                  Please describe the issue
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg box-border w-[363px] flex flex-row items-start justify-start py-0 px-2.5 gap-[5px] text-sm text-slategray border-[1px] border-solid border-lightslategray">
            <img className="relative w-6 h-10" alt="" src="/iconeattach.svg" />
            <div className="relative w-px h-10">
              <div className="absolute top-[calc(50%_-_10px)] left-[calc(50%_-_0.5px)] bg-rose-600 w-px h-5 overflow-hidden" />
            </div>
            <div className="h-10 flex flex-row items-center justify-center">
              <div className="relative">Attach file</div>
            </div>
          </div>
          <div className="relative bg-rose-600 w-[355px] h-px overflow-hidden shrink-0" />
          <div className="self-stretch rounded-lg bg-blueviolet h-10 flex flex-row items-center justify-center py-2 px-4 box-border text-center text-xl text-white">
            <div className="flex-1 relative">Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportLight;
