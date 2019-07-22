<template>
  <div class="page-home">
    <x-header title="首页" :allow-back="false"></x-header>

    <nav-block />
    <tab></tab>
  </div>
</template>

<script>
import Tab from "$components/Tab";
import Nav from "$components/Nav";
import XHeader from "$components/XHeader";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Loading from "vant/lib/loading";
import "vant/lib/loading/style";
export default {
  name: "home",
  components: {
    Tab,
    "nav-block": Nav,
    XHeader
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
