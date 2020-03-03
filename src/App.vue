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
/* CSS Document */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0}
html,body,fieldset,img,iframe,abbr{border:0;}
li{list-style:none;}
textarea{overflow:auto;resize:none;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
a,a:hover{text-decoration:none;}
/* body, html {width: 100%; font-weight: normal;} */
html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%; font-family: "Microsoft YaHei","Helvetica Neue",Arial, HelveticaNeue, Helvetica, "BBAlpha Sans", sans-serif;}
body{
  background: #f3f3f3;opacity: 1;-webkit-transition:opacity 500ms ease-in;transition:opacity 500ms ease-in; }
a{text-decoration:none;  }
input{-webkit-appearance:none; }
*{ outline: none; -webkit-tap-highlight-color: transparent;  -webkit-touch-callout:none;-webkit-focus-ring-color: rgba(0, 0, 0, 0);}
img{
    vertical-align: top;border:none;
}
.clearfix{
  clear: both;
}
.app-main{
  background:#f7f7f7;padding: 10px;border-radius:4px;
}
.padding10{
  padding:15px 10px;background: white;
}
.bule_color{
  color:rgb(64, 158, 255)
}
.danger_color{
  color: rgb(245, 108, 108)
}
</style>


