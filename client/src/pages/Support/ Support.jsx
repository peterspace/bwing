import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../Home/AppContainer.module.css';
import SupportModel from '../../components/SupportModel';
import FooterMini from '../../components/FooterMini';

export const Support = (props) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  console.log({ user: user });

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }
  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      <div className="h-screen mt-[24px] overflow-auto">
        <div className="flex bg-lightslategray-300 h-px" />
        {/* <div
          className={`${styles.hero} h-full flex flex-col justify-center items-center`}
        >
          <SupportModel />
        </div> */}
        <div className={`h-full flex flex-col justify-center items-center`}>
          <SupportModel />
          <div className="relative text-gray-900 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
            <div className="flex flex-col justify-center items-center">
              <FooterMini />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
