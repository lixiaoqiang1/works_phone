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
  text-align: center;color: #3959e7;font-size: 28px;line-height: 100px;
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
        <el-form ref="ruleForm" :model="ruleForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="mobile">
            <el-input
              ref="mobile"
              v-model="ruleForm.mobile"
              placeholder="输入手机号" autocomplete="off"
              name="mobile"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="code" class="security_code"  v-show="yanzhengtype == true">
            <el-input
              ref="code"
              v-model="ruleForm.code"
              placeholder="输入验证码"
              name="code"
              type="text" :maxlength="4"
              auto-complete="on"
            />
            <a class="yanzheng" @click="sendMsg">{{buttonName}}</a>
          </el-form-item>
          <el-form-item class="passwords" prop="password">
            <!-- passwordType -->
            <el-input
              :key="passwordType"
              ref="password"
              v-model="ruleForm.password"
              placeholder="输入密码"
              value=""
              :type="passwordType"
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
            <span style="margin-right:20px;">用户名: 15625053620</span>
            <span> 密码: haiyun</span>
          </div>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { sendCode,need_code } from '@/api/user'
// import Cookies from 'js-cookie'
// import { getToken, setToken, removeToken,getToken1} from '@/utils/auth'
const TokenKey = 'vue_admin_template_token'
export default {
  name: 'Login',
  //页面加载调用获取cookie值
  mounted() {
      this.getCookie();
      // return Cookies.get(TokenKey)
      // return Cookies.get(TokenKey)
  },
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
      yanzhengtype:'',
      setBackground: {
          backgroundImage: "url(" + require("@/assets/images/login_bj.png") + ")",
          
       },
      ruleForm: {
        mobile: '',
        code:'',
        password: ''
      },
      //验证
      loginRules: {
        mobile: [{ required: true, validator: validateUsername, trigger: 'blur' }],
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
    },
    //短信倒计时
    sendMsg() {
      if(this.ruleForm.mobile == ''){
        this.$message.error('请输入正确手机号');
        return false;
      }else{
        let json2 = {
          mobile:this.ruleForm.mobile
        }
        this.daojishi();
        sendCode(json2).then(res => {
          console.log(res)
            this.daojishi();
        }).catch(() => {
            this.$message.error('请求错误！');
        })
      }
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
      let json1 = {mobile:this.ruleForm.mobile}
      need_code(json1).then(res => {
          console.log(res.data.need);
          let type = res.data.need;
          if(type == true){
            // 需要验证
            this.yanzhengtype = true;
          }else{
             //不需要验证
             this.yanzhengtype = '';
          }
      }).catch((err) => {
        this.$message.error(err.msg);
      })
      this.$refs.ruleForm.validate(valid => {
        console.log(this.ruleForm);
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.ruleForm).then((res) => {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.ruleForm.mobile,this.ruleForm.password,7);
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            console.log(err.msg)
            this.$message.error(err.msg);
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'userName') {
                    this.ruleForm.mobile = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'userPwd') {
                    this.ruleForm.password = arr2[1];
                }
            }
        }
    },
  }
}
</script>
