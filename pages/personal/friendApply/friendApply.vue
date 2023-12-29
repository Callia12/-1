<template>
	<view class="contain">
		<view class="list_tle_block">
			<uni-badge :text="badge" absolute="rightTop" :offset="[0, 0]" class="badge">
				<view class="tle_block" hover-class="tle_clicked" @click='handleclick'>
					<text :class="[ismy?'tle_clicked':'']">校友申请</text>
					<view class="tle_line" v-if="ismy"></view>
				</view>
			</uni-badge>
			<view class="tle_block" hover-class="tle_clicked" @click="handleclick">
				<text :class="[ismy?'':'tle_clicked']">我的申请</text>
				<view class="tle_line" v-if="!ismy"></view>
			</view>
		</view>
		<scroll-view style="width: 100%;">
			<view class="text_null" v-if="applylist.length===0">暂无记录</view>
			<block v-for="(item,index) in applylist" :key="index">
				<alumn :obj="item" :isApply="true" @gotoDetail="gotoDetail">
					<template slot="right">
						<view style="display: flex;">
							<block v-if="ismy&&(item.msg_status==='未确认')">
								<button class="gray_btn" @click="clickBtn(item,index,'ignored')">忽略</button>
								<button class="blue_btn" @click="clickBtn(item,index,'consented')">同意</button>
							</block>
							<text v-else-if="!ismy&&(item.msg_status==='未确认')">等待确认</text>
							<text v-else-if="!ismy&&(item.msg_status==='已忽略')">已忽略</text>
							<text v-else>{{item.msg_status}}</text>
						</view>
					</template>
				</alumn>
			</block>
		</scroll-view>
	</view>

</template>

<script>
	import alumn from "../../../components/alumn.vue"
	export default {
		components: {
			alumn
		},
		data() {
			return {
				badge: "",
				ismy: true,
				applylist: []
			};
		},
		onLoad() {
			this.getList(true)
		},
		methods: {
			getList(is) {
				let query = {
					self: is
				}
				this.$api.getApplyList(query).then((res) => {
					this.applylist = res
					if (is) {
						let list = res.filter((item) => item.msg_status === "未确认")
						this.badge = list.length
					}
				})
			},
			handleclick() {
				this.applylist = []
				this.ismy = !this.ismy
				this.getList(this.ismy)
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
		}
	}
</script>

<style lang="scss">
	.contain {
		margin: 0 32rpx;
	}

	.badge {
		margin-right: 30rpx;
	}

	.list_tle_block {
		// margin-top: 24rpx;

		.tle_block {
			margin-right: 10rpx;
			min-width: 90rpx !important;
		}
	}

	.blue_btn {
		padding: 8rpx 15rpx;
		font-size: 24rpx;
		width: auto;
		margin-left: 20rpx;
		box-shadow: none;
	}
</style>