<template>
	<view class="container">
		<template v-for="(item,index) in courseList" :key="index" v-if="name==='校内课程'">
			<view class="chapter" v-if="item.in_campus" @click="gotoCourseDetail(item)">
				<view>
					{{item.subject}}
				</view>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</view>
		</template>

		<template v-for="(item,index) in courseList" :key="index" v-if="name==='校外课程'">
			<view class="chapter" v-if="!item.in_campus" @click="gotoCourseDetail(item)">
				<view>
					{{item.subject}}
				</view>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</view>

		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				courseList: []
			}
		},
		onLoad() {
			this.name = getApp().globalData.moreCourseName
			this.$api.getCourse().then(res => {
				console.log(res)
				this.courseList = res.results
			})
		},
		methods: {
			gotoCourseDetail(item) {
				getApp().globalData.courseDetailItem = item;
				uni.navigateTo({
					url: '../courseDetail/courseDetail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 12rpx 32rpx;
	}

	.chapter {
		height: 112rpx;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e9e9e9;
	}
</style>