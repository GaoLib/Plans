<template>
	<div class="home">
		<div class="header">
			<img src="../assets/images/logo.gif">
			<div class="searchBox">
				<Icon class="search" name="search" scale="2"></Icon>
			</div>
			<Icon class="shop" name="shop" scale="3"></Icon>
		</div>
		<div class="container">
			<router-view />
		</div>
		<div class="footer">
			<router-link to="/trip">
				<img :src="curPage == 'trip' ? tripActive : trip" class="trip" @click="choosePage('trip')">
			</router-link>
			<router-link to="/out">
				<span :class="curPage == 'out' ? 'outActive' :'out' " @click="choosePage('out')">Go Go Now</span>
			</router-link>
			<router-link to="/food">
				<img :src="curPage == 'food' ? foodActive : food " class="food" @click="choosePage('food')">
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator'
	import tripActive from '../assets/images/tripActive.png'
	import trip from '../assets/images/trip.png'
	import foodActive from '../assets/images/foodActive.png'
	import food from '../assets/images/food.png'

	@Component({})
	export default class Home extends Vue {
		curPage: string = ''
		tripActive: string = tripActive
		trip: string = trip
		foodActive: string = foodActive
		food: string = food

		mounted() {
			this.curPage = this.$store.state.page ? this.$store.state.page : 'out'
		}

		choosePage(type: string) {
			this.curPage = type;
			this.$store.commit('set_page',type)
		}

	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 3rem;
		position: fixed;
		top: 0;
		left: 0;
		background-color: white;
		overflow: hidden;
		z-index: 100;

		img {
			width: 8%;
			margin-left: 4%;
		}

		.searchBox {
			margin-left: 8%;
			margin-top: 3%;
			display: inline-block;
			width: 60%;
			background-color: rgb(26, 26, 26);
			border-radius: 5%;

			.search {
				padding: 4px 8px;
			}
		}

		.shop {
			float: right;
			margin-right: 4%;
			margin-top: 0.6rem;
		}
	}

	.footer {
		background-color: rgb(26, 26, 26);
		width: 100%;
		height: 3rem;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		z-index: 100;

		&:before {
			content: '';
			width: 30%;
			height: 80%;
			background-color: rgb(26, 26, 26);
			border-radius: 50%;
			position: absolute;
			top: -1rem;
			left: 36%;
		}

		.trip {
			padding-top: 0.5rem;
			margin-left: -50%;
		}

		.out {
			color: white;
			font-size: 1.4rem;
			z-index: 999;
			position: absolute;
			top: 0.6rem;
			left: 32%;
			width: 40%;
		}

		.outActive {
			color: #546B48;
			font-size: 1.4rem;
			z-index: 999;
			position: absolute;
			top: 0.6rem;
			left: 32%;
			width: 40%;
		}

		.food {
			float: right;
			padding: 0.5rem 8%;
		}
	}

	.container {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
</style>