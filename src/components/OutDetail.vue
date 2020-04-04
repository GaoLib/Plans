<template>
	<div class="out_detail">
        <img :src="require('@/assets/images/trip/'+curOut.image+'.jpg')">
        <div class="name">
            <h2>{{curOut.title}}</h2>
            <input type="text" class="address" v-model="curOut.address" :disabled="!editStatus">
            <textarea class="description" v-model="curOut.description" :disabled="!editStatus"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class OutDetail extends Vue {
    @Prop({
        default: () => {
            return {
                id: 1,
                destination: "昊美术馆",
                price: "￥90",
                address: "浦东新区祖冲之路2277弄1号",
                image: "tm-img-11",
                type: "体验",
                done: false,
                description: "上海市 浦东新区祖冲之路2277弄1号",
                endtime: "2018.07.03",
                title: "昊美术馆",
            }
        }
    })
    curOut: any

    get editStatus() {
        return this.$store.getters.editStatus
    }
    
}
</script>

<style scoped lang="scss">
.out_detail{
    width:100%;
    background-color: rgba(86,110,74,0.6);
    text-align:center;

    img{
        width:70%;
        height:10rem;
    }
    .name{
        width:90%;
        background-color: white;
        margin:-2rem auto;
        position:relative;
        z-index:2;
        padding-top:0.6rem;
        padding-bottom:1rem;
        border-bottom:1px solid rgba(86,110,74,0.6);

        .address{
            padding:0.4rem 0;
            font-size:0.8rem;
            width:90%;
            text-align:center;
            border:none;
            background-color: white;
        }
        .description{
            margin-top:2rem;
            margin-bottom:2rem;
            font-size:1rem;
            padding:0 0.2rem;
            width:90%;
            height:18rem;
            border:none;
            background-color: white;
        }
    }
}
</style>
