import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/features/user/userSlice';
import { BsFillMoonStarsFill, BsMoonStars } from 'react-icons/bs'; // Bitcoin
import { useDispatch } from 'react-redux';
import { TbLogout, TbLogin } from 'react-icons/tb';

const tabs = ['Home', 'Exchange', 'Buy', 'Sell', 'Defi'];

export const Header = (props) => {
  const { mode, setMode, user } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isRedirectHome, setIsRedirectHome] = useState(false);
  const [isRedirectExchange, setIsRedirectExchange] = useState(false);
  const [isRedirectBuy, setIsRedirectBuy] = useState(false);
  const [isRedirectSell, setIsRedirectSell] = useState(false);
  const [isRedirectDefi, setIsRedirectDefi] = useState(false);
  const [isRedirectDashboard, setIsRedirectDashboard] = useState(false);
  const [isRedirectSupport, setIsRedirectSupport] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[1]);

  useEffect(() => {
    if (isLogin) {
      navigate('/auth');
      setIsLogin(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (isRedirectExchange) {
      navigate('/exchange');
      setIsRedirectExchange(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectExchange]);

  useEffect(() => {
    if (isRedirectBuy) {
      navigate('/buyCard');
      setIsRedirectBuy(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectBuy]);

  useEffect(() => {
    if (isRedirectSell) {
      navigate('/sellCard');
      setIsRedirectSell(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectSell]);

  useEffect(() => {
    if (isRedirectDefi) {
      navigate('/defi');
      setIsRedirectDefi(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectDefi]);

  useEffect(() => {
    if (isRedirectHome) {
      newFunc();
      navigate('/');
      setIsRedirectHome(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectHome]);

  useEffect(() => {
    if (isRedirectDashboard) {
      newFunc();
      navigate('/dashboard');
      setIsRedirectDashboard(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectDashboard]);

  useEffect(() => {
    if (isRedirectSupport) {
      navigate('/support');
      setIsRedirectSupport(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectSupport]);

  async function newFunc() {
    localStorage.removeItem('fTokenE');
    localStorage.removeItem('tTokenE');
    localStorage.removeItem('telegram');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('benderyAddress');
    localStorage.removeItem('country');
    localStorage.removeItem('cityData');
    localStorage.removeItem('city');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('txInfo');
    localStorage.removeItem('percentageProgress');
    localStorage.removeItem('blockchainNetworkE');
    localStorage.removeItem('provider');
    localStorage.removeItem('service');
    localStorage.removeItem('subService');
    navigate('/');
  }

  const handleLogout = () => {
    dispatch(Logout());
    newFunc();
    // window.location.replace('/');
  };

  return (
    <div className="flex flex-col xl:flex-row w-full xl:h-[68px] px-10 justify-between items-center bg-white dark:bg-app-container-dark box-border select-none pb-2">
      <div className="flex justify-center items-center">
        <div
          className="text-gray-900 dark:text-gray-100 text-11xl leading-8 font-bold cursor-pointer"
          onClick={() => {
            setIsRedirectHome(true);
            setActiveTab(tabs[0]);
          }}
        >
          Blendery
        </div>
      </div>
      <div className="flex space-x-6 items-center">
        {user?.token ? (
          <>
            <div
              className="text-base text-gray-900 dark:text-gray-100 font-normal cursor-pointer"
              onClick={() => {
                setIsRedirectSupport(true);
              }}
            >
              Support
            </div>
            <div
              className="text-base text-gray-900 dark:text-gray-100 font-normal cursor-pointer"
              onClick={() => {
                setIsRedirectDashboard(true);
              }}
            >
              Dashboard
            </div>
            <div
              className="flex text-base text-gray-900 dark:text-gray-100 font-normal cursor-pointer"
              onClick={() => {
                handleLogout();
              }}
            >
              <div className="mr-2">Logout</div>
              <TbLogout size={20} />
            </div>
          </>
        ) : (
          <div
            className="flex text-base text-gray-900 dark:text-gray-100 font-normal cursor-pointer"
            onClick={() => setIsLogin(true)}
          >
            <div className="mr-2">Login</div>
            <TbLogin size={20} />
          </div>
        )}
        <div
          className="cursor-pointer flex justify-center"
          onClick={() => {
            setMode((prev) => !prev);
          }}
        >
          {mode === true ? (
            <BsMoonStars size={18} color={'#111111'} />
          ) : (
            <BsFillMoonStarsFill size={18} color={'#4f46e5'} />
          )}
        </div>
      </div>
    </div>
  );
};
