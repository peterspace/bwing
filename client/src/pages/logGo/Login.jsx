import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  hasMessage,
  successMessage,
} from '../../redux/features/messages/messageSlice';

import {
  BNB,
  MATIC,
  ETH1,
  AAVE,
  BAY,
  AVAX,
  BCN,
  BCH,
  Flashlight,
  Flashlight1,
  Elipse,
  ElipseScreen,
} from '../../assets/mints';
import { AnimatePresence, motion } from 'framer-motion';
import Register from './Register';
import LoginComponent from './LoginComponent';
import Forgot from './Forgot';

const options = ['Sign in', 'Sign up', 'forgotPassword'];

const Login = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const hasMsg = useSelector(hasMessage);
  const successMsg = useSelector(successMessage);
  return (
    <div className="relative h-screen flex flex-col">
       {/* <span className="flex flex-row justify-center rotate-12 z-10">
        <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
      </span> */}
      <span className="absolute bottom-[45%] left-[20%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <BNB className="fill-gray-300" />
      </span>
      <>
       {/* <span className="absolute top-[10%] left-[20%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <Flashlight1 className="fill-gray-300" />
      </span>
      <span className="absolute top-[20%] left-[40%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <Flashlight className="fill-gray-300" />
      </span> */}
      </>
     
      <>
      {/* <span className="absolute top-[0%] left-[50%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <Elipse className="fill-[#4B2C7E] dark:fill-red-600 w-[1294px] h-[1109px]" />
      </span>
      <span className="absolute top-[0%] left-[50%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <Elipse className="fill-[#4B2C7E] dark:fill-red-600 w-[1294px] h-[1109px]" />
      </span> */}
      </>
      
      {/* <span className="absolute top-[0%] left-[50%] w-[48px] h-[48px] rotate-12">
        <Elipse className="fill-[#4B2C7E] dark:fill-[#4B2C7E] w-[1294px] h-[1109px]" />
      </span> */}
      {/* <span className="absolute top-[5%] right-[40%] w-[48px] h-[48px] rotate-12">
        <ElipseScreen className="fill-[#4B2C7E] dark:fill-red-600 w-[1294px] h-[1109px]" />
      </span> */}
      {/* <span className="absolute top-[5%] right-[40%] w-[48px] h-[48px] rotate-12 animate-pulse">
        <Elipse className="fill-gray-300" />
      </span> */}
      <span className="absolute bottom-[40%] left-[10%] w-[32px] h-[32px]">
        <MATIC className="fill-gray-300" />
      </span>
      <span className="absolute bottom-[55%] left-[15%] w-[24px] h-[24px]">
        <ETH1 className="fill-gray-300" />
      </span>

      {/* SVGs right*/}
      <span className="absolute bottom-[45%] right-[20%] w-[32px] h-[32px] rotate-12">
        <BCN className="fill-gray-300" />
      </span>
      <span className="absolute bottom-[40%] right-[10%] w-[48px] h-[48px]">
        <AVAX className="fill-gray-300" />
      </span>
      <span className="absolute bottom-[55%] right-[15%] w-[24px] h-[24px] animate-pulse">
        <BCH className="fill-gray-300" />
      </span>

      <section className="relative my-auto mx-auto">
        <span className="absolute top-[-3.5%] right-[-4%] w-[48px] h-[48px] z-10">
          <ETH1 className="fill-rose-600" />
        </span>
        <span className="absolute bottom-[20%] right-[-4%] w-[48px] h-[48px] z-10">
          <MATIC className="fill-rose-400" />
        </span>
        {/* <span className="absolute bottom-[-6%] left-[10%] w-[48px] h-[48px] z-30">
					<AAVE className="fill-rose-500" />
				</span> */}
        <span className="absolute top-[-4%] left-[-2%] w-[32px] h-[32px] rotate-45 z-30">
          <BAY className="fill-rose-600" />
        </span>

      
        <div className="relative flex flex-row rounded-lg shadow-md z-20">
          <img
            src={'./loginframe.jpg'}
            alt="splash"
            className="hidden sm:flex max-w-[300px] max-h-[400px] object-cover rounded-tl-lg rounded-bl-lg"
          />
          <AnimatePresence>
            {hasMsg && successMsg !== '' ? (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                exit={{ width: 0 }}
                className={`px-6 flex rounded-tr-lg overflow-clip bg-gray-50 dark:bg-slate-gradient`}
              >
                <span className="mx-auto px-2 my-auto text-2xl rounded-md success whitespace-nowrap">
                  {successMsg}
                </span>
              </motion.div>
            ) : (
              <motion.section
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                exit={{ width: 0 }}
                transition={{ delay: 1 }}
                className={`flex flex-col gap-0 justify-center items-center overflow-clip rounded-tr-lg rounded-br-lg bg-gray-50 dark:bg-slate-gradient`}
              >
                <div className="mt-6 h-full w-full flex flex-col gap-2">
                  <h2 className="mx-auto typography font-semibold text-2xl">
                    {/* {selectedOption === options[0] ? 'Login' : 'Register'} */}
                    {selectedOption === options[0] && 'Login'}
                    {selectedOption === options[1] && 'Register'}
                    {selectedOption === options[2] && 'Forgot Password'}
                  </h2>
                  <div className="mb-6 w-full flex">
                    <div className="mx-10 w-full h-[1px] bg-neutral-200" />
                  </div>
                  <AnimatePresence>
                    {selectedOption === 'Sign in' && <LoginComponent />}
                    {selectedOption === 'Sign up' && <Register />}
                    {selectedOption === 'forgotPassword' && <Forgot />}
                  </AnimatePresence>
                </div>
                {selectedOption === options[0] && (
                  <div className="mt-auto mb-6 px-10 w-full flex flex-row justify-between text-xs text-blue-600 cursor-default">
                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[2])}
                    >
                      {`Forgot Password?`}
                    </span>

                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[1])}
                    >
                      {`Register`}
                    </span>
                  </div>
                )}
                {selectedOption === options[1] && (
                  <div className="mt-auto mb-6 px-10 w-full flex flex-row justify-between text-xs text-blue-600">
                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[2])}
                    >
                      {`Forgot Password?`}
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[0])}
                    >
                      Login
                    </span>
                  </div>
                )}
                {selectedOption === options[2] && (
                  <div className="mt-auto mb-6 px-10 w-full flex flex-row justify-between text-xs text-blue-600">
                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[1])}
                    >
                      {`Register`}
                    </span>
                    <span
                      className="cursor-pointer hover:underline hover:text-rose-600 px-2"
                      onClick={() => setSelectedOption(options[0])}
                    >
                      Login
                    </span>
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Login;
