<template>
  <view>
    <view class="cart-container" v-if="cart.length!==0">
      <!--这是收货地址组件-->
      <my-address></my-address>
      <!--这是商品列表标题区-->
      <view class="cart-title">
        <!--左侧图标-->
        <uni-icons type="shop" size="18"></uni-icons>
        <!--右侧文本-->
        <text class="cart-title-text">购物车</text>
      </view>

      <!--这是循环渲染购物车商品-->
      <uni-swipe-action>
        <block v-for="(goods,id) in cart" :key="id">
          <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
            <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
              @num-change="numberChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <!--这是使用自定义结算组件-->
      <my-settle></my-settle>
    </view>

    <!--空白购物车-->
    <view class="empty-cart" v-else>
      <image src="/static/kkry.png" class="empty-image"></image>
      <text class="tip-text">空空如也×_×</text>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        //console.log(e)
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        //console.log(e)
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods) {
        //console.log(goods)
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    boder-bottom: 1px solid #efefef;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  
  .empty-cart{
    display:flex;
    flex-direction:column;
    align-items: center;
    padding-top:150px;
    
    .empty-image{
      width:160px;
      height:130px;
    }
    .tip-text{
      font-size:12px;
      color:gray;
      margin-top: 15px;
    }
  }
</style>