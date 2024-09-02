<template>
  <view>
    <view class="search-box">
      <my-searchx @click="gotoSearch" :bgcolor="'#ff8f20'" :radius="18">
      </my-searchx>
    </view>
    <view>
      <!--轮播图-->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
        :indicator-active-color="'#ffaf20'">
        <swiper-item v-for="(item,id) in swiperList" :key="id" >
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.good_id+'&good_class='+item.Egood_class+'&good_name='+item.name+'&good_price='+item.price+'&good_logo='+item.url">
            <image :src="item.url"></image>
          </navigator>
        </swiper-item>
      </swiper>
      <!--宫格-->
      <view class="nav-list">
        <navigator class="nav-item" v-for="(item,id) in gridList" :key="id" :url="'/subpkg/cate/cate?type='+item.Ename">
          <image class="nav-img" :src="item.url"></image>
          <text>{{item.name}}</text>
        </navigator>
      </view>
      <!--商品列表-->
      <view class="list">
        <navigator class="item" v-for="(item,id) in goodsList" :key="id" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.good_id+'&good_class='+item.Egood_class+'&good_name='+item.name+'&good_price='+item.price+'&good_logo='+item.url">
          <view class="goods_img">
            <image class="img-" :src="item.url"></image>
          </view>
          <view class="goods_info">
            <text class="goods_name">{{item.name}}:{{item.text}}</text>
            <view class="goods_price">
              ￥<text>{{item.price}}</text>.00
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  
  export default {
    mixins:[badgeMix],
    data() {
      return {
        swiperList: [], //轮播图数据列表
        gridList: [], //分类导航数据列表
        goodsList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getGridList()
      this.getGoodsList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/swiper/swiper%E6%8E%A5%E5%8F%A3.txt')
        //请求失败
        if (res.status !== 200) return uni.$showMsg()

        //请求成功
        this.swiperList = res.data.result
        uni.$showMsg('数据请求成功!')
      },
      async getGridList() {
        const {
          data: res
        } = await uni.$http.get('/grid/grid%E6%8E%A5%E5%8F%A3.txt')
        //请求失败
        if (res.status !== 200) return uni.$showMsg()

        //请求成功
        this.gridList = res.data.result
        uni.$showMsg('数据请求成功!')
      },
      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('/goods/goods%E6%8E%A5%E5%8F%A3.txt')
        //请求失败
        if (res.status !== 200) return uni.$showMsg()

        //请求成功
        this.goodsList = res.data.result
        uni.$showMsg('数据请求成功!')
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/searchx/searchx'
        })
      }
    },
  }
</script>

<style lang="scss">
  .search-box{
    position:sticky;
    top:0;
    z-index:999;
  }
  
  swiper {
    height: 350rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    margin-top: 3rpx;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 99.69%;
    border-left: 1rpx solid #ffaf20;
    border-top: 1rpx solid #ffaf20;

    .nav-item {
      width: 33.33%;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 1rpx solid #ffaf20;
      border-bottom: 1rpx solid #ffaf20;
      box-sizing: border-box;
    }

    .nav-img {
      width: 100rpx;
      height: 100rpx;
    }

    text {
      font-size: 35rpx;
      font-weight: 600;
      margin-top: 15rpx;
      color: #000000;
    }
  }

  .list {
    width: 100%;
    padding: 3rpx;
    box-sizing: border-box;

    .item {
      width: 48%;
      height: 370rpx;
      padding: 5rpx;
      box-sizing: border-box;
      float: left;
      margin: 2rpx 1%;

      .goods_img image {
        width: 100%;
        height:116.75px;
        .img-{
          width:10px;
          height:10px;
        }
      }

      .goods_info {
        .goods_name {
          font-size: 14px;
          text-align: left;
          display: -webkit-box;
          line-height: 1.05rem;
          height: 2.1rem;
          font-family: -apple-system, Helvetica, sans-serif;
          overflow: hidden;
          color: black;
        }

        .goods_price {
          font-style: normal;
          font-family: JDZH-Regular, sans-serif;
          display: inline-block;
          font-size: 0.7rem;
          line-height: 1.5rem;
          color: #ff4142;
        }

        .goods_price {
          text {
            font-size: 1rem;
          }
        }
      }
    }
  }
</style>