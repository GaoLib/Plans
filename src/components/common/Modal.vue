<template>
    <div class="modal_wrap" v-show="showFlag">
        <section class="confirm">
            <h3>{{title}}</h3>
            <button @click="yes">Yes</button><button @click="no">No</button>
        </section>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Emit,
        Watch,
		Vue
    } from 'vue-property-decorator'

    @Component({})
	export default class Modal extends Vue {
        @Prop({
            default: ''
        })
        title!: string
        @Prop({
            default: false
        })
        showFlag!: boolean

        @Emit('confirmed')
        sendConfirm(){
            console.log('confirmed')
        }

        @Emit('cancel')
        sendCancel(){
            console.log('canceled')
        }

        yes() {
            this.sendConfirm()
        }

        no() {
            this.sendCancel()
        }
    }

</script>

<style lang="scss" scoped>
    .modal_wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(26, 26, 26, 0.6);
        z-index: 100;

        .confirm {
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