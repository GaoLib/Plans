<template>
  <div>
    <div class="header">
      <p class="back" v-on:click="$router.back(-1)">Cancel</p>
    </div>
    <div class="addcontent"><router-view/></div>
    <div class="addbtn">Add</div>
  </div>
</template>

<script>
    export default {
        name: "Details",
      data(){
          return {
           
          }
      },
      mounted: function(){
        this.$nextTick(function(){
  
        })
      },
      methods:{

      }
    }
</script>

<style lang="scss" scoped>
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
</style>
