<template>
  <div>
    <x-header title="帮助中心"></x-header>
    <div class="header">
      <h1>您好</h1>
      <h1>我们为您提供更多帮助</h1>

    </div>
    <!-- 常见问题 -->
    <div class="item faq">
      <h2>常见问题</h2>
      <van-loading
        type="spinner"
        size="18px"
        v-show="loading"
      > 加载中... </van-loading>
      <div class="content">
        <router-link
          class="c-item faq-item"
          v-for="item in faqs"
          :key="item.id"
          :to="{name: 'me.helps.view', params: {'id': item.id}}"
        >
          <div class="icon">
            <img
              src="/images/help/tips.png"
              alt=""
            >
          </div>
          <span class="title">{{ item.title }}</span>
        </router-link>
      </div>
    </div>
    <!-- 问题分类 -->
    <div class="item group">
      <h2>问题分类</h2>
      <div class="content">
        <router-link
          class="c-item"
          v-for="item in faqGroups"
          :key="item.id"
          :to="{name: 'me.helps.list', params: {'id': item.id}}"
        >
          <div class="icon">
            <img
              :src="item.icon"
              alt=""
            >
          </div>
          <div class="title">
            <h4>{{ item.title }}</h4>
            <span>{{ item.desc }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import XHeader from '$components/XHeader'
import article from '$api/article'
import Loading from 'vant/lib/loading'
import 'vant/lib/loading/style'
import { setTimeout } from 'timers';
export default {
  components: {
    XHeader, 'van-loading': Loading,
  },
  data() {
    return {
      loading: true,
      faqs: [
      ],
      faqGroups: [
        {
          id: 20,
          icon: '/images/help/help-f-3.png',
          title: '任务',
          desc: '如何完成任务，赚取佣金'
        },
        {
          id: 19,
          icon: '/images/help/help-f-4.png',
          title: '财务',
          desc: '如何查看收益并提现'
        }
      ]
    }
  },
  methods: {
    getHot() {
      article.list(20, 1).then(({ data }) => {
        this.loading = false
        this.faqs = data.contents.data
      })
    }
  },
  created() {
    setTimeout(() => {
      this.getHot()
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-image: url("/images/help/help-bg.jpg");
  background-size: 100%;
  padding: 2rem 0;
  position: relative;
  h1 {
    color: white;
    font-size: 1rem;
    margin-left: 0.75rem;
  }
  $search-height: 2.1875rem;
  .help-search {
    height: $search-height;
    background-color: white;
    position: absolute;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.75rem;
    input {
      height: 100%;
      width: 100%;
      outline: none;
      padding-left: $search-height;
      border: none;
      &::placeholder {
        color: #999;
      }
    }
    .icon {
      position: absolute;
      left: 0;
      top: 0;
      width: $search-height;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.875rem;
        height: auto;
      }
    }
  }
}
.item {
  h2 {
    height: 2.8125rem;
    line-height: 2.8125rem;
    font-size: 0.8rem;
    margin-left: 0.75rem;
  }
  .van-loading {
    text-align: center;
  }
  .content {
    background-color: white;
    a {
      color: #000;
    }

    .c-item {
      box-sizing: border-box;
      display: flex;
      min-height: 3.125rem;
      line-height: 3.125rem;
      align-items: center;
      padding: 0.5rem 0.75rem;
      position: relative;
      .icon {
        display: inline-block;
        height: 100%;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.875rem;
          height: auto;
        }
      }
      h4 {
        display: block;
      }
      .title {
        padding-left: 0.5rem;
        line-height: 1.5;
        font-size: 0.8rem;
        h4 {
          font-size: 0.8rem;
        }
        span {
          font-size: 0.75rem;
          color: #999;
        }
      }
      &::after {
        content: "";
        height: 1px;
        background-color: #ededed;
        position: absolute;
        left: 0.75rem;
        right: 0;
        bottom: 0;
      }
      &:last-child::after {
        display: none;
      }
    }
  }
}
</style>
