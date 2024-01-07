const bitcoin = require('bitcoin-address-validation');
const ethereum = require('ethereum-address');
const tronWeb = require('tronweb');

// function validateCryptoAddress(walletAddress) {
const validateCryptoAddress = async (walletAddress) => {
  let result = {};

  // Bitcoin Address Validation
  if (
    bitcoin.validate(walletAddress, 'mainnet') ||
    bitcoin.validate(walletAddress, 'testnet')
  ) {
    const addressInfo = bitcoin.getAddressInfo(walletAddress);
    console.log(addressInfo);
    result = { valid: true, network: 'Bitcoin' };

    result = { ...result, addressInfo };
  } else {
    result = { valid: false, network: null };
  }

  // Bitcoin Address Info
  //  if (
  //   bitcoin.validate(walletAddress, 'prod') ||
  //   bitcoin.validate(walletAddress, 'testnet')
  // ) {
  //   const addressInfo = bitcoin.getAddressInfo(walletAddress)
  //   console.log(addressInfo)
  // }

  // Ethereum Address Validation
  if (ethereum.isAddress(walletAddress)) {
    result = { valid: true, network: 'Ethereum' };
  } else if (!result.valid) {
    result = { valid: false, network: null };
  }

  // Tron Address Validation
  if (tronWeb.isAddress(walletAddress)) {
    result = { valid: true, network: 'Tron' };
  } else if (!result.valid) {
    result = { valid: false, network: null };
  }

  return result;
};

// Example usage:
// const bitcoinAddress = 'yourBitcoinAddress';
// const ethereumAddress = 'yourEthereumAddress';
// const tronAddress = 'yourTronAddress';

// const bitcoinAddress = 'mououTnjG5mXa5NJGqfdcyQPN4Qr1BZUAf';
// const ethereumAddress = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
// const tronAddress = 'TWo1bbdmV67hyL5747WMzSeD3uwW5P9tCa';

// console.log(validateCryptoAddress(bitcoinAddress));
// console.log(validateCryptoAddress(ethereumAddress));
// console.log(validateCryptoAddress(tronAddress));

// Promise { { valid: true, network: 'bitcoin' } }
// Promise { { valid: true, network: 'ethereum' } }
// Promise { { valid: true, network: 'tron' } }

module.exports = {
  validateCryptoAddress,
};



// {
//   response: {
//     valid: true,
//     network: 'bitcoin',
//     addressInfo: {
//       type: 'p2pkh',
//       network: 'mainnet',
//       address: '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem',
//       bech32: false
//     }
//   }
// }


// {
//   response: {
//     valid: true,
//     network: 'bitcoin',
//     addressInfo: {
//       type: 'p2pkh',
//       network: 'testnet',
//       address: 'mououTnjG5mXa5NJGqfdcyQPN4Qr1BZUAf',
//       bech32: false
//     }
//   }
// }


// {
//   response: {
//     valid: true,
//     network: 'bitcoin',
//     addressInfo: {
//       bech32: true,
//       network: 'mainnet',
//       address: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
//       type: 'p2wpkh'
//     }
//   }
// }

