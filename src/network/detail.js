import {request} from "./request";

export function getDetail(iid){
  return request({
    url: '/detail',//设置请求路径
    params: {//此处传参数
      iid
    }
  })
}
/*创建一个对象到时候将分类里头导航栏下面的数据包装成一个对象返回给前台*/
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

/*封装商家的信息*/
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

/*商品参数的信息*/
export class GoodsParam {
  constructor(info,rule) {
    //注意：images可能没有值(某些商品有值，某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

/*获取服务器端的推荐商品的数据*/
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}
