import { Elipse } from '../../assets/mints';

const FlashlightBg = () => {
  return (
    // <div className="w-full h-[960px] relative bg-background-dark dark:background-dark overflow-hidden flex flex-col items-center justify-start tracking-[normal]">
    <div className="w-full h-screen relative bg-white dark:bg-background-dark overflow-hidden flex flex-col items-center justify-start tracking-[normal]">
      <main className="self-stretch h-[960px] flex flex-col items-center justify-start max-w-full">
        <div className="w-[756px] h-[429px] flex flex-col items-center justify-center pt-10 px-5 pb-0 box-border max-w-full">
          <div className="w-[553px] flex-1 relative flex items-center justify-center mt-[300px]">
            <span className="flex flex-row justify-center rotate-12 z-10">
              {/* <Elipse className="fill-indigo-300 dark:fill-indigo-700 w-[1294px] h-[1109px]" /> */}
              <Elipse className="fill-indigo-300 dark:fill-indigo-700 w-[1294px] h-[1109px]" />
              {/* <Elipse className="fill-indigo-300 dark:fill-indigo-800 dark:opacity-50 w-[1294px] h-[1109px]" /> */}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashlightBg;
