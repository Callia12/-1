<template>
	<view class="page-hd" :style="{height:headBGHeight+'px'}">
		<image src="../../static/img/bg-s.png" class="head-bg" :style="{opacity: opacity,height: headBGHeight+'px'}">
		</image>
		<view class="hd-text"
			:style="[{'opacity':opacity},{'top': statusBarHeight+'px'},{'height': naviBarHeight+'px'},{'line-height': naviBarHeight+'px'}]">
			<text style="color: #fff;">校友通讯录 </text>
		</view>
		<view class="hd-text"
			:style="[{'opacity':1-opacity},{'top': statusBarHeight+'px'},{'height': naviBarHeight+'px'},{'line-height': naviBarHeight+'px'}]">
			<text style="color: #000;">校友通讯录 </text>
		</view>
	</view>
	<view class="page-bd">
		<!-- 	<scroll-view :scroll-y="!isFixed" :style="{height:bodyHeight+'px'}" @scroll="fnScrollEvent"
			@scrolltoupper="fnScrollToupper" @scrolltolower="fnScrollBtm" :lower-threshold="targetTop"> -->
		<view class="contain" :style="[{height:bodyHeight+'px'},{top:headBGHeight+'px'}]">
			<image src="@/static/img/bg-x.png" class="headx-bg"></image>
			<view class="container">
				<view class="search_block" @click="goToSearchPage">
					<icon type="search" style="vertical-align: middle;height: 24rpx;" color="#D3E5FE" size="24rpx">
					</icon>
					校友捐款排行榜
				</view>
				<view class="article_block">
					<view class="uni-margin-wrap">
						<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
							:interval="interval" :duration="duration">
							<swiper-item style="width: 100%;height: 100%;" v-for="(item,index) in getFirstFiveItems"
								:key="index" @click="gotoActiveList(item)">
								<image :src="this.$url+item.preview_image"></image>
								<view class="article">
									<view
										style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
										<view style="display: flex; align-items: center;">
											<text class="care_block" v-if="item.refinement === 'true'">精选</text>
										</view>
										<view class="more" @click.stop="gotoRealInfoList">更多
											<image src="../../static/icon/icon_gengd.svg"></image>
										</view>
									</view>
									<view>
										<view class="actile_tle">{{item.title}}</view>
										<text
											class="actile_time">{{item.author}}&nbsp;&nbsp;{{this.$formattedDate(item.create_time)}}</text>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<navigator url="activeList/activeList">
					<view class="active_block" v-for="(item,index) in getActity" :key="index">
						<view style="display: flex;align-items: center;">
							<image src="../../static/img/icon_active.svg" style="width:60rpx;height: 24rpx;"></image>
							<view class="text1">&nbsp;&nbsp;·&nbsp;&nbsp;{{item.title}}</view>
						</view>
						<uni-icons type="right" color="#4D4D4D" size="14" style="font-weight: bold;"></uni-icons>
					</view>
				</navigator>
				<view class="ability_block">
					<view class="aimg_bg" @click="goToPayPage(0)">
						<image src="../../static/img/icon_zhicgs.png" style="margin-right: 25rpx;"></image>
						<view class="aimg_box" style="color: #685020;">
							<text>支出公示</text>
							<view class="aimg_text">查看校友捐款支出明细</view>
						</view>
					</view>
					<view class="aimg_bg" @click="goToPayPage(1)">
						<image src="../../static/img/icon_bangtdl.png"></image>
						<view class="aimg_box">
							<text>帮TA点亮</text>
							<view class="aimg_text">点击帮ta点亮灯牌吧</view>
						</view>
					</view>
				</view>
				<view class="list_tle_block" id="bar" :style="[isFixed?{position:'fixed',top:headBGHeight+'px'}:'']">
					<view class="tle_block" hover-class="tle_clicked" @click="handleTab(true)">
						<text :class="{ tle_clicked: isOutstand }">杰出校友榜</text>
						<view class="tle_line" v-if="isOutstand"></view>
					</view>
					<view class="tle_block" hover-class="tle_clicked" @click="handleTab(false,true)">
						<text :class="{ tle_clicked: !isOutstand && isDonate }">校友捐赠榜</text>
						<view class="tle_line" v-if="!isOutstand && isDonate"></view>
					</view>
					<view class="tle_block" hover-class="tle_clicked" @click="handleTab(false,false)">
						<text :class="{ tle_clicked: !isOutstand && !isDonate }">点亮榜</text>
						<view class="tle_line" v-if="!isOutstand && !isDonate"></view>
					</view>
				</view>
				<outstand v-show="isOutstand" @handleDetail="handleDetail" ref="out" @getVal="getVal"></outstand>
				<donation v-show="!isOutstand && isDonate" ref="dona" @getVal="getVal"></donation>
				<lightList v-show="!isOutstand && !isDonate" ref="lightListRef" @getVal="getVal"></lightList>
				<view class="text_more" @click="handleSeeMore" v-if="ismore">查看更多</view>
				<view class="text_more" style="color: #808080;" v-else>没有更多了</view>
				<newSociety :realInfo='realInfo'
					v-show="isOutstand || (!isOutstand && isDonate) || (!isOutstand && !isDonate)"></newSociety>
				<!-- <scroll-view :style="[isFixed?{height:bodyHeight -20+'px'}:'']" @scrolltoupper="fnScrollTop">
				<view class="interval">
				</view>
				</scroll-view> -->
			</view>
		</view>
		<!-- </scroll-view> -->
	</view>
	<my-popup @cancle="cancle" v-if="isShow" :introduction="introduction"></my-popup>
	<my-popup @gotoPage="gotoPage" v-if="!isAttest"></my-popup>
</template>

<script>
	/* const screen_width = 750
	let rate = uni.getSystemInfoSync().screenHeight / uni.getSystemInfoSync().screenWidth */
	const windowHeight = uni.getSystemInfoSync().windowHeight
	const menu = uni.getMenuButtonBoundingClientRect()
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import newSociety from '../../components/newSociety.vue'
	import outstand from '../../components/outstand.vue'
	import donation from '../../components/donation.vue'
	import myPopup from '@/components/myPopup.vue'
	import lightList from "@/components/lightList.vue"
	export default {
		components: {
			outstand,
			donation,
			myPopup,
			newSociety,
			lightList
		},
		data() {
			return {
				statusBarHeight: statusBarHeight, //状态栏高度
				naviBarHeight: (menu.top - statusBarHeight) * 2 + menu.height, //导航栏高度
				headBGHeight: (menu.top - statusBarHeight) * 2 + menu.height + statusBarHeight,
				bodyHeight: windowHeight - 50,
				isOutstand: true,
				isDonate: false,
				isShow: false,
				ismore: true,
				introduction: '',
				opacity: 1,
				realInfo: [],
				activity: [],
				isFixed: false,
				isAttest: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isDataLoaded: false,
				next: '',
				query: {
					limit: 10,
					offset: 0,
					category: ""
				}
			}
		},
		onLoad() {
			let token = uni.getStorageSync("TOKEN")
			if (token !== "") {
				this.getInfo()
				if (!this.isDataLoaded) {
					this.$refs.out.getList()
					this.$refs.dona.getList()
					this.$refs.lightListRef.getRanking()
					this.isDataLoaded = true
				}

			}
			const query = wx.createSelectorQuery()
			query.select('#bar').boundingClientRect()
			query.exec((res) => {
				this.targetTop = res[0].top //获取距离顶部的高度并保存
			})
		},
		onPageScroll(e) {
			let scrolltop = e.scrollTop;
			if (scrolltop >= this.targetTop - this.headBGHeight) {
				this.isFixed = true
			} else {
				this.isFixed = false
			}
			if (scrolltop > 150) {
				this.opacity = 0
				uni.setNavigationBarColor({
					backgroundColor: '#000000',
					frontColor: '#000000',
				})
				return;
			}
			this.opacity = (150 - scrolltop) / 150
		},
		onReachBottom() {
			if (this.next) {
				this.query.offset = this.query.offset + this.query.limit
				this.getInfo()
			}
		},
		computed: {
			getFirstFiveItems() {
				if (this.realInfo.length > 0) {
					return this.realInfo.slice(0, 5);
				}
			},

			getActity() {
				if (this.activity.length > 0) {
					return this.activity.slice(0, 1);
				}
			}
		},
		methods: {
			getInfo() {
				this.query.category = "资讯"
				this.$api.getInformation(this.query).then((res) => {
					this.realInfo.push(...res.results)
					this.next = res.next
				})
				this.query.category = "活动"
				this.$api.getInformation(this.query).then((res) => {
					// console.log(res)
					this.activity.push(...res.results)
					this.next = res.next
				})
			},
			handleTab(isOutstand, isDonate) {
				this.isOutstand = isOutstand;
				this.isDonate = isDonate;
				this.ismore = true
			},

			handleSeeMore() {
				if (this.isOutstand) {
					// 杰出校友榜
					uni.navigateTo({
						url: '/pages/firstPage/getMore/getMore'
					})
				} else if (!this.isOutstand && this.isDonate) {
					// 校友捐赠榜
					uni.navigateTo({
						url: '/pages/firstPage/getDonateMore/getDonateMore'
					})
				} else if (!this.isOutstand && !this.isDonate) {
					// 点亮榜
					uni.navigateTo({
						url: '/pages/firstPage/getLightMore/getLightMore'
					})
				}
			},

			goToSearchPage() {
				uni.navigateTo({
					url: './search/search',
				})
			},
			//跳转到文章详情
			gotoActiveList(realInfo) {
				uni.navigateTo({
					url: "./article/article?realInfo=" + encodeURIComponent(JSON.stringify(realInfo))
				})
			},
			gotoRealInfoList() {
				uni.navigateTo({
					url: "./realInfoList/realInfoList"
				})
			},

			goToPayPage(type) {
				if (type) {
					// this.isAttest = getApp().globalData.isAttest
					// 不需要弹窗,直接跳转到认证页面
					this.isAttest = true
					if (this.isAttest) {
						uni.navigateTo({
							url: '../public/attestSearch/attestSearch',
						})
					}
				} else {
					uni.navigateTo({
						url: '../firstPage/payPublicity/payPublicity',
					})
				}
			},
			gotoPage(type) {
				if (type) {
					uni.navigateTo({
						url: '/pages/public/attestSearch/attestSearch'
					})
				} else {
					this.isAttest = true
				}
			},
			handleDetail(introduction) {
				this.introduction = introduction
				this.isShow = true
			},
			getVal(val) {
				this.ismore = val
			},
			cancle() {
				this.isShow = false
			},
		}
	}
</script>

<style lang="scss">
	page {
		overflow-y: auto;
	}

	.fixed {
		position: fixed;
		top: 0;
	}

	.interval {
		padding: 20rpx 30rpx;
	}

	/* 界面头部 */
	.page-hd {
		position: fixed;
		width: 100%;
		z-index: 800;
		background-color: #fff;

		.head-bg {
			width: 100%;
		}

		.hd-text {
			position: fixed;
			width: 100%;
			text-align: center;
			font-weight: bold;
			font-size: $uni-font-size-fr;
		}
	}

	/* 界面主体 */
	.page-bd {
		// height: auto;
		// overflow-y: auto;

		.headx-bg {
			width: 100vw;
			height: 25vh;
		}

		.contain {
			// height: 100%;
			// width: 100%;
			position: absolute;
		}

		.container {
			width: 100vw;
			padding: 20rpx 30rpx;
			position: absolute;
			top: 0;
			box-sizing: border-box;
		}

		.search_block {
			width: 100%;
			padding: 18rpx 0;
			background: rgba(246, 246, 246, 0.3);
			border-radius: 8rpx;
			font-size: $uni-font-size-tr;
			color: #D3E5FE;
			text-align: center;
		}

		.article_block {
			margin: 24rpx 0;
			width: 100%;
			height: 400rpx;
			color: #FFFFFF;
			position: relative;
			// background-color: yellow;

			.uni-margin-wrap {
				width: 100%;
				height: 400rpx;
				// position: absolute;

				.swiper {
					width: 100%;
					height: 400rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 400rpx;
						object-fit: contain;
						object-position: center;
					}
				}
			}




			.article {
				width: 100%;
				position: absolute;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 8rpx;
				top: 0;
				box-sizing: border-box;
				padding: 28rpx 24rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.more {
					display: inline-block;
					line-height: 30rpx;
					font-size: $uni-font-size-sc;
					font-weight: bold;
					text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);

					image {
						width: 32rpx;
						height: 32rpx;
						vertical-align: top;
						margin-left: 5rpx;
					}
				}
			}



			.actile_tle {
				font-weight: bold;
				font-size: $uni-font-size-fr;
				width: 90%;
			}

			.actile_time {
				font-size: $uni-font-size-fi;
			}
		}



		.active_block {
			width: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;
			line-height: 64rpx;
			background: rgb(246, 246, 246);
			border-radius: 4px;
			font-size: $uni-font-size-fo;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.text1 {
				width: calc(100vw - 300rpx);
				vertical-align: middle;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.ability_block {
			font-size: 30rpx;
			margin-top: 25rpx;
			display: flex;
			justify-content: space-between;

			.aimg_bg {
				position: relative;
				width: 48%;
				height: 200rpx;
			}

			.aimg_bg image {
				width: 100%;
				height: 100%;
			}

			.aimg_box {
				top: 0;
				height: 60rpx;
				position: absolute;
				margin: 24rpx;
				font-size: $uni-font-size-sc;
				color: #1A1A1A;
				font-weight: bold;

				.aimg_text {
					margin-top: 5rpx;
					font-weight: 400;
					opacity: 0.5;
					font-size: $uni-font-size-sx;
				}
			}
		}
	}

	.text_more {
		color: #0F77FF;
		text-align: center;
		margin: 30rpx;
	}
</style>