import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DashboardMenuAdmin } from '../../components/DashboardMenuAdmin';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import {
  getTransactionByTxIdService,
  updateOneBlockchainTransactionByIdService,
  //=============================================
  getAllTransactions,
  //======{Admin}==============
  getAdminExchange,
  getAdminDefi,
  getAdminBuyCash,
  getAdminBuyCard,
  getAdminSellCash,
  getAdminSellCard,
  getProfits,
  getMasterWalletsHealthCheck,
  getAllMessages,
} from '../../services/apiService';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';
import AdminRecord from '../Tanstack/AdminRecord';
import AdminSupportRecord from '../Tanstack/AdminSupportRecord';
import AdminProfitRecord from '../Tanstack/AdminProfitRecord';
import AdminWallets from '../Tanstack/AdminWallets';
import { CardUpdateInfo } from '../../components/CardUpdateInfo';
import CircularProgress from '../../components/CircularProgress';
import SupportMessageAdmin from '../../components/SupportMessageAdmin';
import SupportEnquiryAdmin from '../../components/SupportEnquiryAdmin';

const menu = [
  {
    name: 'Bitcoin',
    id: 'bitcoin', //coingeko id
    logoUrl:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    symbol: 'BTC',
    amount: '1.21',
    date: `$31, 688`,
    status: true,
  },
  {
    name: 'Ethereum',
    logoUrl:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    id: 'ethereum', //coingeko id
    symbol: 'ETH',
    amount: '3.25',
    date: `$5,150.37`,
    status: true,
  },

  {
    name: 'Tron',
    logoUrl:
      'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066',
    id: 'tron', //coingeko id
    symbol: 'TRX',
    amount: '1500',
    date: `$1,499.67`,
    status: false,
  },
];

export const AdminDashboard = (props) => {
  const { user, setTxInfo } = props;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const location = useLocation();

  const dispatch = useDispatch();
  const [idx, setIdx] = useState(menu[0]?.id);

  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );

  const isUpdating = localStorage.getItem('isUpdating')
    ? JSON.parse(localStorage.getItem('isUpdating'))
    : false;

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  // const txData = useSelector(
  //   (state) => state.transaction?.transactionByTxIdInternal
  // );
  const [refetchTxData, setRefetchTxData] = useState(false);
  const [refetchAdminData, setRefetchAdminData] = useState(false);

  const transactions = localStorage.getItem('transactions')
    ? JSON.parse(localStorage.getItem('transactions'))
    : null;

  //=========================={Admin}=======================================================
  const [allTransactions, setAllTransactions] = useState();
  const [allExchangeTransactionsAdmin, setAllExchangeTransactionsAdmin] =
    useState();
  const [allDefiTransactionsAdmin, setAllDefiTransactionsAdmin] = useState();

  const [allBuyCashTransactionsAdmin, setAllBuyCashTransactionsAdmin] =
    useState();
  const [allBuyCardTransactionsAdmin, setAllBuyCardTransactionsAdmin] =
    useState();

  const [allSellCashTransactionsAdmin, setAllSellCashTransactionsAdmin] =
    useState();

  const [allSellCardTransactionsAdmin, setAllSellCardTransactionsAdmin] =
    useState();

  const [allProfits, setAllProfits] = useState();
  const [allWallets, setAllWallets] = useState();

  console.log({ allProfits: allProfits });
  console.log({ allExchangeTransactionsAdmin: allExchangeTransactionsAdmin });

  //===================={All Messages}======================================

  const { data: allMessages } = useQuery(
    ['GET_ALL_MESSAGES'],
    async () => {
      const { data } = await axios.get(`${BACKEND_URL}/message`);
      return data;
    },
    {
      refetchInterval: 5000, // every 5 seconds
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );

  const { data: allEnquiries } = useQuery(
    ['GET_ALL_ENGQUIRY'],
    async () => {
      const { data } = await axios.get(`${BACKEND_URL}/enquiry`);
      return data;
    },
    {
      refetchInterval: 5000, // every 5 seconds
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );

  //=========={Pages}================================================================
  const pageL = localStorage.getItem('page')
    ? JSON.parse(localStorage.getItem('page'))
    : 'Exchange';
  const [page, setPage] = useState(pageL);
  //=========={Pages}================================================================

  //========================================={LOCATION}===================================================

  //======================================================================================================
  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //======================================================================================================
  useEffect(() => {
    if (page) {
      localStorage.setItem('page', JSON.stringify(page));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  //=============================={Admin Data Calls}===============================================

  async function fetchAllTransactionAdmin() {
    //====={Admin}===========================

    const response = await getAllTransactions();
    if (response) {
      setAllTransactions(response);
    }
  }

  async function fetchAllTransactionAdminExchange() {
    //====={Admin}===========================

    const response = await getAdminExchange();
    if (response) {
      setAllExchangeTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminDefi() {
    //====={Admin}===========================

    const response = await getAdminDefi();
    if (response) {
      setAllDefiTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminBuyCash() {
    //====={Admin}===========================

    const response = await getAdminBuyCash();
    if (response) {
      setAllBuyCashTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdminBuyCard() {
    //====={Admin}===========================

    const response = await getAdminBuyCard();
    if (response) {
      setAllBuyCardTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdmiSellCash() {
    //====={Admin}===========================

    const response = await getAdminSellCash();
    if (response) {
      setAllSellCashTransactionsAdmin(response);
    }
  }

  async function fetchAllTransactionAdmiSellCard() {
    const response = await getAdminSellCard();
    if (response) {
      setAllSellCardTransactionsAdmin(response);
    }
  }

  //====={Profits}===========================

  async function fetchAllProfits() {
    const response = await getProfits();
    if (response) {
      setAllProfits(response);
    }
  }
  //====={Master Wallets balances}===========================

  async function fetchAllWallets() {
    const response = await getMasterWalletsHealthCheck();
    if (response) {
      setAllWallets(response);
    }
  }

  useEffect(() => {
    fetchAllTransactionAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions]);

  useEffect(() => {
    fetchAllTransactionAdminExchange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExchangeTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminDefi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDefiTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminBuyCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCashTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdminBuyCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBuyCardTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdmiSellCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCashTransactionsAdmin]);
  useEffect(() => {
    fetchAllTransactionAdmiSellCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSellCardTransactionsAdmin]);

  //===================={Profits}======================================
  useEffect(() => {
    fetchAllProfits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProfits]);

  //===================={Wallets}======================================
  useEffect(() => {
    fetchAllWallets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWallets]);

  //===================={All Messages}======================================

  // useEffect(() => {
  //   fetchAllMessages();
  // }, []);

  // async function fetchAllMessages() {
  //   const response = await getAllMessages(); // admin only
  //   if (response) {
  //     setAllMessages(response);
  //   }
  // }

  //==================================={TX DATA}=================================================================

  //==================================={setting and refetching and updating txData}=======================================================

  useEffect(() => {
    if (refetchTxData) {
      fetchTxData();
      setRefetchTxData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTxData]);

  const fetchTxData = async () => {
    if (user && txData) {
      const response = await getTransactionByTxIdService(txData?._id);
      dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
      // setTxInfo(response);
      // window.location.reload();
    }
  };

  //====================================================================================================

  return (
    <div className="flex gap-5 bg-[#F3F3F3] dark:bg-bgDarkMode text-gray-900 dark:text-gray-100">
      <DashboardMenuAdmin setPage={setPage} user={user} page={page} />
      {!isUpdating && (
        <div className="w-[78%]">
          {page === 'Exchange' &&
            (allExchangeTransactionsAdmin ? (
              <AdminRecord data={allExchangeTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === 'Defi' &&
            (allDefiTransactionsAdmin ? (
              <AdminRecord data={allDefiTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === 'Buy (Cash)' &&
            (allBuyCashTransactionsAdmin ? (
              <AdminRecord data={allBuyCashTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === 'Buy (Card)' &&
            (allBuyCardTransactionsAdmin ? (
              <AdminRecord data={allBuyCardTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === 'Sell (Cash)' &&
            (allSellCashTransactionsAdmin ? (
              <AdminRecord data={allSellCashTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {page === 'Sell (Card)' &&
            (allSellCardTransactionsAdmin ? (
              <AdminRecord data={allSellCardTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
          {/* ======================{Main}==================== */}

          {page === 'Profit' &&
            (allProfits ? (
              <AdminProfitRecord data={allProfits} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}

          {/* ======================{Test}==================== */}

          {/* {page === 'Profit' &&
            (allExchangeTransactionsAdmin ? (
              <AdminProfitRecord data={allExchangeTransactionsAdmin} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))} */}
          {page === 'Wallet' &&
            (allWallets ? (
              <AdminWallets data={allWallets} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}

          {page === 'Create' && (
            <SupportMessageAdmin latestMessages={allMessages} page={'Create'} />
          )}
          {/* {page === 'Inbox' && allMessages ? (
            <SupportMessageAdmin allMessages={allMessages} page={'Inbox'} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          )} */}
          {page === 'Inbox' && allMessages && (
            <SupportMessageAdmin latestMessages={allMessages} page={'Inbox'} />
          )}
          {page === 'Enquiries' && allEnquiries && (
            <SupportEnquiryAdmin latestMessages={allEnquiries} />
          )}

          {page === 'Support' &&
            (allTransactions ? (
              <AdminSupportRecord data={allTransactions} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ))}
        </div>
      )}

      {isUpdating && txData && (
        <section className={`container p-2`}>
          <CardUpdateInfo setRefetchTxData={setRefetchTxData} />
        </section>
      )}
    </div>
  );
};
