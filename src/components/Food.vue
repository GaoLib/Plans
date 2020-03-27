<template>
	<div>
		<div :class="['types',{'foodTypeAct': curFoodType}]">
			<img v-for="type in typeList"
				:src="curFoodType === type ? require('@/assets/images/food/' + type + 'Active.png') : require('@/assets/images/food/' + type + '.png') "
				class="type" @click="foodType(type)" :key="type">
		</div>
		<div class="foods">
			<div v-for="item in filterList" :key="item.id">
				<div :class="['food',{'foodDisable': curDeleteNum && curDeleteNum+1 === item.id}]" :style="img(item.image)"
					@touchstart="deleteStart(item.id)" @touchend="deleteEnd">
					<div @click="turnPage(item.id)">
						<h2>{{item.destination}}</h2>
						<p>{{item.price}}</p>
					</div>
				</div>
				<div class="food disable" v-if="curDeleteNum === item.id" @click="cancel">
					<div class="iconContainer"><img src="../assets/images/delete.png" @click="deleted"></div>
				</div>
			</div>
			<div :class="['food','add',{'addDisable':curDeleteNum === foodList.length - 1}]">
				<router-link to="/add/food"><img src="../assets/images/add.png"></router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	import {
		getFoodList
	} from '@/api/food'

	@Component
	export default class Food extends Vue {
		foodList: any[] = []
		curFoodType: string = ''
		typeList: string[] = ['hotpot', 'cake', 'drink', 'noodle', 'bar', 'seafood', 'westernfood', 'icecream']
		filterList: any[] = []
		curDeleteNum: number = 0
		timeOutEvent: any
		bgImg: any = {
			backgroundImage: `url(${require('@/assets/images/trip/tm-img-11.jpg')})`
		}

		get img(): object {
			return function (src: string) {
				const imgString = require(`../assets/images/trip/${src}.jpg`)
				return {
					'background-image': `url(${imgString})`
				}
			}
		}

		mounted() {
			this.getData()
		}

		getData() {
			getFoodList().then((res: any) => {
				this.foodList = res.data
				this.filterList = res.data
			})
		}

		foodType(type: string) {
			if (this.curFoodType !== type) {
				this.curFoodType = type;
				this.filterList = this.foodList.filter((item: any) => {
					return item.type == type;
				})
			} else {
				this.curFoodType = '';
				this.filterList = this.foodList;
			}
		}

		deleteStart(id: number) {
			const _this = this;
			this.timeOutEvent = setTimeout(() => {
				_this.curDeleteNum = id;
			}, 500)
		}

		deleteEnd() {
			clearTimeout(this.timeOutEvent);
		}

		cancel() {
			this.curDeleteNum = 0;
		}

		deleted(ev: any) {
			ev.stopPropagation();
			Vue.delete(this.foodList, this.curDeleteNum);
			this.curDeleteNum = 0;
		}

		turnPage(id: number) {
			this.$router.push('/details/food/'+ id);
		}

	}
</script>

<style lang="scss" scoped>
	.types {
		width: 80%;
		margin-left: 14%;

		.type {
			margin: 0.4rem 3%;
		}
	}

	.foodTypeAct{
		height: 116px;
	}

	.foods {
		width: 96%;
		margin-left: 2%;
	}

	.food {
		width: 94%;
		height: 9rem;
		background-repeat: no-repeat;
		background-size: cover;
		margin: 1.2rem 0.6rem;
		text-align: center;
		overflow: hidden;

		h2 {
			margin-top: 2.4rem;
			color: white;
		}

		p {
			color: white;
		}
	}

	.foodDisable {
		margin-top: -10rem;
	}

	.disable {
		background-color: rgba(128, 128, 128, 0.6);
		position: relative;
		top: -10rem;
		left: 0;

		.iconContainer {
			background-color: red;
			margin: 2.6rem auto;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;

			img {
				margin-top: 1rem;
			}
		}
	}

	.add {
		background-color: #546B48;
		height: 6rem;

		img {
			margin-top: 2rem;
		}
	}

	.addDisable {
		margin-top: -10rem;
	}
</style>