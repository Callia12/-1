<template>
	<view>
		<uni-search-bar @confirm="search" v-model="searchValue" @input="oninput" @clear="clearInput">
			<template v-slot:searchIcon>
				<uni-icons color="#999999" size="14" type="search"></uni-icons>
			</template>
			<template v-slot:clearIcon>
				<uni-icons type="closeempty" color="#b3b3b3" size="18"></uni-icons>
			</template>
		</uni-search-bar>

	</view>
</template>

<script>
	export default {
		name: "searchInput",
		props: {
			placeholder: ""
		},
		data() {
			return {
				searchValue: "",
				isClear: false,
			}
		},
		methods: {
			search(res) {
				console.log(res.value)
			},
			clearInput(e) {
				this.value = ""
				this.$emit('clearInput', this.value)
			},
			oninput(res) {
				// console.log(res)
				this.$emit('getValue', res)
			},
		}
	}
</script>

<style lang="scss">
</style>