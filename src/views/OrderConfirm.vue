<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
        <span>订单确认</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-order">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>确认</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
                <ul>
                <li class="cur"><span>确认地址</span> </li>
                <li class="cur"><span>订单明细</span> </li>
                <li><span>付款</span> </li>
                <li><span>订单确认</span> </li>
                </ul>
            </div>

            <!-- order list -->
            <div class="page-title-normal checkout-title">
                <h2><span>订单明细</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                <div class="cart-item-head">
                    <ul>
                    <li>订单明细</li>
                    <li>价格</li>
                    <li>数量</li>
                    <li>总和</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="item in cartList" v-if="item.checked == '1'">
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
                    <li>
                    <span>总价:</span>
                    <span>{{subtotal | currency('￥')}}</span>
                    </li>
                    <li>
                    <span>运费:</span>
                    <span>{{shipping | currency('￥')}}</span>
                    </li>
                    <li>
                    <span>折扣:</span>
                    <span>{{discount | currency('￥')}}</span>
                    </li>
                    <li>
                    <span>税费:</span>
                    <span>{{tax | currency('￥')}}</span>
                    </li>
                    <li class="order-total-price">
                    <span>订单总价:</span>
                    <span>{{ordertotal | currency('￥')}}</span>
                    </li>
                </ul>
                </div>
            </div>

            <div class="order-foot-wrap">
                <div class="prev-btn-wrap">
                <router-link class="btn btn--m" to="/address">上一步</router-link>
                </div>
                <div class="next-btn-wrap">
                <button class="btn btn--m btn--red" @click="payment">确认付款</button>
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
            cartList:[],
            tax:400,
            discount:200,
            shipping:100,
            subtotal:0,
            ordertotal:0
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
            axios.get('/users/cartList').then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                    _this.cartList = res.result;
                    _this.cartList.forEach((item)=>{
                        _this.subtotal += parseInt(item.salePrice*item.productNum);
                    })
                    _this.ordertotal = _this.subtotal + _this.tax + _this.shipping - _this.discount;
                }
            })
        },
        payment(){
            let _this = this;
            let addressId = _this.$route.query.addressId;
            axios.post('/users/payment',{
                addressId:addressId,
                orderTotal:_this.ordertotal
            }).then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                    _this.$router.push('/orderSuccess?orderId='+res.result.orderId);
                    console.log('order create success');
                }
            })
        }
    }
}
</script>
