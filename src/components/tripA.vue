<template>
  <div>
    <div class="form">
      <input type="text" placeholder="Destination" class="fill" v-model="destination">
      <input type="number" placeholder="Cost" class="fill" v-model="cost">
      <input type="file" class="fill image" v-on:change="saveImg">
      <input type="text" class="fill" placeholder="Image" v-model="image">
      <textarea placeholder="Description" class="fill" rows="4" v-model="description"></textarea>
      <div v-for="(value, key,index) in route">
        <span class="day">{{key}}</span>
        <span :class="index == indexR - 1 ? 'deleteDay' : 'deleteDayhide'" @click="deleteDay(index)">Delete</span>
        <textarea class="fill" rows="4" v-model="route[key]"></textarea>
      </div>
      <button class="fill morebtn" @click="more">One More Day</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "tripAdd",
      data(){
          return {
            destination:'',
            cost:'',
            image:'',
            description:'',
            indexR:0,
            route:{}
          }
      },
      mounted: function(){
        this.$nextTick(function(){
            
        })
      },
      methods:{
        saveImg: function(ev){
          this.image = ev.target.files[0].name;
        },
        more: function(){
          this.indexR ++;
          let key = 'Day'+ this.indexR; 
          Vue.set(this.route,key,'');
          // console.log(this.route);
        },
        deleteDay: function(index){
          let value = 'Day' + (index + 1);
          Vue.delete(this.route,value);
          this.indexR --;
        }
      }
    }
</script>

<style lang="scss" scoped>
.form{
  width:100%;
  text-align:center;
  position:relative;

  .fill{
    width:90%;
    margin:0 auto;
    padding:1rem 0.8rem;
    border-top:none;
    border-left:none;
    border-right:none;
    font-size:1rem;
  }
  .image{
    position:absolute;
    left:0;
    top:6rem;
    opacity:0;
  }
  .morebtn{
    margin-top:1rem;
    border:none;
    background-color: #91AE81; 
    // background-color: rgb(176,176,176);
  }
  .day{
    float:left;
    margin-left:6%;
    margin-bottom:0.4rem;
    margin-top:0.4rem;
  }
  .deleteDay{
    float:right;
    margin-right:6%;
    color: #91AE81;
    margin-top:0.4rem;
    display:block;
  }
  .deleteDayhide{
    float:right;
    margin-right:6%;
    color: #91AE81;
    margin-top:0.4rem;
    display:none;
  }
}
</style>
