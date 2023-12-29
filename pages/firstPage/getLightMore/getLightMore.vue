<template>
	<view style="width:95%; padding: 10rpx 0;margin-left: 20rpx;">
		<searchInput @getValue='getValue' @clearInput="clearInput"></searchInput>
	</view>
	<view class="light_body">
		<view class="light_list" v-for="(item,index) in rankList1" :key="index">
			<view class="list_left">
				<text style="color: #808080 ;width: 20%;">{{index+1}}</text>
				<view style="width: 30%;">
					<image :src="this.$url+item.avatar"></image>
				</view>
				<text style="color:#333333;width: 50%;">{{item.username}}</text>
			</view>

			<text>{{item.help_count}}</text>
		</view>
	</view>
	<view class="text_more" v-if="isMore">没有更多了</view>
</template>

<script>
	import searchInput from '../../../components/searchInput.vue'
	export default {
		components: {
			searchInput
		},
		data() {
			return {
				rankList1: [],
				next: '',
				query: {
					limit: 10,
					offset: 0
				},
				isMore: false,
				searchName: '',

			}
		},
		created() {
			this.getRanking()
		},
		onReachBottom() {
			if (!this.searchName && this.next) {
				this.query.offset = this.query.offset + this.query.limit
				this.getRanking()
			} else if (this.searchName) {
				this.query.offset = this.query.offset + this.query.limit
				this.query.username = this.searchName
				this.getRanking()
			} else {
				this.isMore = true
			}
		},
		methods: {
			getRanking() {
				this.$api.getRanking(this.query).then(res => {
					console.log(res)
					this.rankList1 = res.results
					this.next = res.next
				})
			},
			getValue(name) {
				this.searchName = name
				this.$api.getSearchRanking(this.searchName).then(res => {
					this.rankList1 = res.results
					this.next = res.next
				})

			},
			clearInput() {
				this.rankList1 = []
				this.query.offset = 0
				this.getRanking()
			}
		}
	}
</script>

<style lang="scss">
	.light_body {
		width: 92%;
		margin: 0 20rpx;

		.light_list {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;

			.list_left {
				width: 40%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-around;
			}
		}

		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 6px;
		}
	}

	.text_more {
		color: #808080;
		text-align: center;
		margin: 30rpx;
	}
</style>