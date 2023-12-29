注意事项：改了uni组件的源码
1、改了uni-icons的size的单位px—>rpx
2、改了uni-search-bar的.uni-searchbar
	在clear事件里添加了：this.show = false
	clear() {
			this.$emit("clear", {
				value: this.searchVal
			})
			this.searchVal = ""
			this.show = false
		},
	在blur事件里面加了：	
	if (this.searchVal === '') {
		this.show = false
	}
	blur() {
		// #ifndef APP-PLUS
		uni.hideKeyboard();
		// #endif
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord()
		// #endif
		if (this.searchVal === '') {
			this.show = false
		}
		this.$emit("blur", {
			value: this.searchVal
		})
	},
