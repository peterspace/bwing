import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSlippage } from '../redux/features/swap/swapSlice';
import stylesSlippage from './Slippage.module.css';
import { FaWallet } from "react-icons/fa";

import {
  useAccount,
  useSwitchNetwork,
  useBalance,
  useNetwork,
  useDisconnect,
  useConnect,
} from 'wagmi';
import {
  getChainRateSwapService,
  getChainPriceService,
} from '../services/apiService';
import {
  getChainPrice,
  getChainRateSwap,
} from '../redux/features/swap/swapSlice';

import Modal from 'react-modal';
import { FiSearch } from 'react-icons/fi';

import CloseIcon from '../assets/icons/close.svg';
// import { SlippageCard } from './SlippageCard';
// import { TokenCardContainer } from './SlippageCard';
//======={for wallet connect only}================

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  content: {
    width: '412px',
    height: '538px',
    borderRadius: '1.25rem',
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');

function SlippageModal(props) {
  const {
    filteredTokens,
    setToken,
    allTokens,
    service,
    isTokenModalOpen,
    setIsTokenModalOpen,
    isNotCrypto,
    title,
  } = props;

  const { connect, connectors } = useConnect();

  //================={Wallet card}================

  const { setIsSlippageChange, slippage } = props;
  const dispatch = useDispatch();

  //============{SLIPPAGE DATA}============================================== //==========={Connection}=============
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  const [customSlippage, setCustomSlippage] = useState('');
  // const [isSlippageChange, setIsSlippageChange] = useState(false);
  const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is

  //=========================================================================
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  //==============={Secondary Data}=========================

  const { address, isConnected } = useAccount();

  console.log({ isConnected: isConnected });
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const chain = useSelector((state) => state?.swap?.chain);

  const chainId = chain ? chain.chainId : '1';
  const chainSymbol = chain ? chain?.chainSymbol : 'ETH';
  console.log({ chainIdSlippage: chainId });

  const chainUsdBalance = useSelector(
    (state) => state?.swap?.getChainPrice?.chainPrice
  );
  const chainExchangeRate = useSelector(
    (state) => state?.swap?.getChainRateSwap?.chainExchangeRate
  );

  console.log({ chainExchangeRate: chainExchangeRate });

  const { data } = useBalance({
    address,
    // chainId: chainId,
    chainId: Number(chainId), // requires type "Number"
    watch: true,
  });

  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (isConnected) {
      const tokenbal = Number(data?.formatted).toFixed(3);
      setBalance(tokenbal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  useEffect(() => {
    localStorage.setItem('chainBalance', JSON.stringify(balance));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  // Simulate fetching expected prices
  useEffect(() => {
    if (isConnected === true) {
      fetchChainPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, chainExchangeRate, isConnected]);

  useEffect(() => {
    const fetchRates = async () => {
      fetchChainRate();
    };
    // Fetch prices immediately and then every 2 minutes
    fetchChainRate();
    const priceInterval = setInterval(fetchRates, 2 * 60 * 1000);
    // Clear the interval on unmount
    return () => clearInterval(priceInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  const fetchChainRate = async () => {
    if (!chain) {
      return;
    }

    // const userData = { fToken, tToken, service: 'defi', subService: 'defi' };
    const userData = {
      chain,
    };

    try {
      setLoading(true);

      const response = await getChainRateSwapService(userData);

      if (response.chainExchangeRate) {
        dispatch(getChainRateSwap(response));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChainPrice = async () => {
    if (!chainExchangeRate) {
      return;
    }
    // const userData = { fToken, tToken, service: 'defi', subService: 'defi' };
    const userData = { chainExchangeRate, balance };

    try {
      setLoading(true);
      setIsBalanceLoading(true);

      const response = await getChainPriceService(userData);
      console.log({ exchangeData: response });

      if (response.chainPrice) {
        dispatch(getChainPrice(response));
        setIsBalanceLoading(false);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //============{SLIPPAGE}=================================

  //TODO, Slippage has to be a valid Integer [0-9] range from 0-50 {max = 50}
  //================={Slippage controller}===============
  useEffect(() => {
    let slippageValue = Number(slippage);
    if (slippage !== null && slippageValue > 0 && slippageValue < 1) {
      setIsLowSlippage(true);
    }

    if (slippageValue > 3) {
      setIsWarning(true);
    }

    if (slippage !== null && slippageValue > 1 && slippageValue <= 3) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }

    if (slippage === null || undefined) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
    if (slippage === '') {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
  }, [slippage, isWarning, isLowSlippage]);

  const closeModal = () => {
    setIsTokenModalOpen(false);
  };

  return (
    <Modal
      isOpen={isTokenModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Token Modal"
    >
      <div className="flex flex-col px-4 pt-4 gap-4">
        <div className="flex h-8 justify-between mb-6">
          <div className="text-5xl leading-8 text-black font-medium">
            {title}
          </div>
          <img
            className="cursor-pointer"
            src={CloseIcon}
            alt="Close modal"
            onClick={closeModal}
          />
        </div>

        <>
            <div className={stylesSlippage.frameChild} />
            <div className="self-stretch flex flex-col justify-center items-start gap-[12px]">
              <div className="self-stretch flex flex-row justify-start items-start gap-[16px] text-[14px]">
                {isSlippageAuto && !isWarning && !isLowSlippage ? (
                  <div className={`${stylesSlippage.autoWrapper2}`}>
                    <div className={`${stylesSlippage.ethereum}`}>Auto</div>
                  </div>
                ) : null}
                {!isSlippageAuto && !isWarning && !isLowSlippage ? (
                  <div className={stylesSlippage.autoWrapper}>
                    <div className={stylesSlippage.ethereum}>{slippage}%</div>
                  </div>
                ) : null}
                {!isSlippageAuto && isWarning && !isLowSlippage ? (
                  <div className={stylesSlippage.alertCircleParent}>
                    <img
                      className={stylesSlippage.chevronLeftIcon}
                      alt=""
                      src="/alertcircle1.svg"
                    />
                    <div className={stylesSlippage.ethereum}>
                      {slippage}% Custom
                    </div>
                  </div>
                ) : null}
                {!isSlippageAuto && !isWarning && isLowSlippage ? (
                  <div className={stylesSlippage.alertCircleParent}>
                    <img
                      className={stylesSlippage.chevronLeftIcon}
                      alt=""
                      src="/alerttriangle1.svg"
                    />
                    <div className={stylesSlippage.ethereum}>{slippage}%</div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-row gap-2">
                {isSlippageAuto ? (
                  <div
                    className={`cursor-pointer ${stylesSlippage.autoContainer}`}
                  >
                    <div className={`text-white ${stylesSlippage.ethereum}`}>
                      Auto
                    </div>
                  </div>
                ) : (
                  <div className={stylesSlippage.autoWrapper2}>
                    <div
                      className={`${stylesSlippage.ethereum} text-bgPrimary`}
                      onClick={() => {
                        dispatch(updateSlippage('0.7'));
                        // setSlippage('0.7');
                        setIsSlippageChange(true);
                        setIsSlippageAuto(true);
                        setIsCustom(false);
                      }}
                    >
                      Auto
                    </div>
                  </div>
                )}
                <div className="flex flex-row justify-between rounded bg-gray-100 gap-2">
                  <div
                    className={`cursor-pointer ${stylesSlippage.wrapper} ${
                      slippage === '1'
                        ? 'rounded-2xl bg-bgPrimary'
                        : 'rounded-2xl'
                    }`}
                  >
                    <div
                      className={stylesSlippage.ethereum}
                      onClick={() => {
                        dispatch(updateSlippage('1'));
                        // setSlippage('1');
                        setIsSlippageChange(true);
                        setIsSlippageAuto(false);
                        setIsCustom(false);
                      }}
                    >
                      1%
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer ${stylesSlippage.container} ${
                      slippage === '2'
                        ? 'rounded-2xl bg-bgPrimary'
                        : 'rounded-2xl'
                    }`}
                  >
                    <div
                      className={stylesSlippage.ethereum}
                      onClick={() => {
                        dispatch(updateSlippage('2'));
                        // setSlippage('2');
                        setIsSlippageChange(true);
                        setIsSlippageAuto(false);
                        setIsCustom(false);
                      }}
                    >
                      2%
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer ${stylesSlippage.container} ${
                      slippage === '3'
                        ? 'rounded-2xl bg-bgPrimary'
                        : 'rounded-2xl'
                    }`}
                  >
                    <div
                      className={stylesSlippage.ethereum}
                      onClick={() => {
                        dispatch(updateSlippage('3'));
                        // setSlippage('3');
                        setIsSlippageChange(true);
                        setIsSlippageAuto(false);
                        setIsCustom(false);
                      }}
                    >
                      3%
                    </div>
                  </div>
                  {isCustom === true ? (
                    <div className="flex">
                      <div className="flex object-contain ml-2">
                        <input
                          type="text"
                          placeholder="custom"
                          className="focus:outline-0 ml-2 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-[#9D9DA3]
                border border-secondaryFillLight hover:border-[#9D9DA3]"
                          value={customSlippage}
                          onChange={(e) => {
                            setCustomSlippage(e.target.value);
                            // setSlippage(e.target.value);
                            dispatch(updateSlippage(e.target.value));
                            setIsSlippageChange(true);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${stylesSlippage.customWrapper} ${
                        slippage === 'custom'
                          ? 'rounded-2xl bg-bgPrimary'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.ethereum}
                        onClick={() => setIsCustom(true)}
                      >
                        Custom
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isLowSlippage && (
              <div
                className={`${stylesSlippage.transactionWithExtremelyLowWrapper}`}
              >
                <div className={stylesSlippage.slippageTolerance}>
                  Transaction with extremely low slippage tolerance might be
                  reverted because of very small market movement
                </div>
              </div>
            )}
            {isWarning && (
              <div
                className={`${stylesSlippage.youMayReceive12LessWithWrapper}`}
              >
                <div className={stylesSlippage.slippageTolerance}>
                  {`You may receive ${slippage}% less with this level of slippage tolerance`}
                </div>
              </div>
            )}

            <div className={`${stylesSlippage.frameChild}`} />
            {balance && (
              <>
                <div className="self-stretch flex flex-col justify-center items-start gap-[12px]">
                  <div
                    className={`text-[14px] ${stylesSlippage.transactionDeadline}`}
                  >
                    Wallet balance
                  </div>
                </div>
              </>
            )}
          </>
          {balance && (
            <>
              <>
                <div className="self-stretch rounded-2xl bg-surface-tint-d-8 overflow-hidden flex flex-col py-4 px-4 items-center justify-start gap-[8px] text-center text-13xl">
                  <div
                    className={`self-stretch relative tracking-[0.02em] leading-[44px] ${
                      isBalanceLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[44px]'
                        : ''
                    }`}
                  >
                    {isBalanceLoading ? '' : `${balance} ${chainSymbol}`}
                  </div>
                  <div
                    className={`self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-black ${
                      isBalanceLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {isBalanceLoading ? '' : `~$ ${chainUsdBalance}`}
                  </div>
                </div>
              </>
              <>
                <div className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-0 items-center justify-start gap-[12px]">
                 
                  <FaWallet />
                  <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                    {address
                      ? address?.substring(0, 6) +
                        '...' +
                        address?.substring(10, 14)
                      : ''}
                  </div>
                </div>
              </>
              <div className="mt-2 flex bg-lightslategray-300 w-full h-px" />
            </>
          )}
      </div>
    </Modal>
  );
}

export default SlippageModal;
