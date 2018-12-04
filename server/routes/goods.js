
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../model/goods');
var Users = require('../model/users');
const promisify = require('util').promisify;
var Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/mall')

mongoose.connection.on('connected',function(){
    console.log("MongoDB connected success");
})

mongoose.connection.on('error',function(){
    console.log("MongoDB connected fail");
})

mongoose.connection.on('disconnected',function(){
    console.log("MongoDB connected disconnected");
})

router.get('/goodsList' , function(req,res,next){
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let sort = req.param('sort');
    let skip = (page-1)*pageSize;
    let priceLevel = req.param('priceLevel');
    let priceLte = '';
    let priceGt = '';
    let params = {};
    if(priceLevel && priceLevel !== "all"){
        switch(priceLevel){
            case '0':priceLte = 500;priceGt = 0;break;
            case '1':priceLte = 2000;priceGt = 500;break;
            case '2':priceLte = 3000;priceGt = 2000;break;
            case '3':priceLte = 4500;priceGt = 3000;break;
        }
        params = {
            salePrice:{
                $lte:priceLte,
                $gt:priceGt
            }
        }
    }
    console.log(priceLevel,params)
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec(function(err,doc){
        console.log('doc'+doc)
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc
            })
        }
    })
})

router.post('/addcar',function(req,res,next){
    var userId = '100000077';
    var productId = req.body.productId;
    console.log(productId)
    Users.findOne({userId:userId},function(err,userdoc){
        console.log('...........'+userdoc.cartList);
        var doc = userdoc.toObject();
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }
        if(userdoc){
            let goodsItem = '';
            doc.cartList.forEach((item,index)=>{
                if(item.productId == productId){
                    console.log(item.productNum)
                    goodsItem = item;
                    item.productNum++;
                }
            })
            console.log(goodsItem,productId)
            if(goodsItem){
                // userdoc.save(function(err,doc){
                //     if(err){
                //         res.json({
                //             status:1,
                //             msg:err.message
                //         })
                //     }else{
                //         res.json({
                //             status:0,
                //             msg:'',
                //             result:'success'
                //         })
                //     }
                // })
                Users.update({userId:userId},{"$set":{'cartList':doc.cartList}},function(err){
                    if(err){
                            res.json({
                                status:1,
                                msg:err.message
                            })
                        }else{
                           
                            res.json({
                                status:0,
                                msg:'',
                                result:'更新成功'
                            })
                        }
                })
            }else{
                Goods.findOne({productId:productId},function(err,doc2){
                    console.log(doc2);
                    if(err){
                        res.json({
                            status:1,
                            msg:err.message
                        })
                    }else{
                        if(doc2){
                            var good = {//新创建一个对象，实现转换mongoose不能直接增加属性的坑
                                productNum: "1",
                                checked: "1",
                                productId: doc2.productId,
                                producName: doc2.producName,
                                salePrice: doc2.salePrice,
                                productName: doc2.productName,
                                productImage: doc2.productImage,
                            }
                            doc.cartList.push(good);
                            console.log(doc.cartList);
                            Users.update({userId:userId},{"$set":{'cartList':doc.cartList}},function(err){
                                if(err){
                                        res.json({
                                            status:1,
                                            msg:err.message
                                        })
                                    }else{
                                       
                                        res.json({
                                            status:0,
                                            msg:'',
                                            result:'插入成功'
                                        })
                                    }
                            })
                        }
                    }
                });
            }
        }
    })
})

module.exports = router;