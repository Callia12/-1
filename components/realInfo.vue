<template>
	<view class="list_block" @click="gotopage">
		<view class="left_box">
			<image :src="this.$url+obj.preview_image" class="img_block"></image>
		</view>
		<view class="right_box">
			<view class="content">{{obj.title}}</view>
			<view class="btm_block">
				<view>
					<text class="care_block" v-if="obj.refinement === 'true'">精选</text>
					<text class="text_namer">{{obj.author}}</text>
				</view>
				<view class="text_time">{{this.$formattedDate(obj.update_time)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $store from '@/store/index.js'
	export default {
		name: "realInfo",
		props: {
			obj: Object
		},
		data() {
			return {

			};
		},
		methods: {
			gotopage() {
				this.$store.commit('setRealIndo', this.obj)
				this.$emit('gotopage')
			}
		}
	}
</script>

<style lang="scss">
	.list_block {
		display: flex;
		margin: 32rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #E6E6E6;
		// background-color: red;

		.left_box {
			margin-right: 24rpx;

			.img_block {
				width: 228rpx;
				height: 150rpx;
				// background: rgba(0, 0, 0, 0.3);
				border-radius: 4px;
			}
		}

		.right_box {
			width: 100%;
		}

		.content {
			color: #1A1A1A;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			line-height: 50rpx;
			font-size: $uni-font-size-fr;
		}

		.btm_block {
			margin-top: 15rpx;
			color: #808080;
			font-size: $uni-font-size-fo;
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.text_namer {
			margin-left: 10rpx;
			vertical-align: middle;
		}
	}
</style>