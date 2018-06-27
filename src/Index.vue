<template>
  <div>
    <div class="header">
      <img src="./assets/images/logo.gif">
      <div class="searchBox"><icon  class="search" name="search" scale="2"></icon></div>
      <icon class="shop" name="shop" scale="3"></icon>
    </div>
    <div class="container"><router-view/></div>
    <div class="footer">
      <router-link to="/trip"><img v-bind:src="[curPage == 'trip' ? '../static/images/tripActive.png' : '../static/images/trip.png']" class="trip" v-on:click="choosePage('trip')"></router-link>
      <router-link to="/out"><span v-bind:class="curPage == 'out' ? 'outActive' :'out' " v-on:click="choosePage('out')">Go Go Now</span></router-link>
      <router-link to="/food"><img v-bind:src="curPage == 'food' ? '../static/images/foodActive.png' : '../static/images/food.png' " class="food" v-on:click="choosePage('food')"></router-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Index",
      data(){
          return{
             curPage:''
          }
        },
      mounted:function(){
          this.$nextTick(function(){
            this.curPage = window.localStorage.getItem('page');
          })
        },
      methods:{
          choosePage: function(type){
            this.curPage = type;
            window.localStorage.setItem('page',this.curPage);
          }
      }
    }
</script>

<style lang="scss" scoped>
.header{
    width:100%;
    height:3rem;
    position:fixed;
    top:0;
    left:0;
    background-color:white;
    overflow:hidden;

    img{
     width:8%;
     margin-left: 4%;
    }
    .searchBox{
      margin-left: 8%;
      margin-top:3%;
      display: inline-block;
      width:60%;
      background-color: rgb(26,26,26);
      border-radius: 5%;

      .search{
        padding:4px 8px; 
       }
    }
    .shop{
      float:right;
      margin-right: 4%;
      margin-top:0.6rem;
     }
  }
   .footer{
    background-color:rgb(26,26,26);
    width:100%;
    height:3rem;
    position:fixed;
    bottom:0;
    left:0;
    text-align:center;

    &:before{
      content:'';
      width:30%;
      height:80%;
      background-color: rgb(26,26,26);
      border-radius:50%;
      position:absolute;
      top:-1rem;
      left:36%;
    }

    .trip{
      padding-top:0.5rem;
      margin-left:-50%;
    }
    .out{
      color: white;
      font-size:1.4rem;
      z-index:999;
      position:absolute;
      top:0.6rem;
      left:32%;
      width:40%;
    }
    .outActive{
      color:#546B48;
      font-size:1.4rem;
      z-index:999;
      position:absolute;
      top:0.6rem;
      left:32%;
      width:40%;
    }
    .food{
      float:right;
      padding:0.5rem 8%;
    }
   }
   .container{
    margin-top:3rem;
    margin-bottom:3rem;
   }
</style>
