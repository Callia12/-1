<template>
	<scroll-view scroll-y style="height: 100vh;" @scrolltolower="onScrollBtm">
		<block v-for="(item,index) in infoList " :key="index">
			<real-info :obj="item" @gotopage="gotopage(item)"></real-info>
		</block>
	</scroll-view>
</template>

<script>
	import realInfo from '@/components/realInfo.vue'
	export default {
		components: {
			realInfo
		},
		data() {
			return {
				infoList: [],
				query: {
					limit: 10,
					offset: 0,
					category: "资讯"
				},
				next: '',
			};
		},
		onLoad() {
			this.getInfoList()
		},

		methods: {
			onScrollBtm() {
				if (this.next) {
					this.query.offset = this.query.offset + this.query.limit
					this.getInfoList()
				}
			},
			getInfoList() {
				this.$api.getInformation(this.query).then((res) => {
					this.next = res.next
					let list = res.results
					list.forEach((item) => {
						this.infoList.push(item)
					})
				})
			},
			gotopage(realInfo) {
				uni.navigateTo({
					url: "/pages/firstPage/article/article?realInfo=" + encodeURIComponent(JSON.stringify(
						realInfo))
				})
			}
		}
	}
</script>

<style lang="scss">

</style>