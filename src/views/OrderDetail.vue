<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
        <span>订单明细</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-order">
            <!-- process step -->

            <!-- order list -->
            <div class="page-title-normal checkout-title">
                <h2><span>订单明细({{orderId}})</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                <div class="cart-item-head">
                    <ul>
                    <li>商品名称</li>
                    <li>价格</li>
                    <li>数量</li>
                    <li>总和</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="item in goodsList" v-if="item.checked == '1'">
                    <div class="cart-tab-1">
                        <div class="cart-item-pic">
                        <img :src="'static/'+item.productImage" :alt="item.productName">
                        </div>
                        <div class="cart-item-title">
                        <div class="item-name">{{item.productName}}</div>

                        </div>
                    </div>
                    <div class="cart-tab-2">
                        <div class="item-price">{{item.salePrice}}</div>
                    </div>
                    <div class="cart-tab-3">
                        <div class="item-quantity">
                        <div class="select-self">
                            <div class="select-self-area">
                            <span class="select-ipt">{{item.productNum}}</span>
                            </div>
                        </div>
                        <!-- <div class="item-stock item-stock-no">In Stock</div> -->
                        </div>
                    </div>
                    <div class="cart-tab-4">
                        <div class="item-price-total">{{item.productNum*item.salePrice | currency('￥')}}</div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>

            <!-- Price count -->
            <div class="price-count-wrap">
                <div class="price-count">
                <ul>
                    
                    <li class="order-total-price" style="display:block;">
                    <span>订单总价:</span>
                    <span>{{orderDetail.orderTotal | currency('￥')}}</span>
                    </li>
                    <li style="display:block;">
                       <span>收货人:</span>
                        <span>{{orderDetail.addressInfo.userName}}</span>
                    </li>
                    <li style="display:block;">
                       <span>电话:</span>
                        <span>{{orderDetail.addressInfo.tel}}</span>
                    </li>
                    <li style="display:block;">
                       <span>收获地址:</span>
                        <span>{{orderDetail.addressInfo.streetName}}</span>
                    </li>
                    <li style="display:block;">
                       <span>订单评价:</span>
                        <span>{{orderDetail.assess}}</span>
                    </li>
                </ul>
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
import {currency} from './../util/currency.js'
import axios from 'axios'

export default {
    name:'OrderConfirm',
    data(){
        return{
            orderDetail:{},
            goodsList:[],
            orderId:''
          
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
        this.init();
    },
    methods:{
        init(){
            let _this = this;
            let orderId = _this.$route.query.orderId;
            this.orderId = orderId;
            axios.get('/users/orderDetailAll',{params:{
                orderId:orderId
            }}).then((response)=>{
                let res = response.data.result;
                this.orderDetail = res;
                this.goodsList = res.goodsList;
                console.log(response)
            })
        },

    }
}
</script>
