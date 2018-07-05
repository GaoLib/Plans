<template>
  <div>
    <div class="form">
      <input type="text" placeholder="Destination" class="fill" v-model="destination">
      <input type="number" placeholder="Cost" class="fill" v-model="cost">
      <input type="file" class="fill image" v-on:change="saveImg">
      <input type="text" class="fill" placeholder="Image" v-model="image">
      <select v-model="selected" class="fill">
        <option>  </option>
        <option>icecream</option>
        <option>hotpot</option>
        <option>cake</option>
        <option>drink</option>
        <option>noodle</option>
        <option>bar</option>
        <option>seafood</option>
        <option>westernfood</option>
      </select>
      <textarea placeholder="Address" class="fill" rows="4" v-model="address"></textarea>
      <textarea placeholder="Description" class="fill" rows="4" v-model="description"></textarea>
      <div v-for="(value, key,index) in foods">
        <input type="text" @change="title(index)" v-model="foodTitle[index]" class="day">
        <span :class="index == indexR - 1 ? 'deleteDay' : 'deleteDayhide'" @click="deleteDay(key)">Delete</span>
        <textarea class="fill" rows="4" @change="text(key,index)" v-model="foodText[index]"></textarea>
      </div>
      <button class="fill morebtn" @click="more">One More Food</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "foodAdd",
      data(){
          return {
            destination:'',
            cost:'',
            image:'',
            description:'',
            address:'',
            indexR:0,
            foods:{},
            selected:'',
            foodTitle:[],
            foodText:[]
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
          let key = 'Food'+ (this.indexR+1); 
          Vue.set(this.foods,key,'');
          this.indexR ++;
          // console.log(this.indexR,this.foods);
        },
        deleteDay: function(key){
          Vue.delete(this.foods,key);
          this.indexR --;
        },
        title: function(index){
          let value = 'Food' + (index + 1);
          Vue.delete(this.foods,value);
          Vue.set(this.foods,this.foodTitle[index],'');
        },
        text: function(key,index){
          Vue.set(this.foods,key,this.foodText[index]);
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
