<template>
  <div>
    <div class="types">
      <img v-for="type in typeList" :src="curFoodType === type ? '../../static/images/food/' + type + 'Active.png' : '../../static/images/food/' + type + '.png' " class="type" @click="foodType(type)">
    </div>
    <div class="foods">
    <div class="food" v-for="(item,index) in filterList" v-bind:style="{backgroundImage:'url(\''+item.foodImage+'.jpg\')'}">
         <router-link :to="'/Details/foodD/'+item.Id"><h2 v-text="item.foodDestination"></h2>
          <p v-text="item.foodPrice"></p></router-link>
    </div>
    <div class="food add">
      <router-link to="/add/foodA"><img src="../../static/images/add.png"></router-link>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "Food",
      data(){
          return{
            foodList:[],
            curFoodType:'',
            typeList:['hotpot','cake','drink','noodle','bar','seafood','westernfood','icecream'],
            filterList:[]
          }
        },
      computed:{
        // filterList:function(){
        //   if(this.curFoodType){
        //       return this.foodList.filter(function(item){
        //         return item.type == this.curFoodType;
        //     })
        //   }else{
        //     return this.foodList;
        //   }
        // }
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
            this.$http.get('../../static/data/foodD.json').then((res)=>{
              _this.foodList = res.body.result.list;
              _this.filterList = res.body.result.list;
            })
          },
          foodType:function(type){
            if(this.curFoodType !== type){
              this.curFoodType = type;
              this.filterList = this.foodList.filter(function(item){
                return item.type == type;
              })
            }else{
              this.curFoodType = '';
              this.filterList = this.foodList;
            }
            
          }
      }
    }
</script>

<style lang="scss" scoped>
.types{
  width:80%;
  margin-left:14%;
  // width:100%;
  // text-align:center;

  .type{
    margin:0.4rem 3%;
  }
  
}
  .foods{
    width: 96%;
    margin-left: 2%;
  }
  .food{
    width:94%;
    height:9rem;
    background-repeat: no-repeat;
    background-size: cover;
    margin:1.2rem 0.6rem;
    text-align:center;
    overflow:hidden;

    h2{
      margin-top:2.4rem;
      color:white;
    }
    p{
      color:white;
    }
  }
  .add{
    background-color: #546B48; 
    height:6rem;

    img{
       margin-top:2rem;
    }
  }
</style>
