// Etherscan;

const axios = require('axios');
const { ethers } = require('ethers');

// works for both fromAddress and to Address, just like on etherscan
const fromAddress = '0x6fba12b1370499C5824E9383c445C3298D72501C';
const toAddress = '0x2754897d2B0493Fd0463281e36db83BB202f6343';
const address = fromAddress;
const etherscanApiKey = 'F3W37VVXP8QNP36CS3ZIKSYWU3Z98KPIBJ';
//==============================================={Etherscan native}==================================================
const apiEndpointMainnet = 'https://api.etherscan.io/api'; // mainnet
const apiEndpointGoerli = 'https://api-goerli.etherscan.io/api'; // goerli test net
const apiEndpoint = apiEndpointGoerli;
const blockchainUrlMainnet = 'https://etherscan.io/tx'; // goerli test net
const blockchainUrlGoerli = 'https://goerli.etherscan.io/tx'; // goerli test net
const blockchainUrlEndpoint = blockchainUrlGoerli;
//==============================================={Etherscan native}==================================================

/**
 *
 * TRANSACTION COST ESTIMATOR
 */

const networkRPCMainnet = 'https://cloudflare-eth.com';
const networkRPCGoreli = 'https://rpc.ankr.com/eth_goerli';
// const networkRPC = networkRPCGoreli;
const networkRPC = networkRPCMainnet;

//// const provider = ethers.getDefaultProvider("homestead");
//networkRPC = 'https://cloudflare-eth.com';

// Define a function to get the transaction history of the address.
async function getTransactionHistory() {
  try {
    const module = 'account';
    const action = 'txlist';
    // const startBlock = 0;
    // const startBlock = 9965513;// transaction occured her

    const blockRange = 1000; // start from the previous 1000 blocks
    const endBlock = 'latest';
    const startBlock = Math.max(0, endBlock - blockRange);

    const apiUrl = `${apiEndpoint}?module=${module}&action=${action}&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${etherscanApiKey}`;

    const response = await axios.get(apiUrl);

    if (response.data.status === '1') {
      // Transaction history data is in response.data.result.
      console.log('Transaction History:', response.data.result);
    } else {
      console.error('Error:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
// getTransactionHistory();
//sent to blendery
const getNativeTransactionToBlendery = async (blenderyAddress, value) => {
  const module = 'account';
  const action = 'txlist';
  // const startBlock = 0;
  // const startBlock = 9965513;// transaction occured her
  // const blockRange = 1000; // start from the previous 1000 blocks
  const blockRange = 5000; // start from the previous 1000 blocks
  const endBlock = 'latest';
  const startBlock = Math.max(0, endBlock - blockRange);

  const apiUrl = `${apiEndpoint}?module=${module}&action=${action}&address=${blenderyAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${etherscanApiKey}`;

  const response = await axios.get(apiUrl);

  if (response.data.status === '1') {
    // USDT token transaction history data is in response.data.result.

    //   console.log('USDT Transaction History:', response.data.result);
    const allData = response.data.result;
    console.log({ allData: allData });
    console.log({ allData1: allData[0] });

    let transaction = {};

    let allIndex = allData.length;

    let lastIndex = allIndex - 1;
    let l = allData[lastIndex]; // last/most recent transaction received

    // let l = allData[0]; // first transaction

    let amount = l.value;
    let valueFormatted = ethers.utils.formatEther(amount.toString()).toString();

    if (
      l?.to.toLowerCase() == blenderyAddress.toLowerCase() &&
      Number(valueFormatted) >= Number(value)
    ) {
      console.log({ targetWallet: l });
      let summary = {
        txId: l?.hash,
        fromAddress: l?.from,
        toAddress: l?.to,
        amountRaw: l?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${l?.hash}`,
      };

      transaction = summary;
      console.log({ transaction: transaction });
      // return transaction;
    }
    return transaction;
  }
};
const getNativeTransactionToUser = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const module = 'account';
  const action = 'txlist';
  // const startBlock = 0;
  // const startBlock = 9965513;// transaction occured her

  const blockRange = 1000; // start from the previous 1000 blocks
  const endBlock = 'latest';
  const startBlock = Math.max(0, endBlock - blockRange);

  const apiUrl = `${apiEndpoint}?module=${module}&action=${action}&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${etherscanApiKey}`;

  const response = await axios.get(apiUrl);

  if (response.data.status === '1') {
    // USDT token transaction history data is in response.data.result.

    //   console.log('USDT Transaction History:', response.data.result);
    const allData = response.data.result;

    let requiredTransaction = [];
    let transaction = {};

    allData.map(async (l) => {
      let amount = l.value;
      let valueFormatted = ethers.utils
        .formatEther(amount.toString())
        .toString();
      if (
        l.from == blenderyAddress &&
        l?.to == userAddress &&
        valueFormatted >= value
      ) {
        requiredTransaction.push(l);
      }
    });
    if (requiredTransaction.length > 0 && requiredTransaction[0].value) {
      const responseInfo = requiredTransaction[0];
      let summary = {
        txId: responseInfo?.hash,
        fromAddress: responseInfo?.from,
        toAddress: responseInfo?.to,
        amountRaw: responseInfo?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.hash}`,
      };

      transaction = summary;
      // console.log({transaction: transaction});
      return transaction;
    }
  }
};

// node etherscan.js

//==============================================={Etherscan erc20}==================================================

const getERC20TransactionToBlendery = async (
  blenderyAddress,
  erc20TokenAddress,
  value
) => {
  const module = 'account';
  const action = 'tokentx';

  const apiUrl = `${apiEndpoint}?module=${module}&action=${action}&address=${blenderyAddress}&contractaddress=${erc20TokenAddress}&apikey=${etherscanApiKey}`;

  const response = await axios.get(apiUrl);

  if (response.data.status === '1') {
    // USDT token transaction history data is in response.data.result.

    //   console.log('USDT Transaction History:', response.data.result);
    const allData = response.data.result;
    console.log({ allData: allData });
    console.log({ allData1: allData[0] });

    let transaction = {};

    let allIndex = allData.length;

    let lastIndex = allIndex - 1;
    let l = allData[lastIndex]; // last/most recent transaction received

    // let l = allData[0]; // first transaction
    let amount = l.value;
    let decimals = l.tokenDecimal;
    let valueFormatted = ethers.utils
      .formatUnits(amount.toString(), decimals.toString())
      .toString();

    console.log({ valueFormatted: valueFormatted });

    if (
      l?.to.toLowerCase() == blenderyAddress.toLowerCase() &&
      Number(valueFormatted) >= Number(value)
    ) {
      console.log({ targetWallet: l });
      let summary = {
        txId: l?.hash,
        fromAddress: l?.from,
        toAddress: l?.to,
        amountRaw: l?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${l?.hash}`,
      };

      transaction = summary;
      console.log({ transaction: transaction });
      // return transaction;
    }
    return transaction;
  }
};

//==============================================={ERC20}==================================================

const getERC20TransactionToUser = async (
  userAddress,
  blenderyAddress,
  erc20TokenAddress,
  value
) => {
  const module = 'account';
  const action = 'tokentx';

  const apiUrl = `${apiEndpoint}?module=${module}&action=${action}&address=${blenderyAddress}&contractaddress=${erc20TokenAddress}&apikey=${etherscanApiKey}`;

  const response = await axios.get(apiUrl);

  if (response.data.status === '1') {
    // USDT token transaction history data is in response.data.result.

    //   console.log('USDT Transaction History:', response.data.result);
    const allData = response.data.result;

    let requiredTransaction = [];
    let transaction = {};

    allData.map(async (l) => {
      let amount = l.value;
      let decimals = l.tokenDecimal;
      let valueFormatted = ethers.utils
        .formatUnits(amount.toString(), decimals.toString())
        .toString();
      if (
        l.from == blenderyAddress &&
        l?.to == userAddress &&
        valueFormatted >= value
      ) {
        requiredTransaction.push(l);
      }
    });
    if (requiredTransaction.length > 0 && requiredTransaction[0].value) {
      const responseInfo = requiredTransaction[0];
      let summary = {
        txId: responseInfo?.hash,
        fromAddress: responseInfo?.from,
        toAddress: responseInfo?.to,
        amountRaw: responseInfo?.value,
        amount: value,
        blockchainUrl: `${blockchainUrlEndpoint}/${responseInfo?.hash}`,
      };

      transaction = summary;
      // console.log({transaction: transaction});
      return transaction;
    }
  }
};
// getERC20TransactionToUser({
//   userAddress: '0x3d55ccb2a943d88d39dd2e62daf767c69fd0179f',
//   blenderyAddress: '0xb170fbd8c75cf4ba77dc3fea4677bfa807503374',
//   erc20TokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
//   value: '199000000',
// });

// constTransactionResult = {
//   transaction: {
//     blockNumber: '15904132',
//     timeStamp: '1667655095',
//     hash: '0x71c635448a5c0bc38c5c61c2626623e853f4feaea392d538d550fdf1485e8c4a',
//     nonce: '4',
//     blockHash:
//       '0x5b304dbe708da6541f93e1b8828db285f0d4e0fa53621c21811fd7eee3a2c103',
//     from: '0xb170fbd8c75cf4ba77dc3fea4677bfa807503374',
//     contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//     to: '0x3d55ccb2a943d88d39dd2e62daf767c69fd0179f',
//     value: '199000000',
//     tokenName: 'Tether USD',
//     tokenSymbol: 'USDT',
//     tokenDecimal: '6',
//     transactionIndex: '7',
//     gas: '100000',
//     gasPrice: '34500000000',
//     gasUsed: '41309',
//     cumulativeGasUsed: '982345',
//     input: 'deprecated',
//     confirmations: '2572811',
//   },
// };

const getGasEstimatesEthereum = async () => {
  // https://api.etherscan.io/api
  //  ?module=gastracker
  //  &action=gasoracle
  //  &apikey=YourApiKeyToken

  const apiUrl =
    'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=F3W37VVXP8QNP36CS3ZIKSYWU3Z98KPIBJ';

  const response = await axios.get(apiUrl);
  console.log({ response: response });

  if (response.data.status === '1') {
    const result = response.data.result;
    return result;
  }
};

const getGasPriceEthereum = async () => {
  // https://api.etherscan.io/api
  //  ?module=gastracker
  //  &action=gasoracle
  //  &apikey=YourApiKeyToken

  const apiUrl =
    'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=F3W37VVXP8QNP36CS3ZIKSYWU3Z98KPIBJ';

  const response = await axios.get(apiUrl);
  // console.log({ response: response });

  if (response.data.result) {
    const result = response.data.result;

    const currentGasPriceHex = await Promise.resolve(result);
    // console.log('currentGasPriceHex:', currentGasPriceHex);

    const currentGasPrice = ethers.utils.formatEther(currentGasPriceHex);
    console.log('currentGasPrice:', currentGasPrice); // price in wei

    const currentGasPriceGwei = currentGasPrice * 1e9;
    console.log({ currentGasPriceGwei: currentGasPriceGwei });
    const gasPrice = {
      currentGasPrice,
      currentGasPriceGwei,
      suggestBaseFee: currentGasPriceGwei,
      safeGasPrice: Math.round(currentGasPriceGwei),
    };

    return gasPrice;
  }
};

//As of EIP-1559, the overall fee a transaction creator pays is calculated as:
//(base fee + priority fee) x units of gas used)

/**
 * base fee = 52
 * priority fee = 1.5
 * units of gas used =21000
 * overall fee = (base fee + priority fee) x units of gas used))
 * overall fee = 112350
 */

const getGasEstimateEthereum = async () => {
  // https://api.etherscan.io/api
  //  ?module=gastracker
  //  &action=gasoracle
  //  &apikey=YourApiKeyToken

  const apiUrl =
    'https://api.etherscan.io/api?module=proxy&action=eth_estimateGas&data=0x4e71d92d&to=0xf0160428a8552ac9bb7e050d90eeade4ddd52843&value=0xff22&gasPrice=0x51da038cc&gas=0x5f5e0ff&apikey=F3W37VVXP8QNP36CS3ZIKSYWU3Z98KPIBJ';

  const response = await axios.get(apiUrl);
  // console.log({ response: response });

  if (response.data.result) {
    // const result = response.data.result;

    const result = '0x6556';
    const currentGasPriceHex = await Promise.resolve(result);
    // console.log('currentGasPriceHex:', currentGasPriceHex);

    const currentGasPrice = ethers.utils.formatEther(currentGasPriceHex);
    console.log('currentGasPrice:', currentGasPrice); // price in wei

    const currentGasPriceGwei = currentGasPrice * 1e9;
    console.log({ currentGasPriceGwei: currentGasPriceGwei });
    const gasPrice = {
      currentGasPrice,
      currentGasPriceGwei,
      suggestBaseFee: currentGasPriceGwei,
      safeGasPrice: Math.round(currentGasPriceGwei),
    };

    return gasPrice;
  }
};

const getTransactionCost = async (isERC20) => {
  // let isERC20 = false;

  if (isERC20) {
    // The gas price (in wei)...
    // const provider = new ethers.getDefaultProvider("homestead"); // default is ethereum homestead provider
    const provider = new ethers.providers.JsonRpcProvider(networkRPC);
    const feeData = await provider.getFeeData();
    console.log({ feeData: feeData });

    const gasPrice = ethers.utils.formatUnits(feeData.gasPrice, 'gwei');
    const maxFeePerGas = ethers.utils.formatUnits(feeData.maxFeePerGas, 'gwei');

    //==========={Total Transaction cost calculation}====================
    const gasLimit = 100000; // {G(Transaction): Paid for every transaction but it varies for ERC20 Transactions like USDT from above 45,000 - 200,000 and in rare cases up to 500,000}
    const gasGasLimitMax = 200000;

    // const gasLimit = 46097; // ERC20 Tokens (testing)
    // const gasLimit = 46200; // ERC20 Tokens (min)
    // const gasLimit = 70000; // ERC20 Tokens (max)

    const lastBaseFeePerGas = ethers.utils.formatUnits(
      feeData.lastBaseFeePerGas,
      'gwei'
    );
    const maxPriorityFeePerGas = ethers.utils.formatUnits(
      feeData.maxPriorityFeePerGas,
      'gwei'
    );

    const totalGasGwei =
      gasLimit * (Number(lastBaseFeePerGas) + Number(maxPriorityFeePerGas));
    const totalGasEth = totalGasGwei / 1e9;

    //===={Considering direct market rate}===================
    const totalGasGweiMarket = gasLimit * Number(gasPrice);
    const totalGasEthMarket = totalGasGweiMarket / 1e9;

    const priceData = {
      gasLimit,
      gasPrice,
      lastBaseFeePerGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      totalGasGwei,
      totalGasEth,
      totalGasGweiMarket,
      totalGasEthMarket,

    }
    console.log({ priceData: priceData });


    const response = {
      gasLimit,
      baseFee:lastBaseFeePerGas,
      priorityFee: maxPriorityFeePerGas,
      txCost: totalGasEth, // to be used in checking wallet balance's difference
    };

    console.log({ response: response });
    return response;
  } else {
    // The gas price (in wei)...
    // const provider = new ethers.getDefaultProvider("homestead"); // default is ethereum homestead provider
    const provider = new ethers.providers.JsonRpcProvider(networkRPC);
    const feeData = await provider.getFeeData();
    console.log({ feeData: feeData });

    const gasPrice = ethers.utils.formatUnits(feeData.gasPrice, 'gwei');
    const maxFeePerGas = ethers.utils.formatUnits(feeData.maxFeePerGas, 'gwei');

    //==========={Total Transaction cost calculation}====================
    const gasLimit = 21000; // standard {G(Transaction): Paid for every transaction}

    const lastBaseFeePerGas = ethers.utils.formatUnits(
      feeData.lastBaseFeePerGas,
      'gwei'
    );
    const maxPriorityFeePerGas = ethers.utils.formatUnits(
      feeData.maxPriorityFeePerGas,
      'gwei'
    );

    const totalGasGwei =
      gasLimit * (Number(lastBaseFeePerGas) + Number(maxPriorityFeePerGas));
    const totalGasEth = totalGasGwei / 1e9;

    //===={Considering direct market rate}===================
    const totalGasGweiMarket = gasLimit * Number(gasPrice);
    const totalGasEthMarket = totalGasGweiMarket / 1e9;

    
    const priceData = {
      gasLimit,
      gasPrice,
      lastBaseFeePerGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      totalGasGwei,
      totalGasEth,
      totalGasGweiMarket,
      totalGasEthMarket,

    }
    console.log({ priceData: priceData });


    const response = {
      gasLimit,
      baseFee:lastBaseFeePerGas,
      priorityFee: maxPriorityFeePerGas,
      txCost: totalGasEth, // to be used in checking wallet balance's difference
    };

    console.log({ response: response });
    return response;
  }
};

const gasPriceResult = {
  currentGasPrice: '0.000000052008469874',
  currentGasPriceGwei: 52.008469874,
  suggestBaseFee: 52.008469874,
  safeGasPrice: 52,
};

const getGasEstimatesEthereumResponse = {
  LastBlock: '18829850',
  SafeGasPrice: '53',
  ProposeGasPrice: '53',
  FastGasPrice: '55',
  suggestBaseFee: '52.404337171',
  gasUsedRatio:
    '0.4976985,0.528520866666667,0.4642877,0.458345933333333,0.4518814',
};

const latestResult = {
  blockNumber: '10003044',
  blockHash:
    '0x193822e0738ff7cf90bc0a94464b83cc95cf9f588f0d7640f82e7915b4b0a8e1',
  timeStamp: '1699376904',
  hash: '0x59a93c99f386c815da0c00353a437d644e2a1c78b7a430fb649f762f76e226f7',
  nonce: '2',
  transactionIndex: '33',
  from: '0x2754897d2b0493fd0463281e36db83bb202f6343',
  to: '0xb3a0fbe9830cde8b9255895df95ced2bc70f0cf3',
  value: '1000000000000000',
  gas: '21000',
  gasPrice: '1500000011',
  input: '0x',
  methodId: '0x',
  functionName: '',
  contractAddress: '',
  cumulativeGasUsed: '6265648',
  txreceipt_status: '1',
  gasUsed: '21000',
  confirmations: '210',
  isError: '0',
};

module.exports = {
  getNativeTransactionToBlendery,
  getNativeTransactionToUser,
  getERC20TransactionToBlendery,
  getERC20TransactionToUser,
  getGasEstimatesEthereum,
  getGasPriceEthereum,
  getTransactionCost,
};
