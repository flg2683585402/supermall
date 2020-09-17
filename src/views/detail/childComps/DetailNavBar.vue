<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="titleClick(index)"
      >
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index){
        this.currentIndex = index
      //将事件发送出去使得详情页导航栏的事件与下方滚动的位置出现联动效果
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.back img {
  margin-top: 10px;
}
</style>
