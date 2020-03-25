/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/21 11:02
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description  后台系统URL集合
 */
const urls = {
  areaList: '/base/area/list', // 获取区域级联选择器
  /* ------------1.登陆------------ */
  token: '/admin/token', // 根据token获取用户信息
  login: '/admin/login', // 登陆
  logout: '/admin/loginOut', // 登出
  changePassword: '/admin/edit/password', // 修改密码
  /* ------------2.首页------------ */
  /* ------------3.示例------------ */
  /* ------------4.后台用户管理------------ */
  roleManageList: '/admin/role/pages', // 获取角色列表
  roleDetail: '/admin/role/detail', // 获取角色详情
  addRole: '/admin/role/add', // 新增角色
  editRole: '/admin/role/edit', // 编辑角色
  deleteRole: '/admin/role/delete/', // 删除角色
  allPermissions: '/admin/role/permissions', // 获取可选权限
  userList: '/admin/user/pages', // 用户列表
  editUser: '/admin/user/edit', // 编辑用户
  addUser: '/admin/user/add', // 新增用户
  userDetail: '/admin/user/detail', // 获取用户详情
  /* ------------5.前台用户管理------------ */
  parentManageList: '/base/user/pages', // 家长管理列表
  parentManageView: '/base/user/detail', // 家长管理查看用户
  parentManageEdit: '/fontStage/parentManage/editUser', // 家长管理编辑用户
  parentManageDelete: '/base/user/delete', // 家长管理删除用户
  parentManageExport: '/fontStage/parentManage/exportTemplate', // 家长管理导出
  parentRecycleBinList: '/base/user/pages', // 家长回收站列表
  parentRecycleBinView: '/base/user/detail', // 家长回收站查看用户
  parentRecycleBinRestore: '/base/user/recover/delete', // 家长回收站恢复用户
  regionalUserManageList: '/base/user/pages', // 区域用户管理列表
  regionalUserManageView: '/base/user/detail', // 区域用户管理查看用户
  regionalUserManageEdit: '/base/user/update', // 区域用户管理编辑用户
  regionalUserManageAdd: '/base/user/add', // 区域用户管理新增用户
  regionalUserManageDelete: '/base/user/delete', // 区域用户管理删除用户
  regionalExport: '/fontStage/regionalUserManage/exportTemplate', // 区域用户管理导出
  regionalImport: '/fontStage/regionalUserManage/importExcel', // 区域用户管理导入
  regionalSearchRegionalCode: '/fontStage/regionalUserManage/searchRegionalCode', // 区域用户管理查询行政区代码
  regionalDownloadTemplate: '/fontStage/regionalUserManage/downloadTemplate', // 区域用户管理下载模板
  regionalUserRecycleBinList: '/base/user/pages', // 区域用户回收站列表
  regionalUserRecycleBinView: '/base/user/detail', // 区域用户回收站查看用户
  regionalUserRecycleBinRestore: '/base/user/recover/delete', // 区域用户回收站恢复用户
  schoolUserManageList: '/base/user/pages', // 校级用户管理列表
  schoolUserManageView: '/base/user/detail', // 校级用户管理查看用户
  schoolUserManageEdit: '/base/user/update', // 校级用户管理编辑用户
  schoolUserManageAdd: '/base/user/add', // 校级用户管理新增用户
  schoolUserManageDelete: '/base/user/delete', // 校级用户管理删除用户
  schoolExport: '/fontStage/regionalUserManage/exportTemplate', // 校级用户管理导出
  schoolImport: '/fontStage/regionalUserManage/importExcel', // 校级用户管理导入
  schoolSearchRegionalCode: '/fontStage/regionalUserManage/searchRegionalCode', // 校级用户管理查询行政区代码
  schoolDownloadTemplate: '/fontStage/regionalUserManage/downloadTemplate', // 校级用户管理下载模板
  schoolUserRecycleBinList: '/base/user/pages', // 校级用户回收站列表
  schoolUserRecycleBinView: '/base/user/detail', // 校级用户管理查看用户
  schoolUserRecycleBinRestore: '/base/user/recover/delete', // 校级用户管理恢复用户
  studentManageList: '/base/user/pages', // 学生管理列表
  studentManageView: '/base/user/detail', // 学生管理查看用户
  studentManageEdit: '/fontStage/studentManage/editUser', // 学生管理编辑用户
  studentManageDelete: '/base/user/delete', // 学生管理删除用户
  studentExport: '/fontStage/studentManage/exportTemplate', // 学生管理导出
  studentRecycleBinList: '/base/user/pages', // 学生回收站列表
  studentRecycleBinView: '/base/user/detail', // 学生回收站查看用户
  studentRecycleBinRestore: '/base/user/recover/delete', // 学生回收站恢复用户
  // teacherManageList: '/fontStage/teacherManage/getListData', // 教师管理列表
  teacherManageList: '/base/user/pages', // 教师管理列表
  teacherManageView: '/base/user/detail', // 教师管理查看用户
  teacherManageEdit: '/fontStage/teacherManage/editUser', // 教师管理编辑用户
  teacherManageDelete: '/base/user/delete', // 教师管理删除用户
  teacherExport: '/fontStage/teacherManage/exportTemplate', // 教室管理导出
  teacherRecycleBinList: '/base/user/pages', // 教师回收站列表
  teacherRecycleBinView: '/base/user/detail', // 教师回收站查看用户
  teacherRecycleBinRestore: '/base/user/recover/delete', // 教师回收站恢复用户
  roleType: '/admin/role/pages', // 通用用户类型
  /* ------------6.基础配置------------ */
  regionalList: '/base/platform/area/list', // 区域平台列表
  schoolList: '/base/platform/school/list', // 校级平台列表
  getPlatformDetail: '/base/platform/detail/', // 查看平台
  editPlatform: '/base/platform/edit', // 编辑平台
  addPlatform: '/base/platform/save', // 开通平台
  getServerConf: '/base/platform/server/conf/', // 获取服务器配置
  saveServerConf: '/base/platform/server/conf/save', // 保存服务器配置
  getPortalConf: '/base/platform/portal/', // 获取门户配置
  savePortalConf: '/base/platform/portal/save', // 保存门户配置
  classroomList: '/base/classroom/list', // 教室列表
  addClassroom: '/base/classroom/add', // 新增教室
  delClassroom: '/base/classroom/del', // 删除教室
  classroomDetail: '/base/classroom/detail/', // 教室详情
  editClassroom: '/base/classroom/edit', // 编辑教室
  /* ------------7.知识网络配置------------ */
  knowledgeList: '/knowledgeManage/list', // 知识网络列表
  platFormData: '/knowledgeManage/platFormData', // 区域数据
  networkListByType: '/knowledgeManage/networkListByType', // 根据区域id、学校id、知识网络类型获取知识网络数据
  knowledgeTypesList: '/knowledgeManage/knowledgeTypesList', // 获取特定类型知识网络列表
  saveNetworkConfig: '/knowledgeManage/saveNetworkConfig', // 保存知识网络配置
  bindEditions: '/knowledges/templates/school-area/editions', // 绑定版本
  /* ------------8.功能配置------------ */
  effectiveTimeList: '/effective-duration/list', // 有效时长列表
  editTime: '/effective-duration/edit', // 编辑时长
  termList: '/term/list', // 学期配置列表
  editTerm: '//semesters/update', // 编辑学期
  platBatchSetting: '/platform/batchSetting', // 平台批量配置
  addTerm: '/semesters/save', // 新增学期
  delAreaTerm: '/semesters/delete', // 删除区域下学期
  termTableList: '/semesters/list', // 区域/系统学期列表

  /* ------------9.应用管理------------ */
  selectorSchoolList: '/base/school/list', // 学校选择器学校列表
  selectorTeacherList: '/base/user/results', // 教师选择器教师列表
  recycleCourseList: '/course/list/manager', // 课程回收站课程列表
  activityList: '/app/activity/liveActivityPageList', // 活动列表
  deleteActivity: '/app/activity/remove', // 删除活动
  activityDetailsData: '/app/activity/queryActivity', // 活动详情
  courseTableList: '/course/list/manager', // 课表排课列表
  actStasticList: '/applicationManage/activityMange/actStasticList', // 活动统计列表
  kickOutActivity: '/applicationManage/activityMange/kickOutActivity', // 请出活动
  addActivity: '/app/activity/addactivity', // 新增活动
  /* ------------10.配置管理------------ */
  messageManageList: '/server/msg/page', // 消息服务器配置列表
  messageManageAdd: '/server/msg/save', // 消息服务器配置新增
  messageManageEdit: '/server/msg/save', // 消息服务器配置编辑
  messageDetail: 'server/msg/detail', // 消息服务器详情
  messageManageDelete: '/server/msg/delete', // 消息服务器配置删除
  regionalResourceManageList: '/server/resource/page', // 区域资源服务器配置列表
  regionalResourceManageAdd: '/server/resource/save', // 区域资源服务器配置新增/编辑服务器
  regionalResourceManageEdit: '/server/resource/update', // 区域资源服务器配置新增/编辑服务器
  regionalResourceDetail: 'server/resource/detail', // 区域资源服务器配置详情
  regionalResourceManageDelete: '/server/resource/delete', // 区域资源服务器配置删除
  streamingMediaManageList: '/server/media/page', // 流媒体服务器配置列表
  streamingMediaManageAdd: '/server/media/save', // 流媒体服务器配置新增
  streamingMediaManageEdit: '/server/media/update', // 流媒体服务器配置编辑
  streamingMediaDetail: 'server/media/detail', // 流媒体服务器详情
  streamingMediaManageDelete: '/server/media/delete', // 流媒体服务器配置删除
  cdnManageList: '/configManage/cdnManage/getListData', // cdn服务器配置列表
  /* ------------11.日志管理------------ */
  /* ------------12.知识网络管理------------ */
  knowledgeMangeData: '/knowledges/instance/trees', // 知识网络管理-知识网络列表
  setDefaultKnowledge: '/knowledges/templates/default', // 知识网络管理-设置默认知识网络
  subjectList: '/knowledge/types/list', // 学科管理-学科列表,
  setSubjectDefault: '/knowledgeNetwork/subjectManage/setDefaultSubject', // 设置学科默认
  /* ------------13.移动端版本管理------------ */
  androidList: '/admin/app/pages/android', // android版本列表查询
  androidAdd: '/admin/app/add/android', // android版本新增
  androidEdit: '/admin/app/edit/android', // android版本编辑
  androidDetail: '/admin/app/detail/android', // android版本详情
  androidDelete: '/admin/app/delete/android', // android版本删除
  androidUpload: '/app/upgrade/upload', // android上传
  androidDownload: '/admin/app/download', // android下载
  appList: '/admin/app/applications', // android、ios应用列表查询
  iosList: '/admin/app/pages/ios', // ios版本列表查询
  iosAdd: '/admin/app/add/ios', // ios版本新增
  iosEdit: '/admin/app/edit/ios', // ios版本编辑
  iosDetail: '/admin/app/detail/ios', // ios版本详情
  iosDelete: '/admin/app/delete/ios', // ios版本删除
}

export default urls
