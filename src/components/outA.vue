<template>
  <div>
    <div class="form">
      <input type="text" placeholder="Destination" class="fill" v-model="destination">
      <input type="number" placeholder="Cost" class="fill" v-model="cost">
      <input type="file" class="fill image" v-on:change="saveImg">
      <input type="text" class="fill" placeholder="Image" v-model="image">
      <input type="text" placeholder="EndTime :  xxxx-xx-xx" class="fill" v-model="endtime">
      <input type="text" placeholder="Title" class="fill" v-model="title">
      <select v-model="selected" class="fill">
        <option>常规</option>
        <option>体验</option>
        <option>摄影</option>
        <option>Pop-Up</option>
        <option>时尚潮流</option>
        <option>艺术设计</option>
      </select>
      <textarea placeholder="Address" class="fill" rows="4" v-model="address"></textarea>
      <textarea placeholder="Description" class="fill" rows="4" v-model="description"></textarea>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "outAdd",
      data(){
          return {
            destination:'',
            cost:'',
            image:'',
            description:'',
            address:'',
            selected:'',
            endtime:'',
            title:''
          }
      },
      mounted: function(){
        this.$nextTick(function(){
            
        })
      },
      methods:{
        saveImg: function(ev){
          this.image = ev.target.files[0].name;
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
}
</style>
