<template>
  <view class="goods-item">
    <!--左侧的盒子-->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
    </view>
    <!--右侧的盒子-->
    <view class="goods-item-right">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price}}</view>
        <uni-number-box class="l_" :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        defaultPic:"https://7473-tsing-2gsrtj3p83f53665-1323831500.tcb.qcloud.la/static/static1.png?sign=92c42dd901f7592de2d01364bcdcd4b8&t=1705623897"
      }
    },
    onLoad(options){
      
    },
    methods:{
      //这是radio组件的点击事件处理函数
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      //这是监听数量发生变化函数
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:val-0
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item{
    width:750rpx;
    box-sizing:border-box;
    display:flex;
    padding:10px 5px;
    border-bottom:1px solid #e0e0e0;
    
    .goods-item-left{
      margin-right:5px;
      display:flex;
      justify-content: space-betweem;
      align-items:center;
      
      .goods-pic{
        width:130px;
        height:100px;
        display:block;
      }
    }
    
    .goods-item-right{
      display:flex;
      flex:1;
      flex-direction:column;
      justify-content: space-between;
      
      .goods-name{
        font-size:13px;
      }
      
      .goods-info-box{
        display:flex;
        justify-content:space-between;
        align-items:center;
        
        .goods-price{
          color:#c00000;
          font-size:16px;
        }
        
        .l_{
          border:1px solid #cccccc;
        }
      }
    }
  }
</style>
