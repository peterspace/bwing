import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  SET_ERROR_MESSAGE,
  CLEAR_MESSAGES,
  hasMessage,
  errorMessage,
  successMessage,
  SET_SUCCESS_MESSAGE,
} from '../../../redux/features/messages/messageSlice';
import { Email } from '../../../assets/mints';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateEmail, forgotPassword } from '../../../services/apiService';
import { useFormik } from 'formik';

const Forgot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasMsg = useSelector(hasMessage);
  const errMsg = useSelector(errorMessage);
  const [redirectHome, setRedirectHome] = useState(false);

  //===={formik}===========

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        email: '',
      },
      validate: (values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email address is required!';
        }

        return errors;
      },
      onSubmit: ({ email }) => {
        forgot(email);
      },
    });

  async function forgot(email) {
    dispatch(CLEAR_MESSAGES());
    if (!validateEmail(email)) {
      dispatch(SET_ERROR_MESSAGE('Please enter a valid email'));
      setTimeout(() => {
        dispatch(CLEAR_MESSAGES());
      }, 3000);
      return;
    } else {
      dispatch(CLEAR_MESSAGES());
    }

    const userData = {
      email,
    };

    try {
      const data = forgotPassword(userData);
      resetForm();
      if (data) {
        dispatch(SET_SUCCESS_MESSAGE('Request sent'));
        setTimeout(() => {
          dispatch(CLEAR_MESSAGES());
        }, 2000);
      }
    } catch (e) {
      console.error('forgot password', e);
      dispatch(SET_ERROR_MESSAGE('Server Error'));
    }
  }

  // if (redirectHome) {
  //   return <Navigate to={'/'} />;
  // }

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
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {hasMsg && errMsg !== '' && (
            <span className="px-2 py-1 rounded-md error">{errMsg}</span>
          )}

          {touched.email && errors.email && (
            <span className="px-2 py-1 rounded-md error">{errors.email}</span>
          )}

          <button
            type="submit"
            className={`text-center border transition-all duration-200 disabled:bg-gray-400 disabled:text-gray-700 disabled:border-transparent disabled:hover:bg-gray-400 disabled:hover:text-gray-700 disabled:hover:drop-shadow-none dark:disabled:bg-gray-400 dark:disabled:text-gray-700 dark:disabled:border-none px-6 py-2 bg-rose-600 text-white font-semibold hover:bg-rose-800 rounded-lg`}
            disabled={values.email === ''}
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
};
export default Forgot;
