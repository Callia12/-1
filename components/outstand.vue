<template>
	<view class="list_block" v-for="(item,index) in list" :key="index">
		<image :src="this.$url+item.avatar" class="img_right"></image>
		<view style="width: 100%;">
			<view style="display: flex;align-items: center;">
				<text class="text_name">{{item.username}}</text>
				<view class="year_orange">{{item.graduation_year}}届</view>
			</view>
			<view class="text_college">{{item.faculty}} {{item.subject}}</view>

			<view class="out-content">{{item.introduction}}...
				<view v-if="item.show" style="display: inline;">
					<text class="open-btn" @click="handleDetail(item)">查看详情</text>
				</view>
			</view>
			<!-- <view style="text-align: right;"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "outstand",
		data() {
			return {
				list: [],
				query: {
					limit: 3,
					offset: 0
				},
				next: "",
			};
		},
		methods: {
			getMore() {
				if (this.next) {
					this.query.offset = this.query.offset + this.query.limit
					this.getList()
				} else {
					this.$emit('getVal', false)
				}
			},
			getList() {
				this.$api.getOutList(this.query).then((res) => {
					res.results.forEach((item) => {
						if (item.introduction.length > 17) {
							item.introduction1 = item.introduction
							item.introduction = item.introduction.slice(0, 17)
							item.show = true
						}
						this.list.push(item)
					})
					this.next = res.next
				})
			},
			handleDetail(item) {
				this.$emit('handleDetail', item.introduction1)
			}
		}
	}
</script>

<style lang="scss">
	.list_block {
		height: 120rpx;
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #E6E6E6;
	}

	.img_right {
		width: 120rpx;
		height: 120rpx;
		background: rgba(0, 0, 0, 0.39);
		margin-right: 20rpx;
	}

	.out-content {
		font-size: 24rpx;
		height: 60rpx;
		width: calc(100vw - 180rpx);
		overflow: hidden;
		// line-height: 30rpx;
		position: relative;
		text-align: justify;
		/* display: -webkit-box;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		min-height: 120rpx; */

	}

	/* .content::after {
		content: "…查看详情";
		color: #007aff;
		cursor: pointer;
		position: absolute;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
	} */

	.open-btn {
		display: inline;
		cursor: pointer;
		color: #0F77FF;
	}
</style>