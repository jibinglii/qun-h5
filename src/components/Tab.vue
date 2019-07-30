<template>
	<div class="fixed-bottom">
		<div class="weui-tabbar">
			<a
				class="weui-tabbar__item"
				:class="{ active: item.url == currentUrl }"
				v-for="(item, index) in tabs"
				:key="index"
				@click="go(item, index)"
			>
				<p class="weui-tabbar__label">{{ item.text }}</p>
			</a>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'

	export default {
		components: {},
		props: {
			tabIndex: {
				type: String,
				default: "0"
			}
		},
		computed: {
			currentUrl () {
				return this.$route.name;
			},
			...mapGetters(['currentUser'])
		},
		methods: {
			go (item, index) {
				this.$router.push({ name: item.url });
			}
		},
		data () {
			return {
				tabs: [
					{
						text: "个人中心",
						url: "me.me"
					}
				],
				isFirst: true
			};
		},
		mounted () {
			if (this.inArray('流量主',this.$store.getters.currentUser.roles)) {
				this.tabs.unshift({
					text: "任务大厅",
					url: "home"
				})
			} else if (this.inArray('广告主',this.$store.getters.currentUser.roles)) {
				this.tabs.unshift({
					text: "推广大厅",
					url: "home.ad"
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/sass/_variables.scss";

	.fixed-bottom {
		margin-bottom: 3.75rem;

		.weui-tabbar {
			position: fixed;
			bottom: 0;
			height: 50px;
			width: 100%;
			background-color: white;

			.weui-tabbar__item {
				border-right: solid 1px #f2f2f2;
			}

			.weui-tabbar__item:last-child {
				border: none;
			}

			.weui-tabbar__item.active {
				p {
					color: #000;
					font-weight: 500;
				}
			}

			.weui-tabbar__label {
				text-align: center;
				color: #999;
				font-size: 16px;
				line-height: 40px;
			}
		}
	}

	@supports (padding-bottom: constant(safe-area-inset-bottom)) {
		.fixed-bottom {
			.weui-tabbar {
				padding-bottom: constant(safe-area-inset-bottom);
			}
		}
	}

	@supports (padding-bottom: env(safe-area-inset-bottom)) {
		.fixed-bottom {
			.weui-tabbar {
				padding-bottom: env(safe-area-inset-bottom);
			}
		}
	}
</style>
