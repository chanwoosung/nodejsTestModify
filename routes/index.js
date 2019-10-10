const express=require('express');
const router=express.Router();
const controller=require('./controller');
const middleware=require('../middleWare/auth');

router.get('/test',(req,res)=>{

    res.send('hello');
})
router.get('/search',controller.list);
router.get('/api/:id',controller.show);
router.get('/find/:id',controller.find);
router.post('/makeBlock',controller.makeBlock);
router.put('/changeBlock',controller.changeBlock);
router.delete('/deleteBlock/:id',controller.deleteBlock);
router.post('/',(req,res,next)=>{
    res.render('index',{
        title:"Main Page",
        introduce:"Welcome"
    })
    next();
});



module.exports=router;

