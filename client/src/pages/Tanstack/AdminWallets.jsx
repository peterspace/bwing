import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

import NoTransactionFound from '../../components/NoTransactionFound';
import Frameservicesadvert from './Frameservicesadvert';

const AdminWallets = (props) => {
  const { data } = props;

  return (
    <div className="container mx-auto text-gray-900 dark:text-gray-100 overflow-auto">
      {data ? (
        <>
          <Frameservicesadvert allWallets={data} />
        </>
      ) : (
        <NoTransactionFound />
      )}
    </div>
  );
};

export default AdminWallets;
