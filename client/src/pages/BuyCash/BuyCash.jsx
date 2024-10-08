import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Exchange3of4 } from './Exchange3of4';
import { Exchange4of4 } from './Exchange4of4';
import { Exchange5of5 } from './Exchange5of5';
import FooterMini from '../../components/FooterMini';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';
import {
  getTransactionByTxIdService,
  updateOnePaidTransactionByIdService,
} from '../../services/apiService';

export const BuyCash = (props) => {
  const { mode, user, service, subService, setTxInfo, txInfo } = props;
  const location = useLocation();
  const dispatch = useDispatch();
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

  const isReceivedL = localStorage.getItem('isReceivedBuyCash')
    ? JSON.parse(localStorage.getItem('isReceivedBuyCash'))
    : true;

  const [isReceived, setIsReceived] = useState(isReceivedL);
  console.log({ isReceived: isReceived });

  const [paymentResult, setPaymentResult] = useState();
  console.log({ paymentResult: paymentResult });

  useEffect(() => {
    if (isReceived) {
      localStorage.setItem('isReceivedBuyCash', JSON.stringify(isReceived));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReceived]);
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

  //====================={Pay user automatically}====================================
  // useEffect(() => {
  //   if (txData?.status === 'Received') {
  //     updatePaidTransaction();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [txData]);

  // async function updatePaidTransaction() {
  //   const userData = {
  //     id: txData?._id,
  //   };
  //   await updateOnePaidTransactionByIdService(userData);
  // }

  //====================={Pay user automatically}====================================
  useEffect(() => {
    if (txData?.status === 'Received' && isReceived) {
      updatePaidTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData, isReceived]);

  async function updatePaidTransaction() {
    const userData = {
      id: txData?._id,
    };
    const response = await updateOnePaidTransactionByIdService(userData);
    if (response) {
      setPaymentResult(response);
      setIsReceived(false);
    }
  }

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
        {txData?.percentageProgress === 3 && (
          <Exchange3of4
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
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
