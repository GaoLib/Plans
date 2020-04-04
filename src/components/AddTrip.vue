<template>
	<div>
        <div class="form">
            <input type="text" placeholder="Destination" class="fill" v-model="destination">
            <input type="number" placeholder="Cost" class="fill" v-model="cost">
            <input type="file" class="fill image" v-on:change="saveImg">
            <input type="text" class="fill" placeholder="Image" v-model="image">
            <textarea placeholder="Description" class="fill" rows="4" v-model="description"></textarea>
            <div v-for="(value, key,index) in route" :key="value">
                <span class="day">{{key}}</span>
                <span :class="index == indexR - 1 ? 'delete_day' : 'delete_day_hide'" @click="delete_day(index)">Delete</span>
                <textarea class="fill" rows="4" v-model="route[key]"></textarea>
            </div>
            <button class="fill more_btn" @click="more">One More Day</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AddTrip extends Vue {
	destination: string = ''
    cost: string = ''
    image: string = ''
    description: string = ''
    indexR: number = 0
    route: any = null

    saveImg(ev: any){
        this.image = ev.target.files[0].name;
    }

    more(){
        this.indexR ++;
        let key = 'Day'+ this.indexR; 
        Vue.set(this.route,key,'');
    }

    delete_day(index: number){
        let value = 'Day' + (index + 1);
        Vue.delete(this.route,value);
        this.indexR --;
    }
}
</script>

<style scoped lang="scss">
.form{
    width:100%;
    text-align:center;
    position:relative;

    .fill{
        width:90%;
        margin:0 auto;
        padding:1rem 0.8rem;
        border-top:none;
        border-left:none;
        border-right:none;
        font-size:1rem;
    }
    .image{
        position:absolute;
        left:0;
        top:6rem;
        opacity:0;
    }
    .more_btn{
        margin-top:1rem;
        border:none;
        background-color: #91AE81; 
    }
    .day{
        float:left;
        margin-left:6%;
        margin-bottom:0.4rem;
        margin-top:0.4rem;
    }
    .delete_day{
        float:right;
        margin-right:6%;
        color: #91AE81;
        margin-top:0.4rem;
        display:block;
    }
    .delete_day_hide{
        float:right;
        margin-right:6%;
        color: #91AE81;
        margin-top:0.4rem;
        display:none;
    }
}
</style>
