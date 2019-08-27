<template>
	<div class="qun-search">
		<x-header title="高级群搜索"></x-header>
		<van-search
			v-model="value"
			placeholder="请输入搜索关键词"
			show-action
			shape="round"
			@search="onSearch"
		>
			<div slot="action" @click="onSearch">搜索</div>
		</van-search>
		<van-card
			v-for="(item, index) in resources"
			:key="index"
			:num="'规格' + item.size+'人'"
			:price="item.show_price"
			:desc="item.desc"
			:title="item.name"
			thumb="/images/me/qun.png"
		>
			<div slot="footer">
				<van-button round type="danger" size="small" @click="next(item.id,item.name,item.show_price)">立即购买</van-button>
			</div>
		</van-card>
     <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
      <div slot="no-more">没有更多数据啦...</div>
      <div slot="no-results">没有数据</div>
    </infinite-loading>
	</div>
</template>

<script>
	import XHeader from '$components/XHeader';
	import Search from 'vant/lib/search';
	import 'vant/lib/search/style';
	import Card from 'vant/lib/card';
	import 'vant/lib/card/style';
	import Button from 'vant/lib/button';
	import InfiniteLoading from "vue-infinite-loading";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			XHeader,InfiniteLoading,
			'van-search': Search,
			'van-card': Card,
			'van-button': Button
		},
		data () {
			//这里存放数据
			return {
				value: '',
				resources: [],
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onSearch () {
				this.$http.post('api/v2/alliance/search', { name: this.value }).then(({ data }) => {
					this.resources = data.resources.data
				})
      },
      infiniteHandler($state){
        this.$http.post('api/v2/alliance/search', { name: this.value })
        .then(({ data }) => {
          if (data.resources.data.length > 0) {
            this.page += 1;
            this.resources.push(...data.resources.data);
            $state.loaded();
          }
          if (data.resources.per_page > data.resources.data.length) {
            $state.complete();
          }
        });
      },
      next(id,title,price){
        let params = {resource_id:id,title:title,price:price}
        this.$http.post('api/v2/alliance/shop',params).then(data =>{
            if(data.code == 201){
                this.$alert('你的订单创建成功,稍后工作人员与你联系')
            }
        }).catch(fail=>{
            this.$alert(fail.data.message)
        })
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
</style>