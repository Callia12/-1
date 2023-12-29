<template>
	<view>
		<view class="head">
			<visitCard :info="info" :isblack="true"></visitCard>
		</view>
		<view class="center">
			<view class="tle">
				<image src="../../../static/icon/icon_work.svg"></image>
				<text>工作信息</text>
			</view>
			<view class="text_null" v-if="info.work_experience ">暂无信息</view>
			<block v-for="(item,index) in info.work_experience" v-else :key="index">
				<view class="work_block">
					<text>{{item.company_name}}</text>
					<text class="text_college" style="margin: 12rpx 0;">{{item.department}}</text>
					<text class="text1">{{item.position}}</text>
				</view>
			</block>
		</view>
		<view class="btm_btnbg">
			<!-- <navigator url="../../public/infoForm/infoForm" v-if='ismy'>
				<button class="blue_btn">修改个人信息</button>
			</navigator> -->
			<button class="blue_btn" @click="handleAdd" v-if="!info.is_friend">点击申请查看他的联系方式</button>
			<button class="blue_btn" @click="handleCopy" v-else>复制电话号码</button>
		</view>
	</view>
</template>
info
<script>
	import visitCard from '../../../components/visitCard.vue'
	export default {
		components: {
			visitCard
		},
		data() {
			return {
				reFresh: "",
				ismy: "",
				info: {},
				applyDate: {
					msg_status: "no-op",
					recv_user: null, // 接收人
					// send_user: uni.getStorageSync('user'), // 申请人
				}
			}
		},
		watch: {
			//监听reFresh,如果有修改就执行监听器
			reFresh: function() {
				this.info = uni.getStorageSync("userInfo")
			}
		},
		onLoad(option) {
			this.getUserInfo(option.userId)
			/* this.info = uni.getStorageSync("userInfo")
			this.ismy = option.isMY */
		},
		methods: {
			getUserInfo(id) {
				this.$api.getUserInfo(id).then((res) => {
					this.info = res
				})
			},
			handleCopy() {
				uni.setClipboardData({
					data: this.info.phone_number,
					success: () => {
						this.$showMsg("复制成功")
					},
					fail: () => {
						this.$showMsg("他还没有填写电话号码")
					}
				})
			},
			handleAdd() {
				this.applyDate.recv_user = this.info.id
				this.$api.postApply(this.applyDate).then((res) => {
					this.$showMsg(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.head {
		background: #000B1A;
		padding: 64rpx 64rpx 48rpx;
	}

	.center {
		padding: 48rpx 64rpx;

		.tle {
			font-size: $uni-font-size-fr;
			display: flex;
			align-items: center;
			line-height: 45rpx;
			margin-bottom: 24rpx;
		}

		.tle image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 10rpx;
		}

		.work_block {
			display: flex;
			flex-direction: column;
			padding: 24rpx 0;
			border-bottom: 1px solid #E6E6E6;
			font-size: $uni-font-size-tr;
			color: #1A1A1A;
		}

		.text1 {
			color: $uni-font-colocr-bl;
			font-size: $uni-font-size-fo;
		}
	}
</style>