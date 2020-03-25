<template>
    <div>
        <div class="header">
            <img class="back" src="../assets/images/back.png" @click="back">
            <img :src="done ? require('@/assets/images/trip/doneActive.png') : require('@/assets/images/trip/done.png')"
                @click="haveDone" class="done">
        </div>
        <div class="details">
            <router-view />
        </div>
        <div class="backContainer" v-if="backFlag">
            <div class="backConfirm">
                <h3>Save changes?</h3>
                <button @click="confirmed">Yes</button><button @click="cancel">No</button>
            </div>
        </div>
        <div class="edit" @click="save"><img
                :src="editStatus ? require('@/assets/images/trip/save.png') : require('@/assets/images/trip/edit.png')"
                class="editIcon"></div>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue
    } from 'vue-property-decorator';
    import {
        getFoodList
    } from '@/api/food'
    import {
        getOutList
    } from '@/api/out'
    import {
        getTripList
    } from '@/api/trip'

    @Component
    export default class Details extends Vue {
        done: boolean = false
        path: string = ''
        backFlag: boolean = false

        get editStatus() {
            return this.$store.getters.editStatus
        }

        mounted() {
            this.getAddressList();
        }

        getAddressList() {
            this.path = this.$route.fullPath.split('/')[2];
            switch (this.path) {
                case 'food':
                    getFoodList().then((res: any) => {
                        this.done = res.data.find((item: any) => {
                            item.id == this.$route.params.id
                        }).done
                    })
                    break;
                case 'trip':
                    getTripList().then((res: any) => {
                        this.done = res.data.find((item: any) => {
                            item.id == this.$route.params.id
                        }).done
                    })
                    break;
                case 'out':
                    getOutList().then((res: any) => {
                        this.done = res.data.find((item: any) => {
                            item.id == this.$route.params.id
                        }).done
                    })
            }

        }

        haveDone() {
            this.done = !this.done;
        }

        back() {
            if (this.editStatus) {
                this.backFlag = true
            } else {
                this.cancel()
            }
        }

        confirmed() {
            this.save()
            this.$router.back()
        }

        save() {
            this.$store.commit('change_edit_state')
        }

        cancel() {
            this.$router.back()
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 3rem;
        background-color: white;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;

        .back {
            margin-top: 0.6rem;
            margin-left: 4%;
            float: left;
        }

        .done {
            float: right;
            margin-right: 4%;
            margin-top: 0.5rem;
        }
    }

    .details {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    .edit {
        position: fixed;
        bottom: 1.6rem;
        right: 2rem;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: rgba(26, 26, 26, 0.8);
        text-align: center;
        z-index: 100;

        .editIcon {
            margin-top: 1rem;
        }
    }

    .backContainer {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(26, 26, 26, 0.6);
        z-index: 111;

        .backConfirm {
            position: fixed;
            width: 60%;
            height: 8rem;
            top: 40%;
            left: 18%;
            background-color: white;
            text-align: center;

            button {
                border: none;
                margin: 1rem;
                background-color: #91AE81;
            }
        }
    }
</style>