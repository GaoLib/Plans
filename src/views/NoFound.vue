<template>
    <div class="error_page">
        <article>
            <p>You are lost.</p>
            <button type="button" @click="back">Back</button>
        </article>
    </div>
</template>

<script lang="ts">
    	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	@Component({})
	export default class Login extends Vue {
		back() {
			this.$router.push('/')
		}
	}
</script>

<style lang="scss" scoped>
.error_page{
    width: 100%;
    height: 96vh;
    display: flex;
    justify-content: center;
    align-items: center;

    article{
        width: 200px;
        height: 200px;
        font-size: 30px;
        color: #566E4A;

        button{
            background: #566E4A;
            height: 30px;
            margin-top: 10px;
            border: 0px;
            width: 90%;
            color: #ddd;
            border-radius: 4px;
        }
    }
}
</style>