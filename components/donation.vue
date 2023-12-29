<template>
	<view class="rank_box" v-for="(item,index) in list" :key="index">
		<view class="left_box" style="background:linear-gradient(180deg, #D22E2E 0%, #EF5C5C 100%);" v-if="index===0">
			{{index+1}}
		</view>
		<view class="left_box" style="background:linear-gradient(180deg, #F46529 0%, #FB8E60 100%);" v-if="index===1">
			{{index+1}}
		</view>
		<view class="left_box" style="background:linear-gradient(180deg, #EE9B1C 0%, #F4BA50 100%);" v-if="index===2">
			{{index+1}}
		</view>
		<view class="left_box" v-if="index>2">{{index+1}}</view>
		<view class="right_box">
			<view style="display: flex;align-items: center;">
				<text class="text_name">{{item.username}}</text>
				<view class="year_orange">{{item.graduation_year}}届</view>
			</view>
			<view class="text_college">{{item.faculty}} {{item.subject}}</view>
			<view class="btm_block">
				<text class="text_money">{{item.amount}}</text>
				<text class="text_time">{{this.$formattedDate2(item.create_time)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "donation",
		data() {
			return {
				list: [],
				query: {
					limit: 3,
					offset: 0
				},
				next: ""
			};
		},
		created() {
			// this.getList()
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
				this.$api.getDonaList(this.query).then((res) => {
					res.results.forEach((item) => {
						this.list.push(item)
					})
					this.next = res.next
				})
			}
		}
	}
</script>

<style lang="scss">
	/* component/donationList/donationList.wxss */
	.rank_box {
		display: flex;
		padding: 24rpx 0;
		border-bottom: 1px solid #E6E6E6;
	}

	.left_box {
		margin-top: 5rpx;
		margin-right: 20rpx;
		width: 35rpx;
		height: 35rpx;
		line-height: 35rpx;
		text-align: center;
		background: #B3B3B3;
		border-radius: 2px;
		color: #fff;
		font-size: 25rpx;
		display: inline-block;
	}

	.right_box {
		width: 100%;
	}


	.btm_block {
		margin-top: 16rpx;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: baseline;
	}

	.text_money {
		font-size: $uni-font-size-fr;
		font-weight: bold;
		color: #0F77FF;
	}
</style>