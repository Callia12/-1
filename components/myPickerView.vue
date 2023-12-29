<template>
	<view class="my_picker_view" v-if="isShow">
		<uni-transition mode-class="slide-bottom" :show="isShow"
			:styles="{'width':'100%','height':'100vh','position':'fixed','bottom':'0'}">
			<view class="picker-box">
				<view class="picker-top">
					<view class="cancel" @click="handleCancel">取消</view>
					<view class="submit" @click="handleSubmit">确定</view>
				</view>
				<picker-view class="picker-view" indicator-class="indicator" @change="handleChange"
					:value="pickerValue">
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in options" :key="index">
							<text v-if="type=='sex'||type=='edu'">{{item}}</text>
							<text v-else-if="type=='clp'">{{item}}</text>
							<text v-else-if="type=='pro'">{{item.provinceName}}</text>
							<text v-else-if="type=='city'">{{item.cityName}}</text>
							<text v-else-if="type=='class'">{{item.class_name}}</text>
							<text v-else>{{item.name}}</text>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import $store from '@/store/index.js'
	export default {
		name: "myPickerView",
		props: {
			/* isShow: Boolean,
			options: Array,
			type: String,
			pickIndex: 0, //初始默认选中
			rangeKey: {
				type: String,
				default: "label"
			}, */
			queryId: Number,
		},
		data() {
			return {
				pickerValue: [0],
				isShow: false,
				options: [],
				type: "",
				eduArray: ['研究生', '本科', '大专'],
			};
		},

		methods: {
			handleShowPicker(type) {
				this.type = type
				switch (type) {
					case "sbj":
						this.$api.getSbjList().then((res) => {
							this.options = res.results;
							this.isShow = true;
						});
						break;
					case "class":
						this.$api.getClass('?subject=' + this.queryId).then((res) => {
							this.options = res.results;
							this.isShow = true;
						})
						break;
					default:
				}
			},
			handleShowPicker1(type, pickerValue, ind, id) {
				this.type = type
				switch (type) {
					case "sex":
						this.options = ["男", "女", "其他"]
						this.showPicker(pickerValue, 1)
						/* this.pickerValue[0] = this.options.findIndex((item) => item === pickerValue)
						this.isShow = true */
						break;
					case "edu":
						this.options = this.eduArray
						this.showPicker(pickerValue, 1)
						break;
					case "fct":
						this.$api.getFctList().then((res) => {
							this.options = res.results
							this.showPicker(pickerValue)
						});
						break;
					case "sbj":
						this.$api.getSbjList(id).then((res) => {
							this.options = res.results
							this.showPicker(pickerValue)
						});
						break;
					case "cln":
						this.$api.getClubList().then((res) => {
							this.options = res.results;
							this.showPicker(pickerValue)
						});
						break;
					case "clp":
						this.options = ["社长", "副社长", "社员"]
						this.showPicker(pickerValue, 1)
						break;
					case "pos":
						if (id === '国家机关/单位') {
							this.options = this.$store.state.category.civil_service_rank
						} else if (id === '事业单位') {
							this.options = this.$store.state.category.public_service_position
						} else {
							this.options = this.$store.state.category.staff_level
						}
						this.showPicker(pickerValue)
						break;
					default:
						this.getCategory(type, pickerValue)
				}
			},
			getCategory(type, pickerValue) {
				let att = type === 'prf' ? 'profession' : 'company_nature'
				if (Object.getOwnPropertyNames(this.$store.state.category).length === 0) {
					this.$api.getCategory().then((res) => {
						this.options = res[att]
						this.$store.commit('setCategory', res)
						this.showPicker(pickerValue)
					})
				} else {
					this.options = this.$store.state.category[att]
					this.showPicker(pickerValue)
				}
			},
			showPicker(pickerValue, type) {
				if (pickerValue) {
					if (type) {
						this.pickerValue[0] = this.options.findIndex((item) => item === pickerValue)
					} else {
						this.pickerValue[0] = this.options.findIndex((item) => item.name === pickerValue)
					}
				} else {
					this.pickerValue = [0]
				}
				this.pickerValue = this.pickerValue[0] === -1 ? [0] : this.pickerValue
				this.isShow = true
			},

			handleSubmit() {
				let value = this.options[this.pickerValue[0]]
				this.$emit("submit", value, this.type)
				this.isShow = false
			},

			handleCancel() {
				this.isShow = false
			},
			handleChange(e) {
				this.pickerValue = e.detail.value;
			},
		}
	}
</script>

<style lang="scss">
	.my_picker_view {
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 100;
		top: 0;
		background: rgba(0, 0, 0, 0.39);

		.picker-box {
			width: 100%;
			height: 45%;
			box-sizing: border-box;
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.picker-top {
				padding: 20rpx 0;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				border-radius: 40rpx 40rpx 0 0;

				.cancel,
				.submit {
					width: 132rpx;
					font-size: $uni-font-size-sc;
					color: #000;
					text-align: center;
				}

				.submit {
					color: #3973B5;
				}
			}

			.picker-view {
				font-size: $uni-font-size-sc;
				background-color: #FFFFFF;
				height: 40vh;

				.picker-item {
					line-height: 90rpx;
					text-align: center;
					color: #1A1A1A;
				}
			}

			.indicator {
				height: 90rpx;
			}

			/* .picker-view {
				padding: 15rpx 0;
				overflow-y: auto;
				font-size: $uni-font-size-sc;
				background-color: #FFFFFF;
				max-height: 260rpx;
				// height: 224rpx;
				border-radius: 24rpx;

				.picker-item {
					padding: 20rpx 10rpx;
					line-height: 42rpx !important;
					text-align: center;
					color: #1A1A1A;
					display: flex;
					justify-content: space-between;
				}

				.text {
					width: calc(100vw - 100rpx);
					text-align: center;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}*/
		}
	}
</style>