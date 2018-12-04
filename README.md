# Vue2Mall
基于Vue2+nodeJs的电子商城系统。该系统包括商品列表页面、购物车页面、地址信息页面、订单确认页面、支付成功页面。该商城系统前端页面由HTML、CSS、Vue2搭建，使用node.js、express搭建后台服务器，连接到MongoDB数据库进行数据的存取。基本实现从商品展示到加入购物车到选择地址、确认订单，完成支付的购物流程。

## 技术栈
vue2.js + node.js + express + MongoDB +ES5/6 + css

## 项目地址
[http://www.zhengjw99.cn/mall](http://www.zhengjw99.cn/mall) 


## 项目运行

```   
cd 项目目录

npm install 或 cnpm install（淘宝镜像）

npm run dev 启动前端
npm run build 构建打包
cd server 进入服务器目录
node ./bin/www 启动服务器(需要先搭建好MongoDB数据库)

```

## 说明

- 还存在一些需要进行优化的细节问题，等待后续完善。
- 如果觉得做的还行，对您有所帮助，欢迎“star”一下。

## 开发中遇到的问题


- #### Mongoose操作MongoDB数据库遇到的问题
```
用mongoose操作mongodb，find以及findOne方法查找到的结果集中无法取到其具体的属性值，可以输出整个对象，也可以获取 _id 的值，但是获取其他的属性时一直是undefined，请看代码：
userModel.findOne({}, function (err, re) {
console.log(re, re._id, re.uname);
});
输出结果如下
{ _id: 539085aa8abcc1a838389be2,
uname: ‘zhansan11’,
password: ‘12345611’
__v: 0 }
539085aa8abcc1a838389be2 undefined
原因：Modal.findOne()方法返回的是一个modal对象，不是一个普通的对象，需要对其用toOject（）方法进行转换之后，才能操作。
只不过modal对象用toOject方法转化成普通对象之后，没有了save方法，不能进行文档的保存操作。我的解决方法是使用Mogoose的Model层方法update,查询到指定文档后，配合$set操作符把操作后的文档与原来的文档进行覆盖。

```
    
