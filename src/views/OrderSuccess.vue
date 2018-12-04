<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
        <span>订单确认</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
            <ul>
                <li class="cur"><span>确认地址</span> </li>
                <li class="cur"><span>订单明细</span> </li>
                <li class="cur"><span>付款</span> </li>
                <li class="cur"><span>订单确认</span> </li>
            </ul>
            </div>

            <div class="order-create">
            <div class="order-create-pic"><img src="static/ok-2.png" alt=""></div>
            <div class="order-create-main">
                <h3>恭喜! <br>支付成功!</h3>
                <p>
                <span>订单 ID：{{orderId}}</span>
                <span>订单总价：{{orderTotal | currency('￥')}}</span>
                </p>
                <div class="order-create-btn-wrap" style="width:660px;">
                <div class="btn-l-wrap" style="width:33%">
                    <router-link href="javascript:;" class="btn btn--m" to="/cart">购物车</router-link>
                </div>
                <div class="btn-r-wrap" style="width:33%">
                    <router-link href="javascript:;" class="btn btn--m" to="/">商品列表</router-link>
                </div>
                <div class="btn-r-wrap" style="width:33%">
                    <router-link href="javascript:;" class="btn btn--m" to="/">订单列表</router-link>
                </div>
                </div>
            </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from './../components/header'
import NavFooter from './../components/footer'
import NavBread from './../components/bread'
import axios from 'axios'
import {currency} from './../util/currency.js'
export default {
    name:'OrderSuccess',
    data(){
        return{
            orderId:'',
            orderTotal:''
        }
    },
    components:{
        NavHeader,
        NavFooter,
        NavBread,
    },
    filters:{
        currency:currency
    },
    mounted:function(){
        let _this = this;
        let orderId = _this.$route.query.orderId;
        this.orderId = orderId;
        axios.get('/users/orderDetail',{
            params:{
                orderId:orderId
            }
        }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
                _this.orderTotal = res.result;
            }
        })
    }
}
</script>

