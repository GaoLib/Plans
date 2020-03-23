<template>
    <div>
        <div class="titleText">Activities</div>
        <div class="activities">
            <div v-for="(item,index) in actList" :key="item.id">
                <div :class="['activity',{'activityRightDisable': deleteFlag && curDeleteNum % 2 === 1 && curDeleteNum < index},{'activityLeftDisable1':deleteFlag && curDeleteNum % 2 === 0 && index % 2 === 1 && index > curDeleteNum},{'activityLeftDisable2':deleteFlag && curDeleteNum % 2 === 0 && index % 2 === 0 && index > curDeleteNum}]"
                    @touchstart="deleteStart(index)" @touchend="deleteEnd">
                    <router-link :to="'/details/out/'+item.id">
                        <div class="type">{{item.type}}</div>
                        <img :src="require('@/assets/images/trip/'+ item.image +'.jpg')" class="img">
                        <h4 class="title">{{item.title}}</h4>
                        <p class="end">{{item.endtime}}</p>
                    </router-link>
                </div>
                <div :class="['activity', {'leftdisable': curDeleteNum % 2 === 0},{'rightdisable':curDeleteNum % 2 == 1}]"
                    v-if="curDeleteNum === index" @click="cancel">
                    <div class="iconContainer"><img src="../assets/images/delete.png" @click="deleted"></div>
                </div>
            </div>
            <div
                :class="['activity','add',{'addRightDisable':deleteFlag && curDeleteNum % 2 === 1},{'addLeftDisable':deleteFlag && curDeleteNum % 2 === 0}]">
                <router-link to="/add/outA"><img src="../assets/images/add.png"></router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue
    } from 'vue-property-decorator';
    import { getOutList } from '@/api/out' 

    @Component
    export default class Add extends Vue {
        actList: any[] = []
        curDeleteNum: number| null = null
        deleteFlag: boolean = false
        timeOutEvent: any = null

        mounted() {
            this.getData();
        }

        getData() {
            getOutList().then((res: any) => {
                this.actList = res.data;
                console.log(this.actList);
                this.actList.forEach((act: any) => {
                    act.endtime = act.endtime ? act.endtime + ' 结束' : '----------';
                })
                
            })
        }

        deleteStart(index: number) {
            let _this = this;
            this.timeOutEvent = setTimeout(function () {
                _this.curDeleteNum = index;
                _this.deleteFlag = true;
            }, 500)
        }

        deleteEnd() {
            clearTimeout(this.timeOutEvent);
        }

        cancel() {
            this.curDeleteNum = 0;
            this.deleteFlag = false;
        }

        deleted(ev: any) {
            ev.stopPropagation();
            Vue.delete(this.actList, this.curDeleteNum);
            this.deleteFlag = false;
            this.curDeleteNum = 0;
        }
    }
</script>

<style scoped lang="scss">
    .titleText {
        width: 94%;
        background-color: #566E4A;
        text-align: center;
        font-size: 1.6rem;
        padding: 0.6rem;
        color: white;
    }

    .activities {
        width: 100%;
        text-align: center;
        margin-top: 1rem;

        .activity {
            display: inline-block;
            width: 44%;
            height: 12rem;
            margin: 0.8rem 0.2rem;
            position: relative;
            vertical-align: middle;

            &:nth-child(odd):last-child {
                float: left;
                margin-left: 4%;
            }

            .type {
                position: absolute;
                top: 0;
                left: 0;
                padding: 0.4rem;
                background-color: #566E4A;
                color: white;
            }

            .img {
                width: 100%;
                height: 6rem;
            }

            .end {
                color: gray;
                font-size: 0.8rem;
            }

            .title {
                color: rgb(26, 26, 26);
            }
        }

        .activityRightDisable {
            top: -14rem;
        }

        .activityLeftDisable1 {
            top: -13.6rem;
            left: 50%;
        }

        .activityLeftDisable2 {
            left: -48%;
        }

        .leftdisable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: 0;
            left: -47%;

            .iconContainer {
                background-color: red;
                margin: 4rem auto;
                width: 4rem;
                height: 4rem;
                border-radius: 50%;

                img {
                    margin-top: 1rem;
                }
            }
        }

        .rightdisable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: -13.6rem;
            right: -25%;
            height: 12.2rem;

            .iconContainer {
                background-color: red;
                margin: 4rem auto;
                width: 4rem;
                height: 4rem;
                border-radius: 50%;

                img {
                    margin-top: 1rem;
                }
            }
        }

        .add {
            background-color: #566E4A;

            img {
                margin-top: 4.5rem;
            }
        }

        .addRightDisable {
            margin-top: -12rem;
        }

        .addLeftDisable {
            left: -48%;
        }
    }
</style>