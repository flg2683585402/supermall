import axios from 'axios'
export function request(config){

   //1、创建axios的实例
   const instance = axios.create({
     baseURL: 'http://152.136.185.210:8000/api/z8',
     timeout: 5000
   })
   //发送真正的网络请求
   instance.interceptors.request.use(config => {
      //console.log(config)
      return config
   },err => {
     //console.log(err)
   })

   instance.interceptors.response.use(res => {
      //console.log(res)
      return res.data
   },err =>{
      //console.log(err)
     return err
   })
   //instance本身就返回一个promise
   return instance(config)


}
