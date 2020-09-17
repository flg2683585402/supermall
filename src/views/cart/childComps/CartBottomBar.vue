<template>
<div class="bottom-bar">
<div class="check-content">
  <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
  <span @click="checkClick">全选</span>
</div>

  <div class="sum">
    合计: {{totalPrice}}
  </div>

  <div class="calculate" @click="calcClick">
    去计算({{checkLength}})
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2) //toFixed指保留几位小数 写2保存2位小数
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      //return  !(this.$store.state.cartList.filter(item => !item.checked).length) 使用filter性能不高不推荐
      return !this.$store.state.cartList.find(item => !item.checked) //推荐使用find这种方式性能更高点
      /*
      这种普通遍历的方式也可以但是不推荐使用
      for(let item of this.$store.state.cartList){
        if(!item.checked){
          return false
        }
      }
      return true

      */
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.showImage('请选择购买的商品',1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: -5px;
}
.check-content {
  display: flex;
  margin-left: 10px;
  margin-top: 2px;
}
.check-content span {
  margin-top: 6px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  margin-top: 5px;
}
.sum {
  position: relative;
  margin-left: 260px;
  margin-top: -17px;
  font-size: 15px;
  font-weight: bold;
  color: #5ea732;
}
.calculate {
  position: relative;
  margin-left: 450px;
  margin-top: -17px;
  color: dodgerblue;
  font-weight: bold;
}
</style>
