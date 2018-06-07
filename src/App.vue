<template>
  <div id="app">
    <div class="logo">
      <ul class="headerLeft" v-on:click="listFlag=!listFlag">
        <li class="iconLine"></li>
        <li class="iconLine"></li>
        <li class="iconLine"></li>
      </ul>
      <img src="./assets/images/logo.gif">
    </div>
    <div class="menuList" v-show="listFlag">
      <router-link to="/"><li class="menuItem" v-bind:class="{'choose':chooseTrip}" v-on:click="choosePage('trip')">Trip</li></router-link>
      <router-link to="/food"><li class="menuItem" v-bind:class="{'choose':!chooseTrip}" v-on:click="choosePage('food')">Food</li></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      listFlag:false,
      chooseTrip:true
    }
  },
  methods:{
    choosePage: function(type){
      if(type == 'trip'){
        this.chooseTrip = true;
      }else{
        this.chooseTrip = false;
      }
      this.listFlag = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
a{
  text-decoration: none;
}
body,html{
  padding:0;
  margin:0;
}
  .logo{
    width:100%;
    height:3rem;
    background: black;
  }
   .headerLeft{
     float:left;
     width:2rem;
     margin-left: -2rem;
     margin-top: 1rem;
   }
   .iconLine{
     height:0.2rem;
     width:1rem;
     background: grey;
     list-style-type: none;
     margin:0.1rem;

   }
   .logo img{
     width:2rem;
     margin-top:0.6rem;
     margin-left: -2rem;
   }
  .menuList{
    width:100%;
    background: black;
    z-index: 99;
  }
  .menuItem{
    list-style-type: none;
    color:#fff;
    font-weight: bold;
    padding:0.8rem;
  }
  .choose {
    background: rgb(210,147,79);
}
  .menuItem:hover{
    background: rgb(0,187,211);
  }

</style>
