import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';

export default function SendEmail() {
  const [email, setEmail] = useState('');


  const transition = { type: 'ease', ease: 'easeInOut', duration: 0.4 };
  const bounds = {
    height: 20,
  };


  return (
    <div className="flex flex-row items-start h-screen">
      <MotionConfig transition={transition}>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-2">
          <div className="">Send email</div>
          <div className="mt-[24px] xl:mt-[64px] flex justify-center rounded-lg bg-white dark:bg-background-dark text-black dark:text-gray-100 shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] xl:w-[500px] p-4">
          <motion.div
            animate={{ height: 0 }}
            // animate={{ height: bounds.height > 0 ? bounds.height : null }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
          >
            <div className="">
              <AnimatePresence mode="popLayout">
              </AnimatePresence>
            </div>
          </motion.div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px] xl:gap-[12px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div className="text-[18px] xl:text-[24px] font-extrabold leading-[32px] inline-block">
                Forgot Password
              </div>

              <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#130D1A"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex bg-lightslategray-300 w-full h-px" />
          </div>
          
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col mb-4 h-[48px] bg-white dark:bg-background-dark rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="email"
                name="email"
                type="email"
                className="ml-2 text-[16px] xl:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block outline-none bg-white dark:bg-background-dark"
                placeholder="your@email.com"
                value={setEmail}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              
            </div>
            <div className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                // onClick={handleSubmit}
              >
               {'Get Reset Email'}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-end">
            <div className="text-smi leading-[22px] text-gray-300 dark:text-gray-500 inline-block">
              {'Remember your email and password?'}
            </div>
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
             
            >
              Login!
            </div>
          </div>

          <div className="flex flex-row w-full" />
        </div>
    </div>
        </div>
      </div>
    </MotionConfig>
      </div>
    
    // <div className="flex flex-row items-start h-screen">

    // </div>
  );
}
