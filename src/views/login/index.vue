<template>
  <div class="login-container">
    <div class="logo">
      <img src="./../../assets/welcome/logo.png" alt="">
      <i class="line"></i>
      <img src="./../../assets/welcome/telephone.png" alt="">
    </div>
    <div class="formContainer">
      <img src="./../../assets/welcome/loginImg.png" alt="" class="loginImg">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">
        <div class="title">
          互动课堂平台后台管理系统
        </div>
        <el-form-item prop="loginName" class="userName">
          <el-input
            prefix-icon="iconfont el-icon-custom-user-name"
            v-model="loginForm.loginName"
            placeholder="用户名"
            name="loginName"
            type="text"
            auto-complete="on"
            size="round-large"
          />
        </el-form-item>

        <el-form-item prop="passWord">
          <el-input
            prefix-icon="iconfont el-icon-custom-password"
            v-model="loginForm.passWord"
            :type="passwordType"
            placeholder="密码"
            name="passWord"
            size="round-large"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item class="remember">
          <el-checkbox v-model="isRemember">记住密码</el-checkbox>
        </el-form-item>
        <el-button :loading="loading" type="primary" round
                   @click.native.prevent="handleLogin">
          {{loading?'登陆中':'登 陆'}}
        </el-button>

      </el-form>
    </div>
    <footer class="tms-footer-home">
      <address>{{ defaultVal }}</address>
    </footer>
  </div>
</template>

<script>
import { getUserInfo, login } from '@/api/home/login'
import * as RESPONSE_STATUS from '@/constants/RESPONSE_CODE'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // if (value.length < 6) {
      //   callback(new Error('密码不能低于6位'))
      // }
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: '',
        passWord: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      isRemember: true,
      passwordType: 'password',
      loading: false,
      defaultVal: 'Copyright©阔地教育科技有限公司 版权所有'
    }
  },
  watch: {},
  created () {},
  methods: {
    ...mapActions(['SET_TOKEN', 'SET_USER_INFO']),
    /**
     * 登陆
     */
    handleLogin () {
      // const _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login(this.loginForm)
        }
      })
    },
    /**
     * login
     */
    async login (params) {
      this.loading = true
      try {
        const result = await login(params)
        this.SET_TOKEN(result.token)
        const userInfo = await getUserInfo()
        this.SET_USER_INFO(userInfo)
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.$router.push({ path: '/' })
        console.log('登陆成功，token为：', 111)
        console.log('登陆成功，userInfo为：', userInfo)
      } catch (e) {
        let RES_MSG = ''
        switch (e.status) {
          case RESPONSE_STATUS.USER_NOT_EXISTED:
            RES_MSG = RESPONSE_STATUS.RES_MSG.USER_NOT_EXISTED
            break
          case RESPONSE_STATUS.INVALID_PWD:
            RES_MSG = RESPONSE_STATUS.RES_MSG.INVALID_PWD
            break
        }
        this.$message({
          message: RES_MSG,
          type: 'error'
        })
      }
      this.loading = false
    },
    /**
     * 记住密码
     */
    remember () {

    }
  }
}
</script>
<style scoped lang="scss">
  .login-container {
    background: url("~@/assets/welcome/loginBg.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: calc(50vh - 255px);

    .userName {
      margin-bottom: 30px;
    }

    .el-input--round-large .el-input__prefix {
      left: 18px;

      .el-input__icon {
        font-size: 14px;
      }
    }
    /deep/ button {
      width: 230px;
      box-sizing: border-box;
      margin-left: 57px;
      height: 40px;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 40px;
      font-size: 12px;
    }

    /deep/ .el-form-item__error {
      left: 38px;
      padding-top: 7px
    }

    .remember {
      margin-left: 35px;

      .el-checkbox__label {
        color: #818798;
      }
      /deep/ .el-checkbox__inner {
        width: 18px;
        height: 18px;
      }
      & /deep/ ::after {
        left: 7px;
        top: 3px;
      }
    }

    .logo {
      position: absolute;
      left: calc(50% - 550px);
      top: calc(50vh - 303px);

      .line {
        border-left: 1px solid #999;
        height: 33px;
        margin: 0 25px;
        position: relative;
        top: -6px;
      }
    }

    .formContainer {
      margin: 0 auto;
      width: 1100px;
      height: 510px;
      background: #fff;
      border-radius: 5px;

      .loginImg {
        float: left;
        margin: 110px 30px 0 16px;
      }

      .login-form {
        float: left;
        margin-top: 78px;

        .title {
          font-size: 28px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          margin-bottom: 51px;
        }
      }
    }

    .tms-footer-home {
      position: fixed;
      bottom: 0;
      width: 100%;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #999;
      address {
        font-style: normal;
        color: #a5aec5;
        margin-bottom: 23px;
      }
    }
  }

  body .el-input--round-large {
    margin-left: 20px;

    input:first-child {
      margin-bottom: 12px;
    }

    > .el-input__inner {
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
    /deep/ button {
      padding: 13px 100px;
    }
  }
</style>
