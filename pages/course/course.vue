<template>
	<view class="contain">
		<view class="search_block" @click="goToSearchPage">
			<icon type="search" style="vertical-align: middle;height: 24rpx;" color="#999999" size="24rpx">
			</icon>
		</view>
		<!-- 内容部分 -->
		<view style="height: 30rpx;"></view>
		<!-- 校内部分 -->
		<div style="display: flex;justify-content: space-between;">
			<span>校内课程</span>
			<div @click="gotoMoreCourse('校内课程')">
				<span>更多</span>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</div>
		</div>

		<view class="content">
			<view class="tab_block tab2" @click="gotoMyCollection(true)">
				<text>我的收藏</text>
				<text></text>
				<uni-icons type="right" size="14" color="#fff" class="icon"></uni-icons>
				<image src="../../static/img/course_tab.png" class="img"></image>
			</view>
			<template v-for="(item,index) in inCampusCourses" :key="index">
				<view class="tab_block tab1" @click="gotoCourseDetail(item)" v-if="index<3">
					<text class="text1">{{item.subject}}</text>
					<text>({{item.class_hours}})</text>
					<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
				</view>
			</template>
		</view>
		<!-- 校外部分 -->
		<div style="display: flex;justify-content: space-between;">
			<span>校外课程</span>
			<div @click="gotoMoreCourse('校外课程')">
				<span>更多</span>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</div>
		</div>
		<view class="content">
			<view class="tab_block tab2" @click="gotoMyCollection(false)">
				<text>我的收藏</text>
				<text></text>
				<uni-icons type="right" size="14" color="#fff" class="icon"></uni-icons>
				<image src="../../static/img/course_tab.png" class="img"></image>
			</view>
			<template v-for="(item,index) in outCampusCourses" :key="index">
				<view class="tab_block tab1" @click="gotoCourseDetail(item)" v-if="index<3">
					<text class="text1">{{item.subject}}</text>
					<text>({{item.class_hours}})</text>
					<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
				</view>
			</template>
		</view>
	</view>
	<my-popup @gotoPage="gotoPage" v-if="!isAttest"></my-popup>
</template>

<script>
	import myPopup from '@/components/myPopup.vue'
	import searchInput from '../../components/searchInput.vue'
	export default {
		components: {
			searchInput,
			myPopup
		},
		data() {
			return {
				isAttest: "",
				courseList: [],
				inCampusCourses: [],
				outCampusCourses: [],
			};
		},
		onLoad() {
			this.isAttest = getApp().globalData.isAttest
			this.$api.getCourse().then(res => {
				console.log(res)
				this.courseList = res.results
				this.inCampusCourses = this.courseList.filter(item => item.in_campus);
				this.outCampusCourses = this.courseList.filter(item => !item.in_campus);
			})
		},
		methods: {
			gotoPage(type) {
				if (type) {
					uni.navigateTo({
						url: '/pages/public/attestSearch/attestSearch'
					})
				} else {
					uni.switchTab({
						url: '/pages/firstPage/home'
					})
				}
			},
			// 全局搜索
			goToSearchPage() {
				uni.navigateTo({
					url: '../../pages/firstPage/search/search'
				})
			},

			gotoCourseDetail(item) {
				getApp().globalData.courseDetailItem = item;
				uni.navigateTo({
					url: '../course/courseDetail/courseDetail'
				})
			},
			gotoMoreCourse(item) {
				getApp().globalData.moreCourseName = item;
				uni.navigateTo({
					url: '../course/moreCourse/moreCourse'
				})
			},

			gotoMyCollection(name) {
				getApp().globalData.myCollection = name;
				uni.navigateTo({
					url: '../course/myCollection/myCollection'
				})
			},
		}
	}
</script>

<style lang="scss">
	.contain {
		padding: 12rpx 32rpx;

		.search_block {
			width: 100%;
			padding: 18rpx 0;
			background: #f8f8f8;
			border-radius: 8rpx;
			font-size: $uni-font-size-tr;
			color: #999999;
			text-align: center;
		}

		.content {
			margin: 48rpx 0;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 32rpx;
		}

		.tab_block {
			position: relative;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 224rpx;
			font-size: $uni-font-size-tr;

			.text1 {
				line-height: 42rpx;
				font-weight: bold;
			}

			.icon {
				position: absolute;
				top: 8rpx;
				right: 10rpx;
				font-weight: bold;
			}

			.img {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 200rpx;
				height: 200rpx;
			}
		}

		.tab1 {
			background: rgba(255, 255, 255, 0.39);
			box-shadow: 0rpx 6rpx 12rpx rgba(64, 144, 248, 0.15);
			color: #9f9f9f;

			.text1 {
				color: #1A1A1A;
			}
		}

		.tab2 {
			background: linear-gradient(180deg, #006FFF 0%, rgba(15, 119, 255, 0.7) 100%);
			box-shadow: 0rpx 6rpx 12rpx rgba(64, 144, 248, 0.15);
			color: #fff;

		}
	}
</style>