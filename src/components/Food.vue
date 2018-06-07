<template>
  <div class="foods">
    <div class="food" v-for="(item,index) in foodList" v-bind:style="{backgroundImage:'url(\''+item.foodImage+'.jpg\')'}">
        <div class="description" v-bind:class="{'odd':Math.random()> 0.5}">
          <h4 v-text="item.foodDestination"></h4>
          <p v-text="item.foodPrice"></p>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Food",
      data(){
          return{
            foodList:[]
          }
        },
      mounted:function(){
          this.$nextTick(function(){
            //setInterval(this.gallery,3000);
            this.getData();
          })
        },
      methods:{
          getData: function(){
            let _this=this;
            this.$http.get('../../static/data/food.json').then((res)=>{
              _this.foodList = res.body.result.list;
            })
          }
      }
    }
</script>

<style scoped>
  .foods{
    width: 96%;
    display:flex;
    margin-top:0.5rem;
    margin-left: 2%;
    flex-wrap: wrap;
  }
  .food{
    width:8rem;
    height:9rem;
    background-repeat: no-repeat;
    background-size: cover;
    margin:0.2rem 0.6rem;
    display:flex;
  }
  .description{
    align-self: flex-end;
    width:100%;
    height:4rem;
    font-weight: bold;
    display:flex;
    justify-content:center;
    background: linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.8));
    color:lightgoldenrodyellow;
  }
  .description h4{
    color:lightgoldenrodyellow;
  }
  .odd{
    background: white;
    color:black;
  }
  .odd h4{
    color:black;
  }
  .description p{
    font-size: 0.4rem;
    margin-left:1rem;
    align-self: flex-end;
  }
</style>
