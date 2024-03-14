import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { Email, Password, User } from '../../assets/mints';
import {
  registerUser,
  validateEmail,
  checkEmail,
} from '../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

export const Register = (props) => {
  const { setIsLogin, setIsRegister, setIsForgot, redirectS, setRedirectHome } =
    props;
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [redirect, setRedirect] = useState(false);
  const [isFacebook, setIsFacebook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [newUser, setNewUser] = useState();
  const [isSucess, setIsSucess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        isTermsAgreed: false,
        isSubscriptionChecked: false,
      },
      validate: (values) => {
        const errors = {};

        if (!values.name) {
          errors.name = 'Full name is required!';
        }

        if (!values.email) {
          errors.email = 'Email address is required!';
        }

        if (!values.password) {
          errors.password = 'Password is required!';
        }

        if (!values.isTermsAgreed) {
          errors.isTermsAgreed =
            'Please indicate that you have read and agree to the Terms';
        }

        return errors;
      },
      onSubmit: ({
        name,
        email,
        password,
        isTermsAgreed,
        isSubscriptionChecked,
      }) => {
        handleSignUp(name, email, password);
      },
    });

  async function handleSignUp(name, email, password) {
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    // TODO: Subscription true/false have to be added
    const userData = {
      name,
      email,
      password,
      role: 'User',
    };

    try {
      const data = await registerUser(userData);
      if (data) {
        setIsSucess(true);
        setIsError(false);
        setIsSignup(false);
        setNewUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        setIsSucess(false);
        setIsError(true);
        setIsSignup(false);
      }
    } catch (e) {
      setIsSucess(false);
      setIsError(true);
      setIsSignup(false);
      // alert('Registration failed. Please try again later');
    }
  }

  useEffect(() => {
    if (isGoogle) {
      setTimeout(() => {
        window.location.href = `${BACKEND_URL}/auth/google`;
        setIsGoogle(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGoogle]);

  useEffect(() => {
    if (isFacebook) {
      setTimeout(() => {
        window.location.href = `${BACKEND_URL}/auth/facebook`;
        setIsFacebook(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFacebook]);

  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    if (redirectS) {
      navigate('/auth');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectS]);

  const toastSuccess = (
    <>
      <div
        id="toast-default"
        className="transition ease-in-out delay-150 mt-[64px] flex items-center w-full max-w-xs p-4 text-gray-500 bg-white dark:bg-bgDarkMode rounded-lg shadow dark:text-gray-100"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-bgPrimary bg-chizzySnow rounded-lg dark:bg-bgPrimary dark:text-blue-200">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
            />
          </svg>
          <span className="sr-only">Fire icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          Welcome to Blendery {newUser?.name}
        </div>
        <div
          className="ml-4 cursor-pointer text-sm font-medium text-bgPrimary p-1.5 rounded-lg dark:text-bgPrimary hover:underline hover:underline-offset-4"
          onClick={() => {
            setIsLogin(true);
            setIsRegister(false);
            setIsForgot(false);
          }}
        >
          Login
        </div>

        <span
          className="transition-transform duration-300 hover:scale-110 cursor-pointer text-bgPrimary dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-bgPrimary ms-auto -mx-1.5 -my-1.5 h-8 w-8"
          onClick={() => {
            setTimeout(() => {
              navigate('/');
            }, 200);
          }}
        >
          {' '}
          <IoIosClose size={32} />
        </span>
      </div>
    </>
  );

  const toastError = (
    <>
      <div
        id="toast-default"
        className="transition ease-in-out delay-150 mt-[64px] flex items-center w-full max-w-xs p-4 text-gray-500 bg-white dark:bg-bgDarkMode rounded-lg shadow dark:text-gray-100"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-bgPrimary bg-chizzySnow rounded-lg dark:bg-bgPrimary dark:text-blue-200">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
            />
          </svg>
          <span className="sr-only">Fire icon</span>
        </div>
        <span className="ml-2 inline-flex items-center">
          {' '}
          Please proceed to login!
        </span>
        <div
          className="ml-4 cursor-pointer text-sm font-medium text-bgPrimary p-1.5 rounded-lg dark:text-bgPrimary hover:underline hover:underline-offset-4"
          onClick={() => {
            setIsLogin(true);
            setIsRegister(false);
            setIsForgot(false);
          }}
        >
          Login
        </div>
        <span
          className="transition-transform duration-300 hover:scale-110 cursor-pointer text-bgPrimary dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-bgPrimary ms-auto -mx-1.5 -my-1.5 h-8 w-8"
          onClick={() => {
            setTimeout(() => {
              navigate('/');
            }, 200);
          }}
        >
          {' '}
          <IoIosClose size={32} />
        </span>
      </div>
    </>
  );

  const signup = (
    <div className="rounded-lg flex justify-center bg-white dark:bg-background-dark text-black dark:text-gray-100 overflow-hidden flex-col items-center p-4 border-[1px] border-solid border-lightslategray-300 shadow-m">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] xl:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] xl:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup for Blendery
            </div>
            <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#130D1A"
                className="w-5 h-5"
                onClick={() => setRedirectHome(true)}
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[8px]">
            <div>
              <div className="input-group-variant focus-within:border-indigo-700 hover:border-indigo-600 group rounded outline outline-lightslategray-300 outline-[1px]">
                <label
                  htmlFor="name"
                  className="input-label flex flex-row gap-2 items-center justify-between"
                >
                  <User className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-indigo-700 group-hover:fill-indigo-600" />
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your preferred name"
                  className="input-custom w-full"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              {touched.name && errors.name && (
                <span className="text-[#ef4444] px-2 py-1 rounded-md error">
                  {errors.name}
                </span>
              )}
            </div>
            <div>
              <div className="input-group-variant focus-within:border-indigo-700 hover:border-indigo-600 group rounded outline outline-lightslategray-300 outline-[1px]">
                <label
                  htmlFor="email"
                  className="input-label flex flex-row gap-2 items-center justify-between"
                >
                  <Email className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-indigo-700 group-hover:fill-indigo-600" />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-custom w-full"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              {touched.email && errors.email && (
                <span className="text-[#ef4444] px-2 py-1 rounded-md error">
                  {errors.email}
                </span>
              )}
            </div>
            <div>
              <div className="input-group-variant focus-within:border-indigo-700 hover:border-indigo-600 group rounded outline outline-lightslategray-300 outline-[1px]">
                <label
                  htmlFor="password"
                  className="input-label flex flex-row gap-2 items-center justify-between"
                >
                  <Password className="w-[16px] h-[16px] fill-rose-600 group-focus-within:fill-indigo-700 group-hover:fill-indigo-600" />
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-custom w-full"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              {touched.password && errors.password && (
                <span className="text-[#ef4444] px-2 py-1 rounded-md error">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <input
                    id="isTermsAgreed"
                    name="isTermsAgreed"
                    type="checkbox"
                    value={values.isTermsAgreed}
                    onChange={handleChange}
                    className="outline-none bg-whitesmoke-100 accent-bgPrimary focus:accent-bgPrimary/30"
                  />

                  <div className="flex flex-row gap-1 text-xs xl:text-smi">
                    <div className="leading-[20px] text-darkslategray-200 dark:text-gray-500 inline-block">
                      I agree with Terms of Use, Privacy Policy and AML/KYC
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  {touched.isTermsAgreed && errors.isTermsAgreed ? (
                    <div className="mt-1 leading-[20px] inline-block text-[#ef4444]">
                      {errors.isTermsAgreed}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <input
                  id="isSubscriptionChecked"
                  name="isSubscriptionChecked"
                  value={values.isSubscriptionChecked}
                  onChange={handleChange}
                  type="checkbox"
                  className="outline-none bg-whitesmoke-100 accent-bgPrimary focus:accent-bgPrimary/30"
                />

                <div className="flex flex-row gap-1 text-xs xl:text-smi">
                  <div className="leading-[20px] text-darkslategray-200 dark:text-gray-500 inline-block">
                    Send me promos, market news and product updates
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white py-2 shrink-0 rounded w-full"
                onClick={handleSubmit}
              >
                Create account
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
          <div className="text-smi leading-[22px] text-gray-300 dark:text-gray-500 inline-block">
            or
          </div>
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
        </div>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white dark:bg-background-dark hover:opacity-90 text-bgPrimary py-2 shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white dark:bg-background-dark hover:opacity-90 text-bgPrimary py-2 shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 dark:text-gray-500 inline-block">
            Already have an account?
          </div>
          <div
            className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
            onClick={() => {
              setIsLogin(true);
              setIsRegister(false);
              setIsForgot(false);
            }}
          >
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );
  return (
    <>
      {isError && (
        <>
          <motion.section
            initial={{ width: '85%' }}
            animate={{ width: 'auto' }}
            exit={{ width: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
            className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
          >
            <div className="flex flex-row items-start h-screen">
              {toastError}
            </div>
          </motion.section>
        </>
      )}
      {isSucess && (
        <>
          <motion.section
            initial={{ width: '85%' }}
            animate={{ width: 'auto' }}
            exit={{ width: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
            className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
          >
            <div className="flex flex-row items-start h-screen">
              {toastSuccess}
            </div>
          </motion.section>
        </>
      )}
      {isSignup && (
        <>
          <motion.section
            initial={{ width: '85%' }}
            animate={{ width: 'auto' }}
            exit={{ width: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
            className={`flex flex-col gap-0 justify-center items-center overflow-clip`}
          >
            <div className="flex flex-row items-start h-screen">{signup}</div>
          </motion.section>
        </>
      )}
    </>
  );
};
