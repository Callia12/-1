<template>
	<view class="container">
		<video class="con_video" :src="this.$url+videoDetailItem.path" controls autoplay></video>
		<view class="con_title">
			{{videoDetailItem.title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoDetailItem: ''
			}
		},
		onLoad() {
			this.videoDetailItem = getApp().globalData.videoDetailItem
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		padding: 12rpx 32rpx;

		.con_video {
			width: 686rpx;
			height: 372rpx;
		}

		.con_title {
			height: 48rpx;
			font-size: 34rpx;
			padding-top: 30rpx;
		}
	}
</style>