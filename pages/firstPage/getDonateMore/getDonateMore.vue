<template>
	<view style="width:95%; padding: 10rpx 0;margin-left: 20rpx;">
		<searchInput @getValue='getValue' @clearInput="clearInput"></searchInput>
	</view>
	<view class="container">
		<view class="rank_box" v-for="(item,index) in list" :key="index">
			<view class="left_box" style="background:linear-gradient(180deg, #D22E2E 0%, #EF5C5C 100%);"
				v-if="index===0">
				{{index+1}}
			</view>
			<view class="left_box" style="background:linear-gradient(180deg, #F46529 0%, #FB8E60 100%);"
				v-if="index===1">
				{{index+1}}
			</view>
			<view class="left_box" style="background:linear-gradient(180deg, #EE9B1C 0%, #F4BA50 100%);"
				v-if="index===2">
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
		<view class="text_more" v-if="isMore">没有更多了</view>
	</view>

</template>

<script>
	import searchInput from '../../../components/searchInput.vue'
	export default {
		components: {
			searchInput
		},
		data() {
			return {
				list: [],
				query: {
					limit: 10,
					offset: 0
				},
				next: "",
				isMore: false,
				formData: {
					username: ''
				}
			};
		},
		created() {
			this.getList()
		},
		onReachBottom() {
			if (!this.formData.username && this.next) {
				this.query.offset = this.query.offset + this.query.limit
				this.getList()
			} else if (this.formData.username) {
				this.query.offset = this.query.offset + this.query.limit
				this.query.username = this.formData.username
				this.getList()
			} else {
				this.isMore = true
			}
		},
		methods: {
			getList() {
				this.$api.getDonaList(this.query).then((res) => {
					res.results.forEach((item) => {
						this.list.push(item)
					})
					this.next = res.next
				})
			},
			//搜索框
			getValue(value) {
				this.list = []
				this.formData.username = value
				this.$api.getDonaList(this.formData).then((res) => {
					res.results.forEach((item) => {
						this.list.push(item)
					})
					this.next = res.next
				})
			},
			clearInput() {
				this.list = []
				this.query.offset = 0
				this.getList()
			},
		}
	}
</script>

<style lang="scss">
	/* component/donationList/donationList.wxss */
	.container {
		width: 95%;
		margin: 0 20rpx;
	}

	.rank_box {
		display: flex;
		width: 100%;
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

	.text_more {
		color: #808080;
		text-align: center;
		margin: 30rpx;
	}
</style>