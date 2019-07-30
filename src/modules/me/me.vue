<template>
  <div class="personCenter">
    <x-header
      title="我的"
      :allowBack="false"
    ></x-header>
    <div class="header">
      <div class="user-icon">
        <img :src="currentUser.avatar" alt>
      </div>
      <h3>
        {{ currentUser.nickname }}
        <router-link :to="{ name: 'me.modifyuseinfo'}">
          <img src="../../assets/images/bianji.png">
        </router-link>
      </h3>
      <span>{{ currentUser.sign }}</span>
    </div>
    <cell-group
      :title="item.title"
      v-for="(item, index) in list"
      :key="index"
      v-show="item.show"
    >
      <cell
        :title="inner.title"
        :img="inner.img"
        :url="inner.url"
        v-for="(inner, index) in item.sub"
        :key="index"
        v-show="inner.show"
      />
    </cell-group>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
import CellGroup from "./components/CellGroup";
import Cell from "./components/Cell";
export default {
  name: "meManage",
  components: {
    Tab,
    XHeader,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: [
        {
          title: '广告主',
          show: true,
          sub: [
            {
              title:'推广计划管理',
              url:'plan.plan',
              img:'/images/me/task.png',
              show: true
            },
            {
              title:'推广内容管理',
              url:'',
              img:'/images/me/task-list.png',
              show: true
            },
            {
              title:'历史任务查看',
              url:'',
              img:'/images/me/history.png',
              show: true
            },
            {
              title:'财务管理',
              url:'',
              img:'/images/me/finance.png',
              show: true
            },
            {
              title: '结算管理',
              url: 'me.settlemanage',
              img: '/images/me/jiesuan.png',
              show: true
            }
          ]
        },
        {
          title:'流量主',
          show:true,
          sub:[
            {
              title:'我的任务',
              url:'task.tasks',
              img:'/images/me/gtasks.png',
              show: true
            },
            {
              title:'资源管理',
              url:'resources',
              img:'/images/me/resource.png',
              show: true
            },
            {
              title:'佣金管理',
              url:'brokerage',
              img:'/images/me/money.png',
              show: true
            },
          ]
        },
        {
          title: '扩展功能',
          show: true,
          sub: [
             {
              title:'数据统计',
              url:'',
              img:'/images/me/statistics.png',
              show: true
            },
            {
              title: '使用帮助',
              url: 'me.helps',
              img: '/images/me/help.png',
              show: true
            },
            {
              title: '更多',
              url: 'me.accountsetting',
              img: '/images/me/seting.png',
              show: true
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  created () {
    document.title = '我的'
  },
  mounted(){
    if(this.$store.getters.currentUser.roles[0] == '流量主'){
      this.list[0].show = false;
    }else if(this.$store.getters.currentUser.roles[0] == '广告主'){
      this.list[1].show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 9rem;
  background-image: url("/images/me/me-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .user-icon {
    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
    }
  }
  h3 {
    font-size: 0.768rem;
    line-height: 2;
    color: white;
    font-weight: 400;
    margin-bottom: -8px;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 0 30px;
    position: relative;
    img {
      width: 0.853333rem;
      vertical-align: middle;
      padding-left: 0.213333rem;
    }
  }
  span {
    font-size: 14px;
    line-height: 2;
    color: #999;
    padding: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
