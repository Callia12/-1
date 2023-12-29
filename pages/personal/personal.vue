<template>
	<view>
		<view class="head">
			<image src="../../static/img/gerbg.png" style="width: 100%;height: 100%" error=""></image>
			<view class="head_box">
				<visitCard :info="userInfo"></visitCard>
			</view>
		</view>
		<view class="contain">
			<view class="box1">
				<view class="card_box" @click="gotoPage">
					<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
					<text>个人资料</text>

				</view>
				<navigator url="./lighting/lighting" hover-class="navigator-hover">
					<view class="card_box">
						<view class="icon">
							<uni-badge :text="badge" absolute="leftTop" :offset="[-10, -5]" class="badge"> </uni-badge>
							<uni-icons type="right" size="14" color="#000"></uni-icons>
						</view>
						<text>我的点亮</text>
					</view>
				</navigator>
				<navigator url="./friendApply/friendApply" hover-class="navigator-hover">
					<view class="card_box">
						<view class="icon">
							<uni-badge :text="badge" absolute="leftTop" :offset="[-10, -5]" class="badge"> </uni-badge>
							<uni-icons type="right" size="14" color="#000"></uni-icons>
						</view>
						<text>查阅申请</text>
					</view>
				</navigator>
			</view>
			<view class="box2" @click="handleCopy">
				<text>联系学院</text>
				<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
			</view>
			<navigator url="feedback/feedback" hover-class="none">
				<view class="box2">
					<text>意见反馈</text>
					<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
				</view>
			</navigator>
			<view class="box2" @click="gotoPage(1)">
				<text>申诉通道</text>
				<uni-icons type="right" size="14" color="#555" class="icon"></uni-icons>
			</view>
		</view>
	</view>
	<my-popup @gotoPage="gotoPage1" v-if="!isAttest"></my-popup>
</template>

<script>
	import visitCard from "../../components/visitCard.vue"
	import myPopup from '@/components/myPopup.vue'
	import {
		toRaw
	} from 'vue';
	export default {
		components: {
			visitCard,
			myPopup,
		},
		data() {
			return {
				badge: null,
				userInfo: {},
				isAttest: true,
			};
		},
		onLoad() {
			let isAttest = getApp().globalData.isAttest
			if (!isAttest) {
				uni.navigateTo({
					url: '../public/attestSearch/attestSearch'
				})
			}
			this.userInfo = uni.getStorageSync("userInfo")
			console.log(this.userInfo)
			if (this.userInfo === "" || this.userInfo === "undefined") {
				this.getUserInfo()
			}
		},
		methods: {
			getUserInfo() {
				let id = uni.getStorageSync("user")
				this.$api.getUserInfo(id).then((res) => {
					this.userInfo = res
					uni.setStorageSync('userInfo', res)
				})
			},
			getApplyList() {
				let query = {
					"self": false
				}
				this.$api.getApplyList(query).then((res) => {
					let list = res.filter((item) => item.msg_status === "未确认")
					this.badge = list.length
				})
			},
			gotoPage1(type) {
				if (type) {
					uni.navigateTo({
						url: '/pages/public/attestSearch/attestSearch'
					})
				} else {
					uni.switchTab({
						url: '/pages/firstPage/home'
					})
					this.isAttest = true
				}
			},
			gotoPage(type) {
				this.isAttest = getApp().globalData.isAttest
				console.log(this.isAttest)
				this.userInfo = uni.getStorageSync('userInfo')
				console.log(this.userInfo)
				let that = this
				if (this.isAttest) {
					if (type === 1) {
						uni.navigateTo({
							url: '../personal/appeal/appeal'
						})
					} else {
						console.log(that.userInfo)
						if (that.userInfo.role === "teacher") {
							uni.navigateTo({
								url: '../public/teacherFrom/teacherFrom?info=' + encodeURIComponent(JSON
									.stringify(
										uni.getStorageSync("userInfo")))
							})
						} else {
							uni.navigateTo({
								url: '../public/infoForm/infoForm?info=' + encodeURIComponent(JSON.stringify(
									uni.getStorageSync("userInfo")))

							})
						}
					}
				}
			},
			handleCopy() {
				const num = "0591-88886565"
				uni.showModal({
					content: num, //模板中提示的内容
					confirmText: '复制',
					confirmColor: '#0F77FF',
					cancelColor: '#818181',
					// showCancel: false,
					success: (res) => { //点击复制内容的后调函数
						if (res.confirm) {
							uni.setClipboardData({
								data: num, //要被复制的内容
								success: () => { //复制成功的回调函数
									this.$showMsg("复制成功")
								}
							})
						} else if (res.cancel) {
							// this.$showMsg("复制失败")
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.head {
		position: relative;
		height: 480rpx;

		.head_box {
			position: absolute;
			padding: 0 64rpx;
			top: 140rpx;
			width: 100%;
			box-sizing: border-box;
		}
	}

	.contain {
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;
		font-weight: bold;
		font-size: $uni-font-size-sc;
		color: #1A1A1A;

		.box1 {
			margin: 48rpx 0;
			display: flex;
			justify-content: space-between;

			.card_box {
				width: 210rpx;
				height: 224rpx;
				background: rgba(255, 255, 255, 0.39);
				box-shadow: 0rpx 6rpx 12rpx rgba(64, 144, 248, 0.15);
				border-radius: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.icon {
					position: absolute;
					top: 5rpx;
					right: 8rpx;
					font-weight: bold;

				}
			}
		}

		.box2 {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
		}
	}

	/* .uni-badge {
		height: 28rpx !important;
		line-height: 28rpx !important;
		padding: 0 8rpx !important;
		font-size: $uni-font-size-sx;
	} */

	/* 	.uni-popup .uni-popup__wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		border-radius: 16rpx;
		width: 80%;
		font-size: $uni-font-size-fr;
	}

	.content_top {
		padding: 80rpx 0;
		border-bottom: 1px solid #E5E5E5;
	}

	.content_btn {
		color: #0F77FF;
		padding: 32rpx 0;
	} */
</style>