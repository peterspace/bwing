// Etherscan;

const axios = require('axios');
const { ethers } = require('ethers');

const apiEndpointMainnet = 'https://blockstream.info/api'; // mainnet
const apiEndpointTestNet = 'https://blockstream.info/testnet/api'; // goerli test net
// const apiEndpoint = apiEndpointMainnet;
const apiEndpoint = apiEndpointTestNet;

const blockchainInfoApiKey = '0198f704-8efb-42f8-b529-ad3c2df7431e';
const apiKey = blockchainInfoApiKey;
//==============================================={Etherscan native}==================================================

const blockchainUrlMainnet =
  'https://www.blockchain.com/explorer/transactions/btc';
const blockchainUrlTest = '';
const blockchainUrlEndpoint = blockchainUrlMainnet;

const blockchainUrlBitcoinMainnet = 'https://blockstream.info/tx';
const blockchainUrlBitcoinTest = 'https://blockstream.info/testnet/tx';
const blockchainUrlBitcoinEndpoint = blockchainUrlBitcoinTest;
//==============================================={Etherscan native}==================================================

const gasPriceEthereum = async () => {
  const params = {};
  let result = {};

  const host = 'https://rest.cryptoapis.io';
  const path = '/v2/blockchain-tools/ethereum/goerli/fees/eip1559';

  const url = host + `${path}?context=Blendery`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': `6705354ea837940701ff17f4a70446e8d7822601`,
    },
    params,
  };

  console.log({ config: config });

  try {
    const response = await axios.get(url, config);

    if (response?.data) {
      console.log({ response: response?.data?.data });
      let item = response?.data?.data.item;
      const baseFeePerGas = item?.baseFeePerGas;
      const maxFeePerGas = item?.maxFeePerGas;
      const maxPriorityFeePerGas = item?.maxPriorityFeePerGas;
      result = {
        baseFeePerGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
      };

      console.log({
        baseFeePerGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
      });
    }
    return result;
  } catch (error) {
    console.log({ swapError: error });
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    // res.status(400).json(message);
  }
};

//with useraddress
const getBitcoinNativeTransactionToBlenderyWithUserAddress = async (
  userAddress,
  blenderyAddress,
  value
) => {
  const senderAddress = userAddress;
  const recipientAddress = blenderyAddress;
  const valueExpected = value;
  //   let valueExpected = 0.74929761
  try {
    const url = `${apiEndpoint}/address/${senderAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let result = {};

    // Use map to process transactions and collect the transactions where the amount was sent.
    const sentTransactions = transactions
      .map((tx) => {
        const sentAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === recipientAddress
              ? amount + output.value
              : amount,
          0
        );

        if (sentAmount > 0) {
          return {
            transaction: tx,
            sentAmount,
          };
        }

        return null;
      })
      .filter(Boolean); // Remove null entries

    console.log(`Sent Transactions to ${recipientAddress}:`);
    const newData = sentTransactions.forEach((sentTx, index) => {
      if (sentTx?.sentAmount === valueExpected * 1e8) {
        console.log(`Transaction ${index + 1}:`);
        console.log(sentTx.transaction); // Full transaction details
        console.log(`Amount Sent Satoshi: ${sentTx.sentAmount} Satoshi`);
        console.log(`Amount Sent BTC: ${sentTx.sentAmount / 1e8} BTC`);
        console.log('--------------------');
        const responseInfo = sentTx.transaction;
        const summary = {
          // tx: sentTx.transaction,
          txId: responseInfo?.txid,
          fromAddress: senderAddress,
          toAddress: recipientAddress,
          amountRaw: sentTx.sentAmount,
          amount: sentTx.sentAmount / 1e8,
          blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
        };
        result = summary;
      }
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getBitcoinNativeTransactionToBlenderyWithOutUserAddress1 = async (
  blenderyAddress,
  value
) => {
  let expectedValue = value;

  console.log({ expectedValue: expectedValue });

  let targetData = [];
  let newResult = await getSpecificReceivedTransactions(blenderyAddress); //4
  console.log({ newResult: newResult });

  if (newResult.length > 0) {
    newResult?.map(async (m) => {
      if (m?.amount === expectedValue) {
        console.log({ expectedTxnew: m });
        targetData.push(m);
      }
    });
  }
  if (targetData.length > 0) {
    return targetData[0];
  }
};

const getBitcoinNativeTransactionToBlenderyWithOutUserAddress = async (
  blenderyAddress,
  value
) => {
  let expectedValue = value;

  console.log({ expectedValue: expectedValue });

  let targetData = [];
  let newResult = await getSpecificReceivedTransactions(blenderyAddress); //4
  console.log({ newResult: newResult });

  if (newResult.length > 0) {
    newResult?.map(async (m) => {
      if (m?.amount === expectedValue) {
        console.log({ expectedTxnew: m });
        targetData.push(m);
      }
    });
  }
  if (targetData.length > 0) {
    let allIndex = targetData.length;

    let lastIndex = allIndex - 1;

    return targetData[lastIndex]; // last/most recent transaction received

    // return targetData[0];
  }
};

async function getSpecificReceivedTransactions(blenderyAddress) {
  const receiverAddress = blenderyAddress;
  try {
    const url = `${apiEndpoint}/address/${receiverAddress}/txs`;

    const response = await axios.get(url);
    const transactions = response.data;
    let allResults = [];

    // Use map to process all transactions and collect deposits.
    const receivedTransactions = transactions
      .map((tx, index) => {
        const receivedAmount = tx.vout.reduce(
          (amount, output) =>
            output.scriptpubkey_address === receiverAddress
              ? amount + output.value
              : amount,
          0
        );

        if (receivedAmount > 0) {
          return {
            transactionIndex: index,
            transaction: tx,
            receivedAmount,
          };
        }

        return null;
      })
      .filter(Boolean);

    receivedTransactions.map((specificTx, index) => {
      const responseInfo = specificTx.transaction;
      const summary = {
        // tx: specificTx.transaction,
        txId: responseInfo?.txid,
        //   fromAddress: senderAddress,
        toAddress: receiverAddress,
        amountRaw: specificTx.receivedAmount,
        amount: specificTx.receivedAmount / 1e8,
        blockchainUrl: `${blockchainUrlBitcoinEndpoint}/${responseInfo?.txid}`,
      };
      result = summary;
      // console.log({summary: summary})

      allResults.push(summary);
    });
    return allResults;
  } catch (error) {
    console.error('Error:', error);
  }
}

//==============================================={Etherscan erc20}==================================================

module.exports = {
  gasPriceEthereum,
};

// const response = {
//   item: {
//     baseFeePerGas: [Object],
//     maxFeePerGas: [Object],
//     maxPriorityFeePerGas: [Object],
//   },
// };

// const result = {
//   baseFeePerGas: { unit: 'WEI', value: '9' },
//   maxFeePerGas: {
//     fast: '3000000000',
//     slow: '1000000000',
//     standard: '2000000000',
//     unit: 'WEI',
//   },
//   maxPriorityFeePerGas: {
//     fast: '3000000000',
//     slow: '1000000000',
//     standard: '2000000000',
//     unit: 'WEI',
//   },
// };



