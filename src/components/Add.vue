<template>
	<div>
		<div class="header">
			<p class="back" v-on:click="$router.back()">Cancel</p>
		</div>
		<div class="addcontent"><router-view/></div>
		<div class="addbtn" @click="add">Add</div>
		<div class="popMessage" v-if="success">Successful</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Add extends Vue {
	success: boolean = false

	add(){
		this.success = true;
		const _this = this;
		setTimeout(function(){
			_this.success = false;
		},2000)
	}
}
</script>

<style scoped lang="scss">
.header{
    width:100%;
    height:3rem;
    background-color: rgb(247,247,247);
    position:fixed;
    z-index:100;
    top:0;
    left:0;

    .back{
		margin-top:1rem;
		margin-left:8%;
		color: #91AE81; 
		font-weight:bold;
    }
}
    .addcontent{
		margin-top:3rem;
		margin-bottom:3rem;
    }
   .addbtn{
		width:100%;
		position:fixed;
		bottom:0;
		left:0;
		text-align:center;
		padding:1rem 0;
		background-color: rgb(26,26,26);
		color:white;
		font-size:1.2rem;
   }
   .popMessage{
		font-size:1.4rem;
		padding:1rem 2rem;
		background-color: lightgray;
		position:fixed;
		top:40%;
		left:30%;
   }
</style>
