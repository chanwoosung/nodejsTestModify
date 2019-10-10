const express =require('express');
const app=express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose=require('mongoose');
const route=require('./routes');
let port=process.env.PORT||7080;
let config=require('./config');

mongoose.Promise=global.Promise;


let db= mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error'));
db.once('open',()=>{
  console.log("connecting mongod SERVER");
})
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static("public"));
app.set('jwt-secret',config.secret);
app.use('/test',route);
mongoose.connect(config.mongoDBUrl).then(() => app.listen(port,()=>{
  console.log("Express is running on Port "+port);
}));
