<template>
  <div class="wrapper">
     <ul class="content">
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
  <li>分类列表1</li>
</ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
name: "Category",
  data(){
    return {
        scroll: null
    }
  },
  created() {

  },
  //组件创建完后调用
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3, //可以监听惯性滑动
      pullUpLoad: true
    })
    this.scroll.on('scroll',(position) => {
      //console.log(position)
    })
    this.scroll.on('pullingUp',() => {
      console.log('我起飞咯')
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;

}
</style>
