<template>
	<view class="contain">
		<view class="tle">
			{{realInfo.title}}
		</view>
		<view class="text_time">{{realInfo.author}} {{realInfo.create_time}}</view>
		<view class="content">
			<!-- 渲染富文本内容 -->
			<div v-html="processedContent"></div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realInfo: {},
				parsedContent: '' // 解析后的富文本内容
			};
		},
		onLoad(options) {
			if (options.realInfo) {
				this.realInfo = JSON.parse(decodeURIComponent(options.realInfo));
				this.parsedContent = this.realInfo.content
			}
		},
		computed: {
			processedContent() {
				let processedText = this.parsedContent;
				// 使用正则表达式匹配 img 标签
				const imgRegex = /<img\b[^>]*>/g;
				const imgTags = this.parsedContent.match(imgRegex);
				// 遍历匹配到的 img 标签
				if (imgTags) {
					imgTags.forEach(imgTag => {
						// 修改 img 标签的样式
						const newImgTag = imgTag.replace(
							/<img\b([^>]*)style="[^"]*"[^>]*>/,
							'<img$1 style="max-width: 300px; max-height: 200px;">'
						);
						// 替换原始的 img 标签
						processedText = processedText.replace(imgTag, newImgTag);
					});
				}
				return processedText;
			},
		},

	}
</script>

<style lang="scss">
	.contain {
		padding: 12rpx 32rpx;
	}

	img {
		max-width: 100rpx;
		max-height: 100rpx;
	}

	.tle {
		font-weight: bold;
		line-height: 52rpx;
		color: #1A1A1A;
		font-size: 44rpx;
		margin-bottom: 10rpx;
	}

	.content {
		margin-top: 20rpx;
		line-height: 52rpx;
		color: #333333;
		font-size: 34rpx;
	}
</style>