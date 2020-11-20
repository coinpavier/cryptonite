const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
fisrt_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bitcoin_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2:{
    type: String,
    required: true
  },
  usedcode:{
    type: String,
    
  },
  availbalance:{
    type: String,
    default: '09.06'
  },
  withdrawals:{
    type: String,
    default: '00.00'
  },
  plantype:{
    type: String,
    default: 'starter'
  },
  refaralsbonus:{
    type: String,
    default: '00.00'
  },
  referalcode:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
