<template>
	<div class="plan">
        <img :src="require('@/assets/images/trip/'+curFood.image+'.jpg')" />
        <h1>{{curFood.destination}}</h1>
        <div class="address_content">
            <icon name="position" class="position" scale="3"></icon>
            <textarea placeholder="Address Here" :disabled="!editStatus" class="address" :value="curFood.address"></textarea>
        </div>
        <div class="route">
        <div class="day" v-for="(recom, index) in curFood.recommands" :key="recom">
            <div class="key">
                <input type="text" v-model="titles[index]" :disabled="!editStatus" class="text" @blur="titleChange(index)">
                <span class="delete" v-if="count === index+1 && editStatus" @click="del(index)">Delete</span>
            </div>
            <textarea v-model="curFood.reasons[index]" class="value" :disabled="!editStatus"></textarea>
        </div>
        </div>
        <button class="more_btn" v-if="editStatus" @click="more">One More Food</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class FoodDetail extends Vue {
    @Prop({
        default: () => {
            return {
                id: 1,
                destination: "Ice Monster",
                price: "￥50",
                address: "南京西路789号兴业太古汇三楼L391",
                image: "tm-img-11",
                type: "icecream",
                done: false,
                recommands: ["变态咖啡棉花甜"],
                reasons: ['xxx']
            }
        }
    })
    curFood: any

    count: number = 0

    get editStatus(){
        return this.$store.getters.editStatus
    }

    get titles() {
        return this.curFood.recommands
    }
        
    titleChange(key: string,index: number){
        this.curFood.recommands.splice(index, 1, this.titles[index])
    }

    more(){
        const key = 'Food'+ (this.count+1); 
        this.curFood.recommands.push(key)
        this.count++
    }

    del(index: number){
        this.curFood.splice(index,1)
    }
}
</script>

<style scoped lang="scss">
 .plan{
    width:100%;
    text-align:center;

    img{
        width:100%;
        height:10rem;
    }
    .address_content{
        width:100%;

        .position{
            margin-left:10%;
            vertical-align:middle;
        }
        .address{
            width:80%;
            border:none;
            background-color: white;
            color: #566E4A;
            vertical-align:middle;
            padding-top: 1rem;
        }
    }
    .route{
        margin-top:2rem;

        .day{
            margin-top:1rem;

            .key{
                border-top:1rem solid #566E4A;
                border-bottom:1rem solid #1A1A1A;
                padding:0.4rem;
                font-weight:bold;

                .text{
                    border:none;
                    background-color: white;
                    font-weight:bold;
                    font-size:1rem;
                    text-align:center;
                }
                .delete{
                    float:right;
                    margin-right:6%;
                    color: #91AE81; 
                }
            }
            .value{
                margin:0.5rem auto;
                width:100%;
                border:none;
                height:6rem;
                background-color:white;
            }
        }
    }
    .more_btn{
        margin-top:1rem;
        border:none;
        background-color: #91AE81; 
        width:90%;
        margin:0 auto;
        padding:1rem 0.8rem;
        font-size:1rem;
    }
}
</style>
