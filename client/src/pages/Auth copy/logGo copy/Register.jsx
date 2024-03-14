import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Email, Password, User } from '../../../assets/mints';
import { motion } from 'framer-motion';
import {
  SET_ERROR_MESSAGE,
  CLEAR_MESSAGES,
  hasMessage,
  errorMessage,
  successMessage,
  SET_SUCCESS_MESSAGE,
} from '../../../redux/features/messages/messageSlice';
import {
  registerUser,
  validateEmail,
  checkEmail,
} from '../../../services/apiService';

const Register = () => {
  const dispatch = useDispatch();
  const hasMsg = useSelector(hasMessage);
  const errorMsg = useSelector(errorMessage);
  const successMsg = useSelector(successMessage);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  async function handleCheckEmail(e) {
    const value = e.target.value;

    if (e.target.name === 'name') {
      setName(value);
    }

    if (e.target.name === 'email') {
      setEmail(value);

      //   var validationRule =
      //     // eslint-disable-next-line no-useless-escape
      //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      //   if (!validationRule.test(String(value).toLowerCase())) {
      //     setIsEmailValid(false);
      //     setEmailErrorMessage('Invalid email');
      //     return;
      //   }

      if (!validateEmail(value)) {
        setIsEmailValid(false);
        setEmailErrorMessage('Invalid email');
      } else {
        setEmailErrorMessage('');
      }

      const userData = { email: value };
      const status = await checkEmail(userData);
      if ('successMessage' in status) {
        setIsEmailValid(true);
        setEmailErrorMessage('');
      } else {
        setIsEmailValid(false);
        setEmailErrorMessage(status?.errorMessage);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      dispatch(SET_ERROR_MESSAGE('Check name, email & password'));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(SET_ERROR_MESSAGE('Passwords do not match'));
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    if (hasMsg) {
      dispatch(CLEAR_MESSAGES());
    }

    const status = await registerUser(userData);
    if (status) {
      if ('successMessage' in status) {
        const sucessMessage = 'Registration successful';
        // dispatch(SET_SUCCESS_MESSAGE(status.successMessage));
        dispatch(SET_SUCCESS_MESSAGE(sucessMessage));

        setTimeout(() => {
          dispatch(CLEAR_MESSAGES());
        }, 1000);
      }
    }
    // console.table("register status", status);
  }

  useEffect(() => {
    if (hasMsg) dispatch(CLEAR_MESSAGES());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password, confirmPassword]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="flex self-center">
        <div className="mx-10 flex flex-col gap-4">
          <div>
            <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
              <label
                htmlFor="email"
                className="input-label flex flex-row gap-2 items-center justify-between"
              >
                <User className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your preferred name"
                className="input-custom"
                onChange={handleCheckEmail}
                value={name}
              />
            </div>
          </div>

          <div>
            <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
              <label
                htmlFor="email"
                className="input-label flex flex-row gap-2 items-center justify-between"
              >
                <Email className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input-custom"
                onChange={handleCheckEmail}
                value={email}
              />
            </div>
            <span className={`flex flex-row gap-2 items-center`}>
              {emailErrorMessage ? (
                <span className="text-error text-sm">{emailErrorMessage}</span>
              ) : (
                ''
              )}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
              <label
                htmlFor="password"
                className="input-label flex flex-row gap-2 items-center justify-between"
              >
                <Password className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="input-custom"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="input-group-variant focus-within:border-blue-700 hover:border-blue-600 group">
              <label
                htmlFor="password"
                className="input-label flex flex-row gap-2 items-center justify-between"
              >
                <Password className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-blue-700 group-hover:fill-blue-600" />
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Confirm your password"
                className="input-custom"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>

          {hasMsg && errorMsg !== '' ? (
            <span className="px-2 py-1 rounded-md error">{errorMsg}</span>
          ) : (
            successMsg !== '' && (
              <span className="px-2 py-1 rounded-md success">{successMsg}</span>
            )
          )}
          <button
            type="submit"
            className={`mt-6 text-center border transition-all duration-200 disabled:bg-gray-400 disabled:text-gray-700 disabled:border-transparent disabled:hover:bg-gray-400 disabled:hover:text-gray-700 disabled:hover:drop-shadow-none dark:disabled:bg-gray-400 dark:disabled:text-gray-700 dark:disabled:border-none px-6 py-2 bg-rose-600 text-white font-semibold hover:bg-rose-800 rounded-lg`}
            // onClick={() => {
            // 	typeof (onClick === "function") && onClick();
            // }}
            disabled={
              !isEmailValid || name === '' || email === '' || password === ''
            }
          >
            Register
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
