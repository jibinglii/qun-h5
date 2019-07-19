<template>
  <div class="personCenter">
    <div class="header">
      <div class="user-icon">
        <img :src="avatar" alt>
      </div>
      <h3>
        {{ nickname }}
        <router-link :to="{ name: 'me.modifyuseinfo'}">
          <img src="../../assets/images/bianji.png">
        </router-link>
      </h3>
      <span>{{sign }}</span>
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
      nickname: this.$user().nickname,
      sign: this.$user().sign,
      avatar: [this.$user().avatar],
      list: [
        {
          title: '常用工具',
          show: true,
          sub: [
            {
              title: '意见反馈',
              url: 'me.feedback',
              img: '/images/me/fankui.png',
              show: true
            },
            {
              title: '使用帮助',
              url: 'me.helps',
              img: '/images/me/help.png',
              show: true
            },
            {
              title: '账号设置',
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
    
  },
  created () {
    document.title = '我的'
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
