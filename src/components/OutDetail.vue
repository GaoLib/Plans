<template>
	<div class="outD">
        <img :src="'../../'+outList.Image+'.jpg'">
        <div class="name">
            <h2>{{outList.title}}</h2>
            <input type="text" class="address" v-model="outList.Address" :disabled="editStatus === 'false'">
            <textarea class="description" v-model="outList.description" :disabled="editStatus === 'false'"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
import { getOutList } from '@/api/out'

@Component
export default class Add extends Vue {
    outList: any[] = []

    @Getter editStatus;
    
    mounted(){
        this.$nextTick(() => {
            this.getAddressList();
        })
    }

    getAddressList(){
        getOutList().then((res: any)=>{
            let lists = res.data;
            lists.forEach((curlist:any) => {
                if(curlist.Id == this.$route.params.id){
                    this.outList = curlist;
                }
            })
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
