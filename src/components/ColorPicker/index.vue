<template>
  <el-color-picker class="color-picker" v-model="colorValue"></el-color-picker>
</template>

<script>
/*
 * Description index  颜色选择器
 * Created By Administrator
 * Created At 2019/11/22 16:50
 */
export default {
  name: 'index',
  props: {
    value: { // 默认颜色值
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {
    colorValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .color-picker {
    vertical-align: middle;
    height: 18px;
    /deep/ .el-color-picker__trigger {
      padding: 0;
      width: 30px;
      height: 18px;
      border: 1px solid #d2d2d2;
      border-radius: 9px;
      /deep/ .el-color-picker__color {
        border: none;
        border-radius: 9px;
        .el-color-picker__color-inner {
          border-radius: 9px;
        }
      }
      /deep/ .el-color-picker__icon {
        display: none;
      }
    }
  }
</style>
