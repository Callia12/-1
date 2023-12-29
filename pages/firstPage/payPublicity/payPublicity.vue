<template>
	<view class="list_block" v-for="(item,index) in payList " :key="index">
		<view class="top_block">
			<text class="text_money">{{item.money}}万元</text>
			<text class="text_time">{{item.time}}</text>
		</view>
		<view class="btm_block">{{item.content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payList: [{
						id: "1",
						money: "5.00",
						time: '2022年5月20日',
						content: "建设图书馆3.00万元，购买图书1.25万元，购买桌椅0 .75 万元， 总共花费5 .00 万元 "
					},
					{
						id: "2",
						money: "5.00",
						time: '2022年5月20日',
						content: "建设图书馆3.00万元，购买图书1.25万元，购买桌椅0 .75 万元， 总共花费5 .00 万元 "
					},
					{
						id: "3",
						money: "5.00",
						time: '2022年5月20日',
						content: "建设图书馆3.00万元，购买图书1.25万元，购买桌椅0 .75 万元， 总共花费5 .00 万元 "
					},
				]
			};
		}
	}
</script>

<style lang="scss">
	.list_block {
		display: flex;
		flex-direction: column;
		margin: 24rpx 32rpx;
		padding-bottom: 24rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.top_block {
		line-height: 48rpx;
		margin-bottom: 24rpx;
		padding-left: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		color: #1A1A1A;
	}

	.btm_block {
		min-height: 200rpx;
		padding: 24rpx;
		background: #F7F7F7;
		border-radius: 8rpx;
	}

	.text_money {
		font-size: $uni-font-size-fr;
		font-weight: bold;
		color: #0F77FF;
	}

	.text_time {
		font-size: $uni-font-size-tr;
	}
</style>
