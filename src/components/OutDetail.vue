<template>
	<div class="outD">
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
import { getOutList } from '@/api/out'

@Component
export default class OutDetail extends Vue {
    curOut: any = null

    get editStatus() {
        return this.$store.getters.editStatus
    }
    
    mounted(){
        this.getAddressList();
    }

    getAddressList(){
        getOutList().then((res: any)=>{
            this.curOut = res.data.find((item: any) => item.id == this.$route.params.id)
        })
    }
}
</script>

<style scoped lang="scss">
.outD{
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
