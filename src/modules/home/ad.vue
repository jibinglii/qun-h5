<template>
	<div class="page-index">
		<x-header title="首页" :allow-back="false"></x-header>
		<nav-block />
		<tab></tab>
	</div>
</template>

<script>
	import Tab from "$components/Tab";
	import Nav from "$components/Nav";
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import 'vant/lib/cell/style';
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import { mapGetters } from "vuex";
	import InfiniteLoading from "vue-infinite-loading";
	import Loading from "vant/lib/loading";
	import "vant/lib/loading/style";
	export default {
		components: {
			Tab,
			"nav-block": Nav,
			"van-cell": Cell,
			"van-cell-group": CellGroup,
			XHeader
		},
		data () {
			return {};
		},
		computed: {
			...mapGetters(["currentUser"])
		},
		created () { },
		methods: {
		},
		mounted () {
      console.log(this.$store.getters.currentUser.roles)
		}
	};
</script>
<style lang="scss" scoped>
	.page-index {
		position: relative;
		.top {
			display: flex;
			height: 50px;
			justify-content: center;
			flex-flow: wrap;
			.top-con {
				flex: 1;
				text-align: center;
				span,
				label {
					display: block;
					width: 70px;
					height: 30px;
					margin: 0 auto;
				}
			}
		}
		.fast {
			display: flex;
			height: 100px;
			justify-content: center;
			flex-flow: wrap;
			.fast-con {
				flex: 1;
				text-align: center;
				padding-top: 20px;
				img {
					width: 40px;
					height: 40px;
					border: 1px solid #000;
					border-radius: 5px;
					margin: 0 auto;
				}
				label {
					display: block;
					width: 70px;
					height: 30px;
					margin: 0 auto;
				}
			}
		}
	}
</style>
