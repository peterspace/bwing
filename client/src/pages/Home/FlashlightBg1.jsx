import { Elipse } from '../../assets/mints';

const FlashlightBg = () => {
  return (
    // <div className="w-full h-[960px] relative bg-background-dark dark:background-dark overflow-hidden flex flex-col items-center justify-start tracking-[normal]">
    <div className="w-full h-screen relative bg-background-dark dark:background-dark overflow-hidden flex flex-col items-center justify-start tracking-[normal]">
      <main className="self-stretch h-[960px] flex flex-col items-center justify-start max-w-full">
        <div className="w-[756px] h-[429px] flex flex-col items-center justify-center pt-10 px-5 pb-0 box-border max-w-full">
          <div className="w-[553px] flex-1 relative flex items-center justify-center">
            {/* <img
                className="w-full flex-1 max-h-full max-w-full object-contain absolute left-[0px] top-[160px] h-full [transform:scale(2.302)]"
                loading="lazy"
                alt=""
                src="/flashlight.svg"
              /> */}
            <span className="flex flex-row justify-center rotate-12 z-10">
              <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashlightBg;
