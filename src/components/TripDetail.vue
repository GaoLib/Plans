<template>
	<div class="plan">
        <img :src="require('@/assets/images/trip/'+curTrip.image+'.jpg')" />
        <h1>{{curTrip.destination}}</h1>
        <textarea placeholder="Description Here" class="description" v-html="curTrip.description" :disabled="!editStatus"></textarea>
        <div class="route">
        <div class="day" v-for="(value, key, index) in curTrip.route" :key="value">
            <div class="key">
            <span>{{key}}</span>
            <span class="delete" v-if="count === index+1 && editStatus" @click="del(index)">Delete</span>
            </div>
            <textarea v-model="curTrip.route[key]" class="value" :disabled="!editStatus"></textarea>
        </div>
        </div>
        <button class="morebtn" v-if="editStatus" @click="more">One More Day</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Add extends Vue {
	@Prop({
        default: () => {
            return {
                id: 1,
                destination: "Dali",
                description: "xxxxxxxxxx Dali xxxxxxx",
                price: "￥1090",
                image: "tm-img-01",
                done: true,
                route: {
                    Day1: "xxxxxxxxxDay1xxxxxxx"
                }
            }
        }
    })
    curTrip: any
    count: number = 0

    get editStatus() {
        return this.$store.getters.editStatus
    }

    @Watch('curTrip', {
        deep: true
    })
    watchTrip(oldVal: any, newVal: any){
        this.count = Object.keys(newVal.route).length
    }

    mounted() {
        this.count = this.curTrip.route && Object.keys(this.curTrip.route).length
    }

    more(){
        let key = 'Day'+(this.count+1);
        Vue.set(this.curTrip.route,key,'');
        this.count ++;
    }

    del(index: number){
        let value = 'Day' + (index + 1);
        Vue.delete(this.curTrip.route,value);
        this.count --;
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
    .description{
        width:80%;
        border:none;
        background-color:white;
        text-align:center;
    }
    .route{
       // margin-bottom:2rem;

        .day{
            margin-top:1rem;

            .key{
                border-top:1rem solid #566E4A;
                border-bottom:1rem solid #1A1A1A;
                padding:0.4rem;
                font-weight:bold;

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
