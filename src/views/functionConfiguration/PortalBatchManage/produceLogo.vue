<template>
  <div class="produce-logo">
    <el-form :model="ruleForm" label-width="100px" :rules="rules">
      <el-form-item label="图标">
        <el-checkbox>显示</el-checkbox>
        <img-uploader
          :imgUrl="ruleForm.logoInfo.iconUrl"
          :uploadText="logoUploadText"
          :uploadTip="iconUploadTip"
          @handleUploadSuccess="logoUploadSuccess"
          @reUpload="reUploadLogo"
          @beforeUpload="beforeIconUpload">
        </img-uploader>
      </el-form-item>
      <el-form-item label="字形">
        <el-checkbox v-model="ruleForm.logoInfo.isItalicsFont">斜体</el-checkbox>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-radio v-model="ruleForm.logoInfo.alignMode" label="0">左对齐</el-radio>
        <el-radio v-model="ruleForm.logoInfo.alignMode" label="1">居中对齐</el-radio>
      </el-form-item>
      <el-form-item label="文字">
        <span class="text-tips font-small color-disable">1、当LOGO的两段文字总长度≤10，则会将两段拼接后显示一行；</span>
        <span class="text-tips font-small color-disable">2、当LOGO的两段文字总长度>10，则每一段各显示一行。</span>
        <el-form-item label="第一段文字" prop="firstText">
          <el-input v-model="ruleForm.logoInfo.firstText" size="round" placeholder="最多输入10个字"></el-input>
        </el-form-item>
        <el-form-item label="第二段文字" prop="secondText">
          <el-input v-model="ruleForm.logoInfo.secondText" size="round" placeholder="最多输入10个字"></el-input>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class="logo-preview" v-show="visible">
      <canvas width="295" height="50"></canvas>
    </div>
    <!--    <el-button @click="createLogoImg">预览</el-button>-->
  </div>
</template>

<script>
/*
 * Description makingLogo
 * Created By Administrator
 * Created At 2019/11/25 11:30
 */
import ImgUploader from '@/components/ImgUploader/index'

export default {
  name: 'produceLogo',
  props: {
    logoInfo: {
      type: Object
    }
  },
  components: { ImgUploader },
  data () {
    return {
      visible: false,
      iconTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'],
      iconUploadTip: '支持JPG、 PNG、GIF、 BMP、 JPEG的图片格式，最大不超过4M',
      logoUploadText: '上传ICON50px*50px',
      ruleForm: {
        logoInfo: {}
      },
      rules: {
        firstText: [
          { required: true, max: 10, message: '请输入文字', trigger: 'blur change' }
        ],
        secondText: [
          { required: true, max: 10, message: '请输入文字', trigger: 'blur change' }
        ],
      },
    }
  },
  mounted () {
    this.ruleForm.logoInfo = this.logoInfo
  },
  watch: {
    ruleForm: {
      deep: true,
      handler (val) {
        this.$emit('update:logoInfo', val.logoInfo)
      }
    }
  },
  computed: {
    /***
     * 字体样式
     */
    logoFontStyle () {
      if (this.ruleForm.logoInfo.isItalicsFont) {
        return 'italic'
      } else {
        return 'normal'
      }
    },
    /***
     * 对齐模式
     */
    alignStyle () {
      if (this.ruleForm.logoInfo.alignMode === '0') {
        return 'left' // 左对齐
      } else {
        return 'center' // 居中对齐
      }
    },
  },
  methods: {
    /***
     * 点击重新上传logo
     */
    reUploadLogo () {
      this.ruleForm.logoInfo.iconUrl = ''
    },
    /**
     * 处理Logoicon上传成功事件
     * @param file
     */
    logoUploadSuccess (file) {
      this.ruleForm.logoInfo.iconUrl = URL.createObjectURL(file.raw)
    },
    /**
     * 上传icon之前
     * @param file 文件信息
     */
    beforeIconUpload (file) {
      const isTypeCorrect = this.iconTypes.indexOf(file.type) !== -1
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isTypeCorrect) {
        this.showMsgBox({
          message: '支持JPG、 PNG、GIF、 BMP、 JPEG的图片格式',
          type: 'error'
        })
        return false
      }
      if (!isLt4M) {
        this.showMsgBox({
          message: '上传图片大小不能超过 4MB!',
          type: 'error'
        })
        return false
      }
    },
    /**
     * 生成预览图
     */
    createLogoImg () {
      this.visible = true
      const iconImg = new Image()
      iconImg.src = '../../../src/assets/logo/codyy.png'
      if (iconImg.src !== '') { // 用户上传了icon
        iconImg.onload = () => {
          this.canvasDrawLogo(iconImg)
        }
      } else {
        this.canvasDrawLogo()
      }
    },
    /**
     * 使用canvas绘制Logo
     * @param iconImg 上传icon图片
     */
    canvasDrawLogo (iconImg) {
      const myCanvas = document.querySelector('canvas')
      const ctx = myCanvas.getContext('2d')
      ctx.clearRect(0, 0, 295, 50)
      if (iconImg) {
        ctx.drawImage(iconImg, 0, 8) // drawImage(img, x, y, width, height)
      }
      const text = this.ruleForm.logoInfo.firstText + this.ruleForm.logoInfo.secondText
      const textSize = this.filterLogoTextSize(text.length, iconImg.src)
      ctx.textAlign = this.alignStyle // 设置对齐模式
      const textPos = this.filterLogotextPos(iconImg.src)
      ctx.textBaseline = 'middle' // 设置垂直方向居中
      ctx.fillStyle = '#fff' // 设置文字颜色
      if (text.length > 10) { // 两端文字总长度 > 10， 分两行
        ctx.font = this.logoFontStyle + ' ' + textSize + 'px ' + ' MicrosoftYaHei-Bold' // 设置字体样式
        ctx.fillText(this.ruleForm.logoInfo.firstText, textPos.posX, 12.5) // 填充第一段文字
        ctx.fillText(this.ruleForm.logoInfo.secondText, textPos.posX, 36) // 填充第二段文字
      } else {
        ctx.font = this.logoFontStyle + ' ' + textSize + 'px ' + ' MicrosoftYaHei-Bold'
        ctx.fillText(text, textPos.posX, textPos.posY)
      }
    },
    /**
     * 根据文字个数和图片获取要生成的预览图文字尺寸
     * @param length 文字个数
     * @param src icon路径
     */
    filterLogoTextSize (length, src) {
      let size = 0
      if (src !== '') { // 有图标
        if (length > 1 && length <= 6) {
          size = 36
        } else if (length >= 7 && length <= 8) {
          size = 28
        } else if (length >= 9 && length <= 10) {
          size = 22
        } else if (length > 10) {
          size = 20
        }
      } else {
        if (length > 1 && length <= 6) {
          size = 40
        } else if (length >= 7 && length <= 8) {
          size = 32
        } else if (length >= 9 && length <= 10) {
          size = 26
        } else if (length > 10) {
          size = 20
        }
      }
      return size
    },
    /**
     * 根据有无图标和字体大小定位文字的位置
     * @param src icon路径
     * @param fontSize 文字size
     */
    filterLogotextPos (src, fontSize) {
      // 无图片，左对齐
      // 无图片,居中对齐
      // 有图片,左对齐
      // 有图片,居中对齐
      let posX = 0
      const posY = 25
      if (src === '') { // 无图片
        if (this.alignStyle === 'left') {
          posX = 0
        } else if (this.alignStyle === 'center') {
          posX = 147
        }
      } else { // 有图片
        if (this.alignStyle === 'left') {
          posX = 59
        } else if (this.alignStyle === 'center') {
          posX = 175
        }
      }
      return { posX: posX, posY: posY }
    },
  }
}
</script>

<style scoped lang="scss">
  .produce-logo {
    .logo-preview {
      canvas {
        background: #347eff;
      }
    }
  }
</style>
