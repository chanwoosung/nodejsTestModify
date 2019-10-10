const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const crypto=require('crypto');
const config=require('../config')

const testTxid=new Schema({
    txid:'String',
    blockhash:'String',
    timestamp:'String'
    },{
    collection:'txes'
  });

const txidModel=mongoose.model('txes',testTxid);
  module.exports=txidModel;
  