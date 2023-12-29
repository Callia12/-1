<template>
	<view>
		<view class="container">
			<view class="head">
				<view v-if="schoolDetailItem==='年级'">
					<view class="search_block" @click="goToSearchPage">
						<icon type="search" style="vertical-align: middle;height: 24rpx;" color="#999999" size="24rpx">
						</icon>
					</view>
				</view>
				<view v-else-if="schoolDetailItem==='教师'">
					<searchInput @getValue='getValue'></searchInput>
				</view>

				<div class="breadcrumb-container">
					<view class="breadcrumb" v-for="(item,index) in breadcrumb" :key="index"
						@click="goToBreadcrumb(item,index)">
						<view :class="{ 'breadcrumb-item': true, 'selected': index === breadcrumb.length - 1 }">{{item}}
						</view>
						<span v-if="index !== breadcrumb.length - 1" class="breadcrumb-separator">></span>
					</view>
				</div>
			</view>
		</view>

		<view class="body">
			<!-- 展示老师 -->
			<view v-if="isLastItemTeacher">
				<block v-if="teacherList.length>0" v-for="(item,index) in teacherList" :key="index">
					<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"></alumn>
				</block>
			</view>
			<view>
				<view v-if="isCombinedYearMajorClass">
					<view class="body_user">
						<block v-if="alumnList.length>0" v-for="(item,index) in alumnList" :key="index">
							<alumn :obj="item" @gotoDetail="gotoDetail" @gotoAppeal="gotoAppeal"></alumn>
						</block>

						<block v-else>
							<span>暂无更多信息</span>
						</block>
					</view>
				</view>

				<view v-else>
					<view class="body_content" v-for="(item,index) in content" :key="index" @click="getName(item)"
						v-if="content.length>0">
						<view class="friendListLeft">
							{{ item.name }}{{ typeof item.name === 'number' ? '届' : '' }}
						</view>
						<uni-icons type="right" size="14" color="#555" class="icon" v-if="item.name"></uni-icons>
					</view>
					<view v-else style="display: flex;justify-content: center;">
						<span>暂无数据</span>
					</view>

				</view>
			</view>


		</view>
	</view>


</template>

<script>
	import searchInput from "../../../components/searchInput.vue"
	import alumn from "../../../components/alumn.vue"
	export default {
		components: {
			searchInput,
			alumn
		},
		data() {
			return {
				schoolDetailItem: '',
				breadcrumb: ['仰恩大学'],
				content: [],
				alumnList: [],
				teacherList: [],
				query: {
					limit: 20,
					offset: 0,
				},
				next: '',
				breadcrumbContentMap: {},
				facultyId: null,
			}
		},

		onLoad() {
			this.schoolDetailItem = getApp().globalData.schoolDetailItem
			this.breadcrumb.push(this.schoolDetailItem)
			if (this.schoolDetailItem === '年级') {
				for (var i = new Date().getFullYear(); i >= 1987; i--) {
					this.content.push({
						name: i
					})
				}
				return this.content
			}

			if (this.schoolDetailItem === '教师') {
				this.getTeacher()
			}
		},
		watch: {
			//监听reFresh,如果有修改就执行监听器
			reFresh: function() {
				this.getAlumnList()
			}
		},
		computed: {
			isCombinedYearMajorClass() {
				if (this.breadcrumb.length > 0) {
					const lastItem = this.breadcrumb[this.breadcrumb.length - 1];
					return /^\d+.*班$/.test(lastItem);
				}
				return false;
			},
			isLastItemTeacher() {
				const lastItem = this.breadcrumb[this.breadcrumb.length - 1];
				return lastItem === '教师';
			}
		},
		onReachBottom() {
			if (this.isCombinedYearMajorClass) {
				this.query.offset = this.query.offset + this.query.limit
				this.getAlumnList()
			}
			if (this.isLastItemTeacher) {
				this.query.offset = this.query.offset + this.query.limit
				this.getTeacher()
			}
		},
		methods: {
			getAlumnList() {
				this.$api.getAlumnList(this.query).then((res) => {
					this.next = res.next
					let list = res.results
					list.forEach((item) => {
						this.alumnList.push(item)
					})
				})
			},

			getTeacher() {
				this.$api.getTeacher(this.query).then(res => {
					this.next = res.next
					let list = res.results
					list.forEach((item) => {
						this.teacherList.push(item)
					})
				})
			},
			getName(item) {
				// debugger
				if (typeof item.name === 'number') {
					for (let i = 0; i < this.breadcrumb.length; i++) {
						if (this.breadcrumb[i] === '年级') {
							// 使用 splice 方法替换年级为选择的年级
							this.breadcrumb.splice(i, 1, item.name + "届");
							break; // 找到并替换后，退出循环
						}
					}
					//获取学院
					this.$api.getFctListYear(item.name).then(res => {
						this.content = res.results
					})

				} else if (/\d/.test(item.name)) { //判断是否为班级信息
					if (item.name.includes('班')) {
						this.query._class = item.id
						this.breadcrumb.push(item.name)
						this.getAlumnList()
					}

				} else if (item.name.includes("学院") && item.id) { //根据学院获取专业数据
					this.facultyId = item.id

					this.breadcrumb.push(item.name)
					// this.query.faculty = item.id;
					this.$api.getSbjList(item.id).then(res => {
						this.content = res.results
					})
				} else if (item.id && item.faculty) {
					this.breadcrumb.push(item.name)
					// this.query.subject = item.id;
					this.$api.getClass('?subject=' + item.id).then(res => {
						console.log(res)
						this.content = res.results.map(item => {
							return {
								name: item.class_name,
								id: item.id
							};
						});
					})
				}
			},
			goToBreadcrumb(item, index) {
				this.breadcrumb.splice(index + 1);
				if (item === '仰恩大学') {
					uni.switchTab({
						url: '/pages/connections/connections'
					});
				}
				if (/^\d+.*届$/.test(item) && index === 1) {
					this.breadcrumb[index] = '年级'
					if (this.breadcrumb[index] === '年级') {
						this.content = []
						for (var i = new Date().getFullYear(); i >= 1987; i--) {
							this.content.push({
								name: i
							})
						}
						return this.content
					}
				}

				if (item.includes("学院") && index === 2) {
					this.content = []
					this.$api.getSbjList(this.facultyId).then(res => {
						this.content = res.results
					})
				}
			},
			// 按条件查询教师
			getValue(value) {
				this.$api.getSearchTeacher(value).then(res => {
					this.teacherList = res.results
				})

			},
			gotoDetail(id) {
				uni.navigateTo({
					url: '../alumnDetail/alumnDetail?userId=' + id
					// url: '../connections/alumnDetail/alumnDetail?userId=' + id
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
			goToSearchPage() {
				uni.navigateTo({
					url: '../../firstPage/search/search',
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		border-bottom: 15rpx solid #f2f1f6;

		.head {
			padding: 12rpx 32rpx 0;
		}
	}

	.search_block {
		width: 100%;
		padding: 18rpx 0;
		background: #f8f8f8;
		border-radius: 8rpx;
		font-size: $uni-font-size-tr;
		color: #999999;
		text-align: center;
	}

	.breadcrumb-container {
		display: flex;
		flex-wrap: wrap;

		.breadcrumb {
			display: flex;
			align-items: center;
			font-size: 36rpx;
			height: 100rpx;
			line-height: 100rpx;


			.breadcrumb-item {
				color: #333;
				cursor: pointer;
			}

			.breadcrumb-item.selected {
				color: #0F77FF;
			}

			.breadcrumb-item:hover {
				text-decoration: underline;
			}

			.breadcrumb-separator {
				margin: 0 10rpx;
				color: #999;
			}
		}
	}

	.body {
		padding: 12rpx 32rpx 0;

		.body_content {
			display: flex;
			justify-content: space-between;
			font-size: 36rpx;
			padding: 20rpx 10rpx;
		}
	}
</style>