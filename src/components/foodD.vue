<template>
  <div class="plan">
    <img v-bind:src="'../../'+foodList.foodImage+'.jpg'" />
    <h1 v-html="foodList.foodDestination"></h1>
    <div class="addressContent">
      <icon name="position" class="position" scale="3"></icon>
    <textarea placeholder="Address Here" disabled class="address" v-html="foodList.foodAddress"></textarea>
    </div>
    <div class="route">
      <div class="day" v-for="(value , key) in foodList.foods">
        <div class="key">{{key}}</div>
        <div class="value">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "foodD",
      data(){
          return {
            foodList:[]
          }
      },
      mounted: function(){
        this.$nextTick(function(){
          this.getAddressList();
           // console.log(this.$route.params.id);
        })
      },
      methods:{
        getAddressList: function(){
          let _this = this;
          this.$http.get('../../static/data/foodD.json').then((res)=>{
            let lists = res.body.result.list;
            lists.forEach(function(curlist){
              if(curlist.Id == _this.$route.params.id){
                _this.foodList = curlist;
                // console.log(_this.foodList);
              }
            })
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .plan{
    width:100%;
    text-align:center;

    img{
      width:100%;
      height:10rem;
    }
    // .description{
    //   width:80%;
    //   border:none;
    //   background-color:red;
    //   text-align:center;
    //   color:#566E4A;
    // }
    .addressContent{
      width:100%;
      // overflow:hidden;

      .position{
        margin-left:10%;
        vertical-align:middle;
      }
      .address{
        width:80%;
        border:none;
        background-color: white;
        color: #566E4A;
        vertical-align:middle;
        padding-top: 1rem;
      }
    }
    .route{
       margin-top:2rem;

      .day{
        margin-top:1rem;

        .key{
          border-top:1rem solid #566E4A;
          border-bottom:1rem solid #1A1A1A;
          padding:0.4rem;
          font-weight:bold;
        }
        .value{
          margin:2rem auto;
        }
      }
    }
  }
  

</style>
