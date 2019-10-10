const mongoose=require('mongoose');
const DBModel2=require('../models/txes');
let crypto=require('crypto');
let txetxid=mongoose.model('txes');
const config=require('../config');


exports.list=(req,res)=>{
  txetxid.find({},(err,lists)=>{
    if(err){res.json(err);
    }else{res.render('list',{
      title:'list',
      lists:lists
    })
  }
  });
 
}
exports.show=(req,res,next)=>{
  let param=req.params.id;
  const Txidtokenize=crypto.createHmac('sha256',config.secret).update(param).digest('base64').replace('/','').replace('=','');
  txetxid.find({txid:Txidtokenize},(err,lists)=>{
    if(err){
      res.json({error:err});
    }else{
      res.json(lists);
    };
  });
 
}
exports.find= (req,res,next) => {
  let param=req.params.id;
  txetxid.find({'vout.addresses':param},(err,lists)=>{
    if(err){
      res.json({error:err});
    }else{
      res.json(lists);
    };
  });
}
exports.makeBlock=(req,res,next)=>{
  let moment=require('moment');
  let nowtime=moment().format('MMDDHHMMSS');
  let user=req.body.id;
  let block=req.body.block;
  console.log(req.body.block);
  const Txidtokenize=crypto.createHmac('sha256',config.secret).update(user).digest('base64').replace('/','').replace('=','');
  const createBlocktokenize=crypto.createHmac('sha256',config.secret).update(block).digest('base64').replace('/','').replace('=','');
  console.log(Txidtokenize);
  console.log(createBlocktokenize);
  let saveData=new DBModel2({txid:Txidtokenize,blockhash:createBlocktokenize,timestamp:nowtime});
  saveData.save((err)=>{
    if(err){
      res.send(err);
      return;
    }
    next();
    res.send(err);
  })
}
exports.changeBlock=(req,res,next)=>{
  var moment=require('moment');
  var nowtime=moment().format('MMDDHHMMSS');
  var user=req.body.id;
  var block=req.body.block;
  console.log(req.body.block);
  const Txidtokenize=crypto.createHmac('sha256',config.secret).update(user).digest('base64').replace('/','').replace('=','');
  const createBlocktokenize=crypto.createHmac('sha256',config.secret).update(block).digest('base64').replace('/','').replace('=','');
  console.log(Txidtokenize);
  console.log(createBlocktokenize);
  txetxid.update({txid:Txidtokenize}, {blockhash:createBlocktokenize,timestamp:nowtime}, (err, output)=>{
    if(err) res.status(500).json({ error: 'database failure' });
    console.log(output);
    if(!output.n) return res.status(404).json({ error: 'book not found' });
    res.json( { message: 'book updated' } );
})
  
}
exports.deleteBlock=(req,res)=>{
  let user=req.params.id;
  console.log(user);
  const Txidtokenize=crypto.createHmac('sha256',config.secret).update(user).digest('base64').replace('/','').replace('=','');
  console.log(Txidtokenize);
  txetxid.deleteOne({txid:Txidtokenize}).then(()=>{
    res.status(200).json({
      message:'delete'
    });
  }).catch((err)=>{
    res.status(400).json({
      error:err
    });
  })
}