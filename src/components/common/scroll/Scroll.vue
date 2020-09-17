<template>
  <!-- ref一般绑定到子组件中-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
    })
    //2、监听滚动的位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    //3、监听上拉事件
    this.scroll.on('pullingUp',() => {
     this.$emit('pullingUp')
    })

  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll  && this.scroll.scrollTo(x,y,time)
    },
    //这个方法的用处是当用户一直向上拉页面的时候数据会一直加载，如果没有这个方法的话，一直向上拉页面数据只加载一次
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    //此方法是刷新页面的图片数量
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
        return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
