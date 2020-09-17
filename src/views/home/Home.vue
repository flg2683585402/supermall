<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed: isTabFixed}"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {itemListenerMixin} from "../../common/mixin";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      isShowBackTop: false,
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata()
    //2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    this.tabClick(0)
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() //不刷新的话会出现莫名其妙的问题
  },
  deactivated() {
    //1、保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2、取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  mounted() {//组件创建完成后执行

  },
  methods: {

    /*事件监听相关的方法*/
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType)//流行、精选、新款选择哪儿个就加载哪儿个更多
      this.$refs.scroll.scroll.refresh()//此方法是刷新滑动区域的高度(重新计算高度)，不然的话会有一个bug就是上拉加载图片的时候有时候卡顿
    },

    /*监听滑动距离为一定值时显示那个回到顶部的按钮 否则不显示回到顶部的按钮*/
    contentScroll(position) {
      //1、判断BackTop是否显示
      if ((-position.y) > 2000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
      //2、决定tabControl2是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //监听那个返回顶部按钮的事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      if(this.$refs.tabControl1 !== undefined){
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }
    },


    /*网络请求相关的方法*/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()//调用此方法一直上拉页面会一直加载数据
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh; /*vh是视口高度*/
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /*
  在使用浏览器原生滚动时，为了让导航不跟随一起滚动才设置如下属性
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

/*两种方式都可以锁定滑动区域 这种方式是定位*/
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

/*这种方式也能实现锁定滑动区域 这种方式也可以*/
/*.content {
  height: calc(100% - 93px);!*calc是一个函数式计算函数用于计算其尺寸大小*!
  overflow: hidden;
  margin-top: 44px;
}*/
</style>
