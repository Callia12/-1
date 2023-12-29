<template>
	<view class="contain">
		<view class="head">
			<view class="search_block" @click="goToSearchPage">
				<icon type="search" style="vertical-align: middle;height: 24rpx;" color="#999999" size="24rpx">
				</icon>
			</view>
			<navigator url="newFriend/newFriend">
				<view class="friendList" style="margin-top: 15rpx;">
					<view class="friendListLeft">

						<view class="box_img">
							<image src="../../static/icon/addUser.png"></image>
						</view>
						<text>新的好友</text>
					</view>
					<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
				</view>
			</navigator>
			<navigator url="myFriend/myFriend">
				<view class="friendList">
					<view class="friendListLeft">
						<view class="box_img" style="background-color: #0F77FF;">
							<image src="../../static/icon/myFriend.png"></image>
						</view>
						<text>我的好友</text>
					</view>
					<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
				</view>
			</navigator>
		</view>


		<view class="body_school">
			<view class="schoolList">
				<view class="schoolListLeft">
					<view class="school_img">
						<image src="../../static/icon/school.png"></image>
					</view>
					<view class="box_center">
						<text>仰恩大学</text>
						<view class="center_contain">
							<view class="center_left">
								<image src="../../static/icon/renzheng.png" style="width: 9px; height:9px;"></image>
								高级认证
							</view>
							<view class="center_right">标准版</view>
						</view>
					</view>
				</view>
				<view class="box_invite">邀请</view>
			</view>

			<view v-for="(item,index) in treeList" :key="index" class="school_bottom" @click="gotoMoreDetail(item)">
				<view class="schoolBottom_left">
					<view class="school_tree"></view>
					<text
						style="width:200px;">{{item==='年级'?item+'('+schoolCount+')':item==='教师'?item+'('+teacherCount+')':item}}</text>
				</view>
				<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
			</view>
			<view class="school_bottom">
				<text>更多</text>
				<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
			</view>

		</view>


		<view class="body_class">
			<text>
				我的班级({{alumnList.length}})
			</text>
		</view>
	</view>
	<scroll-view scroll-y style="height: calc(100vh - 180rpx);" @scrolltolower="onScrollBtm">
		<view class="contain">
			<block v-if="alumnList.length>0" v-for="(item,index) in alumnList" :key="index">
				<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"></alumn>
			</block>

			<block v-else>
				<span>暂无更多信息</span>
			</block>
		</view>
	</scroll-view>
	<my-popup @gotoPage="gotoPage" v-if="!isAttest"></my-popup>
</template>

<script>
	import searchInput from '../../components/searchInput.vue'
	import alumn from "../../components/alumn.vue"
	import mySelect from "../../components/mySelect.vue"
	import myPopup from '@/components/myPopup.vue'
	export default {
		components: {
			searchInput,
			alumn,
			mySelect,
			myPopup
		},

		data() {
			return {
				reFresh: "",
				faculty_id: "",
				isSelect: false,
				selectInd: "",
				selectList: [],
				alumnList: [],
				query: {
					limit: 10,
					offset: 0,
				},
				next: '',
				isAttest: "",
				facultyList: [],
				expandIndex: true,
				treeList: ['年级', '教师', '校领导'],
				// 初始化面包屑内容
				schoolCount: 0,
				teacherCount: 0,
			};
		},
		watch: {
			//监听reFresh,如果有修改就执行监听器
			reFresh: function() {
				this.getAlumnList()
			}
		},
		onLoad() {
			//获取同班同学
			this.$api.getClassMates().then(res => {
				this.alumnList = res
			})

			this.isAttest = getApp().globalData.isAttest
			if (this.isAttest) {
				this.getAlumnList()
				this.getTeacher()
			}
		},
		methods: {
			getAlumnList() {
				this.$api.getAlumnList(this.query).then(res => {
					console.log(res)
					//总人数
					this.schoolCount = res.count
				})
			},

			getTeacher() {
				this.$api.getTeacher().then(res => {
					console.log(res)
					this.teacherCount = res.count
				})
			},

			gotoDetail(id) {
				uni.navigateTo({
					url: '../connections/alumnDetail/alumnDetail?userId=' + id
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

			gotoMoreDetail(item) {
				getApp().globalData.schoolDetailItem = item;
				uni.navigateTo({
					url: '../../pages/connections/shoolDetail/shoolDetail'
				})
			},

			goToSearchPage() {
				uni.navigateTo({
					url: '../firstPage/search/search',
				})
			}
		}
	}
</script>

<style lang="scss">
	.contain {
		padding: 12rpx 32rpx 0;

		.head {
			text {
				font-size: 32rpx;
				color: #333333;
			}

			.friendList {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				// margin: 20rpx 0;
				padding: 20rpx 0;

				.friendListLeft {
					display: flex;
					width: 35%;
					justify-content: space-between;
					align-items: center;

					.box_img {
						background-color: #FE9200;
						width: 80rpx;
						height: 80rpx;
						border-radius: 16rpx;
						display: flex;
						align-items: center;
						justify-content: center;


						image {
							width: 50rpx;
							height: 50rpx;
						}
					}


				}
			}

		}

		.search_block {
			width: 100%;
			padding: 18rpx 0;
			background: #f8f8f8;
			border-radius: 8rpx;
			font-size: $uni-font-size-tr;
			color: #999999;
			text-align: center;
		}

		.body_school {
			padding: 12rpx 0;
			border-bottom: 1px solid #E6E6E6;

			text {
				font-size: 32rpx;
				color: #333333;
			}

			.schoolList {
				display: flex;
				justify-content: space-between;

				.schoolListLeft {
					width: 70%;
					display: flex;

					.school_img {
						background-color: #9FCCEF;
						width: 80rpx;
						height: 80rpx;
						border-radius: 16rpx;
						display: flex;
						align-items: center;
						justify-content: center;


						image {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.box_center {
						display: flex;
						flex-direction: column;
						margin-left: 36rpx;

						.center_contain {
							display: flex;
							width: 260rpx;
							align-items: center;
							justify-content: space-between;
							font-size: 20rpx;
							border-radius: 8rpx;
							color: #808080;
							line-height: 34rpx;

							.center_left {
								width: 120rpx;
								height: 34rpx;
								border: 2rpx solid #F2F1F6;
								border-radius: 8rpx;
								display: flex;
								align-items: center;
								justify-content: space-around;
							}

							.center_right {
								width: 90rpx;
								height: 34rpx;
								border: 2rpx solid #F2F1F6;
								border-radius: 8rpx;
								display: flex;
								justify-content: center;
							}
						}
					}
				}

				.box_invite {
					width: 100rpx;
					height: 48rpx;
					font-size: 24rpx;
					border: 2rpx solid #D8D8D8;
					border-radius: 10rpx;
					color: #333333;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.school_bottom {
				width: 87%;
				margin-left: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;

				.schoolBottom_left {
					width: 82%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.school_tree {
						width: 11rpx;
						height: 12rpx;
						border: 2rpx solid #D8D8D8;
						border-right: 0;
						border-top: 0;
					}
				}
			}
		}


		.body_class {
			margin-top: 20rpx;

			text {
				font-size: 32rpx;
				color: #808080;
			}
		}





	}




	.sel_box {
		// height: 400rpx;
		width: 100%;
		margin: 24rpx 0;
		display: flex;
		flex-direction: column;
		font-size: 30rpx;




		.sel_faculty {
			.faculty {
				display: flex;
				justify-content: space-between;
				margin: 10rpx 30rpx;
				height: 60rpx;
			}
		}
	}
</style>