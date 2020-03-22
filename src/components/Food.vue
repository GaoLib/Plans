<template>
	<div>
		<div class="types">
			<img v-for="type in typeList" 
			:src="curFoodType === type ? require('@/assets/images/food/' + type + 'Active.png') : require('@/assets/images/food/' + type + '.png') " 
			class="type" 
			@click="foodType(type)"
			:key="type">
			</div>
			<div class="foods">
			<div v-for="(item,index) in filterList" :key="item.Id">
				<div :class="['food',{'foodDisable':curDeleteNum+1 === index}]" :style="{backgroundImage: 'url('+ require('@/'+item.foodImage+'.jpg')+')'}" @touchstart="deleteStart(index)" @touchend="deleteEnd">
					<router-link :to="'/Details/foodD/'+item.Id"><h2 v-text="item.foodDestination"></h2>
					<p v-text="item.foodPrice"></p></router-link>
				</div>
				<div class="food disable" v-if="curDeleteNum === index" @click="cancel">
				<div class="iconContainer"><img src="../assets/images/delete.png" @click="deleted"></div>
				</div>
			</div>
			<div :class="['food','add',{'addDisable':curDeleteNum === foodList.length - 1}]">
			<router-link to="/add/foodA"><img src="../assets/images/add.png"></router-link>
			</div>
		</div>
  	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getFoodList } from '@/api/food'

@Component
export default class Food extends Vue {
	foodList: any[] = []
	curFoodType: string = ''
	typeList: string[] = ['hotpot','cake','drink','noodle','bar','seafood','westernfood','icecream']
	filterList: any[] = []
	curDeleteNum: number | string = ''
	timeOutEvent: any 
	bgImg: any = {
		backgroundImage: `url(${require('@/assets/images/trip/tm-img-11.jpg')})`
	}

	mounted(){
		this.$nextTick(() => {
			this.getData();
		})
	}

	getData(){
		getFoodList().then((res: any)=>{
			this.foodList = res.data
			this.filterList = res.data
			console.log(this.filterList)
		})
	}
	
	foodType(type: string){
		if(this.curFoodType !== type){
			this.curFoodType = type;
			this.filterList = this.foodList.filter((item: any) => {
				return item.type == type;
			})
		}else{
			this.curFoodType = '';
			this.filterList = this.foodList;
		}    
	}

	deleteStart(index: number){
		let _this = this;
		this.timeOutEvent = setTimeout(function(){
			_this.curDeleteNum = index;
		},500)
	}

	deleteEnd(){
		clearTimeout(this.timeOutEvent);
	}

	cancel(){
		this.curDeleteNum = '';
	}

	deleted(ev: any){
		ev.stopPropagation();
		Vue.delete(this.foodList,this.curDeleteNum);
		this.curDeleteNum = '';
	}
	
}
</script>

<style lang="scss" scoped>
.types{
	width:80%;
	margin-left:14%;
	// width:100%;
	// text-align:center;

	.type{
		margin:0.4rem 3%;
	}
}
.foods{
    width: 96%;
    margin-left: 2%;
}
.food{
    width:94%;
    height:9rem;
    background-repeat: no-repeat;
    background-size: cover;
    margin:1.2rem 0.6rem;
    text-align:center;
    overflow:hidden;
	// background: url('../assets/images/trip/tm-img-11.jpg');

    h2{
      margin-top:2.4rem;
      color:white;
    }
    p{
      color:white;
    }
}
.foodDisable{
    margin-top:-10rem;
}

.disable{
	background-color: rgba(128,128,128,0.6);
	position:relative;
	top:-10rem;
	left:0;

	.iconContainer{
		background-color: red;
		margin:2.6rem auto;
		width:4rem;
		height:4rem;
		border-radius:50%;

		img{
			margin-top:1rem;
		}
	}
}

.add{
    background-color: #546B48; 
    height:6rem;

    img{
       margin-top:2rem;
    }
}
.addDisable{
    margin-top:-10rem;
}
</style>