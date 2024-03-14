import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/features/user/userSlice';
import styles from '../Home/AppContainer.module.css';
// import { AppContainer } from '../Home/AppContainer';

import { Login } from './Login';
import { Register } from './Register';
import { Forgot } from './Forgot';
import { AnimatePresence, motion } from 'framer-motion';

//w-[370px] ===w-[300px]z
//w-[375px] === w-[320px] xs:w-[340px]
import { registerSocial, loginSocial } from '../../services/apiService';
import {
  BNB,
  MATIC,
  ETH1,
  AAVE,
  BAY,
  AVAX,
  BCN,
  BCH,
} from '../../assets/mints';

export const Auth = (props) => {
  const { setUser, setIsLoggedIn } = props;
  const params = useParams();
  const { authId, message } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //===============================================================================================
  //============================={Login redirects}===============================================
  const { user } = useSelector((state) => state.user);

  // let from = location?.state?.from?.pathname || '/';
  // console.log({ fromLocation: from });
  //============================={Login redirects}===============================================
  //=============================================================================================
  const prevLocation = localStorage.getItem('prevLocation')
    ? JSON.parse(localStorage.getItem('prevLocation'))
    : '/';

  console.log({ prevLocation: prevLocation });
  const isLoginL = localStorage.getItem('isLogin')
    ? JSON.parse(localStorage.getItem('isLogin'))
    : true; // initially true
  const [isLogin, setIsLogin] = useState(isLoginL);
  // initially false
  const isRegisterL = localStorage.getItem('isRegister')
    ? JSON.parse(localStorage.getItem('isRegister'))
    : false;
  const [isRegister, setIsRegister] = useState(isRegisterL);

  const isForgotL = localStorage.getItem('isForgot')
    ? JSON.parse(localStorage.getItem('isForgot'))
    : false;
  const [isForgot, setIsForgot] = useState(isForgotL);

  const [errorMessage, setErrorMessage] = useState();

  console.log({ authId: authId });

  const [redirectLogin, setRedirectLogin] = useState(false);
  const [redirectRegister, setRedirectRegister] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false);

  // useEffect(() => {
  //   if (redirectHome) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [redirectHome]);
  useEffect(() => {
    if (redirectHome) {
      setIsLogin(true);
      setIsRegister(false);
      setIsForgot(false);
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectHome]);

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);
  useEffect(() => {
    localStorage.setItem('isRegister', JSON.stringify(isRegister));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister]);

  useEffect(() => {
    localStorage.setItem('isForgot', JSON.stringify(isForgot));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForgot]);

  useEffect(() => {
    getError();
  }, []);

  async function getError() {
    if (message) {
      setErrorMessage(message);
    }
  }

  //=================={Social LOgin}==================

  useEffect(() => {
    if (isLogin) {
      LoginSubmit();
    }
  }, []);

  async function LoginSubmit() {
    if (!authId) {
      return;
    }
    let userData = {
      authId,
    };

    try {
      // const data = await registerSocial(userData);
      const data = await loginSocial(userData);
      console.log({ userData: data });
      if (data) {
        dispatch(LoginUser(data));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        setIsLoggedIn(true);
        setTimeout(() => {
          setRedirectLogin(true);
        }, 200);
      }
    } catch (e) {
      alert('Login failed');
    }
  }

  //=================={Registration}==================
  useEffect(() => {
    if (isRegister) {
      SubmitSignupSocial();
    }
  }, []);

  async function SubmitSignupSocial() {
    if (!authId) {
      return;
    }
    let userData = {
      authId,
    };

    try {
      const data = await registerSocial(userData);
      console.log({ userData: data });

      if (data) {
        // localStorage.setItem('user', JSON.stringify(data));
        setTimeout(() => {
          setRedirectRegister(true);
          setIsLogin(true);
          setIsRegister(false);
        }, 200);
      }
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  //===============================================================================================
  //============================={Login redirects}===============================================
  if (user?.token) {
    return window.location.replace(prevLocation);
  }
  //============================={Login redirects}===============================================
  //=============================================================================================

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      {/* <div className="h-screen mt-[64px] mb-[64px] overflow-auto"> */}
      <div className="relative h-screen flex flex-col">
        {/* <div className="hidden md:flex"> */}
        <div className="flex">
          <span className="absolute bottom-[45%] left-[20%] w-[48px] h-[48px] rotate-12 animate-pulse">
            <BNB className="fill-indigo-300 dark:fill-indigo-300" />
          </span>
          <span className="absolute bottom-[40%] left-[10%] w-[32px] h-[32px] animate-pulse">
            <MATIC className="fill-indigo-300 dark:fill-indigo-300" />
          </span>
          <span className="absolute bottom-[55%] left-[15%] w-[24px] h-[24px]">
            <ETH1 className="fill-indigo-300 dark:fill-indigo-300" />
          </span>

          {/* SVGs right*/}
          <span className="absolute bottom-[45%] right-[20%] w-[32px] h-[32px] rotate-12">
            <BCN className="fill-indigo-300 dark:fill-indigo-300" />
          </span>
          <span className="absolute bottom-[40%] right-[10%] w-[48px] h-[48px]">
            <AVAX className="fill-indigo-300 dark:fill-indigo-100" />
          </span>
          <span className="absolute bottom-[55%] right-[15%] w-[24px] h-[24px] animate-pulse">
            <BCH className="fill-indigo-300 dark:fill-indigo-300" />
          </span>
          <span className="absolute top-[3.5%] right-[4%] w-[48px] h-[48px] animate-pulse z-10">
            <ETH1 className="fill-indigo-500 dark:fill-indigo-500" />
          </span>
          <span className="absolute bottom-[20%] right-[4%] w-[48px] h-[48px] z-10">
            <MATIC className="fill-indigo-400 dark:fill-indigo-400" />
          </span>
          <span className="absolute bottom-[6%] left-[10%] w-[48px] h-[48px] z-30">
            <AAVE className="fill-indigo-500 dark:fill-indigo-500" />
          </span>
          <span className="absolute top-[4%] left-[2%] w-[32px] h-[32px] rotate-45 animate-pulse z-30">
            <BAY className="fill-indigo-600 dark:fill-indigo-600" />
          </span>
        </div>
        <div className="z-20 mt-[24px] md:mt-[30px] xl:md:[42px]">
          <>
            {message && (
              <>
                <div className="">Error message: {errorMessage}</div>
              </>
            )}
            {isRegister && (
              <div className={`flex flex-col justify-center items-center`}>
                <motion.section
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  exit={{ width: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
                >
                  <Register
                    setIsLogin={setIsLogin}
                    setIsRegister={setIsRegister}
                    setIsForgot={setIsForgot}
                    redirectS={redirectRegister}
                    setRedirectHome={setRedirectHome}
                  />
                </motion.section>
              </div>
            )}
            {isLogin && (
              <div className={`flex flex-col justify-center items-center`}>
                <motion.section
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  exit={{ width: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
                >
                  <Login
                    setIsLogin={setIsLogin}
                    setIsRegister={setIsRegister}
                    setIsForgot={setIsForgot}
                    redirectS={redirectLogin}
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                    setRedirectHome={setRedirectHome}
                  />
                </motion.section>
              </div>
            )}
            {isForgot && (
              <div className={`flex flex-col justify-center items-center`}>
                <motion.section
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  exit={{ width: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
                >
                  <Forgot
                    setIsLogin={setIsLogin}
                    setIsRegister={setIsRegister}
                    setIsForgot={setIsForgot}
                  />
                </motion.section>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};
