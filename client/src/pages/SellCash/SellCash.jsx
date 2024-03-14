import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Exchange3of4 } from './Exchange3of4';
import { Exchange4of4 } from './Exchange4of4';
import { Exchange5of5 } from './Exchange5of5';
import FooterMini from '../../components/FooterMini';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';
import { getTransactionByTxIdService } from '../../services/apiService';

import io from 'socket.io-client';
// const ENDPOINT = 'http://localhost:4000'; // "https://chat-app.render.com"; -> After deployment
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
var socket;

export const SellCash = (props) => {
  const { mode, user, service, subService, txInfo, setTxInfo } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  /************************************************************************************** */
  /******************************{SOCKET IO}********************************* */
  /************************************************************************************** */

  //============{Socket io params}==========================================
  const [socketConnected, setSocketConnected] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState();
  console.log({ activeTransaction });

  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [refetchTxData, setRefetchTxData] = useState(false);
  const [fTitle, setFTitle] = useState('You give');
  const [tTitle, setTTitle] = useState('You get');
  //====================================================================================================

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setTxInfo(response);
    }
  };

  //=================={On Component Mount}==================================
  useEffect(() => {
    if (id) {
      updateTxData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateTxData() {
    const response = await getTransactionByTxIdService(id);
    dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
  }

  //=================={Socket io}============================
  useEffect(() => {
    socket = io(BACKEND_URL);
    // socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));

    // eslint-disable-next-line
  }, []);

  // // set activeTransaction as txData if activeTransaction does not exist
  useEffect(() => {
    if (!activeTransaction && txData) {
      setActiveTransaction(txData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData]);
  
  useEffect(() => {
    joinTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransaction]);

  async function joinTransaction() {
    if (activeTransaction) {
      socket.emit('joinTransaction', {
        userId: user?._id ? user?._id : user?.userId,
        username: user?.name,
        // room: activeTransaction?._id || txData?._id,
        room: activeTransaction?._id,
      }); // socket io
    }
  }

  useEffect(() => {
    socket.on('updated transaction', (newTransaction) => {
      setActiveTransaction(newTransaction);
    });
  });

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============
  return (
    <>
      <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
        {txData?.percentageProgress === 3 && (
          <Exchange3of4
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
            setRefetchTxData={setRefetchTxData}
          />
        )}
        {txData?.percentageProgress === 4 && (
          <Exchange4of4
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
          />
        )}
        {txData?.percentageProgress === 5 && (
          <Exchange5of5
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
            setRefetchTxData={setRefetchTxData}
          />
        )}
      </div>

      <div className="relative text-gray-900 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
        <div className="flex flex-col justify-center items-center">
          <FooterMini />
        </div>
      </div>
    </>
  );
};
