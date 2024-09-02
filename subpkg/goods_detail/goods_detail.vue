<template>
  <view>
    <!--商品信息-->
    <view v-for="(item,id) in goods_info" :key="id" v-if="goods_id==item.good_id">
      <image class="imag" :src="item.url" @click="preview(item)"></image>
      <view class="goods-info-box">
        <!--价格-->
        <view class="price">
          ￥{{item.price}}
        </view>
        <!--主体-->
        <view class="goods-info-body">
          <view class="goods-name">{{item.name}} : {{item.have}}</view>
          <view class="favi">
            <uni-icons type="star" size="18" color="gray"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <!--运费-->
        <view class="yf">
          快递：免运费
        </view>
      </view>
      <view class="other">其他{{item.good_class}}类型商品:</view>
    </view>
    <!--推荐商品-->
    <view class="list">
      <navigator class="item1" v-for="(item1,id) in goods_info" :key="id"
        :url="'/subpkg/goods_detail/goods_detail?good_id='+item1.good_id+'&good_class='+item1.Egood_class"
        v-if="goods_id!=item1.good_id&&item1.Egood_class==goods_class">
        <view class="goods_img">
          <image mode="widthFix" :src="item1.url"></image>
        </view>
        <view class="goods_info">
          <text class="goods_name">{{item1.name}}:{{item1.text}}</text>
          <view class="goods_price">
            ￥<text>{{item1.price}}</text>.00
          </view>
        </view>
      </navigator>
    </view>
    <!--商品导航-->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(newVal) {
          const findResult = this.options.find(x => x.text === '购物车')
          if (findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }
    },
    data() {
      return {
        goods_info: {},
        goods_id: "10000",
        goods_class: "null",
        goods_name: "null",
        goods_price: "0",
        goods_logo: "",
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(opinions) {
      //console.log(opinions)
      const goods_id = opinions.good_id
      this.goods_class = opinions.good_class
      this.goods_name = opinions.good_name
      this.goods_price = opinions.good_price
      this.goods_logo = opinions.good_logo
      this.getGoodsDetail(goods_id)
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/goods-all/good%E6%8E%A5%E5%8F%A3.txt', {
          good_id: goods_id
        }) //这里的good_id并没用，还没写好...
        if (res.status !== 200) return uni.$showMsg()
        this.goods_info = res.data.result
        this.goods_id = goods_id
      },
      preview(item) {
        uni.previewImage({
          current: 0,
          urls: [item.url]
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goods_id,
            goods_name: this.goods_name,
            goods_price: this.goods_price,
            goods_count: 1,
            goods_small_logo: this.goods_logo,
            goods_state: true
          }
          this.addToCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  .imag {
    width: 100%;
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favi {
        width: 70px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  .other {
    font-size: 13px;
    color: #ff8f20;
    font-weight: bold;
    width: 125px;
    border: 1rpx solid #ffaf20;
    margin-left: 3px;
  }

  .list {
    width: 100%;
    height: 605px;
    padding: 3rpx;
    box-sizing: border-box;

    .item1 {
      width: 48%;
      height: 370rpx;
      padding: 5rpx;
      box-sizing: border-box;
      float: left;
      margin: 2rpx 1%;

      .goods_img image {
        width: 100%;
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

  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>