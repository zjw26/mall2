<template>
<div>
    <nav-header></nav-header>
    <nav-bread>
        <span>我的订单</span>
    </nav-bread>
    <div class="checkout-page">
        <div class="container">


            <!-- address list -->
            <div class="page-title-normal checkout-title">
                <h2><span>订单列表</span></h2>
            </div>
            <div class="addr-list-wrap">
                <div class="addr-list">
                <ul>
                    <li v-for="(item,index) in orderList"  @click="" style="height:auto;padding: 20px 20px 10px 20px;">
                        <dl style="text-align:left;">
                            <dt>订单编号：{{item.orderId}}</dt>
                            <dd >订单总价：{{item.orderTotal| currency('￥')}}</dd>
                            <dd>订单状态：{{item.orderStatus=='1'?'成功':'失败'}}</dd>
                            <dd>订单生成时间：{{item.createDate}}</dd>
                        </dl>
                        <button class="btn-login" @click="showModal(true,item.orderId)" style="border: 1px solid;
    background: #d2464e;
    padding: 5px 10px;
    border-radius: 7px;
    color: #fff;
    width: 100px;
    float: right;">评价</button>
     <router-link class="btn-login"  style="border: 1px solid;
    background: #d2464e;
    padding: 5px 10px;
    border-radius: 7px;
    color: #fff;
    width: 100px;
    float: right;" :to="{path:'/orderDetail',query:{'orderId':item.orderId}}" >详细</router-link>
                    </li>
                </ul>
                </div>

            </div>

            <!-- shipping method-->
            


 
            </div>
        </div>

        <div class="md-modal modal-msg md-modal-transition md-show" v-if="assessModel">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">
                        订单评价
                    </div>
                    <button class="md-close" @click="showModal(false)">关闭</button>
                </div> 
                <div class="md-content">
                    <div class="confirm-tips">
                        <ul>
                            <!-- <li class="regi_form_input"> -->
                               <textarea name="assess" id="" style="width:100%;" rows="10" v-model="assess" placeholder="请输入评价。"></textarea>
                            <!-- </li> -->
                        </ul>
                    </div> 
                <div class="login-wrap">
                    <a href="javascript:;" class="btn-login" @click="confirmAssess()" style="background: #d2464e;
    border: none;">确认评价</a>
                </div>
                </div>
            </div>
        </div>

         <modal v-bind:mdShow="mdShow" v-on:close="closeModal()">
            <p slot="message">
                评价成功
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:">关闭</a>
            </div>
        </modal>
</div>

  


</template>
<style>
.up-down-btn.open, .up-down-btn.open .i-up-down-l {
    transition: all .3s ease-out;
}

.up-down-btn.open .i-up-down-l {
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
}

.up-down-btn.open .i-up-down-r {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    transition: all .3s ease-out;
}
</style>


<script>
import NavHeader from './../components/header'
import NavFooter from './../components/footer'
import NavBread from './../components/bread'
import Modal from './../components/modal'
import {currency} from './../util/currency.js'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      orderList:[],
      assessModel:'',
      assess:'',
      mdShow:false,
      orderId:''
    }
  },
  components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
  },
  mounted:function(){
      this.getOrderList();
  },
  filters:{
      currency:currency
  },
  computed:{
  },
  methods:{
      closeModal(){
          this.mdShow = false;
      },
      showModal(isShow,orderId){
          this.assessModel = isShow;
          if(orderId)this.orderId = orderId;
          this.assess = ''
      },
      confirmAssess(){
           axios.post('/users/assess',{orderId:this.orderId,assess:this.assess}).then((response)=>{
              let res = response.data;
              if(res.status == 0){
                  this.mdShow = true;
              }
          })
          this.assessModel = false;
      },
      getOrderList(){
          let _this = this;
          axios.get('/users/orderList').then((response)=>{
              let res = response.data;
              this.orderList = res.result;
              
          })
      },
     
  }
}
</script>