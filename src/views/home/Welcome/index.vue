<template>
  <div class="home">
    <div class="topImg">
      <img src="@/assets/welcome/welcome.png" alt="">
      <div class="info">
        <span class="time">2019/09/23</span>
        <span class="userName">欢迎你，{{userName}}</span>
      </div>
    </div>
    <div class="fastModuleEntry">
      <div class="title"><span></span>快捷模块入口</div>
      <el-row :gutter="15">
        <el-col :span="8" v-for="(item,index) in RouterMap" :key="index">
          <el-card shadow="hover">
            <div>
              <img :src="imgList[index]" alt="">
              <span class="title">{{item.meta.title}}</span>
            </div>
            <div class="modules">
              <el-row :gutter="10" v-if="item.children.length&&item.children.length<7">
                <el-col :span="8" v-for="n in item.children" :key="n.path" :title="n.meta.title">
                  <router-link :to="{path:n.path}">{{n.meta.title}}</router-link>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-if="item.children.length&&item.children.length>6">
                <el-col :span="8" v-for="n in item.children.slice(0,6)" :key="n.path" :title="n.meta.title">
                  <router-link :to="{path:n.path}">{{n.meta.title}}</router-link>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { asyncRouterMap } from '@/router'
import module1 from '@/assets/welcome/module1.png'
import module2 from '@/assets/welcome/module2.png'
import module3 from '@/assets/welcome/module3.png'
import module4 from '@/assets/welcome/module4.png'
import module5 from '@/assets/welcome/module5.png'
import module6 from '@/assets/welcome/module6.png'

export default {
  name: 'Home',
  data () {
    return {
      userName: '前端大神',
      RouterMap: asyncRouterMap,
      imgList: [module1, module2, module3, module4, module5, module6]
    }
  },
  methods: {
    showFastModule () {
      console.log(asyncRouterMap)
    },
  },
  created () {
    this.showFastModule()
  }
}
</script>

<style scoped lang="scss">
  .topImg {
    position: relative;
    margin: -15px -15px 15px;

    img {
      width: 100%;
    }

    .info {
      position: absolute;
      left: 200px;
      top: 30%;
      color: #fff;

      .time {
        font-size: 20px;
        display: block;
        padding-bottom: 10px;
      }

      .userName {
        font-size: 40px;
        display: block;
      }
    }
  }

  .fastModuleEntry {
    > .title {
      font-size: 20px;
      margin: 27px 0 21px 0;

      span {
        display: inline-block;
        top: 2px;
        position: relative;
        width: 2px;
        height: 16px;
        background-color: #1bc840;
        margin-right: 7px;
      }
    }

    .el-card {
      .title {
        font-size: 18px;
        position: relative;
        top: -21px;
        left: 5px;
      }

      .modules {
        color: #888;
        margin-top: 17px;

        .el-col {
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: 34px;
          line-height: 34px;
        }
      }
    }
  }
</style>
