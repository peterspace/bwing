import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DashboardMenuAdmin } from '../../components/DashboardMenuAdmin';
import { DashboardMenuAdminMobile } from '../../components/DashboardMenuAdminMobile';

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

export const AdminDashboard = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  // const txData = useSelector(
  //   (state) => state.transaction?.transactionByTxIdInternal
  // );

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

  const [allMessages, setAllMessages] = useState(); // all user messages
  const [dataFetched, setDataFetched] = useState(false);
  console.log({ dataFetched });

  //===================={All Messages}======================================

  // const { data: allMessages } = useQuery(
  //   ['GET_ALL_MESSAGES'],
  //   async () => {
  //     const { data } = await axios.get(`${BACKEND_URL}/message`);
  //     return data;
  //   },
  //   {
  //     refetchInterval: 5000, // every 5 seconds
  //     refetchIntervalInBackground: true, // when tab is not on focus
  //     refetchOnMount: true,
  //   }
  // );

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
  console.log({ 'current page': page });
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
      setDataFetched(true);
    }
  }

  async function fetchAllTransactionAdminDefi() {
    //====={Admin}===========================

    const response = await getAdminDefi();
    if (response) {
      setAllDefiTransactionsAdmin(response);
      setDataFetched(true);
    }
  }

  async function fetchAllTransactionAdminBuyCash() {
    //====={Admin}===========================

    const response = await getAdminBuyCash();
    if (response) {
      setAllBuyCashTransactionsAdmin(response);
      setDataFetched(true);
    }
  }

  async function fetchAllTransactionAdminBuyCard() {
    //====={Admin}===========================

    const response = await getAdminBuyCard();
    if (response) {
      setAllBuyCardTransactionsAdmin(response);
      setDataFetched(true);
    }
  }

  async function fetchAllTransactionAdmiSellCash() {
    //====={Admin}===========================

    const response = await getAdminSellCash();
    if (response) {
      setAllSellCashTransactionsAdmin(response);
      setDataFetched(true);
    }
  }

  async function fetchAllTransactionAdmiSellCard() {
    const response = await getAdminSellCard();
    if (response) {
      setAllSellCardTransactionsAdmin(response);
      setDataFetched(true);
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
  }, []);
  useEffect(() => {
    fetchAllTransactionAdminDefi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchAllTransactionAdminBuyCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchAllTransactionAdminBuyCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchAllTransactionAdmiSellCash();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchAllTransactionAdmiSellCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    fetchAllMessages();
  }, []);

  async function fetchAllMessages() {
    const response = await getAllMessages(); // admin only
    if (response) {
      setAllMessages(response);
    }
  }

  //==================================={TX DATA}=================================================================

  //====================================================================================================

  return (
    <div className="flex flex-row gap-5 bg-[#F3F3F3] dark:bg-bgDarkMode text-gray-900 dark:text-gray-100">
      <>
        <div className="hidden xl:flex">
          <DashboardMenuAdmin setPage={setPage} user={user} page={page} />
        </div>

        {page === 'Update' && txData ? null : (
          <div className="flex xl:hidden z-20">
            <DashboardMenuAdminMobile
              setPage={setPage}
              user={user}
              page={page}
            />
          </div>
        )}
      </>

      <div className="w-full mr-5">
        {page === 'Exchange' &&
          (allExchangeTransactionsAdmin ? (
            <AdminRecord
              data={allExchangeTransactionsAdmin}
              setPage={setPage}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Defi' &&
          (allDefiTransactionsAdmin ? (
            <AdminRecord data={allDefiTransactionsAdmin} setPage={setPage} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Buy (Cash)' &&
          (allBuyCashTransactionsAdmin ? (
            <AdminRecord data={allBuyCashTransactionsAdmin} setPage={setPage} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Buy (Card)' &&
          (allBuyCardTransactionsAdmin ? (
            <AdminRecord data={allBuyCardTransactionsAdmin} setPage={setPage} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Sell (Cash)' &&
          (allSellCashTransactionsAdmin ? (
            <AdminRecord
              data={allSellCashTransactionsAdmin}
              setPage={setPage}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Sell (Card)' &&
          (allSellCardTransactionsAdmin ? (
            <AdminRecord
              data={allSellCardTransactionsAdmin}
              setPage={setPage}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}

        {page === 'Profit' &&
          (allProfits ? (
            <AdminProfitRecord data={allProfits} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}
        {page === 'Wallet' &&
          (allWallets ? (
            <AdminWallets data={allWallets} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}

        {page === 'Create' && (
          <SupportMessageAdmin
            allMessages={allMessages}
            fetchAllMessages={fetchAllMessages}
            page={'Create'}
          />
        )}
        {page === 'Inbox' && allMessages && (
          <SupportMessageAdmin
            allMessages={allMessages}
            fetchAllMessages={fetchAllMessages}
            page={'Inbox'}
          />
        )}
        {page === 'Enquiries' && allEnquiries && (
          <SupportEnquiryAdmin latestMessages={allEnquiries} />
        )}

        {page === 'Support' &&
          (allTransactions ? (
            <AdminSupportRecord data={allTransactions} setPage={setPage}/>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ))}

        {page === 'Update' && txData && (
          <CardUpdateInfo
            setPage={setPage}
            txData={txData}
            dataFetched={dataFetched}
            setDataFetched={setDataFetched}
            fetchAllTransactionAdminExchange={fetchAllTransactionAdminExchange}
            fetchAllTransactionAdminDefi={fetchAllTransactionAdminDefi}
            fetchAllTransactionAdminBuyCash={fetchAllTransactionAdminBuyCash}
            fetchAllTransactionAdminBuyCard={fetchAllTransactionAdminBuyCard}
            fetchAllTransactionAdmiSellCash={fetchAllTransactionAdmiSellCash}
            fetchAllTransactionAdmiSellCard={fetchAllTransactionAdmiSellCard}
          />
        )}

        {/* {page === 'Update' && txData && (
          <div className="w-full h-full overflow-auto">
            <CardUpdateInfo
              setPage={setPage}
              txData={txData}
              dataFetched={dataFetched}
              setDataFetched={setDataFetched}
              fetchAllTransactionAdminExchange={
                fetchAllTransactionAdminExchange
              }
              fetchAllTransactionAdminDefi={fetchAllTransactionAdminDefi}
              fetchAllTransactionAdminBuyCash={fetchAllTransactionAdminBuyCash}
              fetchAllTransactionAdminBuyCard={fetchAllTransactionAdminBuyCard}
              fetchAllTransactionAdmiSellCash={fetchAllTransactionAdmiSellCash}
              fetchAllTransactionAdmiSellCard={fetchAllTransactionAdmiSellCard}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
