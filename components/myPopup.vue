<template>
	<view class="shade">
		<block v-if="!introduction">
			<view class="content_bg">
				<image src="@/static/img/popupBg.svg" class="img1"></image>
				<view class="text1">请先完成本人认证</view>
				<view class="btn" @click="gotoPage(1)">立即认证</view>
			</view>
			<image src="@/static/img/close.png" class="close" @click="gotoPage(0)"></image>
		</block>
		<view class="content_bg2" v-else>
			<view class="top">
				<text>内容详情</text>
				<uni-icons type="closeempty" color="#fff" size="26" @click="cancle"></uni-icons>
			</view>
			<view style="padding: 40rpx;">
				<view>
					{{introduction}}
				</view>
				<view class="btn blue_btn" @click="cancle">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myPopup",
		props: {
			introduction: String
		},
		data() {
			return {

			};
		},
		methods: {
			gotoPage(type) {
				this.$emit('gotoPage', type)
			},
			cancle() {
				this.$emit('cancle')
			}
		}
	}
</script>

<style lang="scss">
	.shade {
		flex-direction: column;
	}

	.content_bg2 {
		width: 582rpx;
		background: #FFFFFF;
		text-align: justify;
		font-size: $uni-font-size-sc;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			background: #4893F4;
			height: 100rpx;
			padding: 0 30rpx;
			font-size: $uni-font-size-fr;
		}

		.btn {
			background: #4893F4;
			box-shadow: none;
			margin-top: 40rpx;
			border-radius: 40rpx;
			width: auto;
		}
	}

	.close {
		margin-top: 60rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.content_bg {
		background: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		position: relative;
		// width: 85vw;
		width: 582rpx;
		padding-top: 150rpx;

		.img1 {
			position: absolute;
			top: -290rpx;
			left: 0;
			width: 80vw;
		}

		.text1 {
			font-size: 36rpx;
			line-height: 62rpx;
			margin-bottom: 10rpx;
			color: #3D3D3D;
		}

		.btn {
			line-height: 90rpx;
			color: #FFFFFF;
			font-size: $uni-font-size-fr;
			border-radius: 0 0 10rpx 10rpx;
			background: linear-gradient(180deg, rgba(250, 153, 54, 0.81) 0%, rgba(255, 128, 0, 0.84) 97%);
		}
	}
</style>