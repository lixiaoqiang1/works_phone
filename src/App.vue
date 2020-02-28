<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
// import { getInfo } from '@/api/user'
export default {
  name: 'App',
  provide(){
      return{
          reload:this.reload//刷新
      }
  },
  // created:function(){
  //   getInfo().then(res => {
  //       this.online = res.data.online
  //   }).catch(() => {
  //       this.$message.error('请求错误！');
  //   })
  // },
  data(){
    return{
      isRouterAlive:true,
      // online:''
    }
  },
  methods:{
    //页面刷新
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
.clearfix{
  clear: both;
}
.app-main{
  background:#f7f7f7;padding: 10px;border-radius:4px;
}
.padding10{
  padding:15px 10px;background: white;
}
.bule_color{color:rgb(64, 158, 255)}
.danger_color{color: rgb(245, 108, 108)}
</style>


