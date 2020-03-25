<template>
  <div class="module-activity-details">
    <div class="module-item mt-25">
      <div class="item-title">活动信息</div>
      <div class="item-content">
        <el-row class="item-content-item">
          <label class="item-title-label">活动主题：</label>
          <span>{{activityDetailsData.activityName}}</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">活动持续时间：</label>
          <span>{{activityDetailsData.costTime}}小时</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label v-top">活动简介：</label>
          <span class="activity-desc-wrapper">
             {{activityDetailsData.activityDetail}}
          </span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">CDN服务器：</label>
          <span v-for="(item, index) in activityDetailsData.cdnServers" :key="index">
            {{item.cdnName}}({{item.type}})
            <span v-if="index<activityDetailsData.cdnServers.length-1">、</span>
          </span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">清晰度：</label>
          <span v-for="(item, index) in activityDetailsData.definitionList" :key="index">
            {{item.definitionVal}}
            <span v-if="index<activityDetailsData.definitionList.length-1">、</span>
          </span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">PC端默认清晰度：</label>
          <span>超清</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">微信端默认清晰度：</label>
          <span>高清</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">观摩人数：</label>
          <span>{{activityDetailsData.viewerLimit}}人</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label">直播画面配置：</label>
          <span v-for="(item, index) in activityDetailsData.livePicConfList" :key="index">
            {{item}}
            <span v-if="index<activityDetailsData.livePicConfList.length-1">、</span>
          </span>
        </el-row>
      </div>
    </div>
    <div class="module-item mt-25">
      <div class="item-title">微信分享</div>
      <div class="item-content">
        <el-row class="item-content-item">
          <label class="item-title-label">副标题：</label>
          <span>{{activityDetailsData.wechatDesc}}</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label v-top">图标：</label>
          <img src="" alt="" class="wechat-pic">
        </el-row>
      </div>
    </div>
    <div class="module-item mt-25">
      <div class="item-title">课程信息</div>
      <div class="item-content">
        <el-row class="item-content-item">
          <el-col :span="2">
            <label class="item-title-label">课程信息：</label>
          </el-col>
          <el-col :span="12" v-if="activityDetailsData.courseDetail !== null">
            <span class="course-info-item">
              <label class="info-item-label">课程状态：</label>
              <span>{{activityDetailsData.courseDetail.status | filterStatus}}</span>
            </span>
            <span class="course-info-item">
              <label class="info-item-label mt-25">实际上课时间：</label>
              <span>{{activityDetailsData.courseDetail.realBeginTime || '无'}}</span>
            </span>
            <span class="course-info-item">
              <label class="info-item-label mt-25">排课日期：</label>
              <span>{{activityDetailsData.courseDetail.arangeDate}}</span>
            </span>
            <span class="course-info-item">
              <label class="info-item-label mt-25">听讲学校：</label>
              <span v-for="(item, index) in activityDetailsData.courseDetail.receiveSchoolNames" :key="index">
                {{item}}
                <span v-if="index<activityDetailsData.courseDetail.receiveSchoolNames-1">、</span>
              </span>
            </span>
            <span class="course-info-item">
              <label class="info-item-label mt-25">主讲教师：</label>
              <span>{{activityDetailsData.courseDetail.mainTeacherName}}</span>
            </span>
            <span class="course-info-item" v-if="activityDetailsData.courseDetail.status!=='END'">
              <label class="info-item-label mt-25">观摩地址：</label>
              <span>{{activityDetailsData.courseDetail.qrCodeUrl}}</span>
              <el-button class="ml-15" size="mini" type="info" round @click="copy()">复制</el-button>
            </span>
          </el-col>
          <el-col :span="5" v-if="activityDetailsData.courseDetail.status!=='END'">
            <img class="course-qrcode-img">接口暂未提供
          </el-col>
        </el-row>
        <el-row class="item-content-item" v-if="activityDetailsData.courseDetail.status!=='END'">
          <label class=" item-title-label font-normal v-top">验证码：</label>
          <span>{{activityDetailsData.courseDetail.validatecode}}</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label font-normal">交流：</label>
          <span>不启用</span>
        </el-row>
      </div>
    </div>
    <div class="module-item mt-25">
      <div class="item-title">页面配置</div>
      <div class="item-content">
        <el-row class="item-content-item">
          <label class="item-title-label v-top">banner：</label>
          <img src="activityDetailsData.bannerPic" alt="" class="banner">
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label v-top">网站底部1：</label>
          <span>{{activityDetailsData.bottomDetail}}</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label v-top">网站底部2：</label>
          <span>{{activityDetailsData.bottomDetailTwo}}</span>
        </el-row>
        <el-row class="item-content-item">
          <label class="item-title-label v-top">网站底部3：</label>
          <span>{{activityDetailsData.bottomDetailThree}}</span>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
/*
 * Description ViewActivityDetails
 * Created By Administrator
 * Created At 2019/10/23 14:25
 */
import { getActivityDetails } from '@/api/applicationManage/activityManage'

export default {
  name: 'ViewActivityDetails',
  props: {},
  data () {
    return {
      queryData: {
        liveActivityId: '', // 活动id
      },
      activityDetailsData: '',
    }
  },
  created () {
    this.queryData.liveActivityId = this.$route.query.avtivId || ''
    this.getActivityDetails()
  },
  methods: {
    /**
     * 获取活动详情
     * @returns {Promise<void>}
     */
    async getActivityDetails () {
      const result = await getActivityDetails(this.queryData)
      console.log(result, '-------')
      this.activityDetailsData = result
    }
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
  .module-activity-details {
    .module-item {
      .item-title {
        font-size: 16px;
        color: #293152;
        padding-bottom: 11px;
        border-bottom: dashed 1px #c6cfde;
      }
      .banner {
        width: 598px;
        height: 151px;
        display: inline-block;
      }
      .item-content {
        .activity-desc-wrapper {
          display: inline-block;
          border: 1px dashed #c6cfde;
          padding: 15px;
          width: 600px;
        }
        .item-title-label {
          width: 147px;
          text-align: right;
          font-weight: normal;
          display: inline-block;
        }
        .item-content-item {
          margin-top: 30px;
          .wechat-pic {
            width: 300px;
            height: 300px;
            display: inline-block;
          }
          .course-info-item {
            display: block;
            margin-left: 10px;
            .info-item-label {
              font-weight: normal;
              display: inline-block;
            }
          }
        }
      }
      .course-qrcode-img {
        width: 232px;
        height: 230px;
      }
    }
  }
</style>
