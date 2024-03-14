import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { loginUser, validateEmail } from '../../services/apiService';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/features/user/userSlice';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const {
    setIsLogin,
    setIsRegister,
    setIsForgot,
    redirectS,
    setUser,
    setIsLoggedIn,
    setRedirectHome,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [redirect, setRedirect] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [isFacebook, setIsFacebook] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);

  const [newUser, setNewUser] = useState();
  const [isSucess, setIsSucess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  // const [redirectHome, setRedirectHome] = useState(false);

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email address is required!';
        }

        if (!values.password) {
          errors.password = 'Password is required!';
        }

        return errors;
      },
      onSubmit: ({ email, password }) => {
        handleLogin(email, password);
      },
    });

  async function handleLogin(email, password) {
    let userData;

    if (isLocal) {
      if (!validateEmail(email)) {
        return toast.error('Please enter a valid email');
      }

      userData = {
        email,
        password,
      };
    }

    try {
      const data = await loginUser(userData);
      console.log({ userData: data });
      if (data) {
        dispatch(LoginUser(data));
        localStorage.setItem('user', JSON.stringify(data));
        //=================={new}============================
        setIsSucess(true);
        setIsError(false);
        setIsSignIn(false);
        setNewUser(data);
        //=================={new}============================
      } else {
        setIsSucess(false);
        setIsError(true);
        setIsSignIn(false);
      }
    } catch (e) {
      setIsSucess(false);
      setIsError(true);
      setIsSignIn(false);
    }
  }

  //====================================

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
      handleSuccessLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  useEffect(() => {
    if (redirectS) {
      handleSuccessLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectS]);

  const handleSuccessLogin = () => {
    console.log('loggedIn sucessfull');
  };

  /************************************************************************************** */
  /**********************************************{LOGIN}********************************* */
  /************************************************************************************** */

  const toastSuccess = (
    <>
      <div
        id="toast-default"
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-[64px] flex items-center w-full max-w-xs p-4 text-gray-500 bg-white dark:bg-bgDarkMode rounded-lg shadow dark:text-gray-100"
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
          Welcome back {newUser ? newUser?.name : ''}!
        </div>
        <div
          className="ml-4 cursor-pointer text-sm font-medium text-bgPrimary p-1.5 rounded-lg dark:text-bgPrimary hover:underline hover:underline-offset-4"
          onClick={() => {
            setTimeout(() => {
              navigate('/dashboard');
            }, 200);
          }}
        >
          Dashboard
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
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-[64px] flex items-center w-full max-w-xs p-4 text-gray-500 bg-white dark:bg-background-dark rounded-lg shadow dark:text-gray-100"
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
          Invalid credentials!
        </span>
        <div
          className="ml-4 cursor-pointer text-sm font-medium text-bgPrimary p-1.5 rounded-lg dark:text-bgPrimary hover:underline hover:underline-offset-4"
          onClick={() => {
            setIsSucess(false);
            setIsError(false);
            setIsSignIn(true);
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

  const login = (
    <div className="mt-[24px] xl:mt-[64px] flex justify-center rounded-lg bg-white dark:bg-background-dark text-black dark:text-gray-100 shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[350px] xl:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] xl:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] xl:text-[24px] font-extrabold leading-[32px] inline-block">
              Login to Blendery
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
          <div
            className="flex flex-col gap-[8px]"
            onClick={() => {
              setIsLocal(true);
              setIsFacebook(false);
              setIsGoogle(false);
            }}
          >
            <div className="flex flex-col mb-6 h-[48px] bg-white dark:bg-background-dark rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="email"
                name="email"
                type="email"
                className="ml-2 text-[16px] xl:text-[14px] leading-[24px] text-slate-800 dark:text-gray-600 bg-white dark:bg-background-dark placeholder-darkgray-100 inline-block outline-none"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <div>
                {touched.email && errors.email ? (
                  <div className="mt-6 text-[#ef4444]">{errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col mb-6 h-[48px] bg-white dark:bg-background-dark rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="password"
                name="password"
                type="password"
                className="ml-2 text-[16px] xl:text-[14px] leading-[24px] text-slate-800 dark:text-gray-600 bg-white dark:bg-background-dark placeholder-darkgray-100 inline-block outline-none"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <div>
                {touched.password && errors.password ? (
                  <div className="mt-6 text-[#ef4444]">{errors.password}</div>
                ) : null}
              </div>
            </div>

            {/* <div className="flex flex-row justify-center items-center">
              <button
                type="submit"
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
              >
                Login
              </button>
            </div> */}
            <div className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                onClick={handleSubmit}
              >
                Login
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
            className="cursor-pointer flex flex-row justify-center items-center bg-white dark:bg-background-dark hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsLocal(false);
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div
            className="cursor-pointer flex flex-row justify-center items-center bg-white dark:bg-background-dark hover:opacity-90 text-bgPrimary h-[49px] shrink-0 rounded w-full outline outline-bgPrimary outline-[1.5px]"
            onClick={() => {
              setIsLocal(false);
              setIsFacebook(false);
              setIsGoogle(true);
            }}
          >
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
              onClick={() => {
                setIsLogin(false);
                setIsRegister(false);
                setIsForgot(true);
              }}
            >
              Forgot your password?
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <div className="text-smi leading-[22px] text-gray-300 dark:text-gray-500 inline-block">
              {"Don't have an account?"}
            </div>
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
              onClick={() => {
                setIsLogin(false);
                setIsRegister(true);
                setIsForgot(false);
              }}
            >
              Signup now!
            </div>
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
          <div className="flex flex-row items-start h-screen">{toastError}</div>
        </>
      )}
      {isSucess && (
        <>
          <div className="flex flex-row items-start h-screen">
            {toastSuccess}
          </div>
        </>
      )}

      {isSignIn && (
        <>
         <div className="flex flex-row items-start h-screen">
         {login}
         </div>
        </>
      )}
    </>
  );
};
