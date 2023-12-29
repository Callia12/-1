<template>
	<view class="contain">
		<view v-if="alumnList.length==0" class="text1" style="width: 100%;text-align: center;">查无此人</view>
		<block v-for="(item,index) in alumnList" :key="index" v-else>
			<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"> </alumn>
			<!-- <template slot="right">
					<view style="display: flex;align-items: center;">
						<block v-if="item.color=='orange'">
							<image src="@/static/icon/lampO.svg" class="right_icon"></image>
						</block>
						<block v-else>
							帮TA点亮
							<image src="@/static/icon/lampG.svg" class="right_icon" v-if="item.color=='grey'"></image>
							<image src="@/static/icon/lampY.svg" class="right_icon" v-if="item.color=='yellow'"></image>
						</block>
					</view>
				</template> -->
		</block>
		<block v-if="isAttest">
			<view class="text1">你可能认识的人</view>
			<view class="grid">
				<block v-for="(item,index) in acqList" :key="index">
					<view class="grid-item" v-if="item.color==='grey'">{{item.username}}</view>
					<view class="grid-item" v-else
						:style="[{background:(item.color==='orange'?'4rpx solid #FF8000':'4rpx solid #FDF8D5')}]">
						{{item.username}}
					</view>
				</block>
			</view>
			<view class="btm_block">
				<view class="btn_more" @click="getMore">
					查看更多<uni-icons type="right" size="14" color="#000"></uni-icons>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import alumn from '@/components/alumn.vue'
	export default {
		components: {
			alumn
		},
		data() {
			return {
				reFresh: '',
				alumnList: [],
				query: {},
				query2: {
					page: 0,
					per_page: 16,
					subject: ''
				},
				isAttest: "",
				acqList: []
			};
		},
		watch: {
			reFresh: function() {
				this.getAlumnList()
			}
		},
		onLoad(option) {
			this.isAttest = getApp().globalData.isAttest
			if (this.isAttest) {
				this.getAcquaintance()
			}
			this.query = JSON.parse(decodeURIComponent(option.query));
			this.getAlumnList()
		},
		methods: {
			getAlumnList() {
				let query = this.$removeUndefinedProperties(this.query)
				this.$api.getAlumnList(query).then((res) => {
					this.alumnList = res.results
				})
			},
			getAcquaintance() {
				this.query2.subject = uni.getStorageSync("userInfo").subject
				this.$api.getAcquaintance(this.query2).then((res) => {
					res.forEach((item) => {
						this.acqList.push(item)
					})
				})
			},
			getMore() {
				if (this.acqList.length >= this.query2.per_page) {
					this.query2.page = this.query2.page + this.query2.per_page
					this.getAcquaintance()
				}
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: '../../connections/alumnDetail/alumnDetail?userId=' + id
				})
			},
			gotoAppeal(value) {
				if (value.role === "teacher") {
					uni.navigateTo({
						url: '../teacherFrom/teacherFrom?userId=' + value.id
					})
				} else {
					uni.navigateTo({
						url: '../infoForm/infoForm?userId=' + value.id
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.grid {
		margin-left: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 20rpx;
	}

	.grid-item {
		flex: 0 0 calc(25% - 10px);
		display: inline-block;
		text-align: center;
		// width: 150rpx;
		line-height: 48rpx;
		background: #EFEFEF;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
	}

	.contain {
		padding: 12rpx 32rpx;

		.text1 {
			font-size: $uni-font-size-sc;
			line-height: 42rpx;
			color: #1A1A1A;
			font-weight: bold;
			margin: 34rpx 0 28rpx 0;
		}

		.btn_more {
			border: 0;
			width: 510rpx;
			line-height: 80rpx;
			background: #EFEFEF;
			box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 1868rpx 1868rpx 1868rpx 1868rpx;
			text-align: center;
			color: #4D4D4D;
			font-weight: bold;
		}

		.btm_block {
			margin-top: 50rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>