<template>
	<block v-for="(item,index) in msg" :key="index">
		<view class="record" v-if="msg">
			<text>{{item.help}}</text>于<text
				style="font-size: 24rpx;">{{item.date}}</text>帮助<text>{{item.be_helped}}</text>点亮
		</view>
	</block>
</template>

<script>
	export default {
		name: "authMag",
		props: {
			type: Number,
			default: 0
		},
		data() {
			return {
				msg: []
			};
		},
		watch: {
			ids(val) {
				this.getAuthMsg(val)
			}
		},
		methods: {
			getAuthMsg(val) {
				this.$api.getAuthMsg(val).then((res) => {
					this.msg = res.res
				})
			},
		}
	}
</script>

<style lang="scss">
	.record {
		color: #333333;
		font-size: $uni-font-size-fo;
		text-align: center;
		margin: 20rpx 0;

		text {
			color: #0F77FF;
			font-size: $uni-font-size-sc;
		}
	}
</style>