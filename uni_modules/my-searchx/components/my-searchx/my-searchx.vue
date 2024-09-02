<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>


<script>
  export default{
    props:{
      //背景颜色
      bgcolor:{
        typr:String,
        default:'#ff8f20'
      },
      //圆角尺寸
      radius:{
        typr:Number,
        default:18  //px
      }
    },
    data(){
      return{
        
      }
    },
    methods:{
      searchBoxHandler(){
        console.log('xxx')
        this.$emit('click')
      }
    }
  }
</script>


<style lang="scss">
  .my-search-container{
    height:50px;
    //background-color: #ff8f20;
    display:flex;
    align-items:center;
    padding: 0 10px;
    
    .my-search-box{
      height:36px;
      background-color: #ffffff;
      //border-radius: 18px;
      width:100%;
      display:flex;
      justify-content: center;
      align-items:center;
      
      .placeholder{
        font-size:15px;
        margin-left:5px;
      }
    }
  }
</style>
