/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/27 8:53
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  按钮权限  v-auth:xxxxx 中的xxxxx和code相同就代表有权限的
 */

export default {
  bind (el, binding) {
    el.style.display = 'none'
    const menuBottoms = ['001-001-001', '001-001-002']
    if (menuBottoms.indexOf(binding.arg) > -1) {
      el.style.display = ''
    }
  }
}

/**
 1.后台用户管理:
 角色管理    新增角色back-role-add    编辑 back-role-edit    删除back-role-delete
 用户管理    新增用户back-user-add    编辑 back-user-edit

 2.前台用户管理:
 区域用户管理  新增用户regional-user-add  批量新增regional-user-batch-add  导出regional-user-export  编辑regional-user-edit  删除regional-user-delete
 校级用户管理  新增用户school-user-add    批量新增school-user-batch-add    导出school-user-export    编辑school-user-edit    删除school-user-delete
 教师管理      导出teacher-export         删除teacher-delete
 学生管理      导出student-export         删除student-delete
 家长管理      导出parent-export          删除parent-delete
 区域用户回收站  恢复regional-user-recovery
 校级用户回收站  恢复school-user-recovery
 教师回收站      恢复teacher-recovery
 学生回收站      恢复student-recovery
 家长回收站      恢复parent-recovery

 3.基础配置:
 区域平台管理  开通平台regional-plat-open  批量开通regional-plat-bactch-open  导出regional-plat-export  编辑regional-plat-edit  删除regional-plat-delete  编辑地图map-edit  删除地图map-delete  门户配置regional-protal-config  服务器配置regional-server-config
 校级平台管理  开通平台school-plat-open    批量开通school-plat-bacth-open     导出school-plat-export    编辑school-plat-edit    删除school-plat-delete    门户配置school-protal-config  服务器配置school-server-config  关联学校associate-school
 教室管理      新增教室class-add           批量新增class-batch-add            导出class-export          编辑class-edit          删除class-delete

 4.知识网络管理:
 知识网络管理  默认显示knowledge-default-show
 学科管理      默认显示course-default-show

 5.功能配置:
 有效时长配置  配置区域时长regional-time-config  配置系统时长system-time-config  编辑time-adit  删除time-delete
 学期配置      新增区域学期regional-term-add  配置系统学期system-term-config  配置term-edit  删除term-delete 开启term-open 关闭term-close
 平台批量配置  只需要页面，不需要功能
 门户批量配置  只需要页面，不需要功能
 知识网络配置  配置知识网络knowledge-config  编辑knowledge-edit  删除knowledge-delete

 6.应用管理:
 课程回收站  恢复course-recovery   彻底删除course-delete
 活动管理    新增活动activity-add  编辑activity-edit  活动统计activity-statistics  查看 activity-view  删除activity-delete  请出活动 activity-out(批量+单个一起)  导出activity-export

 7.配置管理:
 流媒体服务器配置    新增服务器 media-server-add     编辑media-server-edit      删除media-server-delete
 消息服务器配置      新增服务器msg-server-add        编辑msg-server-edit        删除msg-server-delete
 区域资源服务器配置  新增服务器resources-server-add  编辑resources-server-edit  删除resources-server-delete
 CDN服务器配置       新增服务器cdn-server-add        编辑cdn-server-edit        删除cdn-server-delete

 8.移动端版本控制：
 android版本控制  编辑android-version-edit  删除android-version-delete  新增版本android-version-add
 ios版本控制      编辑ios-version-edit 删除ios-version-delete  新增版本ios-version-add

 9.日志管理 导出 log-export
 */
