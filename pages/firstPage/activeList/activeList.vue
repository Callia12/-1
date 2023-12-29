<template>
	<scroll-view scroll-y style="height: 100vh;" @scrolltolower="onScrollBtm">
		<view style="margin: 30rpx 32rpx;">
			<view class="text_null" v-if="activeList.length===0">暂无活动</view>
			<block v-for="(item,index) in activeList " :key="index" v-else>

				<view class="activite_block" @click="gotopage(item)">
					<view class="left_box" style="background:linear-gradient(180deg, #D22E2E 0%, #EF5C5C 100%);"
						v-if="index===0">{{index+1}}
					</view>
					<view class="left_box" style="background:linear-gradient(180deg, #F46529 0%, #FB8E60 100%);"
						v-if="index===1">{{index+1}}
					</view>
					<view class="left_box" style="background:linear-gradient(180deg, #EE9B1C 0%, #F4BA50 100%);"
						v-if="index===2">{{index+1}}
					</view>
					<view class="left_box" v-if="index>2">{{index+1}}</view>
					<view class="right_box">{{item.title}}</view>
				</view>
			</block>

		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				activeList: [],
				query: {
					limit: 15,
					offset: 0,
					category: "活动"
				},
				next: '',
			}
		},
		onLoad() {
			this.getActiveList()
		},
		methods: {
			onScrollBtm() {
				if (this.next) {
					this.query.offset = this.query.offset + this.query.limit
					this.getActiveList()
				}
			},
			getActiveList() {
				this.$api.getInformation(this.query).then((res) => {
					this.next = res.next
					let list = res.results
					list.forEach((item) => {
						this.activeList.push(item)
					})
				})
			},
			gotopage(realInfo) {
				uni.navigateTo({
					url: "/pages/firstPage/article/article?realInfo=" + encodeURIComponent(JSON.stringify(
						realInfo))
				})
			}
		}
	}
</script>

<style lang="scss">
	.activite_block {
		margin-top: 12rpx;
		background: rgba(255, 255, 255, 0.39);
		box-shadow: 0rpx 0rpx 12rpx rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		display: flex;
		align-items: center;
		color: #000000;
		font-size: $uni-font-size-fr;
	}

	.activite_block:hover {
		font-weight: bold;
	}

	.left_box {
		margin: 32rpx 24rpx 32rpx;
		width: 35rpx;
		line-height: 35rpx;
		text-align: center;
		background: #B3B3B3;
		border-radius: 2px;
		color: #fff;
		font-size: 25rpx;
	}

	.right_box {
		width: calc(100vw - 200rpx);
		overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
		white-space: nowrap; //（设置文字在一行显示，不能换行）
		text-overflow: ellipsis;
	}
</style>