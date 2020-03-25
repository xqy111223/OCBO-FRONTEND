<template>
  <div class="tinymce-editor">
    <editor v-model="editorContent" :init="initEditor"></editor>
  </div>
</template>
<script>
/*
 * Description index 编辑器
 * Created By Administrator
 * Created At 2019/11/28 9:35
 */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  name: 'tinymce',
  props: {
    value: { // 编辑器内容
      type: String,
      default: '请输入内容'
    },
    plugins: { // 编辑器插件参数
      type: [String, Array],
      default: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize lineheight formatpainter axupimgs'
    },
    toolbar: { // 编辑器工具栏接收参数
      type: [String, Array],
      default: 'code undo redo restoredraft | bold italic underline strikethrough bullist numlist forecolor link image | alignleft aligncenter alignright fontselect fontsizeselect'
    },
    imgTypes: { // 上传的图片类型
      type: String,
      default: 'png jpg jpeg gif bmp'
    },
    imgSize: { // 上传的图片尺寸 M
      type: Number,
      default: 2
    }
  },
  components: {
    // tinymce,
    Editor
  },
  data () {
    return {
      editorContent: this.value,
      initEditor: {
        language_url: '/static/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/', // 皮肤路径
        content_css: '/static/tinymce/skins/content/default/content.css', // 指定内容区域样式文件
        height: 200, // 编辑器高度
        width: 800,
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: false, // 顶部菜单栏显示
        plugins: this.plugins,
        toolbar: this.toolbar,
        images_upload_handler: (blobInfo, success, failure) => { // 上传图片
          this.handleImgUpload(blobInfo, success, failure)
        },
      }
    }
  },
  watch: {
    editorContent (value) {
      console.log(value, '------')
      this.$emit('update:value', value)
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    /**
     * 处理图片上传
     * @param blobInfo 对象，包含上传文件的信息
     * @param success 函数， 上传成功的时候向 success 传入一个图片地址
     * @param failure 函数，上传失败的时候向 failure 传入报错信息
     */
    handleImgUpload (blobInfo, success, failure) {
      const imgInfo = blobInfo.blob()
      const isAllowImgType = this.imgTypes.includes(imgInfo.type)
      const isAllowIngSize = imgInfo <= this.imgSize * 1024
      if (isAllowImgType && isAllowIngSize) {
        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        success(img)
      } else {
        failure('只能上传2M以内，格式为.png .jpg .jpeg .gif .bmp的图片！')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .index {
  }
</style>
