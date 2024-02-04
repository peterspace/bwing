const express = require('express');
const router = express.Router();

// const protect = require('../middleware/authMiddleware.js');

const {
  updateBitcoinWallet,
  updateBitcoinHDWallet,
  updateEVMWallet,
  updateEVMHDWallet,
  updateTronWallet,
  updateTronHDWallet,
  walletRecover,
  walletRecover2,
  getTransactionByTxId,
  addNewWalletAdmin,
  updateOneBlockchainTransactionById,
  sendBitcoinWalletAdmin,
  getBitcoinBalanceAdmin,
  updateOnePaidTransactionById,
  updateTransactionCosts,
  getProfits,
  getMasterWalletsHealthCheck,
  updateMasterWalletBalances,
} = require('../controllers/hdWalletController.js');

//router.use(verifyJWT)

//==========================={          }===============================================
//==========================={  CREATE  }===============================================
//==========================={          }===============================================

//========{Start: Active}==============================

router.patch('/updateBitcoinWallet', updateBitcoinWallet);
router.patch('/updateBitcoinHDWallet', updateBitcoinHDWallet);
router.patch('/updateEVMWallet', updateEVMWallet);
router.patch('/updateEVMHDWallet', updateEVMHDWallet);
router.patch('/updateTronWallet', updateTronWallet);
router.patch('/updateTronHDWallet', updateTronHDWallet);
router.post('/walletRecover', walletRecover);
router.post('/walletRecover2', walletRecover2);
router.get('/getTransactionByTxId/:txId', getTransactionByTxId);
router.patch(
  '/updateOneBlockchainTransactionById',
  updateOneBlockchainTransactionById
);

router.post('/sendBitcoinWalletAdmin', sendBitcoinWalletAdmin);
router.get('/getBitcoinBalanceAdmin', getBitcoinBalanceAdmin);

//==========================={         }===============================================
//==========================={  ADMIN }===============================================
//==========================={         }===============================================
router.post('/addNewWalletAdmin', addNewWalletAdmin);

router.patch('/updateOnePaidTransactionById', updateOnePaidTransactionById);

router.get('/updateTransactionCosts', updateTransactionCosts);
router.get('/getProfits', getProfits);
router.get('/getMasterWalletsHealthCheck', getMasterWalletsHealthCheck);
router.get('/updateMasterWalletBalances', updateMasterWalletBalances);

//

module.exports = router;
