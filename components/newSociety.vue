<template>
	<view class="list_block" v-for="(item,index) in realInfo" :key="index" @click="gotoActiveList(item)">
		<view class="img_right">
			<image :src="this.$url+item.preview_image"></image>
		</view>
		<view class="new_content">
			<view class="new_title">
				<span>{{truncateTitle(item.title)}}</span>
			</view>
			<view class="new_text">
				<view class="btm_block">
					<view>
						<text class="care_block" v-if="item.refinement === 'true'">精选</text>
						<text class="text_namer">{{truncateAuthor(item.author)}}</text>
					</view>
					<view class="text_time">{{this.$formattedDate(item.update_time)}}</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			realInfo: {
				type: Object,
				default: '',
			},
		},
		methods: {
			//跳转到文章详情
			gotoActiveList(realInfo) {
				// console.log(realInfo)
				uni.navigateTo({
					url: "/pages/firstPage/article/article?realInfo=" + encodeURIComponent(JSON.stringify(
						realInfo))
				})
			},
			truncateTitle(title) {
				const maxLength = 30; // 最大字符数
				const ellipsis = '...'; // 省略号

				if (title.length > maxLength) {
					return title.slice(0, maxLength) + ellipsis;
				} else {
					return title;
				}
			},
			truncateAuthor(author) {
				const maxLength = 10; // 最大字符数
				const ellipsis = '...'; // 省略号

				if (author.length > maxLength) {
					return author.slice(0, maxLength) + ellipsis;
				} else {
					return author;
				}
			}
		}
	};
</script>

<style lang="scss">
	.list_block {
		width: 100%;
		height: 140rpx;
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #E6E6E6;

		.img_right {
			width: 300rpx;
			height: 140rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				object-fit: contain;
				/* 图片按照原始尺寸完整显示在盒子中 */
			}
		}

		.new_content {
			width: 100%;
			margin-left: 15rpx;

			.new_title {
				font-size: 11px;
			}
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

		.actile_time {
			font-size: 12px;
			color: #808080;
		}



	}
</style>