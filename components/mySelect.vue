<template>
	<block v-for="(item,index) in typeList" :key="index">
		<view class="select_box" :class="item.isSelect?'selected_style':'select_style'" @click="click(index,item)">
			{{item.name}}
			<image src="../static/icon/icon_downb.svg" v-if="!item.isSelect&&!item.isUp"></image>
			<image src="../static/icon/icon_upb.svg" v-if="!item.isSelect&&item.isUp"></image>
			<image src="../static/icon/icon_up.svg" v-if="item.isSelect&&item.isUp"></image>
			<image src="../static/icon/icon_down.svg" v-if="item.isSelect&&!item.isUp"></image>
		</view>

		<view class="cover_bg" v-if="item.isUp">
			<scroll-view scroll-y class="scroll1">
				<view class="selist" @click="handleSelect(false)">
					<text :class="item.name==name[index]?'text2':'text1'">不限</text>
					<image src="../../static/icon/icon_tick.svg" class="tick" v-show="item.name==name[index]">
					</image>
				</view>
				<block v-for="(item2, index2) in selectList " :key="index">
					<view class="selist" @click="handleSelect(item2)">
						<text :class="item.name==item2.name?'text2':'text1'">{{item2.name}}</text>
						<image src=" ../../static/icon/icon_tick.svg" class="tick" v-show="item.name==item2.name">
						</image>
					</view>
				</block>
			</scroll-view>
		</view>
	</block>
</template>

<script>
	export default {
		name: "mySelect",
		props: {
			/* value: Object,
			index: Number,
			selectList: Array,
			typeList: Array,*/
			query: Object
		},
		data() {
			return {
				typeList: [{
						name: "学院",
						type: 'fct',
						isUp: false,
						isSelect: false
					},
					{
						name: "专业",
						type: 'sbj',
						isUp: false,
						isSelect: false
					},
					{
						name: "毕业届",
						type: 'year',
						isUp: false,
						isSelect: false
					},
				],
				name: ['学院', '专业', '毕业届'],
				selectList: [],
				selectType: "",
				selfaculty: "",

			};
		},
		methods: {
			handleSelect(item2) {
				console.log(item2)
				// debugger
				switch (this.selectType) {
					case 0:
						this.query.faculty = item2.id
						this.selfaculty = item2
						this.query.subject = undefined; // 清除选择的专业
						break;
					case 1:
						this.query.subject = item2.id
						break;
					case 2:
						this.query.graduation_year = item2.name ? item2.name.slice(0, -1) : item2.name
						break;
					default:
				}
				let ind = this.selectType
				console.log(ind)
				this.typeList[ind].name = item2 ? item2.name : this.name[ind]
				this.typeList[ind].isSelect = item2 ? true : false
				this.typeList[ind].isUp = false
				this.$emit('search', this.query)
			},
			click(ind, item) {
				// debugger
				console.log(ind, item)
				this.selectType = ind
				let is = true
				this.typeList.forEach((obj) => {
					if (obj.isUp == true && obj.type == item.type) {
						is = false
					}
					obj.isUp = false
				})
				if (is) {
					// debugger
					switch (item.type) {
						case "fct":
							this.$api.getFctList().then((res) => {
								this.selectList = res.results
								this.typeList[ind].isUp = true
							})

							this.typeList[1].name = "专业"
							this.typeList[1].isSelect = false
							// this.typeList[2].name = "毕业届"

							// this.typeList[2].isSelect = false
							break;

						case "sbj":
							// if (this.typeList[0].name == "学院") {
							// 	// this.selectList = []
							// 	this.typeList[1].isSelect = false
							// 	this.typeList[1].name == "专业"
							// } else {
							// 	this.$api.getSbjList(this.selfaculty.id).then((res) => {
							// 		this.selectList = res.results
							// 		this.typeList[ind].isUp = true
							// 	})

							// }
							if (this.typeList[0].name != "学院") {
								this.$api.getSbjList(this.selfaculty.id).then((res) => {
									this.selectList = res.results
									this.typeList[ind].isUp = true
								})
							} else {
								this.$showMsg("请先选择学院")
							}
							break;
						case "year":
							this.selectList = this.$generateYears('届')
							this.typeList[ind].isUp = true
							break;
						default:
					}
				}
			},
			addDate() {},

			/* click() {
				this.$emit("pullDown", this.index, this.value)
			}, */
		}
	}
</script>

<style lang="scss">
	.select_box {
		margin-right: 12rpx;
		padding: 10rpx 24rpx;
		line-height: 34rpx;
		font-size: $uni-font-size-fo;
		font-weight: bold;
		border-radius: 24rpx;
		display: inline-block;
	}

	.select_box image {
		width: 24rpx;
		height: 24rpx;
		vertical-align: middle;
	}

	.select_style {
		background: #F7F7F7;
		color: #1A1A1A;
	}

	.selected_style {
		background: linear-gradient(180deg, #006FFF 0%, rgba(15, 119, 255, 0.7) 100%);
		color: #fff;
	}

	.cover_bg {
		height: calc(100vh - 80rpx);
		z-index: 100;
		position: absolute;
		top: 200rpx;
		left: 0rpx;
		background: rgba(0, 0, 0, 0.3);
	}

	.scroll1 {
		width: 100vw;
		height: 500rpx;
		background: #ffffff;
		padding-bottom: 32rpx;
		border-radius: 0px 0px 40rpx 40rpx;

		.selist {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 80rpx;
			padding: 0 32rpx;
			font-size: $uni-font-size-tr;

			.text1 {
				color: #808080;
			}

			.text2 {
				color: #1A1A1A;
				font-weight: bold;
			}
		}


		.tick {
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>