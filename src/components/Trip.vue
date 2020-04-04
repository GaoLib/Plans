<template>
    <div>
        <div class="gallery_box">
            <img :src="require('../assets/images/trip/'+rollList[(rollList.indexOf(curGallery)-1+rollList.length) % rollList.length]+'.png')"
                class="left_gallery">
            <img :src="require('../assets/images/trip/'+curGallery+'.png')" class="center_gallery" v-on:touchstart="touchStart"
                v-on:touchend="touchEnd">
            <img :src="require('../assets/images/trip/'+rollList[(rollList.indexOf(curGallery)+1+rollList.length) % rollList.length]+'.png')"
                class="right_gallery">
        </div>
        <div class="trips">
            <div v-for="item in tripList" :key="item.id">
                <div :class="['trip',{'trip_disable': item.id > 1 && curDeleteNum+1 === item.id}]"
                    :style="img(item.image)" @touchstart="deleteStart(item.id)"
                    @touchend="deleteEnd">
                    <div @click="turnPage(item.id)">
                        <h2>{{item.destination}}</h2>
                        <p>{{item.price}}</p>
                    </div>
                </div>
                <div class="trip disable" v-if="curDeleteNum === item.id" @click="cancel">
                    <div class="icon_container"><img src="../assets/images/delete.png" @click="deleted"></div>
                </div>
            </div>
            <div :class="['trip','add',{'add_disable':curDeleteNum === tripList.length - 1}]" v-permission:operation="'trip_add'">
                <router-link to="/add/trip"><img src="../assets/images/add.png"></router-link>
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
        getTripList
    } from '@/api/trip'
    import { Trip } from '@/types/trip'

    @Component
    export default class TripMain extends Vue {
        tripList: Trip[] = []
        startX = 0
        rollList: string[] = ['chongqing', 'huangshan', 'xiamen']
        curGallery = 'huangshan'
        timeOutEvent = 0
        curDeleteNum = 0

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
            getTripList().then((res: any) => {
                this.tripList = res.data
            });
        }

        touchStart(ev: any) {
            const eve = ev || event; //浏览器兼容问题，有的ev，有的用event
            if (eve.touches.length == 1) {
                this.startX = eve.touches[0].clientX;
            }
        }

        touchEnd(ev: any) {
            const eve = ev || event;
            const index = this.rollList.indexOf(this.curGallery);
            const length = this.rollList.length;
            if (eve.changedTouches.length == 1) {
                if (eve.changedTouches[0].clientX > this.startX) {
                    this.curGallery = this.rollList[(index - 1 + length) % length];
                } else if (eve.changedTouches[0].clientX < this.startX) {
                    this.curGallery = this.rollList[(index + 1 + length) % length];
                }
            }
        }

        deleteStart(id: number) {
            const _this = this;
            this.timeOutEvent = setTimeout(function () {
                _this.curDeleteNum = id;
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

    .gallery_box {
        width: 100%;
        height: 10rem;
        background-color: #546B48;
        text-align: center;
        overflow: hidden;
        position: relative;

        .center_gallery {
            height: 8rem;
            width: 68%;
            margin: 1rem auto;
            border-radius: 6%;
        }

        .left_gallery {
            height: 8rem;
            width: 60%;
            border-radius: 6%;
            left: -50%;
            bottom: 1.5rem;
            position: absolute;
            @include matrix(1.0, 0.1, 0, 0.9, 0, 0);
        }

        .right_gallery {
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

        .trip_disable {
            margin-top: -10rem;
        }

        .disable {
            background-color: rgba(128, 128, 128, 0.6);
            position: relative;
            top: -10rem;
            left: 0;

            .icon_container {
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

        .add_disable {
            margin-top: -10rem;
        }
    }
</style>