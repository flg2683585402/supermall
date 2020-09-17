<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" :probe-type="3"  @scroll="contentScroll">
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  <detail-bottom-bar @addToCart="addToCart"/>
  <!--<toast :message="message" :show="show"/>-->
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import DetailBottomBar from "./childComps/DetailBottomBar";
/*import Toast from "@/components/common/toast/Toast";*/

import {mapActions} from 'vuex'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import {itemListenerMixin,backTopMixin} from "../../common/mixin";
import {debounce} from "@/common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    /*Toast*/
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [], //页面顶部轮播图片保存在这里
      goods: {}, //用来接收对象的
      shop: {} ,  //店铺信息对象初始化
      detailInfo: {}, //商品详情的对象初始化
      paramInfo: {} , //商品的参数信息对象
      commentInfo: {}, //评论消息对象初始化
      recommends: [],   //保存推荐的数据
      themeTopYs: [], //详情页滚动的Y值
      getThemeTopY: null  ,//获取详情页滚动Y值的防抖函数初始化值
      currentIndex: 0,
      /*message: '',
      show: false*/
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid
    //2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //获取页面顶部的轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取页面上要展示的商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //创建店铺的信息
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo
      //获取商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      /*$nextTick可以在上面DOM加载完后再执行 因为DOM没有加载出来之前$el是没有值的*/
      /*this.$nextTick(() => {
        //开始往themeTopYs里头塞入值
        /!*
         * 根据最新的数据，对应的DOM是已经被渲染出来
         * 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
         * offsetTop值不对的时候都是因为图片的问题因为图片后来才加载完
         *!/
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      })*/
    })
    //3、请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //4、给getThemeTopY赋值(对this.themeTopYs赋值操作进行防抖（防抖可以提高性能）)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
  },
  mounted() {

  },
  updated() {

  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad(){
      //刷新
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
     //用户点击哪儿就给我滚动到哪儿
      if(index == 0){
        this.$refs.scroll.scrollTo(0,(-this.themeTopYs[0]),100)
      }else if(index == 1){
        this.$refs.scroll.scrollTo(0,(-this.themeTopYs[1]),100)
      }else if(index == 2){
        this.$refs.scroll.scrollTo(0,(-this.themeTopYs[2]),100)
      }else {
        this.$refs.scroll.scrollTo(0,(-this.themeTopYs[3]),100)
      }

    },
    contentScroll(position){
      //1、获取y值
      const positionY = -position.y
      //2、positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for(let i=0;i<length-1;i++){
        if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //3、是否显示回到顶部
      this.isShowBackTop = positionY > 2000
    },
    //详情页添加到购物车的方法
    addToCart(){
      //添加购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid //商品的id必须要传过去因为这是用户购买商品的唯一标识
      //将商品添加到购物车里头(1、Promise 2、mapActions)
      //this.$store.commit('addCart',product)
      /*this.addCart(product).then(res => {
        /!*this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = ''
        },1000)*!/

        console.log(this.$toast)

      })*/

      this.$store.dispatch('addCart',product).then(res => {
        console.log(this.$toast)
        this.$toast.showImage(res,1000)
      })

      //3、添加到购物车成功

    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
</style>
