<template>
  <div class>
    <x-header title="内容详情" @click-right="del">
      <div slot="right" class="right">
        <van-icon name="delete" />
      </div>
    </x-header>
    <div class="skeleton" v-show="showSkeleton">
      <van-skeleton title :row="3"></van-skeleton>
    </div>
    <van-panel :title="details.title" :desc="details.updated_at">
      <div class="panel-content">
        {{details.content}}
        <ul @click="preview()" class="panel-imgs" v-show="showPreview">
          <li v-for="(item, index) in details.attachment" :key="index">
            <img :src="item" />
          </li>
        </ul>
        <div class="panel-footer">Link: {{details.link}}</div>
      </div>
    </van-panel>
    <div class="btn">
      <van-button type="primary" hairline size="large" @click="edit()">编辑</van-button>
    </div>
  </div>
</template>

<script>
import XHeader from "$components/XHeader";
import { Skeleton, Icon, Panel } from "vant";
import "vant/lib/panel/style";
import ImagePreview from "vant/lib/image-preview";
import "vant/lib/image-preview/style";
import Button from "vant/lib/button";
import "vant/lib/button/style";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    XHeader,
    "van-icon": Icon,
    "van-panel": Panel,
    "van-skeleton": Skeleton,
    "van-button": Button,
    ImagePreview
  },
  data() {
    //这里存放数据
    return {
      showSkeleton: true,
      showPreview: false,
      details: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    edit() {
      this.$router.push({
        name: "promotion.edit",
        params: { id: this.details.id }
      });
    },
    del() {},
    getAdsTarget() {
      let adsId = this.$route.params.id;
      this.$http
        .get("api/v2/alliance/advertiser/adstarget/info/" + adsId)
        .then(data => {
          this.details = data.data.target;
          if (this.details.attachment.length > 0) this.showPreview = true;
          this.showSkeleton = false;
        });
    },
    preview() {
      ImagePreview(this.details.attachment);
    }
  },
  created() {},
  mounted() {
    this.getAdsTarget();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/.weui-cells {
  margin-top: 0;
  .vux-label {
    line-height: 3;
  }
  .vux-label-desc {
    font-size: 12px;
  }
}
/deep/.van-icon {
  font-size: 20px;
  color: #333;
}
.panel-content {
  padding: 10px;
}
.panel-imgs {
  margin-top: 10px;
  li {
    padding: 8px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
.panel-footer {
  color: #aaa;
  font-size: 0.6rem;
  padding: 10px 0;
  margin-top: 10px;
  border-top: solid 1px #f3f3f3;
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
.skeleton {
  background: #fff;
  padding: 10px;
}
</style>
