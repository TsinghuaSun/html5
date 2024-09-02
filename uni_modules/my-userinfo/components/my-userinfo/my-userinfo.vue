<template>
  <view class="my-userinfo-container">
    <!--头像和昵称-->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">
        {{userinfo.nickName}}
      </view>
    </view>
    
    <!--面板-->
    <view class="panel-list">
      <!--1-->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      
      <!--2-->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body1">
          <view class="panel-item">
            <image src="/static/my-icons/my-icons1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/my-icons2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/my-icons3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/my-icons4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      
      <!--3-->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  import{mapState,mapMutations}from 'vuex'
  
  export default {
    data(){
      return{
        
      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      async logout(){
        const [err,succ]=await uni.showModal({
          title:'提示',
          content:'确认退出登录吗？'
        }).catch(err=>err)
        if(succ&&succ.confirm){
          this.updateAddress({})
          this.updateUserInfo({})
          this.updateToken('')
        }
      }
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container{
    hieght:100%;
    background-color: #f6f6f6;
    
    .top-box{
      height:400rpx;
      background-color: #ff8f20;
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      .avatar{
        width:90px;
        height:90px;
        border-radius:45px;
        border:2px solid #fff;
        box-shadow: 0 1px 5px black;
        
      }
      
      .nickname{
        font-size:16px;
        color:#fff;
        font-weight: bold;
        margin-top:10px;
      }
    }
  }
  
  .panel-list{
    padding:0 10px;
    position: relative;
    top:-10px;
    
    .panel{
      background-color: white;
      border-radius: 5px;
      margin-bottom:8px;
      
      .panel-body{
        display:flex;
        justify-content: space-around;
        box-shadow: 0 1px 4px #444444;
        
        .panel-item{
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding:10px 0;
          font-size:13px;
          
        }
      }
      
      .panel-title{
        line-height: 45px;
        padding-left:10px;
        font-size:15px;
      }
      
      .panel-body1{
        display:flex;
        justify-content: space-around;
        
        .panel-item{
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding:10px 0;
          font-size:13px;
          
          .icon{
            width:35px;
            height:35px;
          }
        }
      }
    }
  }
  
  .panel-list-item{
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:15px;
    padding:0 10px;
    height:45px;
  }
</style>
