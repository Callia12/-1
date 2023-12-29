<template>
	<view class="container" v-if="courseDetailItem">
		<view class="container_subject">{{courseDetailItem.subject}}</view>
		<view class="container_title">
			<view class="con_teacher">
				<span class="span">{{courseDetailItem.teacher}}</span>
				<div style="width: 30rpx;"></div>
				<view class="con_ke">
					{{courseDetailItem.class_hours}}课时
				</view>
			</view>
			<view @click="toggleCollection()">
				<img :src="getCollectionImage()" style="width: 40rpx;height: 40rpx;">
			</view>

		</view>

		<view class="contain_introduct">
			<img src="../../static/img/icon_kecjs@2x.png" style="width: 16px;height: 16px;">
			<span>课程介绍</span>
		</view>
		<!-- 课程介绍的内容-->
		<view class="contain_content">
			{{courseDetailItem.description}}
		</view>


		<!-- 课程每个章节 -->
		<view class="contain_chapter">
			<view class="chapter_left">
				<view>第一章</view>
			</view>
			<uni-icons type="right" size="14" color="#000" class="icon" @click="toggleChapterList"
				v-if="!showChapterList"></uni-icons>
			<uni-icons type="arrowdown" size="14" color="#000" class="icon" v-if="showChapterList"
				@click="toggleChapterList"></uni-icons>
		</view>
		<view class="contain_chapter" v-for="(item,index) in chapterList" :key="index" @click="gotoVideo(item)"
			v-if="showChapterList">
			<view class="chapter_left">
				<view style="">{{item.title}}</view>
			</view>
			<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseDetailItem: '',
				chapterList: [],
				showChapterList: false,
				isCollected: false,
				collectionItems: [],
				collectionKey: "collectedCourses",
				formData: {
					course_id: 0
				},
			}
		},
		created() {
			const userId = getApp().globalData.courseDetailItem.id
			this.$store.state.incollection.forEach(course => {
				if (course.id === userId) {
					this.isCollected = true;
				}
			});

			this.$store.state.outcollection.forEach(course => {
				if (course.id === userId) {
					this.isCollected = true;
				}
			});
		},
		onLoad() {
			this.courseDetailItem = getApp().globalData.courseDetailItem
			this.$api.getCourseVideo(this.courseDetailItem.id).then(res => {
				this.chapterList = res
			})
			this.formData.course_id = this.courseDetailItem.id

		},
		methods: {
			gotoVideo(item) {
				getApp().globalData.videoDetailItem = item;
				console.log(item)
				uni.navigateTo({
					url: '../videoDetail/videoDetail'
				})

			},
			toggleChapterList() {
				this.showChapterList = !this.showChapterList;
			},
			toggleCollection() {
				this.isCollected = !this.isCollected;
				if (this.isCollected === true) {
					this.$api.getCourseCollectionPost(this.formData).then(res => {
						if (res === '收藏成功') {
							this.isCollected === true
							uni.showToast({
								title: '收藏成功',
								duration: 2000
							});
						} else {
							uni.showToast({
								title: '该课程已经被收藏',
								duration: 2000
							});
						}
					})
				} else if (this.isCollected === false) {
					this.$api.deleteCollection(this.formData).then(res => {
						if (res === '取消收藏成功') {
							uni.showToast({
								title: '取消收藏',
								duration: 2000
							});
						}
					})
				}
			},

			getCollectionImage() {
				return this.isCollected ?
					"/static/img/shouc2@2x.png" :
					"/static/img/shouc1@2x.png";
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 12rpx 32rpx;

		.container_subject {
			height: 60rpx;
			line-height: 60rpx;
			font-weight: bold;
		}

		.container_title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0 30rpx 0;

			.con_teacher {
				display: flex;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.span {
					// width: 184rpx;
					height: 40rpx;
					color: #808080;
					font-size: 28rpx;
				}

				.con_ke {
					width: 108rpx;
					height: 42rpx;
					background: linear-gradient(180deg, #006FFF 0%, rgba(15, 119, 255, 0.7) 100%);
					color: #fff;
					font-size: 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 8rpx;
				}
			}
		}

		.contain_introduct {
			width: 190rpx;
			display: flex;
			font-size: 34rpx;
			justify-content: space-between;
			align-items: center;

		}

		.contain_content {
			width: 686rpx;
			font-size: 28rpx;
			color: #808080;
			line-height: 44rpx;
			padding-top: 20rpx;
			display: flex;
		}

		.contain_chapter {
			height: 112rpx;
			display: flex;
			font-size: 30rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e9e9e9;

			.chapter_left {
				display: flex;
				align-items: center;
			}
		}
	}
</style>