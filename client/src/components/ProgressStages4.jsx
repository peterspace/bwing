import React, { useState } from 'react';

// import { FaBeer } from 'react-icons/fa';
import {
  BsInfoCircleFill,
  BsFillArrowRightCircleFill,
  BsCheckAll,
} from 'react-icons/bs';
import { MdQrCodeScanner } from 'react-icons/md';
import {
  PiLockSimpleBold,
  PiLockSimpleOpenBold,
  PiTrendUpDuotone,
} from 'react-icons/pi';

import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { TfiTimer } from 'react-icons/tfi';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';

//
{
  /* <PiLockSimpleBold color="red" size={15}/> */
}
//  <PiLockSimpleBold color="#4f46e5" size={15}/>
export const ProgressStages4 = () => {
  // const {
  //   isExchange,
  //   setIsExchange,
  //   isBuy,
  //   setIsBuy,
  //   isSell,
  //   setIsSell,
  //   isDefi,
  //   setIsDefi,
  // } = props;

  const [isStageNumber, setIsStageNumber] = useState(PiTrendUpDuotone);
  const [isCheck, setIsCheck] = useState(true);

  const [isArrow, setIsArrow] = useState(true);

  const [percentageProgress, setPercentageProgress] = useState(70);

  const progressStage1 = (
    <div className="flex justify-center rounded-lg p-4 bg-chizzySnow dark:bg-gray-1000">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0">
          {' '}
          <FiCheckCircle color="#4f46e5" size={24} />{' '}
        </div>
        <div className="flex flex-col">
           <div className="text-xs leading-[17px] inline-block dark:text-white">
            Exchange pair
          </div>
          <div className="text-xs leading-[17px] inline-block dark:text-silver">
            Set the preferred exchange pair
          </div>
        </div>
      </div>
    </div>
  );
  const progressStage2 = (
    <div className="flex justify-center rounded-lg p-4 bg-chizzySnow dark:bg-gray-1000">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0">
          {' '}
          <FiCheckCircle color="#4f46e5" size={24} />{' '}
        </div>
        <div className="flex flex-col">
           <div className="text-xs leading-[17px] inline-block dark:text-white">
            Wallet address
          </div>
          <div className="text-xs leading-[17px] inline-block dark:text-silver">
            Fill in the crypto wallet address details
          </div>
        </div>
      </div>
    </div>
  );
  const progressStage3 = (
    <div className="flex justify-center rounded-lg p-4 bg-chizzySnow dark:bg-gray-1000">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0">
          {' '}
          <FiCheckCircle color="#4f46e5" size={24} />{' '}
        </div>
        <div className="flex flex-col">
           <div className="text-xs leading-[17px] inline-block dark:text-white">Payment</div>
           <div className="text-xs leading-[17px] inline-block dark:text-silver">
            Deposit the amount required for the exchange
          </div>
        </div>
      </div>
    </div>
  );
  const progressStage4 = (
    <div className="flex justify-center rounded-lg p-4 bg-chizzySnow dark:bg-gray-1000">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0">
          {' '}
          <BsFillArrowRightCircleFill color="#4f46e5" size={24} />
        </div>

        <div className="flex flex-col">
           <div className="text-xs leading-[17px] inline-block dark:text-white">Exchange</div>
           <div className="text-xs leading-[17px] inline-block dark:text-silver">
            Wait for your transaction to be completed
          </div>
        </div>
      </div>
    </div>
  );

  const processBar = (
    <div className="flex justify-center rounded-lg bg-white dark:bg-background-dark shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            {/* ========================{step 4 of 4}===================================== */}
            <div className="leading-[20px] text-black dark:text-silver inline-block w-[223px]">
              Transaction completed
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row w-full bg-chizzySnow rounded-lg">
              <div className="flex bg-bgPrimary rounded-lg w-[100%] h-[12px]" />
            </div>
            <div className="ml-4 flex flex-row justify-center items-center text-gray-200 bg-chizzySnow dark:bg-exchange-rate-dark rounded w-[49px] h-[20px] text-[10px]">
              4 of 4
            </div>
          </div>
          {/* ========================{step 4 of 4 ends here}===================================== */}
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
        </div>

        <div className="flex flex-col gap-[8px]">
          {progressStage1}
          {progressStage2}
          {progressStage3}
          {progressStage4}
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  return <>{processBar}</>;
};
