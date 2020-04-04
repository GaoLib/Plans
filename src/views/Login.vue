<template>
	<div class="login">
		<header class="header">
			<img src="../assets/images/trip/tm-img-05.jpg" alt="" />
		</header>
		<form class="form">
			<section class="sections">
				<Icon class="icons" name="account" scale="2"></Icon>
				<input placeholder="Please Enter Username" type="text" v-model="account.username" class="txt_input" @blur="check" />
			</section>
			<section class="sections">
				<Icon class="icons" name="password" scale="2"></Icon>
				<input placeholder="Please Enter Password" type="password" v-model="account.password"
					class="txt_input" @blur="check" />
			</section>
			<button type="button" :class="['login_btn',{'active_btn': btnFlag}]" :disabled="!btnFlag" @click="login">Login</button>
		</form>
		<p v-if="messageFlag" style="color: #cd4848">Login Failed!</p>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from 'vue-property-decorator';
	import { Account } from '@/types/account'
	@Component({})
	export default class Login extends Vue {
		account: Account = {
			username: '',
			password: ''
		}
		btnFlag = false
		messageFlag = false

		login() {
			this.$store.dispatch('LoginByUsername', this.account).then(() => {
				this.$router.push({ path: '/' })
			}).catch(() => {
				this.messageFlag = true
			});
		}

		check() {
			this.btnFlag = !!this.account.username && !!this.account.password
		}
	}
</script>

<style lang="scss" scoped>
	.login {

		.header {
			width: 100%;
			height: 196px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.form {
			width: 100%;
			height: 144px;
			margin-top: 100px;

			.sections {
				margin: 6px auto;

				.txt_input {
					width: 70%;
					vertical-align: middle;
					border: 0px;
					border-bottom: 1px solid #aaa;
					text-align: center;
					height: 30px;
				}

				.icons {
					vertical-align: middle;
					margin-right: 4px;
				}
			}

			.login_btn {
				width: 76%;
				height: 30px;
				margin-top: 10px;
				border: 0px;
			}

			.active_btn {
				background: #566E4A;
				color: #ddd;
			}
		}
	}
</style>