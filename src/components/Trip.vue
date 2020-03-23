<template>
    <div>
        <div class="galleryBox">
            <img :src="require('../assets/images/trip/'+rollList[(rollList.indexOf(curGallery)-1+rollList.length) % rollList.length]+'.png')"
                class="leftGallery">
            <img :src="require('../assets/images/trip/'+curGallery+'.png')" class="centerGallery" v-on:touchstart="touchStart"
                v-on:touchend="touchEnd">
            <img :src="require('../assets/images/trip/'+rollList[(rollList.indexOf(curGallery)+1+rollList.length) % rollList.length]+'.png')"
                class="rightGallery">
        </div>
        <div class="trips">
            <div v-for="(item,index) in tripList" :key="item.id">
                <div :class="['trip',{'tripDisable':curDeleteNum+1 === index}]"
                    :style="img(item.image)" @touchstart="deleteStart(index)"
                    @touchend="deleteEnd">
                    <div @click="turnPage(item.id)">
                        <h2>{{item.destination}}</h2>
                        <p>{{item.price}}</p>
                    </div>
                </div>
                <div class="trip disable" v-if="curDeleteNum === index" @click="cancel">
                    <div class="iconContainer"><img src="../assets/images/delete.png" @click="deleted"></div>
                </div>
            </div>
            <div :class="['trip','add',{'addDisable':curDeleteNum === tripList.length - 1}]">
                <router-link to="/add/tripA"><img src="../assets/images/add.png"></router-link>
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
    import {
        getTripList
    } from '@/api/trip'

    @Component
    export default class Trip extends Vue {
        tripList: any[] = []
        startX: number = 0
        rollList: string[] = ['chongqing', 'huangshan', 'xiamen']
        curGallery: string = 'huangshan'
        timeOutEvent: any = 0
        curDeleteNum: number| string = ''

        get img(): object {
			return function (src: string) {
				let imgString = require(`../assets/images/trip/${src}.jpg`)
				return {
					'background-image': `url(${imgString})`
				}
			}
		}

        mounted() {
            this.getData();
        }

        getData() {
            getTripList().then((res: any) => {
                this.tripList = res.data
            });
        }

        touchStart(ev: any) {
            ev = ev || event; //浏览器兼容问题，有的ev，有的用event
            if (ev.touches.length == 1) {
                this.startX = ev.touches[0].clientX;
            }
        }

        touchEnd(ev: any) {
            ev = ev || event;
            let index = this.rollList.indexOf(this.curGallery);
            let length = this.rollList.length;
            if (ev.changedTouches.length == 1) {
                if (ev.changedTouches[0].clientX > this.startX) {
                    this.curGallery = this.rollList[(index - 1 + length) % length];
                } else if (ev.changedTouches[0].clientX < this.startX) {
                    this.curGallery = this.rollList[(index + 1 + length) % length];
                }
            }
        }

        deleteStart(index: number) {
            let _this = this;
            this.timeOutEvent = setTimeout(function () {
                _this.curDeleteNum = index;
            }, 500)
        }

        deleteEnd() {
            clearTimeout(this.timeOutEvent);
        }

        cancel() {
            this.curDeleteNum = 0;
        }

        deleted(ev: any) {
            ev.stopPropagation();
            Vue.delete(this.tripList, this.curDeleteNum);
            this.curDeleteNum = 0;
        }

        turnPage(id: number) {
			this.$router.push('/details/trip/'+ id);
		}
    }
</script>

<style scoped lang="scss">
    @mixin matrix($value...) {
        transform: matrix($value);
        -ms-transform: matrix($value);
        /* IE 9 */
        -moz-transform: matrix($value);
        /* Firefox */
        -webkit-transform: matrix($value);
        /* Safari 和 Chrome */
        -o-transform: matrix($value);
    }

    .galleryBox {
        width: 100%;
        height: 10rem;
        background-color: #546B48;
        text-align: center;
        overflow: hidden;
        position: relative;

        .centerGallery {
            height: 8rem;
            width: 68%;
            margin: 1rem auto;
            border-radius: 6%;
        }

        .leftGallery {
            height: 8rem;
            width: 60%;
            border-radius: 6%;
            left: -50%;
            bottom: 1.5rem;
            position: absolute;
            @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
        }

        .rightGallery {
            height: 8rem;
            width: 60%;
            border-radius: 6%;
            position: absolute;
            right: -50%;
            bottom: 1.5rem;
            @include matrix(-1, 0.1, 0, 0.9, 0, 0);
        }
    }

    .trips {
        width: 96%;
        margin-top: 0.5rem;
        margin-left: 2%;
        overflow: hidden;

        .trip {
            width: 94%;
            height: 9rem;
            background-repeat: no-repeat;
            background-size: cover;
            margin: 1rem 0.6rem;
            text-align: center;
            overflow: hidden;

            h2 {
                margin-top: 2.4rem;
                color: white;
            }

            p {
                color: white;
            }
        }

        .tripDisable {
            margin-top: -10rem;
        }

        .disable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: -10rem;
            left: 0;

            .iconContainer {
                background-color: red;
                margin: 2.6rem auto;
                width: 4rem;
                height: 4rem;
                border-radius: 50%;

                img {
                    margin-top: 1rem;
                }
            }
        }

        .add {
            background-color: #546B48;
            height: 6rem;

            img {
                margin-top: 2rem;
            }
        }

        .addDisable {
            margin-top: -10rem;
        }
    }
</style>