<template>
	<view class="shade" v-if="isShow">
		<view class="content_bg">
			<uni-icons type="closeempty" size="30" color="#B3B3B3" class="icon" @click="changeShow(false)"></uni-icons>
			<text class="tle">验证手机号</text>
			<text class="text1">验证码已发送至18529805645</text>
			<view class="content">
				<input placeholder="请输入验证码" v-model="verify_code" :adjust-position="false" />
				<text class="text1">58s后重新发送</text>
			</view>
			<view style="display: flex;justify-content: center;">
				<button class="blue_btn btn" @click="handlePostInfo">完成</button>
			</view>
			<view class="text2">收不到验证码？</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "verifyPOP",
		data() {
			return {
				isShow: false,
				verify_code: ''
			};
		},
		methods: {
			handlePostInfo() {
				this.$emit('post', this.verify_code)
			},
			changeShow(bol) {
				this.isShow = bol
			},
		}
	}
</script>

<style lang="scss">
	.shade {
		.content_bg {
			width: 634rpx;
			max-width: 90vw;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 76rpx 46rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			position: relative;


			.icon {
				top: 20rpx;
				right: 20rpx;
				position: absolute;
			}

			.tle {
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
				margin-bottom: 20rpx;
			}

			.text1 {
				font-size: $uni-font-size-fo;
				color: #D8D8D8;
			}

			.content {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				margin-top: 35rpx;
				padding: 15rpx 0;
				border-bottom: 2rpx solid #858585;
				;
			}

			.btn {
				background: #4893F4;
				box-shadow: none;
				margin: 40rpx 0;
				border-radius: 40rpx;
			}

			.text2 {
				font-size: $uni-font-size-fo;
				text-align: right;
				color: #4893F4;
			}
		}
	}
</style>