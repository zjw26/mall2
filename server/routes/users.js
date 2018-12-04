

var express = require('express');
var router = express.Router();
require('./../util/util');
var User =require('./../model/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  var params = {
    userName : req.body.userName,
    userPwd : req.body.userPwd
  }
  User.findOne(params,function(err,doc){
    console.log(doc)
    if(err){
      res.json({
        status:1,
        mes:'账号或密码错误'
      })
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        })
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        })
        // req.session.user = doc;
        res.json({
          status:0,
          mes:'',
          result:{
            userName:doc.userName,
          }
        })
      }else{
        res.json({
          status:1,
          mes:'账号或密码错误'
        })
      }
    }
  })
})

router.post('/logout',function(req,res,next){
  res.cookie('userId',"",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})

router.get('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:0,
      msg:'',
      result:req.cookies.userName || ''
    })
  }else{
    res.json({
      status:1,
      msg:'未登录',
      result:''
    })
  }
})

router.get('/cartList', function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:0,
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})

router.post('/cartDel',function(req,res,next){
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:0,
        msg:'',
        result:'delete success'
      })
    }
  })
})

router.post('/reduce',function(req,res,next){
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        let userDoc = doc.toObject();
        userDoc.cartList.forEach((item)=>{
          if(item.productId == productId){
            item.productNum--;
            if(item.productNum == 0){
              User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function(err,doc){
                if(err){
                  res.json({
                    status:1,
                    msg:err.message,
                    result:''
                  })
                }else{
                  res.json({
                    status:0,
                    msg:'',
                    result:'delete success'
                  })
                }
              })
            }else{
              User.update({userId:userId},{$set:{'cartList':userDoc.cartList}},function(err,doc){
                if(err){
                  res.json({
                    status:1,
                    msg:err.message,
                    result:''
                  })
                }else{
                  res.json({
                    status:0,
                    msg:'',
                    result:'reduce success'
                  })
                }
              })
            }
          }
        })
        
      }
     
    }
  })
})

router.post('/add',function(req,res,next){
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        let userDoc = doc.toObject();
        userDoc.cartList.forEach((item)=>{
          if(item.productId == productId){
            item.productNum++;
              User.update({userId:userId},{$set:{'cartList':userDoc.cartList}},function(err,doc){
                if(err){
                  res.json({
                    status:1,
                    msg:err.message,
                    result:''
                  })
                }else{
                  res.json({
                    status:0,
                    msg:'',
                    result:'add success'
                  })
                }
              })
            
          }
        })
        
      }
     
    }
  })
})

// router.post('/add',function(req,res,next){
//   var userId = req.cookies.userId;
//   var productId = req.body.productId;
//   User.findOne({userId:userId},function(err,doc){
//     if(err){
//       return res.json({
//         status:1,
//         msg:err.message,
//         result:''
//       })
//     }else{
//       if(doc){
//         let userDoc = doc.toObject();
//         userDoc.cartList.forEach((item)=>{
//           if(item.productId == productId){
//             item.productNum++;
//           }
//           User.update({userId:userId},{$set:{'cartList':userDoc.cartList}},function(err,doc){
//             if(err){
//               res.json({
//                 status:1,
//                 msg:err.message,
//                 result:''
//               })
//             }else{
//               return res.json({
//                 status:0,
//                 msg:'',
//                 result:'add success'
//               })
//             }
//           })
//         })
        
//       }
     
//     }
//   })
// })

router.post('/checked',function(req,res,next){
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        let userDoc = doc.toObject();
        userDoc.cartList.forEach((item)=>{
          console.log(item)
          if(item.productId == productId){
            if(item.checked == '1'){
              item.checked = '0'
            }else if(item.checked == '0'){
                item.checked = '1';
            }
            console.log(item)
          }
        })
        User.update({userId:userId},{$set:{'cartList':userDoc.cartList}},function(err,doc){
          if(err){
            res.json({
              status:1,
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:0,
              msg:'',
              result:'change checked'
            })
          }
        })
      }
     
    }
  })
})

router.post('/checkAll',function(req,res,next){
  var userId = req.cookies.userId;
  var checkAll = req.body.checkAll;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        let userDoc = doc.toObject();
        if(checkAll){
          userDoc.cartList.forEach((item)=>{
            item.checked = '1'
          })
        }else{
          userDoc.cartList.forEach((item)=>{
            item.checked = '0'
          })
        }
        
        User.update({userId:userId},{$set:{'cartList':userDoc.cartList}},function(err,doc){
          if(err){
            res.json({
              status:1,
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:0,
              msg:'',
              result:'change checked'
            })
          }
        })
      }
     
    }
  })
})
//获取地址列表
router.get('/addressList',function(req,res,next){
  let userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      })
    }
  })
})
//设置默认地址
router.post('/setDefault',function(req,res,next){
  var userId = req.cookies.userId;
  var addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1',
      msg:"addressId is not find",
      status:''
    })
  }
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        status:''
      })
    }else{
      if(doc){
        var addressList = doc.toObject().addressList;
        addressList.forEach((item)=>{
          if(item.addressId == addressId){
            item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        })
        User.update({userId:userId},{'addressList':addressList},function(err,doc){
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              status:''
            })
          }else{
            res.json({
              status:'0',
              msg:'success',
              result:''
            })
          }
        })
      }
    }
  })
})
//删除地址
router.post('/delAddress',function(req,res,next){
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  User.update({userId:userId},{$pull:{'addressList':{'addressId':addressId}}},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'del success',
        result:''
      })
    }
  })
})

//生成订单
router.post('/payment',function(req,res,next){
  let userId = req.cookies.userId;
  let orderTotal = req.body.orderTotal;
  let addressId = req.body.addressId;
  User.findOne({userId:userId},function(err,userDoc){
    let doc = userDoc.toObject();
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let address = '';
      let goodsList = []
      //获取当前用户的地址信息
      doc.addressList.forEach((item)=>{
        if(item.addressId == addressId){
          address = item;
        }
      })
      //获取用户购买的商品信息
      doc.cartList.forEach((item)=>{
        if(item.checked == '1'){
          goodsList.push(item);
        }
      })

      let r1 = Math.floor(Math.random()*10);
      let r2 = Math.floor(Math.random()*10);
      let sys = '622';
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      let sysDate = new Date().Format('yyyyMMddhhmmss');
      let orderId = sys+r1+sysDate+r2;

      var order = {
        "orderId" : orderId,
        "orderTotal" : orderTotal,
        "orderStatus" : 1,
        "createDate" : createDate,
        "goodsList" : goodsList,
        "addressInfo" : address
      }

      doc.orderList.push(order);
      console.log(doc.orderList);

      User.update({userId:userId},{$set:{'orderList':doc.orderList}},function(err,doc2){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            msg:'order create success',
            result:{
              orderId:orderId,
              orderTotal:orderTotal
            }
          })
        }
      })
      
    }
  })

})

//查询订单信息
router.get('/orderDetail',function(req,res,next){
  var userId = req.cookies.userId;
  var orderId = req.param('orderId');
  User.findOne({userId:userId},function(err,userDoc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(userDoc){
        let doc = userDoc.toObject();
        let orderTotal = '';
        if(doc.orderList.length>0){
          doc.orderList.forEach((item)=>{
            if(item.orderId == orderId){
              orderTotal = item.orderTotal;
            }
          })
          if(orderTotal>0){
            res.json({
              status:'0',
              msg:'查询成功',
              result:orderTotal
            })
          }else{
            res.json({
              status:'12002',
              msg:'查无此订单',
              result:''
            })
          }
        }else{
          res.json({
            status:'12001',
            msg:'当前用户无订单',
            result:''
          })
        }
        


      }
    }
  })
})

router.post('/addAddress',function(req,res,next){
  let userId = req.cookies.userId;
  let address = req.body.address;
  User.findOne({userId:userId},function(err,userDoc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(userDoc){
        let doc = userDoc.toObject();
        doc.addressList.push(address);
        User.update({userId:userId},{'addressList':doc.addressList},function(err,doc2){
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'add address success',
              result:''
            })
          }
        })
      }
    }
  })
})

//获取购物车商品数量
router.get('/getCartCount',function(req,res,next){
  let userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,userDoc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(userDoc){
        let doc = userDoc.toObject();
        let cartCount = 0;
        doc.cartList.forEach((item)=>{
          cartCount += parseInt(item.productNum);
        })
        res.json({
          status:'0',
          msg:'success',
          result:cartCount
        })
      }
    }
  })
})
module.exports = router;
