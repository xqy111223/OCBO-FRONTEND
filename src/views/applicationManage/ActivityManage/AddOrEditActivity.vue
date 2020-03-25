<template>
  <!--  新增活动/编辑活动-->
  <div class="module-add-activity">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <div class="module-item ">
        <div class="item-title">活动信息</div>
        <el-form-item label="活动主题：" prop="activityName">
          <el-input v-model="ruleForm.activityName" size="round" placeholder="请输入活动主题" class="input-large"></el-input>
        </el-form-item>
        <el-form-item label="活动持续时间：" prop="costTime">
          <el-input v-model="ruleForm.costTime" size="round-mini" placeholder=""></el-input>
          小时
          <span class="color-disable font-small server-tip">注：2-12之间，为了安全使用CDN，需要对推流地址加密，加密需要获取活动持续时间，若活动超出时间仍未结束，则在持续时间之后加入的用户无法观摩，所以请设置足够的时间</span>
        </el-form-item>
        <el-form-item label="活动简介：" prop="activityDetail">
          <tinymce-editor :value.sync="ruleForm.activityDetail"></tinymce-editor>
        </el-form-item>
        <el-form-item label="CDN服务器：" prop="cdnServers">
          <cdn-selector :value.sync="cdnValue1"></cdn-selector>
          <cdn-selector :value.sync="cdnValue2"></cdn-selector>
          <cdn-selector :value.sync="cdnValue3"></cdn-selector>
          <span class="color-disable font-small server-tip">注：请至少选择一个服务器</span>
        </el-form-item>
        <el-form-item label="清晰度：" prop="definitionList">
          <el-checkbox-group v-model="ruleForm.definitionList">
            <el-checkbox v-for="(item, index) in definitionValueList" :label="item.code" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="PC端默认清晰度：" prop="pcDefaultDefinition">
          <el-radio v-model="ruleForm.pcDefaultDefinition" label="cld">超清</el-radio>
          <el-radio v-model="ruleForm.pcDefaultDefinition" label="csd">高清</el-radio>
          <el-radio v-model="ruleForm.pcDefaultDefinition" label="chd">标清</el-radio>
        </el-form-item>
        <el-form-item label="微信端默认清晰度：" prop="mobileDefaultDefinition">
          <el-radio v-model="ruleForm.mobileDefaultDefinition" label="cld">超清</el-radio>
          <el-radio v-model="ruleForm.mobileDefaultDefinition" label="csd">高清</el-radio>
          <el-radio v-model="ruleForm.mobileDefaultDefinition" label="chd">标清</el-radio>
          <span class="color-disable font-small definition-tip">注：微信端建议选择较低的清晰度</span>
        </el-form-item>
        <el-form-item label="观摩人数上限：" prop="viewerLimit">
          <el-input v-model="ruleForm.viewerLimit" size="round" placeholder="请输入观摩人数"></el-input>
          <span class="color-disable font-small view-limit-tip">注：50-100000之间，若超过3000，则关闭活动统计、观摩人数；若超过5000，请与开发运维联系</span>
        </el-form-item>
        <el-form-item label="直播画面配置：" prop="livePicConfList">
          <el-col :span="3">
            <el-checkbox-group v-model="ruleForm.livePicConfList">
              <el-checkbox label="主讲画面"></el-checkbox>
              <el-checkbox label="互动画面"></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="6"><span class="color-disable font-small">注：无听讲教室时，此配置项不生效</span></el-col>
        </el-form-item>
      </div>
      <div class="module-item ">
        <div class="item-title">微信分享</div>
        <el-form-item label="副标题：" prop="wechatDesc">
          <el-input
            v-model="ruleForm.wechatDesc"
            size="round"
            placeholder="请输入副标题"
            class="input-large"
            maxlength="50"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="图标：" prop="wechatLogo">
          <el-upload
            class="upload-demo"
            :show-file-list="false"
            :on-success="handleWechatImgSuccess"
            :before-upload="beforeWechatImgUpload"
            action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="ruleForm.wechatLogo" :src="ruleForm.wechatLogo" class="wechat-pic">
            <i v-else class="el-icon-custom-add avatar-uploader-icon"></i>
            <div class="color-disable font-small">
              <span class="block upload-img-tip">上传图标</span>
              <span class="block upload-img-tip">300px*300px</span>
            </div>
          </el-upload>
        </el-form-item>
      </div>
      <div class="module-item ">
        <div class="item-title">课程信息</div>
        <el-form-item label="课程信息：" prop="courseDetail">
          <el-col :span="8">
            <el-button
              size="mini"
              type="info"
              round
              @click="visible = !visible"
              :disabled="operationType===1&& ruleForm.courseStatus==='PROGRESS'">
              选择
            </el-button>
            <el-form-item v-if="ruleForm.courseId!==''" label="主讲学校：" prop="courseDetail.mainSchoolName" label-width="92px">
              <span>{{ruleForm.courseDetail.mainSchoolName}}</span>
            </el-form-item>
            <el-form-item v-if="ruleForm.courseId!==''" label="主讲教师：" prop="courseDetail.mainTeacherName" label-width="92px">
              <span>{{ruleForm.courseDetail.mainTeacherName}}</span>
            </el-form-item>
            <el-form-item v-if="ruleForm.courseId!==''" label="听讲学校：" prop="courseDetail.receiveSchoolNames" label-width="92px">
              <span v-for="(name, index) in ruleForm.courseDetail.receiveSchoolNames" :key="index">
                {{(index === ruleForm.courseDetail.receiveSchoolNames.length-1)?name:name + '、'}}
              </span>
            </el-form-item>
            <el-form-item v-if="ruleForm.courseId!==''" label="排课日期：" prop="courseDetail.arangeDate" label-width="92px">
              <span>{{ruleForm.courseDetail.arangeDate|date('YYYY-MM-DD hh:mm')}}</span>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码：" prop="validateCode">
          <el-radio v-model="ruleForm.validateCode" label="1">启用</el-radio>
          <el-radio v-model="ruleForm.validateCode" label="2">不启用</el-radio>
        </el-form-item>
        <el-form-item label="交流：" prop="openComment">
          <el-radio v-model="ruleForm.openComment" label="1">启用</el-radio>
          <el-radio v-model="ruleForm.openComment" label="2">不启用</el-radio>
          <span class="color-disable font-small">注：若观摩人数上限超过1000，则启用交流不生效</span>
        </el-form-item>
      </div>
      <div class="module-item ">
        <div class="item-title">页面配置</div>
        <el-form-item label="banner：" prop="bannerPic">
          <el-upload
            class="upload-banner"
            :show-file-list="false"
            :on-success="handleBannerSuccess"
            :before-upload="beforeBannerUpload"
            action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="ruleForm.bannerPic" :src="ruleForm.bannerPic" class="banner">
            <i v-else class="btn-banner-upload">上传banner</i>
            <div class="color-disable font-small">
              <span class="block upload-img-tip">注:建议上传像素为1920px * 480px的图片，仅支持JPG、PNG、BMP格式的图片，且文件小于5M  </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="网站底部1：" prop="bottomDetail">
          <el-input v-model="ruleForm.bottomDetail" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>
        </el-form-item>
        <el-form-item label="网站底部2：" prop="bottomDetailTwo">
          <el-input v-model="ruleForm.bottomDetailTwo" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>
        </el-form-item>
        <el-form-item label="网站底部3：" prop="bottomDetailThree">
          <tinymce-editor :value.sync="ruleForm.bottomDetailThree"></tinymce-editor>
          <!--          <el-input v-model="ruleForm.bottomDetailThree" size="round" class="input-large " placeholder="主管单位:{机构名}"></el-input>-->
        </el-form-item>
      </div>
      <course-select-dialog :visible.sync="visible" @handleCourseData="handleCourseData"></course-select-dialog>
    </el-form>
    <div slot="footer" class="footer-button">
      <el-button type="info" size="mini" round @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" round @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
/*
 * Description AddOrEditActivity
 * Created By Administrator
 * Created At 2019/10/24 9:10
 */
import { addActivity, getActivityDetails } from '@/api/applicationManage/activityManage'
import CourseSelectDialog from './CourseSelectDialog'
import CdnSelector from '@/components/CDNSelector/index'
import TinymceEditor from '@/components/TinymceEditor/index'

export default {
  name: 'AddOrEditActivity',
  components: {
    CourseSelectDialog,
    CdnSelector,
    TinymceEditor
  },
  props: {},
  data () {
    /**
     * cdn服务器校验规则
     * @param rule
     * @param value
     * @param callback
     */
    const validateCdnServer = (rule, value, callback) => {
      if (this.cdnValue1 === '' && this.cdnValue2 === '' && this.cdnValue3 === '') {
        callback(new Error('请至少选择一个服务器!'))
      } else {
        callback()
      }
    }
    const validateLivePicConfig = (rule, value, callback) => {
      if (value.length > 0) {
        callback()
      } else {
        callback(new Error('请选择直播画面配置!'))
      }
    }
    const validDefinition = (rule, value, callback) => {
      if (value.length > 0) {
        callback()
      } else {
        callback(new Error('请选择清晰度!'))
      }
    }
    return {
      visible: false, // 课程选择框是否展示flag
      imgTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'],
      definitionValueList: [{ code: 'cld', name: '超清' }, { code: 'csd', name: '高清' }, { code: 'chd', name: '标清' }], // 清晰度
      cdnValue1: '',
      cdnValue2: '',
      cdnValue3: '',
      ruleForm: {
        activityName: '', // 活动主题
        costTime: '', // 活动持续时间
        activityDetail: 'I am activity', // 活动简介
        cdnServers: [], // cdn服务器
        definitionList: [], // 清晰度
        pcDefaultDefinition: 'csd', // pc端清晰度
        mobileDefaultDefinition: 'chd', // 微信端清晰度
        viewerLimit: '', // 观摩人数上限
        livePicConfList: ['主讲画面', '互动画面'], // 直播画面配置
        wechatDesc: '', // 微信分享副标题
        wechatLogo: '', // 微信分享图标
        courseDetail: { // 课程信息
          arangeDate: '',
          courseId: '',
          mainSchoolName: '',
          mainTeacherName: '',
          qrCodeUrl: '',
          realBeginTime: '',
          receiveSchoolNames: [],
          status: '',
          validatecode: ''
        },
        courseId: '',
        openComment: '1', // 交流状态
        useValidatecode: '', // 验证码状态
        bannerPic: '', // banner
        bottomDetail: '', // 网站底部1
        bottomDetailThree: '', // 网站底部2
        bottomDetailTwo: '', // 网站底部3
        validateCode: '1',
      }, // 表单数据
      rules: {
        activityName: { required: true, message: '请输入活动主题', trigger: 'blur' },
        costTime: { required: true, message: '请输入活动持续时间', trigger: 'blur' },
        activityDetail: { required: true, message: '请输入活动简介', trigger: 'blur change' },
        cdnServers: { validator: validateCdnServer, required: true, message: '请至少选择一个服务器', trigger: 'blur change' },
        definitionList: { validator: validDefinition, required: true, message: '请选择清晰度', trigger: 'change' },
        pcDefaultDefinition: { required: true, message: '请选择PC端默认清晰度', trigger: 'change' },
        mobileDefaultDefinition: { required: true, message: '请选择微信端默认清晰度', trigger: 'change' },
        viewerLimit: { required: true, message: '请输入观摩人数', trigger: 'blur' },
        livePicConfList: { required: validateLivePicConfig, trigger: 'change' },
        courseDetail: { required: true, message: '请选择课程', trigger: 'change' }
      }, // 表单验证规则
      queryData: {
        liveActivityId: '', // 活动id
      },
    }
  },
  created () {
  },
  mounted () {
    if (this.operationType === 1) { // 编辑活动， 获取活动详情
      this.getActivityDetails()
    }
  },
  computed: {
    operationType () { // 页面类型，type为1是编辑
      return this.$route.query.type
    },
    liveActivityId () { // 编辑活动的id
      return this.$route.query.avtivId
    }
  },
  methods: {
    /**
     * 获取活动详情
     * @returns {Promise<void>}
     */
    async getActivityDetails () {
      this.queryData.liveActivityId = this.liveActivityId
      const response = await getActivityDetails(this.queryData)
      this.ruleForm = response // 同步表单数据为获取到的详情数据
    },
    /**
     * 处理微信图标上传成功事件
     * @param res
     * @param file
     */
    handleWechatImgSuccess (res, file) {
      this.ruleForm.wechatLogo = URL.createObjectURL(file.raw)
    },
    /**
     * 处理banner上传成功事件
     * @param res
     * @param file
     */
    handleBannerSuccess (res, file) {
      this.ruleForm.bannerPic = URL.createObjectURL(file.raw)
    },
    /**
     * 微信图标上传前事件
     * @param file
     */
    beforeWechatImgUpload (file) {
      const isTypeCorrect = this.imgTypes.indexOf(file.type) !== -1
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
     * banner上传前事件
     * @param file
     */
    beforeBannerUpload (file) {
      const isTypeCorrect = this.imgTypes.indexOf(file.type) !== -1
      const isLt4M = file.size / 1024 / 1024 < 5
      if (!isTypeCorrect) {
        this.showMsgBox({
          message: '支持JPG、 PNG、GIF、 BMP、 JPEG的图片格式',
          type: 'error'
        })
        return false
      }
      if (!isLt4M) {
        this.showMsgBox({
          message: '上传图片大小不能超过 5MB!',
          type: 'error'
        })
        return false
      }
    },
    /**
     * 接收课程选择弹框返回数据
     * @param value 选择的课程数据对象
     */
    handleCourseData (value) {
      this.ruleForm.courseDetail.mainSchoolName = value.masterSchool
      this.ruleForm.courseDetail.courseId = value.courseId
      this.ruleForm.courseDetail.mainTeacherName = value.masterTeacher
      this.ruleForm.courseDetail.receiveSchoolNames = value.receiveSchool
      this.ruleForm.courseDetail.arangeDate = value.planCourseTime
      this.ruleForm.courseId = value.courseId
    },
    /**
     * 取消新增、编辑
     */
    cancel () {
      this.$router.push({ name: 'ActivityManage' })
    },
    /**
     * 保存新增、编辑
     */
    submit () {
      if (this.$refs.ruleForm.validate(valid => { // 验证页面数据
        if (valid) {
          // 处理cdn服务器保存数据，只返回选择了的给后台
          this.$refs.ruleForm.cdnServers = []
          if (this.cdnValue1 !== '') {
            this.$refs.ruleForm.cdnServers.push({
              cdnCode: this.cdnValue1,
              sort: 1
            })
          }
          if (this.cdnValue2 !== '') {
            this.$refs.ruleForm.cdnServers.push({
              cdnCode: this.cdnValue1,
              sort: 2
            })
          }
          if (this.cdnValue3 !== '') {
            this.$refs.ruleForm.cdnServers.push({
              cdnCode: this.cdnValue1,
              sort: 3
            })
          }
          const result = addActivity(this.ruleForm)
          console.log(result)
        }
      })) {

      }
    },
  },
  filters: {
    /**
     * 过滤状态
     * @param value
     * @returns {string}
     */
    filterStatus (value) {
      switch (value) {
        case 'INIT':
          return '未开始'
        case 'PROGRESS':
          return '进行中'
        case 'END':
          return '已结束'
        default:
          break
      }
    }
  }

}
</script>

<style scoped lang="scss">
  .module-add-activity {
    .module-item {
      margin-top: 25px;
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
      .upload-img-tip {
        line-height: 15px;
      }
      /deep/ .el-form-item__label {
        font-weight: normal;
      }
      /deep/ .el-upload--text {
        width: 300px;
        height: 300px;
        border: 1px dashed #c6cfde;
        box-sizing: border-box;
        overflow: hidden;
        .wechat-pic {
          width: 300px;
          height: 300px;
        }
      }
      .upload-banner {
        /deep/ .el-upload--text {
          width: 597px;
          height: 151px;
          border: dashed 1px #b8c4ce;
        }
        .btn-banner-upload {
          font-style: normal;
          width: 91px;
          height: 28px;
          font-size: 12px;
          color: #333333;
          display: block;
          text-align: center;
          margin: 45px auto 19px;
          line-height: 28px;
          background-color: #f5f8fa;
          border: solid 1px #b2b7bf;
        }
        .banner {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
      .upload-demo {
        .avatar-uploader-icon {
          font-size: 28px;
          color: #e1e7f0;
          margin-top: 118px;
          text-align: center;
        }
      }
    }
    .footer-button {
      text-align: center;
      margin: 40px auto;
    }
  }
</style>
