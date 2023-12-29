<template>
	<view class="contain">
		<view class="body">
			<block v-if="alumnList.length>0" v-for="(item,index) in alumnList" :key="index">
				<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"></alumn>
			</block>

			<block v-else>
				<span class="span">暂无更多信息</span>
			</block>
		</view>
	</view>
</template>

<script>
	import alumn from "../../../components/alumn.vue"
	export default {
		components: {
			alumn
		},
		data() {
			return {
				alumnList: [],
				param: null,
			}
		},

		onLoad(options) {
			// 获取点亮的人的信息
			this.$api.getHelpUser().then(res => {
				this.alumnList = res
				console.log(res)
			})
			this.param = options.param1
		},
		onUnload() {
			// 当页面被卸载时触发，可以在这里执行需要的逻辑
			this.navigateBackAndNavigateToPageC();
		},
		methods: {
			gotoDetail(id) {
				uni.navigateTo({
					url: '../../connections/alumnDetail/alumnDetail?userId=' + id
				})
			},
			gotoAppeal(value) {
				if (value.role === "teacher") {
					uni.navigateTo({
						url: '/pages/public/teacherFrom/teacherFrom?userId=' + value.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/public/infoForm/infoForm?userId=' + value.id
					})
				}
			},

			navigateBackAndNavigateToPageC() {
				if (this.param) {
					uni.navigateBack({
						delta: 1,
						success: () => {
							uni.reLaunch({
								url: '/pages/firstPage/home' // 替换成首页的路径
							});
						}
					});
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
		}
	}
</script>

<style>
	.contain {
		padding: 12rpx 32rpx 0;
	}

	.span {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>