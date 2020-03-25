<template>
  <div class="module-img-uploader">
    <el-upload
      v-if="imgUrl===''"
      class="upload-icon"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
      action="https://jsonplaceholder.typicode.com/posts/">
      <i class="el-icon-custom-add avatar-uploader-icon"></i>
      <div class="el-upload__text">{{uploadText}}</div>
    </el-upload>
    <div v-else class="upload-icon_reupload" @mousemove="isReUpload=true" @mouseleave="isReUpload=false">
      <img :src="imgUrl" class="icon-img">
      <div class="el-upload_shadow" v-show="isReUpload">
        <el-button size="mini" type="primary" round @click="reUpload">上传ICON</el-button>
      </div>
    </div>
    <div class="el-upload__tip">{{uploadTip}}</div>
  </div>
</template>

<script>
/*
 * Description index 上传图片
 * Created By Administrator
 * Created At 2019/11/22 17:30
 */
export default {
  name: 'index',
  props: {
    imgUrl: {
      type: String
    },
    uploadText: { // 上传区域文字
      type: String,
      default: ''
    },
    uploadTip: { // 上传提示
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isReUpload: false,
    }
  },
  methods: {
    /**
     * 上传文件成功事件
     * @param file 文件数据
     */
    handleUploadSuccess (file) {
      this.$emit('handleUploadSuccess', file)
    },
    /**
     * 上传之前事件
     * @param file 文件数据
     */
    beforeUpload (file) {
      this.$emit('beforeUpload', file)
    },
    /**
     * 操作重新上传
     */
    reUpload () {
      this.$emit('reUpload')
    }
  }
}
</script>

<style scoped lang="scss">
  .module-img-uploader {
    .upload-icon {
      height: 110px;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #e1e7f0;
        margin-top: 23px;
        text-align: center;
      }
      /deep/ .el-upload {
        width: 140px;
        height: 110px;
        border: 1px dashed #c6cfde;
        box-sizing: border-box;
        overflow: hidden;
      }
      .el-upload__text {
        line-height: 15px;
        font-size: 12px;
        color: #a5a6bb;
      }
    }
    .upload-icon_reupload {
      width: 140px;
      height: 110px;
      border: 1px dashed #c6cfde;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      position: relative;
      .icon-img {
        width: 32px;
        height: 32px;
        margin-top: 39px;
      }
      .el-upload_shadow {
        line-height: 108px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
      }
    }
    .el-upload__tip {
      margin-top: 10px;
      line-height: 12px;
      color: #a5a6bb;
    }
  }
</style>
