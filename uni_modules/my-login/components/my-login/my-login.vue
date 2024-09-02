<template>
  <view>
    <view class="login-container">
      <image src="/static/user.png" class="img-user"></image>
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <text class="tips-text">登录后进行更多权益</text>
    </view>
  </view>
</template>


<script>
  import{mapMutations,mapState}from 'vuex'
  
  export default {
    data() {
      return {

      };
    },
    computed:{
      ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
      async getUserProfile(e) {
        const res = await uni.getUserProfile({
          desc: '用于完善用户信息',
          success: (res) => {
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权')
          }
        })
      },
      async getToken(info){
        //获取code值
        const[err,res]=await uni.login().catch(err=>err)
        if(res.errMsg!='login:ok')return uni.$showMsg('登录失败')
        
        //这是准备参数 哈利路亚
        const query={
          code:res.code,
          encryptedData:info.encryptedData,
          iv:info.iv,
          rawData:info.rawData,
          signature:info.signature
        }
        const{data:loginResult}=await uni.$http.post('/post/post_jk.txt',query)
        //console.log(loginResult)
        //if(loginResult.meta.status!==200)return uni.$showMsg('请求失败')
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=>{
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>


<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #e6e6e6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: #f6f6f6;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .img-user {
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #ff8f00;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>