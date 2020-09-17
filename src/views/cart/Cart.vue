<template>
<div class="cart">
  <!--导航-->
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
  <!--购物车的商品列表-->
  <cart-list/>
  <!--底部的汇总-->
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    /*
    这种写法是数组语法的写法跟下面那种写法(对象语法)都可以
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
    */
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
