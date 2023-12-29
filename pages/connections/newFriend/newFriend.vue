<template>
	<view class="list_block" v-for="(item,index) in applylist" :key="index" v-if="applylist.length!==0">
		<view class="box1" @click="gotoDetail(item.id)">
			<image :src="this.$url+item.avatar" class="circle" v-if="item.color==='grey'"></image>
			<image :src="this.$url+item.avatar" class="circle" v-else
				:style="[{border:(item.color==='orange'?'4rpx solid #FF8000':'4rpx solid #FDF8D5')}]"></image>
			<image src="@/static/icon/nan.svg" class="sex_icon" v-if="item.sex==='男'"></image>
			<image src="@/static/icon/nv.svg" class="sex_icon" v-if="item.sex==='女'"></image>
		</view>
		<view class="box2">
			<view>
				<view class="box2_top">
					<text class="text_name">{{item.username}}</text>
					<view class="year_orange" v-if="item.graduation_year">{{item.graduation_year}}届</view>
					<view class="year_orange" style="color:#0F77FF; background-color:#e4effe;" v-if="item.great_alumni">
						杰出校友</view>
				</view>
				<view class="text_college" v-if="item.role!=='teacher'"><text
						class="rg">{{item.faculty}}</text>{{item.subject}}</view>
			</view>

			<view style="display: flex;font-size: 30rpx;">
				<block v-if="item.msg_status==='未确认'">
					<button class="gray_btn" @click="clickBtn(item,index,'ignored')">忽略</button>
					<button class="blue_btn" @click="clickBtn(item,index,'consented')">同意</button>
				</block>
				<text v-else-if="item.msg_status==='已同意'">已同意</text>
				<text v-else-if="item.msg_status==='已忽略'">已忽略</text>
				<text v-else>{{item.msg_status}}</text>
			</view>
		</view>
	</view>
	<view class="text_null" v-else>暂无记录</view>
</template>

<script>
	export default {
		data() {
			return {
				applylist: []
			}
		},
		onLoad() {
			this.getList(true)
		},
		methods: {
			getList(is) {
				let query = {
					self: is
				}
				this.$api.getApplyList(query).then(res => {
					this.applylist = res
				})
			},
			clickBtn(item, index, status) {
				let query = {
					msg_status: status,
					send_user: item.send_user,
					msg_id: item.id
				}
				this.$api.postApply(query).then((res) => {
					this.$set(this.applylist[index], "msg_status", status === "ignored" ? "已忽略" : "已同意")
				})
			},

			gotoDetail(id) {
				uni.navigateTo({
					url: '../../connections/alumnDetail/alumnDetail?userId=' + id
				})
			},
		},
	}
</script>

<style lang="scss">
	.list_block {
		display: flex;
		padding: 24rpx 20rpx;

	}

	.box1 {
		position: relative;
		padding: 0 24rpx 24rpx 0;

		.circle {
			width: 90rpx;
			height: 90rpx;
			border-radius: 45px;
		}

		.sex_icon {
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			bottom: 30rpx;
			right: 15rpx;
		}
	}

	.box2 {
		padding-bottom: 22rpx;
		width: 100%;
		// border-bottom: 1px solid #E6E6E6;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.box2_top {
			display: flex;
			align-items: center;
		}

		.right_two_box {
			font-size: $uni-font-size-fo;
			color: #808080;
		}
	}

	.year_bg {
		background: #F7F7F7;
		color: #808080;
	}

	.text_name1 {
		color: #808080;
	}
</style>