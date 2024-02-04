const mongoose = require('mongoose');

const txCostsSchema = new mongoose.Schema(
  {
    
    bitcoin: {
      btc: {
        txCost: {
          type: Number,
          default: 0,
        },
      },
    },
    tron: {
      trx: {
        txCost: {
          type: Number,
          default: 2,
        },
      },
      usdt: {
        txCost: {
          type: Number,
          default: 35,
        },
      },
    },
    evm: {
      eth: { 
        txCost: {
          type: Number,
          default: 0,
        },
      },
      usdt: {
        txCost: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  { timestamps: true }
);

const TxCosts = mongoose.model('TxCosts', txCostsSchema);
module.exports = TxCosts;
