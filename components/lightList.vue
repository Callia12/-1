<template>
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
</template>

<script>
	export default {
		data() {
			return {
				rankList1: [],
				next: '',
				query: {
					limit: 3,
					offset: 0
				},

			}
		},
		created() {
			this.getRanking()
		},
		methods: {
			getRanking() {
				this.$api.getRanking(this.query).then(res => {
					this.rankList1 = res.results
					this.next = res.next
				})
			},
			getMore() {
				if (this.next) {
					this.query.offset = this.query.offset + this.query.limit
					this.getRanking()
				} else {
					this.$emit('getVal', false)
				}
			},


		}
	}
</script>

<style lang="scss">
	.light_body {
		width: 100%;

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
</style>