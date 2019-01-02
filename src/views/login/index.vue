<template>
  <body>
  <div class="login-form">

    <div class="head-info">
      <label class="lbl-1"> </label>
      <label class="lbl-2"> </label>
      <label class="lbl-3"> </label>
    </div>
    <div class="clear"></div>
    <div class="avtar">
      <img src="../../assets/login/images/avtar.png"/>
    </div>
    <form ref="loginForm" :model="loginForm">
      <input type="text" class="text" v-model="loginForm.username" onfocus="this.value = '';"
             onblur="if (this.value == '') {this.value = 'Username';}">
      <div :class="loginForm.password.length<6?'key':''">
        <input :type="passwordType" v-model="loginForm.password" onfocus="this.value = '';"
               onblur="if (this.value == '') {this.value = 'Password';}" @keyup.enter="handleLogin">
      </div>
    </form>
    <div class="signin">
      <input type="submit" value="登录" @click="handleLogin">
    </div>
  </div>
  <div class="copy-rights">
    <p>Copyright &copy; 2019.Company name All rights reserved.More Templates </p>
  </div>
  </body>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'

  export default {
    name: 'Login',
    data: function () {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('至少6位数密码！'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: 'Sys123'
        },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }

    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        console.log("1");
        let valid = true;
        if (this.loginForm.username == '' || this.loginForm.password == '') {
          valid = false;
        }
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({path: this.redirect || '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../../src/assets/login/css/style.css';
</style>
