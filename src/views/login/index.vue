<style scoped>
.login-container{
  width: 100%;height: 100%;display: inline-block;background-color: #3764e4;
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
  border-left: 1px #eee solid;height: 500px; padding: 20px;
}
.form_o_right .el-form{
  width: 350px;margin: auto;
}
.form_o_right .title{
  text-align: center;color: #3959e7;font-size: 28px;
}
</style>
<template>
  <div class="login-container">
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
              placeholder="请输入账户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
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
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
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
