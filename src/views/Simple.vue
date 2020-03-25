<template>
  <div class="simple">
    <el-row class="demo">
      <h3>01.字体颜色</h3>
      <el-col :span="24" class="demo-content">
        <p class="color-primary">primary</p>
        <p class="color-normal">normal</p>
        <p class="color-label">label</p>
        <p class="color-disable">disable</p>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>02.字体大小</h3>
      <el-col :span="24" class="demo-content">
        <p class="color-primary font-small">small</p>
        <p class="color-normal font-normal">normal</p>
        <p class="color-label font-strong">strong</p>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>03.面包屑</h3>
      <el-col :span="24" class="demo-content">
        <el-breadcrumb separator="-">
          <el-breadcrumb-item :to="{ path: '/' }"><span>课表管理</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="disable">编辑课表</span></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>04.按钮</h3>
      <el-col :span="24" class="demo-content">
        <label>样式一</label>
        <el-button size="mini" type="custom" round>设置</el-button>
        <el-button size="mini" type="custom" round>上传图片</el-button>
        <el-button size="mini" type="custom" round icon="el-icon-refresh-right">重新上传</el-button>
        <el-button size="mini" type="custom" round>设置上课时间</el-button>

      </el-col>
      <el-col :span="24" class="demo-content">
        <label>样式二</label>
        <el-button size="mini" type="border" round>批量新增</el-button>
        <el-button size="mini" type="border" round>批量新增2</el-button>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>样式三</label>
        <el-button size="mini" type="border-primary" round icon="el-icon-custom-add">默认显示</el-button>
        <el-button size="mini" type="border-primary" round icon="el-icon-message">默认显示2</el-button>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>样式三</label>
        <el-dropdown>
          <span class="el-dropdown-link">
            平台操作 <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>其他颜色，大圆角</label>
        <el-button size="mini" type="success" round>查询</el-button>
        <el-button size="mini" type="primary" round>应用</el-button>
        <el-button size="mini" type="info" round>取消</el-button>
        <el-button size="mini" type="danger" round>删除</el-button>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>按钮大小</label>
        <el-button size="mini" type="default">最小按钮</el-button>
        <el-button size="small" type="primary">小按钮</el-button>
        <el-button size="medium" type="success">中等大小</el-button>
        <el-button type="info">默认大小</el-button>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>05.框框类</h3>
      <el-col :span="24" class="demo-content">
        <label>文本框</label>
        <el-input v-model="input" size="round" placeholder="请输入内容"></el-input>
        <label>图标文本框</label>
        <el-input v-model="input" prefix-icon="el-icon-custom-user-name" size="round"
                  placeholder="请输入内容"></el-input>
        <label>文本框mini</label>
        <el-input v-model="input" size="round-mini"></el-input>
        <label>文本框small</label>
        <el-input v-model="input" size="round-small" placeholder="请输入范围"></el-input>
        <label>大文本框</label>
        <el-input v-model="input" size="round-large" placeholder="请输入内容"></el-input>
        <label>图标文本框</label>
        <el-input v-model="input" prefix-icon="el-icon-custom-user-name" size="round-large"
                  placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>下拉框</label>
        <el-select v-model="value" size="round" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label>日期框</label>
        <el-date-picker
          v-model="value3"
          size="date-round"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <label>组合日期框</label>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          size="round"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <label>省市区级联</label>
        <select-region area-id="000000" :value.sync="value4" @change="change" :filterable="true"></select-region>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>06.翻页</h3>
      <el-col :span="24" class="demo-content">
        <label>默认</label>
        <el-pagination background layout="prev, pager, next, jumper" :pager-count="5" :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>07.标签</h3>
      <el-col :span="24" class="demo-content">
        <label>自定义</label>
        <el-tag closable type="default">
          阔地教育-接受教室2-王老师
        </el-tag>
        <el-tag closable type="default">
          东山湖学校小学部
        </el-tag>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>其他官方</label>
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          closable
          :type="tag.type">
          {{tag.name}}
        </el-tag>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>08.单选、复选</h3>
      <el-col :span="24" class="demo-content">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>09.头像</h3>
      <el-col :span="24" class="demo-content">
        <label>头像的大小尺寸，使用者自行定义</label><br>
        <el-avatar v-for="size in sizeList" :key="size" :size="size" :src="circleUrl"></el-avatar>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>10.表格</h3>
      <el-col :span="24" class="demo-content">
        <label>默认表格</label>
        <el-table
          :data="tableData"
          row-class-name="table-body-default"
          header-row-class-name="table-header-default"
          style="width: 100%">
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上课时间"
          >
          </el-table-column>
          <el-table-column
            label="课程时长">
            <template slot-scope="scope">
              <a type="btn">{{ scope.row.minute}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="class"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="subject"
            label="学科">
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="主讲教师">
          </el-table-column>
          <el-table-column
            prop="school"
            label="主讲学校">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template>
              <a type="btn">点播</a>
              <a type="btn">编辑</a>
              <a type="btn" color="danger">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="demo-content">
        <label>固定首尾列，美化滚动条</label>
        <el-table
          :data="tableData"
          row-class-name="table-body-default"
          header-row-class-name="table-header-default"
          stripe
          style="width: 35%">
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="time"
            label="上课时间"
          >
          </el-table-column>
          <el-table-column
            prop="minute"
            label="课程时长"
          >
          </el-table-column>
          <el-table-column
            prop="class"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="subject"
            label="学科">
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="主讲教师">
          </el-table-column>
          <el-table-column
            prop="school"
            label="主讲学校">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template>
              <a type="btn">点播</a>
              <a type="btn">编辑</a>
              <a type="btn" color="danger">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="demo-content">
        <el-table
          :data="treeOptions.data1"
          style="width: 100%"
          row-key="areaId"
          row-class-name="table-body-default table-body-tree"
          header-row-class-name="table-header-default"
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChild'}">
          <el-table-column
            prop="areaName"
            label="区域"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="adminUser"
            label="管理员用户名">
          </el-table-column>
          <el-table-column
            prop="adminName"
            label="管理员姓名">
          </el-table-column>
          <el-table-column
            prop="range"
            label="学段">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <span :class="scope.row.status?'enable-status':'disable-status'"></span>{{` ${scope.row.status?'开启':'关闭'}`}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-dropdown :key="`command_o_${scope.row.rowIndex}`">
              <span class="el-dropdown-link">
                平台操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown :key="`map_o_${scope.row.rowIndex}`">
              <span class="el-dropdown-link">
                地图 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown :key="`setting_o_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                平台配置 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="demo">
      <el-col class="demo-content" :span="24">
        <label>信息框</label>
        <el-button @click="showMessage()">打开无图标框</el-button>
        <el-button @click="showMessage('info')">打开信息框</el-button>
        <el-button @click="showMessage('warning')">打开警告框</el-button>
        <el-button @click="showMessage('success')">打开成功框</el-button>
        <el-button @click="showMessage('error')">打开异常框</el-button>
        <el-button @click="showMessageLabelInfo()">打开带子描述的框</el-button>
      </el-col>
      <el-col class="demo-content" :span="24">
        <label>确认框</label>
        <el-button @click="showConfirm(1)">风格1</el-button>
        <el-button @click="showConfirm(2)">风格2</el-button>
        <el-button @click="showConfirm(3)">风格3</el-button>
        <el-button @click="showConfirm(1,'none')">风格1没有Icon</el-button>
        <el-button @click="showConfirmCustom()">风格3自定义彩色内容</el-button>
      </el-col>
      <el-col class="demo-content" :span="24">
        <label>Dialog框</label>
        <el-button @click="visible=!visible">弹出框页面</el-button>
        <el-dialog :visible.sync="visible" title="新增课程">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" round @click="visible = false">取 消</el-button>
          <el-button type="primary" size="mini" round @click="visible = false">确 定</el-button>
        </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>11.表格树</h3>
      <el-col :span="24" class="demo-content">
        <table-tree :data="treeOptions.data"
                    :columns="treeOptions.columns"
                    childrenProp="children"
                    hasChildrenProp="hasChild"
                    idProp="areaId"
                    @tree-icon-click="extendTree">
          <template slot="status" slot-scope="scope">
            <span :class="scope.row.status?'enable-status':'disable-status'"></span>{{` ${scope.row.status?'开启':'关闭'}`}}
          </template>
          <template slot="operation" slot-scope="scope">
            <el-dropdown :key="`command_o_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                平台操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown :key="`map_o_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                地图 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown :key="`setting_o_${scope.row._normalIndex}`">
              <span class="el-dropdown-link">
                平台配置 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </table-tree>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>12.分割线</h3>
      <el-col class="demo-content">
        <div class="cy-driver"></div>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>13.数据总数</h3>
      <el-col class="demo-content">
        <span class="table-pager">2145</span>
      </el-col>
    </el-row>
    <el-row class="demo">
      <h3>自定义树样式</h3>
      <el-col class="demo-content">
        <el-tree :data="treeData" show-checkbox class="custom-tree" icon-class="el-icon-custom-fold" :indent="0"></el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
* Description Simple
* Created By Waroom
* Created At 2019/9/18 19:15
*/
import TableTree from '../components/TableTree/index'
import * as utils from '../utils'
import SelectRegion from '../components/SelectRegion/index'

export default {
  name: 'Simple',
  components: { SelectRegion, TableTree },
  props: {},
  data () {
    return {
      input: '',
      pager: {
        total: 84,
        index: 1,
        size: 10
      },
      radio: 1,
      checkList: [],
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small'],
      tableData: [
        {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }, {
          name: '英语口语学习',
          time: '2019-02-21 10:12',
          minute: 45,
          class: '三年级',
          subject: '语文',
          teacher: '王老师',
          school: '苏州一中'
        }],
      visible: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      value2: '',
      value3: '',
      value4: '',
      treeOptions: {
        data: [
          {
            areaId: '' + Math.random(),
            areaName: '安徽省',
            createTime: '2019-09-24 15:22',
            createBy: '张毅',
            adminUser: 'adminZhang',
            adminName: '张文华',
            range: '小学、初中',
            status: 1,
            hasChild: true
          },
          {
            areaId: '' + Math.random(),
            areaName: '江苏省',
            createTime: '2019-09-24 15:22',
            createBy: '张毅',
            adminUser: 'adminZhang',
            adminName: '张文华',
            range: '小学、初中',
            status: 1,
            hasChild: true
          },
          {
            areaId: '' + Math.random(),
            areaName: '浙江省',
            createTime: '2019-09-24 15:22',
            createBy: '张毅',
            adminUser: 'adminZhang',
            adminName: '张文华',
            range: '小学、初中',
            status: 0,
            hasChild: true
          },
          {
            areaId: '' + Math.random(),
            areaName: '云南省',
            createTime: '2019-09-24 15:22',
            createBy: '张毅',
            adminUser: 'adminZhang',
            adminName: '张文华',
            range: '小学、初中',
            status: 0,
            hasChild: true
          }
        ],
        data1: [{
          areaId: '' + Math.random(),
          areaName: '安徽省',
          createTime: '2019-09-24 15:22',
          createBy: '张毅',
          adminUser: 'adminZhang',
          adminName: '张文华',
          range: '小学、初中',
          status: 1,
          hasChild: true
        }, {
          areaId: '' + Math.random(),
          areaName: '江苏省',
          createTime: '2019-09-24 15:22',
          createBy: '张毅',
          adminUser: 'adminZhang',
          adminName: '张文华',
          range: '小学、初中',
          status: 1,
          hasChild: true
        }, {
          areaId: '' + Math.random(),
          areaName: '浙江省',
          createTime: '2019-09-24 15:22',
          createBy: '张毅',
          adminUser: 'adminZhang',
          adminName: '张文华',
          range: '小学、初中',
          status: 0,
          hasChild: true
        }, {
          areaId: '' + Math.random(),
          areaName: '云南省',
          createTime: '2019-09-24 15:22',
          createBy: '张毅',
          adminUser: 'adminZhang',
          adminName: '张文华',
          range: '小学、初中',
          status: 0,
          hasChild: true
        }],
        columns: [
          {
            label: '区域',
            prop: 'areaName',
          },
          {
            label: '创建时间',
            prop: 'createTime',
            width: '140px',
          },
          {
            label: '创建人',
            prop: 'createBy',
          },
          {
            label: '管理员用户名',
            prop: 'adminUser',
          },
          {
            label: '管理员姓名',
            prop: 'adminName',
          },
          {
            label: '学段',
            prop: 'range',
          },
          {
            label: '状态',
            width: '65px',
            type: 'template',
            template: 'status'
          },
          {
            label: '操作',
            minWidth: '240px',
            type: 'template',
            template: 'operation',
            textAlign: 'center'
          },
        ],
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
    }
  },
  methods: {
    cellClass ({ row, column, rowIndex, columnIndex }) {
      console.log(column, rowIndex, columnIndex)
    },
    change (val) {
      console.log(val)
    },
    showMessage (type) {
      this.showMsgBox({
        message: '这是个提示信息，你就按照这样用就行！',
        type: type
      })
    },
    showMessageLabelInfo () {
      this.showMsgBox({
        message: '这是个提示信息，你就按照这样用就行！',
        type: 'warning',
        desc: '这是一些描述文字哦~ ~'
      })
    },
    showConfirm (style, type) {
      this.showConfirmBox({
        message: '是否确定删除该资源？',
        title: '删除',
        type: type || 'warning',
        style: style || 0
      }).then(r => console.log('确定', r)).catch(e => console.log('取消', e))
    },
    showConfirmCustom () {
      this.showConfirmBox({
        message: [
          { text: '主讲教师宋小兵的【英语口语学习】课程', type: 'primary' },
          '将被删除，',
          '"',
          {
            text: '删除操作无法恢复',
            type: 'danger'
          },
          '"',
          '，您是否还要继续？'
        ],
        title: '删除',
        type: 'warning',
        style: 3
      })
    },
    load (tree, treeNode, resolve) {
      resolve([{
        areaId: '' + Math.random(),
        areaName: '杭州市',
        createTime: '2019-09-24 15:22',
        createBy: '张毅',
        adminUser: 'adminZhang',
        adminName: '张文华',
        range: '小学、初中',
        status: 0,
        hasChild: false,
      }, {
        areaId: '' + Math.random(),
        areaName: '苏州市',
        createTime: '2019-09-24 15:22',
        createBy: '张毅',
        adminUser: 'adminZhang',
        adminName: '张文华',
        range: '小学、初中',
        status: 0,
        hasChild: true,
      }])
    },
    extendTree (data) { // 参数支持 data,column,columnIndex
      // 判断是否有有子集并且没有加载过子集，且当前是非折叠状态
      if (data.hasChild && !data.children && !data._isFold) {
        // 动态加载数据（如果是一次绑定所有，无需监听此事件）
        const loading = this.$loading({ target: '.table-tree' })
        setTimeout(() => {
          // 加载完成数据，找到对应的数据并填充子集
          const currentData = utils.findTreeByProp(this.treeOptions.data, data.areaId, 'areaId', 'children')
          this.$set(currentData, 'children', [{
            areaId: '' + Math.random(),
            areaName: '杭州市',
            createTime: '2019-09-24 15:22',
            createBy: '张毅',
            adminUser: 'adminZhang',
            adminName: '张文华',
            range: '小学、初中',
            status: 0,
            hasChild: false,
          }])
          loading.close()
        }, 1500)
      }
    }
  },
  async mounted () {
    const result = await this.axios('/area/add')
    console.log(result)
  }
}
</script>

<style scoped lang="scss">
  .simple {
    .demo {
      &:first-child {
        margin-top: 0px;
      }

      margin-top: 20px;
    }

    .demo-content {
      line-height: 1.8;
      font-size: 12px;
      padding: 18px 24px;
      background-color: #fafafa;
      border: 1px solid #eaeefb;
      margin-bottom: 25px;
      border-radius: 4px;
    }

    span.enable-status, span.disable-status {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    span.enable-status {
      background-color: #40d688;
    }

    span.disable-status {
      background-color: #bbbbbb;
    }
  }
</style>
