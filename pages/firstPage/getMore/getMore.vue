<template>
	<view style="width:95%; padding: 10rpx 0;margin-left: 20rpx;">
		<searchInput @getValue='getValue' @clearInput="clearInput"></searchInput>
	</view>

	<view class="list_block" v-for="(item,index) in list" :key="index">
		<image :src="this.$url+item.avatar" class="img_right"></image>
		<view style="width: 100%;margin-top: 5rpx;">
			<view style="display: flex;align-items: center;">
				<text class="text_name">{{item.username}}</text>
				<view class="year_orange">{{item.graduation_year}}届</view>
			</view>
			<view class="text_college">{{item.faculty}} {{item.subject}}</view>
			<view class="out-content">{{item.introduction}}...
				<view v-if="item.show" style="display: inline;">
					<text class="open-btn" @click="handleDetail(item.introduction1)">查看详情</text>
				</view>
			</view>
		</view>
	</view>
	<view class="text_more" v-if="isMore">没有更多了</view>
	<my-popup @cancle="cancle" v-if="isShow" :introduction="introduction"></my-popup>
</template>

<script>
	import searchInput from '../../../components/searchInput.vue'
	import myPopup from "../../../components/myPopup.vue"
	export default {
		components: {
			myPopup,
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
				isShow: false,
				introduction: '',
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
				this.$api.getOutList(this.query).then((res) => {
					console.log(res)
					res.results.forEach((item) => {
						if (item.introduction.length > 17) {
							item.introduction1 = item.introduction
							item.introduction = item.introduction.slice(0, 17)
							item.show = true
						}
						this.list.push(item)
					})
					this.next = res.next
				})
			},

			handleDetail(introduction) {
				this.introduction = introduction
				this.isShow = true
			},
			cancle() {
				this.isShow = false
			},
			//搜索框
			getValue(value) {
				this.list = []
				this.formData.username = value
				this.$api.getOutList(this.formData).then((res) => {
					res.results.forEach((item) => {
						if (item.introduction.length > 17) {
							item.introduction1 = item.introduction
							item.introduction = item.introduction.slice(0, 17)
							item.show = true
						}
						this.list.push(item)
					})
					this.next = res.next
				})
			},
			clearInput() {
				this.list = []
				this.query.offset = 0
				this.getList()
			}

		},
	}
</script>

<style lang="scss">
	.list_block {
		width: 100%;
		display: flex;
		padding: 10rpx 0;
		margin-left: 20rpx;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
	}

	.img_right {
		width: 120rpx;
		height: 120rpx;
		background: rgba(0, 0, 0, 0.39);
		margin-right: 20rpx;
	}

	.out-content {
		font-size: 24rpx;
		height: 60rpx;
		width: calc(100vw - 180rpx);
		overflow: hidden;
		position: relative;
		text-align: justify;

	}


	.open-btn {
		display: inline;
		cursor: pointer;
		color: #0F77FF;
	}

	.text_more {
		color: #808080;
		text-align: center;
		margin: 30rpx;
	}
</style>