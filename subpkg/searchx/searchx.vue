<template>
  <view>
    <view class="search-box">
      <!--搜索框-->
      <uni-search-bar :focus="true" v-model="searchValue" @input="input" radius="100" cancelButton="none">
      </uni-search-bar>

      <!--搜索建议-->
      <view class="sugg-list" v-if="searchResults.length!==0">
        <view class="sugg-item" v-for="(item,id) in searchResults" :key="id" @click="gotoDetail(item)">
          <view class="goods-name">{{item.text}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
    </view>

    <view class="history-box" v-if="searchResults.length===0">
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="22" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,id) in histories" :key="id" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/goods-all/good%E6%8E%A5%E5%8F%A3.txt')
        console.log(res)
        if (res.status !== 200) return uni.$showMsg()
        this.searchResults = res.data.result

        this.saveSearchHistory()
      },
      gotoDetail(item) {
        console.log(item.text)
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?good_id='+opinions.good_id+'&good_class='+opinions.Egood_class+'&good_name='+opinions.name+'&good_price='+opinions.price+'&good_logo='+opinions.url
        })
      },
      saveSearchHistory() {
        //this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)

        //持久化存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/cate/cate?type='+kw
        })
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      fonto-size: 12px;
      padding: 13 0px;
      border-bottom: 1px soolid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;
      
      .uni-tag {
        border:1px solid #000000;
        margin-top:5px;
        margin-right: 10px;
        background-color: #ffbf20;
      }
    }
  }
</style>