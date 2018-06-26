<template>
  <div id="app">
    <router-link to="/trip">P</router-link>
    <router-link to="/details">D</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
       
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
}
body,html{
  padding:0;
  margin:0;
}
  .header{
    width:100%;
    height:3rem;
    position:fixed;
    top:0;
    left:0;
    background-color:white;
  }
 
</style>
