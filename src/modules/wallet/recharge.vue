<template>
	<div class>
		<x-header title="充值"></x-header>
		<van-cell-group title="充值金额">
			<van-field v-model="value" placeholder="请输入充值金额">
				<span slot="button">元</span>
			</van-field>
		</van-cell-group>
		<van-radio-group v-model="radio">
			<van-cell-group title="选择支付方式">
				<van-cell title="支付宝" clickable @click="radio = '1'" icon="alipay">
					<van-radio slot="right-icon" name="1" />
				</van-cell>
				<!-- <van-cell title="微信" clickable @click="radio = '2'" icon="wechat">
					<van-radio slot="right-icon" name="2" />
				</van-cell> -->
			</van-cell-group>
		</van-radio-group>
		<div class="agreement">
			<label for="weuiAgree" class="weui-agree">
				<input
					id="weuiAgree"
					type="checkbox"
					v-model="isagree"
					checked
					class="weui-agree__checkbox"
				/>
				<span class="weui-agree__text">
					我已阅读并同意
					<a @click="showAgree" href="javascript:void(0)">《充值协议》</a>
				</span>
			</label>
		</div>
		<agree
			title="搜瓜群盟用户充值协议"
			ref="agree"
			:content="registerProtocol"
		/>
		<div class="btn">
			<van-button type="primary" hairline size="large" @click="next()"
				>确认</van-button
			>
		</div>
	</div>
</template>

<script>
	import XHeader from "$components/XHeader";
	import Cell from "vant/lib/cell";
	import "vant/lib/cell/style";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import Icon from "vant/lib/icon";
	import "vant/lib/icon/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import RadioGroup from "vant/lib/radio-group";
	import "vant/lib/radio-group/style";
	import Radio from "vant/lib/radio";
	import "vant/lib/radio/style";
	import Button from "vant/lib/button";
	import { mapGetters } from "vuex";
  import Agree from "$components/Agree";
  import protocol from "$api/protocol";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			"van-cell-group": CellGroup,
			"van-cell": Cell,
			"van-icon": Icon,
			"van-field": Field,
			"van-radio-group": RadioGroup,
			"van-radio": Radio,
			"van-button": Button,
			Agree
		},
		data () {
			//这里存放数据
			return {
				value: "3000.00",
				radio: "1",
				isagree: true,
				name: '充值',
				callback: location.origin + '/wallet/success',//待处理
        result: '',
        registerProtocol:''
			};
		},
		computed: {
			...mapGetters(["currentUser"])
		},
		watch: {},
		methods: {
			showAgree () {
				 this.$refs.agree.show();
			},
			next () {
				if (this.value <= 0) {
					this.$alert('输入金额有误')
					return false;
				}
				let params = {
					user_id: this.$store.getters.currentUser.id,
					order_name: this.name,
					total_amount: this.value,
					callback: this.callback
				}
				if (this.radio == 1) {
					this.$http.post('api/v2/alliance/alipay', params).then(data => {
						document.write(data)
					})
				} else if (this.radio == 2) {
					this.$http.post('api/v2/alliance/wechat', params).then(data => {
						console.log(data)
					})
				}
			}
		},
		created () {
			protocol.getProtocol("register").then(({ data }) => {
				this.registerProtocol = data.content;
			});
		},
		mounted () { 
      console.log(this.callback)
    }
	};
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.agreement {
		text-align: center;
		margin: 40px auto 15px;
	}
	.van-cell__left-icon {
		font-size: 23px;
	}
	.btn {
		width: 90%;
		margin: auto;
		.van-button--primary {
			height: 48px;
			line-height: 48px;
			font-size: 14px;
		}
	}
</style>
