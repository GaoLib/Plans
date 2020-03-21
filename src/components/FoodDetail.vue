<template>
	<div class="plan">
        <img v-bind:src="'../../'+foodList.foodImage+'.jpg'" />
        <h1 v-html="foodList.foodDestination"></h1>
        <div class="addressContent">
            <icon name="position" class="position" scale="3"></icon>
            <textarea placeholder="Address Here" :disabled="editStatus === 'false'" class="address" v-html="foodList.foodAddress"></textarea>
        </div>
        <div class="route">
        <div class="day" v-for="(value, key, index) in foodList.foods" :key="value">
            <div class="key">
            <input type="text" v-model="titles[index]" :disabled="editStatus === 'false'" class="text" @change="titleChange(key,index)">
            <span class="delete" v-if="count === index+1 && editStatus === 'true'" @click="del(key)">Delete</span>
            </div>
            <textarea v-model="foodList.foods[key]" class="value" :disabled="editStatus === 'false'"></textarea>
        </div>
        </div>
        <button class="morebtn" v-if="editStatus === 'true'" @click="more">One More Food</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'

@Component
export default class FoodDetail extends Vue {
    foodList: any = null
    count: number = 0
    titles: string[] = []

    @Getter editState;

    mounted(){
        this.$nextTick(() => {
            // this.getAddressList();
        })
    }

    getAddressList(){
        this.$http.get('../../static/data/foodD.json').then((res)=>{
        let lists = res.body.result.list;
        lists.forEach((curlist: any) => {
            if(curlist.Id == this.$route.params.id){
                this.foodList = curlist;
                for(let key in curlist.foods){
                    this.count ++;
                    this.titles.push(key);
                }
            }
        })
        })
    }
        
    titleChange(key,index){
        let value = this.foodList.foods[key];
        Vue.delete(this.foodList.foods,key);
        Vue.set(this.foodList.foods,this.titles[index],value);
    }

    more(){
        let key = 'Food'+ (this.count+1); 
        Vue.set(this.foodList.foods,key,'');
        this.count++;
    }

    del(key){
        Vue.delete(this.foodList.foods,key);
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
    .addressContent{
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
    .morebtn{
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
