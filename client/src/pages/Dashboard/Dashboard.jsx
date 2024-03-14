import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTransactionByTxIdService } from '../../services/apiService';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';

export const Dashboard = (props) => {
  const { setService, setSubService, setTxInfo } = props;
  const { user } = useSelector((state) => state.user);
  //=================={On Component Mount}==================================

  //====================================================================================================

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  return (
    // <div className="grid grid-cols-1 overflow-hidden">
    <div className="max-h-[92vh] overflow-hidden">
      <>
        {user?.role === 'Admin' && <AdminDashboard />}

        {user?.role == 'User' && (
          <UserDashboard
            setService={setService}
            setSubService={setSubService}
            setTxInfo={setTxInfo}
          />
        )}
      </>
    </div>
  );
};
