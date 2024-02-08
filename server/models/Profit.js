const mongoose = require('mongoose');

const profitSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    orderNo: String,
    fToken: {
      type: mongoose.Schema.Types.Mixed,
    },
    tToken: {
      type: mongoose.Schema.Types.Mixed,
    },
    fValue: String,
    tValue: String,
    profitDirect: Number,
    profitUSD: Number,
    payingAddress: String, // wallet address
    isMasterWallet: { type: Boolean, default: false },
    network: String,
  },
  { timestamps: true }
);

const Profit = mongoose.model('Profit', profitSchema);
module.exports = Profit;
