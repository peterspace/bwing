import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_ERROR_MESSAGE,
  CLEAR_MESSAGES,
  hasMessage,
  errorMessage,
  successMessage,
  SET_SUCCESS_MESSAGE,
} from '../../redux/features/messages/messageSlice';
import { Email, Password } from '../../assets/mints';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../../services/apiService';
import { LoginUser } from '../../redux/features/user/userSlice';

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasMsg = useSelector(hasMessage);
  const errMsg = useSelector(errorMessage);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  function handleChange(evt) {
    dispatch(CLEAR_MESSAGES());

    const value = evt.target.value;

    if (evt.target.name === 'email') {
      checkEmail(value);
    }

    setLoginData({
      ...loginData,
      [evt.target.name]: value,
    });
  }

  function checkEmail(string) {
    var validationRule =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!validationRule.test(String(string).toLowerCase())) {
      setEmailErrorMessage('Invalid email');
    } else {
      setEmailErrorMessage('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loginData.email === '' || loginData.password === '') {
      // dispatch(SET_ERROR_MESSAGE("Check email & password"));
      return;
    }

    try {
      const data = await loginUser(loginData);
      console.log({ userData: data });
      if (data) {
        dispatch(LoginUser(data));
        localStorage.setItem('user', JSON.stringify(data));
        //=================={new}============================
        dispatch(SET_SUCCESS_MESSAGE('Welcome ' + data?.name));
        setTimeout(() => {
          navigate('/dashboard');
          dispatch(CLEAR_MESSAGES());
        }, 2000);
        //=================={new}============================
      }
    } catch (e) {
      console.error('login', e);
      dispatch(SET_ERROR_MESSAGE('Server Error'));
    }
  }

  return (
    <motion.div
      // initial={{x: -300}}
      // animate={{x: 0}}
      // exit={{x: -300}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form className="flex self-center" onSubmit={handleSubmit}>
        <div className="mx-10 flex flex-col gap-6">
          <div>
            <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
              <label
                htmlFor="email"
                className="input-label flex flex-row gap-2 items-center justify-between"
              >
                {/* {type === 'password' && (
                                  <span className="cursor-pointer" onClick={()=>setIsPasswordVisible(!isPasswordVisible)}> {isPasswordVisible ? <ImEyeBlocked /> : <ImEye />}</span>
                              )} */}
                <Email className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input-custom"
                onChange={handleChange}
                value={loginData.email}
              />
            </div>

            {emailErrorMessage ? (
              <span className="text-error text-sm">{emailErrorMessage}</span>
            ) : (
              ''
            )}
          </div>
          <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
            <label
              htmlFor="password"
              className="input-label flex flex-row gap-2 items-center justify-between"
            >
              {/* {type === 'password' && (
                                  <span className="cursor-pointer" onClick={()=>setIsPasswordVisible(!isPasswordVisible)}> {isPasswordVisible ? <ImEyeBlocked /> : <ImEye />}</span>
                              )} */}
              <Password className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input-custom"
              onChange={handleChange}
              value={loginData.password}
            />
          </div>

          {hasMsg && errMsg !== '' && (
            <span className="px-2 py-1 rounded-md error">{errMsg}</span>
          )}

          <button
            type="submit"
            className={`text-center border transition-all duration-200 disabled:bg-gray-400 disabled:text-gray-700 disabled:border-transparent disabled:hover:bg-gray-400 disabled:hover:text-gray-700 disabled:hover:drop-shadow-none dark:disabled:bg-gray-400 dark:disabled:text-gray-700 dark:disabled:border-none px-6 py-2 bg-rose-600 text-white font-semibold hover:bg-rose-800 rounded-lg`}
            disabled={
              emailErrorMessage !== '' ||
              loginData.email === '' ||
              loginData.password === ''
            }
          >
            Login
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default LoginComponent;
