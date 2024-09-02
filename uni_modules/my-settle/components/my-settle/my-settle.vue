<template>
  <view class="my-settle-container">
    <!--全选-->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    
    <!--合计-->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    
    <!--结算-->
    <view class="btn-settle" @click="settlement">
      结算({{checkedCount}})
    </view>
  </view>
</template>


<script>
  import{mapGetters,mapMutations,mapState} from 'vuex'
  
  export default{
    data(){
      return{
        //倒计时秒数
        bseconds:2,
        seconds:0,
        timer:null
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      ...mapGetters('m_user',['addstr']),
      ...mapState('m_user',['token']),
      ...mapState('m_cart',['cart']),
      isFullCheck(){
        return this.total===this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      changeAllState(e){
        //console.log(!this.isFullCheck)
        this.updateAllGoodsState(!this.isFullCheck)
      },
      //这是用户点击了结算按钮
      settlement(){
        if(!this.checkedCount)return uni.$showMsg('请选择要结算的商品！')
        //if(!this.token)return uni.$showMsg('请先登录！')
        if(!this.token)return this.delayNavigate()
        if(!this.addstr)return uni.$showMsg('请选择收货地址！')
        this.payOrder()
      },
      async payOrder(){
        //1.创建订单
        //1.1组织订单的信息对象
        const orderInfo={
          //order_price:this.checkedGoodsAmount,
          order_price:0.01,
          consignee_addr:this.addstr,
          goods:this.cart.filter(x=>x.goods_state).map(x=>({
            goods_id:x.goods_id,
            goods_number:x.goods_count,
            goods_price:x.goods_price
          }))
        }
        //1.2发起请求创建订单
        const {data:res}=await uni.$http.post('/post/post_jk.txt',orderInfo)
        if(res.status!==200)return uni.$showMsg('创建订单失败')
        //1.3得到服务器相应的“订单编号”
        const orderNumber=res.message.order_number
        console.log(orderNumber)
      },
      delayNavigate(){
        this.seconds=this.bseconds
        this.showTips(this.seconds)
        
        this.timer=setInterval(()=>{
          this.seconds--
          if(this.seconds<=0){
            clearInterval(this.timer)
            
            uni.switchTab({
              url:'/pages/my/my',
              success:()=>{
                this.updateRedirectInfo({
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            
            return
          }
          this.showTips(this.seconds)
        },1000)
      },
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登录后再结算！'+n+'秒后自动跳转到登录页',
          mask:true,
          duration:1500
        })
      }
    }
  }
</script>


<style lang="scss">
  .my-settle-container{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:50px;
    background-color: white;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:14px;
    padding-left:5px;
    
    .radio{
      display:flex;
      align-items: center;
    }
    
    .amount-box{
      
      .amount{
        color:#c00000;
        font-weight:bold;
      }
    }
    
    .btn-settle{
      background-color: #c00000;
      height:50px;
      color:white;
      line-height: 50px;
      padding:0 10px;
      min-width:100px;
      text-align: center;
    }
  }
</style>
