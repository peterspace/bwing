import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { RxTimer } from 'react-icons/rx';
import { motion } from 'framer-motion';

export default function Framer() {
  const [isTimerShown, setIsTimerShown] = useState(false);
  console.log({ isTimerShown });
  const [hasAuctionEnded, setHasAuctionEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);

  const oneday = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  //   const timeNow = Date.now();

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);
  let timeInTimestamp;
  if (currentTime) {
    timeInTimestamp =
      new Date(oneHour).getTime() + new Date(currentTime).getTime();
  }

  console.log({ timeInTimestamp });

  return (
    <div className="flex flex-row items-start h-screen">
      <div className="container mx-auto mt-[24px] xl:mt-[64px] flex justify-center rounded-lg bg-white dark:bg-background-dark text-black dark:text-gray-100 shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] xl:w-[500px] p-4">
        <section
          className="relative flex flex-col group"
          onMouseEnter={() => setIsTimerShown(true)}
          onMouseLeave={() => setIsTimerShown(false)}
        >
          <motion.div
            layout
            transition={{ layout: { duration: 0.3 } }}
            className={`absolute -top-1 -left-2 z-20 px-1 py-1 text-white rounded-full ${
              hasAuctionEnded ? 'bg-black' : 'bg-rose-600'
            }`}
          >
            {!hasAuctionEnded ? (
              !isTimerShown ? (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <RxTimer />
                </motion.div>
              ) : (
                <motion.div layout>
                  {/* <Countdown endTime={'1677784193'} /> */}
                  <Countdown endTime={timeInTimestamp} />
                </motion.div>
              )
            ) : (
              <div className="px-1 text-xs">Auction ended</div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
