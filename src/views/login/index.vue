<style scoped>
.login-container{
  width: 100%;height:inherit;display: inline-block;background-color: #3764e4;
  background-repeat: no-repeat;
  background-size: cover;
}
.form_o{
  position: fixed; left: 0;right: 0;top: 0;bottom: 0;margin: auto;background: white;border-radius: 12px;
  width: 900px;height: 500px;
}
.form_o_left{
  text-align: center;padding: 20px 50px;
}
.form_o_left img{
  width: 100%;
}
.form_o_right{
  border-left: 1px #eee solid;height: 500px; padding: 45px 20px;
}
.form_o_right .el-form{
  width: 350px;margin: auto;
}
.form_o_right .title{
  text-align: center;color: #3959e7;font-size: 28px;
}
.security_code{
  position: relative;
}
.security_code .yanzheng{
  position: absolute;
  right: 10px;
  top: 0;
  line-height: 40px;
  padding: 0;
  color: #3959e7
}
.passwords{
  position: relative;
}
.show-pwd{
  position: absolute;
  right: 10px;
  top: 0;
  line-height: 40px;
}
</style>
<template>
  <div class="login-container" :style="setBackground">
    <el-row class="form_o">
      <el-col class="form_o_left" :span="10">
        <img class="pic1" src="@/assets/images/login2.png">
        <img class="pic2" src="@/assets/images/login1.png">
      </el-col>
      <el-col class="form_o_right" :span="14">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="输入手机号" autocomplete="off"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="code" class="security_code">
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="输入验证码"
              name="code"
              type="text" :maxlength="4"
              auto-complete="on"
            />
            <a class="yanzheng" @click="sendMsg">{{buttonName}}</a>
          </el-form-item>
          <el-form-item class="passwords" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
          <div class="tips">
            <span style="margin-right:20px;">用户名: admin</span>
            <span> 密码: any</span>
          </div>

        </el-form>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    //账号验证
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空！'))
      } else {
        callback()
      }
    }
    //密码验证
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      setBackground: {
          backgroundImage: "url(" + require("@/assets/images/login_bj.png") + ")",
          
       },
      loginForm: {
        username: '',
        code:'',
        password: ''
      },
      //验证
      loginRules: {
        username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
        password: [{ required: true,validator: validatePassword, trigger: 'blur' }]
      },
      buttonName: "发送短信",
      isDisabled: false,
      time: 180,
      
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    //短信倒计时
    sendMsg() {
      let json2 = {
        username:this.loginForm.username
      }
      console.log(json2);
      this.daojishi();
      // sendCode(json2).then(res => {
      //     this.daojishi();
      // }).catch(() => {
      //     this.$message.error('请求错误！');
      // })
    },
    //倒计时
    daojishi(){
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
          me.buttonName = '（' + me.time + '秒）后重新发送';
          --me.time;
          if(me.time < 0) {
              me.buttonName = "重新发送";
              me.time = 10;
              me.isDisabled = false;
              window.clearInterval(interval);
          }
      }, 1000);
    },
    //登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
