<template>
	<view class="container">
		<template v-for="(item,index) in incollection" :key="index">
			<view class="chapter" @click="gotoCourseDetail(item)">
				<view>
					{{item.subject}}
				</view>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</view>
		</template>

		<template v-for="(item,index) in outcollection" :key="index" v-if="name===false">
			<view class="chapter" v-if="!item.in_campus" @click="gotoCourseDetail(item)">
				<view>
					{{item.subject}}
				</view>
				<uni-icons type="right" size="14" color="#000" class="icon"></uni-icons>
			</view>

		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				incollection: [],
				outcollection: [],
				name: ''
			}
		},

		onLoad() {
			this.name = getApp().globalData.myCollection
			this.$api.getCourseCollection(this.name).then(res => {
				if (this.name === true) {
					this.incollection = res.results
					this.$store.commit('setInCollection', this.incollection);

				} else if (this.name === false) {
					this.outcollection = res.results
					this.$store.commit('setOutCollection', this.outcollection);
				}
			})
		},
		methods: {
			gotoCourseDetail(item) {
				getApp().globalData.courseDetailItem = item;
				uni.navigateTo({
					url: '../courseDetail/courseDetail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 12rpx 32rpx;
	}

	.chapter {
		height: 112rpx;
		display: flex;
		font-size: 30rpx;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e9e9e9;
	}
</style>