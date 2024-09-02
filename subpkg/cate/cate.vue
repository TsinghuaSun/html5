<template>
  <view>
    <view class="shop-item" v-for="(item,id) in shopList" :key="id" @click="gotoGoodsDetail(item)" >
      <view class="thumb">
        <image :src="item.url"></image>
      </view>
      <view class="info">
        <text class="shop-name">{{item.name}}</text>
        <text>配料：{{item.have}}</text>
        <text>备注：{{item.text}}</text>
        <text>￥{{item.price}}.00</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        shopList: []
      };
    },
    onLoad(opinions) {
      this.getshopList(opinions)
    },
    methods: {
      async getshopList(opinions) {
        const {
          data: res
        } = await uni.$http.get('/goods-list/' + opinions.type + '/' + opinions.type + '.txt')
        //请求失败
        if (res.status !== 200) return uni.$showMsg()

        //请求成功
        this.shopList = res.data.result
        uni.$showMsg('数据请求成功!')
      },
      gotoGoodsDetail(opinions){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?good_id='+opinions.good_id+'&good_class='+opinions.Egood_class+'&good_name='+opinions.name+'&good_price='+opinions.price+'&good_logo='+opinions.url
        })
      }
    }
  }
</script>

<style lang="scss">
  .shop-item {
    display: flex;
    padding: 10rpx;
    border: 1rpx solid #efefef;
    border-radius: 8rpx;
    margin: 15rpx;
    box-shadow: 1rpx 1rpx 15rpx #ddd;
  }

  .thumb image {
    width: 300rpx;
    height: 220rpx;
    display: block;
    margin-right: 15rpx;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 24rpx;
  }

  .shop-name {
    font-weight: bold;
    font-size: 35rpx;
  }
</style>