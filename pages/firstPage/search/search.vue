<template>
	<view>
		<view class="search_block" :style="{height: isSearch?'auto' :'60vh;'}">
			<searchInput placeholder="请输入需要搜索的关键词" @getValue="getInputValue"></searchInput>
		</view>
		<scroll-view scroll-y style="height: calc(100vh - 85rpx);" v-if="isSearch">
			<view class="text_null" v-if="isnull ">没有搜索到</view>
			<block v-else>
				<view style="margin: 0 32rpx;">
					<block v-for="(item,index) in user" :key="index">
						<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"></alumn>
					</block>
					<block v-for="(item,index) in active" :key="index">
						<view class="activite_block" @click="gotopage(item)">
							<view class="text1">{{item.title}}</view>
						</view>
					</block>
				</view>
				<block v-for="(item,index) in info" :key="index">
					<real-info :obj="item" @gotopage="gotopage(item)"></real-info>
				</block>
			</block>

		</scroll-view>
		<view class="search_btn" @click="handleSearch" v-if="!isSearch">搜索</view>
		<!-- <view class="loading"></view> -->
	</view>
</template>

<script>
	import alumn from '@/components/alumn.vue'
	import searchInput from '@/components/searchInput.vue'
	import realInfo from '@/components/realInfo.vue'
	export default {
		components: {
			searchInput,
			alumn,
			realInfo,
		},
		data() {
			return {
				isSearch: false,
				user: [],
				info: [],
				active: [],
				query: {
					name: ""
				},
				isnull: true,
			}
		},
		onLoad() {},
		methods: {
			getInputValue(value) {
				this.query.name = value
				if (value.length === 0) {
					this.isSearch = false
					this.user = []
					this.info = []
					this.active = []
				}
			},
			gotopage(item) {
				this.$api.getInformationDetail(item.id).then(res => {
					let realInfo = res
					uni.navigateTo({
						url: "/pages/firstPage/article/article?realInfo=" + encodeURIComponent(JSON
							.stringify(
								realInfo))
					})
				})
			},
			handleSearch() {
				this.$api.search(this.query).then((res) => {
					if (res.information.length != 0 || res.user.length != 0) {
						this.isnull = false
					} else {
						this.isnull = true
					}
					this.info = res.information.filter(item => item.category === '资讯')
					this.active = res.information.filter(item => item.category === '活动')
					this.user = res.user
					this.isSearch = true
				})
			},

			gotoDetail(id) {
				uni.navigateTo({
					url: '../../connections/alumnDetail/alumnDetail?userId=' + id
				})
			},
			gotoAppeal(value) {
				if (value.role === "teacher") {
					uni.navigateTo({
						url: '/pages/public/teacherFrom/teacherFrom?userId=' + value.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/public/infoForm/infoForm?userId=' + value.id
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	Page {
		background: #F7F7F7;
	}

	scroll-view {
		background-color: #fff;
	}

	.search_block {
		background-color: #fff;
		padding: 12rpx 32rpx 0;
	}

	.search_btn {
		position: absolute;
		right: 32rpx;
		bottom: 32rpx;
		padding: 20rpx 76rpx;
		background: linear-gradient(180deg, #006FFF 0%, rgba(15, 119, 255, 0.7) 100%);
		border-radius: 8rpx;
		color: #FFFFFF;
		font-size: $uni-font-size-tr;
	}

	.activite_block {
		// margin: 0 32rpx;
		color: #1A1A1A;
		box-sizing: border-box;
		// font-weight: bold;
		line-height: 100rpx;
		border-bottom: 1px solid #E6E6E6;

		.text1 {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>