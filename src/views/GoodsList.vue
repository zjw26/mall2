<template>
    <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><defs><symbol id="icon-arrow-short" viewBox="0 0 25 32"><title>arrow-short</title> <path d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z" class="path1"></path></symbol> <symbol id="icon-arrow-down-2" viewBox="0 0 59 32"><title>arrow-down</title> <path d="M27.448 27.448h3.771l-26.667-26.667c-1.041-1.041-2.73-1.041-3.771 0s-1.041 2.73 0 3.771l26.667 26.667c1.041 1.041 2.73 1.041 3.771 0l26.667-26.667c1.041-1.041 1.041-2.73 0-3.771s-2.73-1.041-3.771 0l-26.667 26.667z" class="path1"></path></symbol> <symbol id="icon-status-ok" viewBox="0 0 32 32"><title>status-ok</title> <path d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z" class="path1"></path> <path d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z" class="path2"></path></symbol></defs></svg>
        <nav-header></nav-header>
        <nav-bread>
            <span>商品列表</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
            <span class="sortby">排序方式:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price" @click="changeSort()" style="position:relative;">价格 <img src="./../../static/箭头-下.svg" alt="" style="position:absolute;height:15px;margin-top:20px;" class='icon-arrow' v-bind:class="{'sort-up':sortFlag}"></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showfilter()">过滤方式</a>
            </div>
            <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show' : filterShow}">
                <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':curPrice === 'all'}" @click = "setPriceFilter('all')">所有</a></dd>
                <dd v-for="(range,index) in pricefilter" @click = "setPriceFilter(index)">
                    <a href="javascript:void(0)" :class="{'cur':curPrice === index }">{{range.start}} - {{range.end}}</a>
                </dd>
                </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                <ul>
                    <li v-for="product in goodsList">
                        <div class="pic">
                            <a href="#"><img v-lazy="'static/'+product.productImage" :key="'static/'+product.productImage" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">{{product.productName}}</div>
                            <div class="price">¥{{product.salePrice}}</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m" @click="addcar(product.productId)">加入购物车</a>
                            </div>
                        </div>
                    </li>
                    
                </ul>
                <div v-infinite-scroll ="loadMore" infinite-scroll-disabled ="busy" infinite-scroll-distance ="30">
                    <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="md-overlay" v-show="overLay" @click="closefilter()"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal()">
            <p slot="message">
                请先登录，否则无法加入到购物车！
            </p>
            <div slot="btnGroup" style="width:100%;">
                <a class="btn btn--m" href="javascript:">关闭</a>
            </div>
        </modal>
        <modal  v-on:close="closeModal()" v-bind:mdShow="mdShowCart">
            <p slot="message">
                <svg class="icon icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功！</span>
            </p>
            <div slot="btnGroup" style="width:100%;">
                <a class="btn btn--m" href="javascript:">继续购物</a>
                <router-link class="btn btn--m" href="javascript:" to="/cart">购物车</router-link>
            </div>
        </modal>
        <nav-footer></nav-footer>
    </div>
</template>

<style>
    .icon-arrow{
        transition:all 0.5s ease-in-out;
    }
    .sort-up{
        transform: rotate(180deg);
        transition:all 0.5s ease-in-out;
    }
</style>


<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from './../components/header'
import NavFooter from './../components/footer'
import NavBread from './../components/bread'
import Modal from './../components/modal'
import axios from 'axios'
export default {
  name: 'goodList',
  data () {
    return {
      goodsList:[],
      pricefilter:[
          {   
              start:1,
              end:500
          },
          {   
              start:501,
              end:2000
          },
          {   
              start:2001,
              end:3000
          },
          {   
              start:3001,
              end:4500
          }
      ],
      curPrice:'all',
      filterShow:false,
      overLay:false,
      sortFlag:true,
      page:1,
      pageSize:8,
      busy:true,
      loading:false,
      mdShow:false,
      mdShowCart:false
    }
  },
  components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
  },
  mounted:function(){
      this.getDataList();
  },
  methods:{
      getDataList(frag){
          let _this = this;
          let params = {
              page:_this.page,
              pageSize:_this.pageSize,
              sort:_this.sortFlag?1:-1,
              priceLevel:_this.curPrice
          }
          _this.loading = true;
          axios.get('/goods/goodsList',{
              params:params
          }).then(function(result){
              _this.loading = false;
              console.log(frag,result)
              if(result.data.status == '0'){
                  if(frag){
                    _this.goodsList = _this.goodsList.concat(result.data.result);
                    _this.busy = false;
                    console.log(result.data.result.length,_this.busy)
                    if(result.data.result.length == 0){
                        _this.busy = true;
                    }
                    
                  }else{
                    _this.goodsList = result.data.result;
                    _this.busy = false;
                  }

              }else{
                   _this.goodsList = [];
              }
              
          })
      },
      showfilter(){
          this.filterShow = true;
          this.overLay = true;
      },
      closefilter(){
          this.filterShow = false;
          this.overLay = false;
      },
      setPriceFilter(index){
          this.curPrice = index;
          this.page = 1;
          this.getDataList();
          this.closefilter();
      },
      changeSort(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getDataList();
      },
      loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getDataList(true);  
          }, 500);
      },
      addcar(productId){
          console.log(productId);
          axios.post('/goods/addcar',{
                  productId:productId

          }).then((result)=>{
              console.log(result);
              if(result.data.status==0){
                  this.mdShowCart = true;
                  this.$store.commit('updateCartCount',1);
              }else{
                  this.mdShow = true;
              }
              
          })
      },
      closeModal(){
          this.mdShow = false;
          this.mdShowCart = false;
      }

  }
}
</script>