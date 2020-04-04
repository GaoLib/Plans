<template>
    <div>
        <div class="title_text">Activities</div>
        <div class="activities">
            <div v-for="item in actList" :key="item.id">
                <div :class="['activity',{'activity_right_disable': deleteFlag && curDeleteNum % 2 === 0 && curDeleteNum < item.id},{'activity_left_disable1':deleteFlag && curDeleteNum % 2 === 1 &&  item.id % 2 === 0 && item.id > curDeleteNum},{'activity_left_disable2':deleteFlag && curDeleteNum % 2 === 1 && item.id % 2 === 1 && item.id > curDeleteNum}]"
                    @touchstart="deleteStart(item.id)" @touchend="deleteEnd">
                    <div @click="turnPage(item.id)">
                        <div class="type">{{item.type}}</div>
                        <img :src="require('@/assets/images/trip/'+item.image+'.jpg')" class="img">
                        <h4 class="title">{{item.title}}</h4>
                        <p class="end">{{item.endtime}}</p>
                    </div>
                </div>
                <div :class="['activity', {'left_disable': curDeleteNum % 2 === 1},{'right_disable':curDeleteNum % 2 == 0}]"
                    v-if="curDeleteNum === item.id" @click="cancel">
                    <div class="icon_container"><img src="../assets/images/delete.png" @click="deleted"></div>
                </div>
            </div>
            <div
                :class="['activity','add',{'add_right_disable':deleteFlag && curDeleteNum % 2 === 0},{'add_left_disable':deleteFlag && curDeleteNum % 2 === 1}]"
                @click="add" v-permission:operation="'out_add'">
                <img src="../assets/images/add.png">
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
        getOutList
    } from '@/api/out'

    @Component({
        // directives: {
        //     permission: {
        //         bind(el: any, operation: any){
        //             let flag = store.state.operationList.split(',').find((item: string) => { return item === operation.value})
        //             if(!flag){
        //                 el.style.display = 'none'
        //             }
        //         }
        //     }
        // }
    })
    export default class Add extends Vue {
        actList: any[] = []
        curDeleteNum: number = 1000
        deleteFlag: boolean = false
        timeOutEvent: any = 0

        get img(): object {
            return function (src: string) {
                const imgString = require(`../assets/images/trip/${src}.jpg`)
                return {
                    'background-image': `url(${imgString})`
                }
            }
        }

        mounted() {
            this.getData();
        }

        getData() {
            getOutList().then((res: any) => {
                this.actList = res.data;
                this.actList.map((act: any) => {
                    act.endtime = act.endtime ? act.endtime + ' 结束' : '----------'
                })
            })
        }

        deleteStart(id: number) {
            const _this = this;
            this.timeOutEvent = setTimeout(function () {
                _this.curDeleteNum = id;
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
            this.actList.splice(this.curDeleteNum, 1)
            this.deleteFlag = false;
            this.curDeleteNum = 0;
        }

        turnPage(id: number) {
            this.$router.push('/details/out/' + id);
        }

        add() {
            this.$router.push('/add/out')
        }
    }
</script>

<style scoped lang="scss">
    .title_text {
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

        .activity_right_disable {
            top: -14rem;
        }

        .activity_left_disable1 {
            top: -13.6rem;
            left: 50%;
        }

        .activity_left_disable2 {
            left: -48%;
        }

        .left_disable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: 0;
            left: -45.6%;

            .icon_container {
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

        .right_disable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: -13.6rem;
            right: -24.6%;
            height: 12.2rem;

            .icon_container {
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

        .add_right_disable {
            margin-top: -12rem;
        }

        .add_left_disable {
            left: -48%;
        }
    }
</style>