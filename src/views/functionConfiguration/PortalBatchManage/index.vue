<template>
  <div class="module-portal-manage">
    <!--    <div class=" color-disable font-small">-->
    <!--      <span class="el-icon-custom-tips"></span>-->
    <!--      <div class="inlineBlock">-->
    <!--        <p>1.请先选择区域以及范围，再批量修改；</p>-->
    <!--        <p>2.可以批量修改选择区域内的所有子区域、学校；</p>-->
    <!--        <p>3.平台名称、LOGO、网站底部可以使用{机构名}代替某一级区域、学校名称。</p>-->
    <!--      </div>-->
    <!--    </div>-->

    <el-form :model="ruleForm" label-width="100px" :rules="rules">
      <div class="module-item">
        <div class="module-item-content">
          <el-form-item label="区域：" prop="baseAreaId">
            <select-region :area-id="ruleForm.baseAreaId" :value.sync="ruleForm.baseAreaId" :filterable="true"></select-region>
          </el-form-item>
          <el-form-item label="范围：" prop="rangeType">
            <el-radio v-model="ruleForm.rangeType" label="0">全部</el-radio>
            <el-radio v-model="ruleForm.rangeType" label="1">仅区域</el-radio>
            <el-radio v-model="ruleForm.rangeType" label="2">仅学校</el-radio>
          </el-form-item>
        </div>
      </div>
      <div class="module-item">
        <div class="module-item-content">
          <el-form-item label="平台名称：" prop="platformName">
            <el-input v-model="ruleForm.platformName" size="round" placeholder="请输入平台名称"></el-input>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('platformName')">批量配置</el-button>
      </div>
      <div class="module-item ">
        <div class="module-item-content">
          <el-form-item label="LOGO：" prop="logoInfo">
            <div class="logo-box">
              <produce-logo :logoInfo.sync="ruleForm.logoInfo"></produce-logo>
            </div>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('logoInfo')">批量配置</el-button>
      </div>
      <div class="module-item ">
        <div class="module-item-content">
          <el-form-item label="网站ICON：" prop="isIconChecked">
            <el-checkbox v-model="ruleForm.webIcon.isIconChecked">显示</el-checkbox>
            <img-uploader
              :imgUrl="ruleForm.webIcon.icon"
              :uploadText="iconUploadText"
              :uploadTip="iconUploadTip"
              @handleUploadSuccess="iconUploadSuccess"
              @reUpload="reUploadIcon"
              @beforeUpload="beforeIconUpload">
            </img-uploader>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('webIcon')">批量配置</el-button>
      </div>
      <div class="module-item ">
        <div class="module-item-content">
          <el-form-item label="网站底部1：" prop="bottomDetail">
            <el-input v-model="ruleForm.webBottom.bottomDetail" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>
          </el-form-item>
          <el-form-item label="网站底部2：" prop="bottomDetailTwo">
            <el-input v-model="ruleForm.webBottom.bottomDetailTwo" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>
          </el-form-item>
          <el-form-item label="网站底部3：" prop="bottomDetailThree">
            <el-input v-model="ruleForm.webBottom.bottomDetailThree" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('webBottom')">批量配置</el-button>
      </div>
      <div class="module-item ">
        <div class="module-item-content">
          <el-form-item label="导航配置：" prop="bottomDetail">
            <span class="font-small color-disable">在输入框输入新名称可重命名，可选择是否显示相应导航</span>
            <div class="navbar-manage-box">
              <el-form-item v-for="item in ruleForm.navBarList" :label="item.name + '：'" :key="item.navBarId">
                <el-col :span="9">
                  <el-input size="round" placeholder="重命名"></el-input>
                </el-col>
                <el-col :span="8" v-if="item.name!=='首页'">
                  <span
                    class="el-icon-custom-move-up nav-move-icon"
                    @click="moveNavBarSort('up', item.sort)"
                    :class="[item.sort === 1?'color-disable':'color-primary']">
                  </span>
                  <span
                    class="el-icon-custom-move-down nav-move-icon"
                    @click="moveNavBarSort('down',item.sort)"
                    :class="[item.sort === narBarListLength-1?'color-disable':'color-primary']">
                  </span>
                  <el-checkbox class="ml-15" v-model="item.isShow">显示</el-checkbox>
                </el-col>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('navBarList')">批量配置</el-button>
      </div>
      <div class="module-item ">
        <div class="module-item-content">
          <el-form-item label="地图配色：" prop="bottomDetail">
            <el-col :span="6">
              <label>
                有学校
              </label>
              <color-picker :value.sync="ruleForm.mapColor.hasSchoolColor"></color-picker>
            </el-col>
            <el-col :span="6">
              <label>
                无学校
              </label>
              <color-picker :value.sync="ruleForm.mapColor.noSchoolColor"></color-picker>
            </el-col>
            <el-col :span="6">
              <label>
                有学校悬停
              </label>
              <color-picker :value.sync="ruleForm.mapColor.hasSchoolHoverColor"></color-picker>
            </el-col>
          </el-form-item>
        </div>
        <el-button size="mini" type="primary" class="inlineBlock" round @click="setBatchConfig('mapColor')" :disabled="ruleForm.rangeType === '2'">批量配置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
/*
* Description portalBatchManage
* Created By admin
* Created At 2019/9/18 13:32
*/
import SelectRegion from '@/components/SelectRegion/index'
import ColorPicker from '@/components/ColorPicker/index'
import ImgUploader from '@/components/ImgUploader/index'
import ProduceLogo from './produceLogo'

export default {
  name: 'portalBatchManage',
  props: {},
  components: { SelectRegion, ColorPicker, ImgUploader, ProduceLogo },
  data () {
    return {
      hasSchoolColorDefault: '#8fbcf8',
      noSchoolColorDefault: '#dfdfdf',
      hasSchoolHoverColorDefault: '#609ff4',
      iconTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'],
      iconUploadText: '上传ICON32px*32px',
      iconUploadTip: '支持JPG、 PNG、GIF、 BMP、 JPEG的图片格式，最大不超过4M',
      logoUploadText: '上传ICON50px*50px',
      ruleForm: {
        baseAreaId: null, // 区域id
        rangeType: '0', // 范围
        platformName: '', // 平台名称
        logoInfo: { // LOGO
          iconUrl: '', // 图片路径
          isShowIcon: 1, // 1表示显示图标，0不显示
          isItalicsFont: true, // true 字形为斜体
          alignMode: '0', // 0 为左对齐 1为居中对齐
          firstText: '', // 第一段文字
          secondText: ''// 第二段文字
        },
        webIcon: { // 网站icon
          isIconChecked: true, // true 显示icon
          icon: '', // icon路径
        },
        webBottom: { // 网站底部
          bottomDetail: '', // 网站底部1
          bottomDetailTwo: '', // 网站底部2
          bottomDetailThree: '', // 网站底部3
        },
        navBarList: [ // 导航
          {
            name: '首页', // 导航名称
            sort: 0, // 导航排序
            isShow: 1, // 是否显示
            navBarId: 11 + Math.random() // 导航id
          },
          {
            name: '校园直播',
            sort: 1,
            isShow: true,
            navBarId: 11 + Math.random()
          },
          {
            name: '课程中心',
            sort: 2,
            isShow: true,
            navBarId: 11 + Math.random()
          },
          {
            name: '教学统计',
            sort: 3,
            isShow: false,
            navBarId: 11 + Math.random()
          }
        ],
        mapColor: { // 地图颜色
          hasSchoolColor: '#8fbcf8', // 有学校颜色
          noSchoolColor: '#dfdfdf', // 无学校颜色
          hasSchoolHoverColor: '#609ff4', // 有学校悬浮颜色
        },
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
  computed: {
    narBarListLength () {
      return this.ruleForm.navBarList.length
    }
  },
  methods: {
    /**
     * 导航排序设置
     * @param type up 上移 down 下移
     * @param sort 点击项排序值
     */
    moveNavBarSort (type, sort) {
      const data = this.ruleForm.navBarList
      if (type === 'up') {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sort === sort) {
            const data1 = data[i]
            const data2 = data[i - 1]
            data[i] = data2
            data[i - 1] = data1
            data[i].sort = data[i].sort + 1
            data[i - 1].sort = data[i - 1].sort - 1
            break
          }
        }
      } else if (type === 'down') {
        for (let i = 0; i < data.length; i++) {
          if (data[i].sort === sort) {
            const data1 = data[i]
            const data2 = data[i + 1]
            data[i] = data2
            data[i + 1] = data1
            data[i].sort = data[i].sort - 1
            data[i + 1].sort = data[i + 1].sort + 1
            break
          }
        }
      }
      this.ruleForm.navBarList = data
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
     * 处理icon上传成功事件
     * @param res
     * @param file
     */
    iconUploadSuccess (file) {
      this.ruleForm.webIcon.icon = URL.createObjectURL(file.raw)
    },
    /***
     * 点击重新上传icon
     */
    reUploadIcon () {
      this.ruleForm.webIcon.icon = ''
    },
    /**
     * 处理Logoicon上传成功事件
     * @param file
     */
    logoUploadSuccess (file) {
      this.ruleForm.logoInfo.iconUrl = URL.createObjectURL(file.raw)
    },
    /**
     * 批量配置
     * @param setType 配置类型, 值与ruleForm中的属性对应
     */
    setBatchConfig (setType) {
      if (this.ruleForm.baseAreaId === null) {
        this.showMsgBox({
          message: '请选择行政区！',
          type: 'info'
        })
      } else {
        let params = { baseAreaId: this.ruleForm.baseAreaId, rangeType: this.ruleForm.rangeType }
        if (setType === 'platForm') {
          const configParams = { platformName: this.ruleForm.platformName }
          params = { ...params, ...configParams }
        } else {
          const configParams = { [setType]: this.ruleForm[setType] }
          params = { ...params, ...configParams }
        }
        console.log(params)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .module-portal-manage {
    .el-icon-custom-tips:before {
      color: #347eff;
      margin-right: 5px;
    }
    .module-item {
      border-bottom: dashed 1px #c6cfde;
      &:last-child {
        border-bottom: none;
        margin-bottom: 37px;
      }
      .module-item-content {
        display: inline-block;
        width: 869px;
        vertical-align: middle;
        margin-top: 25px;
        margin-right: 50px;
        .navbar-manage-box {
          .el-form-item {
            margin-top: 18px;
          }
        }
        label {
          font-weight: normal;
        }
        .nav-move-icon {
          font-size: 20px;
          &.color-primary {
            cursor: pointer;
          }
        }
        .el-icon-custom-move-down {
          margin-left: 8px;
        }
      }
      .item-title {
        font-size: 16px;
        color: #293152;
        padding-bottom: 11px;
        border-bottom: dashed 1px #c6cfde;
        margin-bottom: 20px;
      }
      .input-large {
        width: 600px;
      }
      .view-limit-tip {
        display: inline-block;
        margin-left: 10px;
      }
      .definition-tip {
        display: inline-block;
        margin-left: -23px;
      }
      .server-tip {
        display: inline-block;
        margin-left: 10px;
      }
      /deep/ .el-form-item__label {
        font-weight: normal;
      }
      .logo-box {
        border: 1px dashed #c6cfde;
        padding: 20px 0 36px;
        .text-tips {
          display: block;
          line-height: 18px;
          &:first-child {
            margin-top: 10px;
          }
        }
        .el-form-item {
          margin-top: 20px;
        }
      }
    }
  }
</style>
