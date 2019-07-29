<template>
	<div class="brokerage">
		<x-header title="佣金管理" url=""></x-header>
		<van-cell>
			<div class="top">
				<div class="content">
					<label>我的佣金</label>
					<span>800.00 元</span>
					<button @click="next">提现</button>
				</div>
			</div>
		</van-cell>
		<van-cell-group title="佣金明细">
			<van-cell title="2019-07-09提现" value="200元" label="描述信息"/>
			<van-cell title="2019-07-09提现" value="100元" label="描述信息" />
		</van-cell-group>
	</div>
</template>

<script>
	import XHeader from '$components/XHeader';
	import Cell from 'vant/lib/cell';
	import CellGroup from 'vant/lib/cell-group';
	import 'vant/lib/cell/style';
	import 'vant/lib/cell-group/style';

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,
			'van-cell': Cell,
			'van-cell-group': CellGroup
		},
		data () {
			//这里存放数据
			return {

			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
      next(){
        this.$router.push({name:'withdraw.withdraw'});
      }
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created () {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted () {

		},
	}
</script>
<style lang='scss' scoped>
	//@import url(); 引入公共css类
	.brokerage {
		position: relative;
		.top {
			display: flex;
			height: 160px;
			justify-content: space-around;
			align-items: center;
      .content{
        text-align: center;
        label{
          display: block;
          width: 100px;
          height: 35px;
          margin: 0 auto;
          line-height: 35px;
          text-align: center;
        }
        span{
          display: block;
          width: 200px;
          height: 60px;
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          line-height: 60px;
        }
        button{
          width: 100px;
          height: 30px;
          line-height: 30px;
          border:1px solid #000;
          background-color: #fff;
        }
      }
		}
	}
</style>