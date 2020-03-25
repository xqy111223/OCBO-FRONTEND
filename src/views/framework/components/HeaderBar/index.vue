<template>
  <div class="header">
    <span class="title">互动课堂平台后台管理系统</span>
    <span class="fr el-icon-custom-quit logout" title="退出登录" @click="logout"></span>
    <span class="fr userName">您好，{{userName}}</span>
    <div class="changePassword fr" @click="changePassword">修改密码</div>
    <change-password :visible.sync="visible"></change-password>
  </div>
</template>

<script>
import ChangePassword from '@/views/home/ChangePassword'

export default {
  components: { ChangePassword },
  name: 'HeaderBar',
  props: {},
  data () {
    return {
      visible: false,
      userName: '前端大佬',
    }
  },
  methods: {
    /**
     * 修改密码
     */
    changePassword () {
      this.visible = true
    },
    /**
     * 登出
     */
    logout () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    overflow: hidden;
    color: #fff;
    padding: 0 20px 0 40px;
    font-size: 12px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #293152;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    .fr {
      float: right;
    }
    .title {
      font-weight: bold;
      font-size: 20px;
    }
    .changePassword {
      border: 1px solid #eeeeee;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      cursor: pointer;
      padding: 0 10px;
      margin-top: 15px;
      &:hover {
        color: #347eff;
        border: 1px solid #347eff;
      }
    }
    .userName {
      margin: 0 40px 0 15px;
    }
    .logout {
      font-size: 20px;
      margin-top: 15px;
      cursor: pointer;
      &:hover {
        color: #347eff;
      }
    }
  }
</style>
