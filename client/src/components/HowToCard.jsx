import React, { useState } from 'react';

export const HowToComponent = (props) => {
  const { l } = props;
  const newCard = (
    <div className="card-gradient">
      <div className="flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] sm:w-[375px] xl:w-[500px] h-[200px] xl:h-[125px] p-4 bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100 dark:border-lightslategray-300 dark:box-border dark:border dark:border-solid">
        <div className="flex flex-row gap-2 w-full">
          <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gray-100 dark:bg-bgDarkMode text-gray-900 dark:text-gray-100  p-1.5 rounded">
            <div className="text-11xl leading-[28px] text-bgPrimary inline-block">
              {l?.id}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-sans font-medium leading-[24px] inline-block text-gray-900 dark:text-gray-100">
              {l?.title}
            </div>
            <div className="leading-[20px] inline-block text-gray-900 dark:text-gray-200 overflow-y-scroll overflow-x-hidden h-[150px] xl:h-[80px]">
              {l?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
export const HowToCard = (props) => {
  const { data, title } = props;
  const newCard = (
    <div className="flex flex-col gap-[16px]">
      <div className="text-lg font-sans font-bold text-bgPrimary inline-block">
        {title}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px]">
        {data &&
          data?.map((f, idx) => (
            <div className="" key={idx}>
              <HowToComponent l={f} />
            </div>
          ))}
      </div>
    </div>
  );
  return <>{newCard}</>;
};
